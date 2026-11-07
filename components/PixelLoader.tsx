"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useApp } from "@/components/Providers";
import { EASE } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/*  Loader Peta Menjalar (gaya World Generation Map) di latar putih   */
/* ------------------------------------------------------------------ */

/** PRNG deterministik agar hasil SSR dan Client konsisten */
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MAP_SIZE = 23; // Grid 23x23 chunk
const EXIT_COLS = 12;
const EXIT_ROWS = 8;
const SESSION_KEY = "ranamese-loaded-v2";

const TIPS = [
  "Menyiapkan danau…",
  "Menanam hutan…",
  "Memetakan zona bahaya…",
  "Menyeduh kopi Manggarai…",
];

/** Kurva progres non-linier (kadang tertahan sejenak seperti generate chunk), total ±2.2 detik */
const KEYS: [number, number][] = [
  [0, 0],
  [240, 12],
  [480, 19],
  [650, 21],
  [960, 48],
  [1180, 54],
  [1340, 56],
  [1680, 83],
  [1880, 88],
  [2150, 100],
];

function progressAt(ms: number) {
  for (let i = 1; i < KEYS.length; i++) {
    const [t1, p1] = KEYS[i];
    const [t0, p0] = KEYS[i - 1];
    if (ms <= t1) return p0 + ((ms - t0) / (t1 - t0)) * (p1 - p0);
  }
  return 100;
}

interface ChunkCell {
  x: number;
  y: number;
  /** Ambang progres (0..96) saat chunk mulai muncul dari tengah keluar */
  threshold: number;
  /** Warna akhir chunk setelah selesai dimuat */
  finalColor: string;
  /** Warna saat chunk sedang aktif menjalar (frontier) */
  activeColor: string;
}

/** Bangun data 23x23 chunk peta yang menjalar dari titik pusat (11,11) keluar */
function buildChunkMap(): ChunkCell[] {
  const rnd = mulberry32(2026);
  const center = (MAP_SIZE - 1) / 2;
  const raw: { x: number; y: number; dist: number; finalColor: string; activeColor: string }[] = [];

  for (let y = 0; y < MAP_SIZE; y++) {
    for (let x = 0; x < MAP_SIZE; x++) {
      const dx = x - center;
      const dy = y - center;

      // Kombinasi jarak Chebyshev (kotak khas chunk Minecraft) + sedikit variasi organik
      const chebyshev = Math.max(Math.abs(dx), Math.abs(dy));
      const euclidean = Math.hypot(dx, dy);
      const jitter = (rnd() - 0.5) * 1.35;
      const dist = chebyshev * 0.68 + euclidean * 0.32 + jitter;

      // Tentukan warna bioma Ranamese (Danau kawah di tengah-barat daya, hutan & bukit di sekeliling)
      const lakeDist = Math.hypot(dx + 1.2, dy - 0.8);
      let finalColor = "#17805F";
      let activeColor = "#8CE0B8";

      if (lakeDist < 3.6 + (rnd() - 0.5) * 0.8) {
        // Air Danau Ranamese
        finalColor = rnd() > 0.45 ? "#1A70D4" : "#2986E8";
        activeColor = "#93C8FA";
      } else if (lakeDist < 5.0 + (rnd() - 0.5) * 0.9) {
        // Tepian danau / rawa hijau muda
        finalColor = rnd() > 0.5 ? "#35A67E" : "#52BD95";
        activeColor = "#B5F2D8";
      } else if (chebyshev > 8 && rnd() > 0.58) {
        // Dataran tinggi / tanah bukit Golo Loni & Watu Mori
        finalColor = rnd() > 0.35 ? "#8C6D46" : "#F5A524";
        activeColor = "#F9D891";
      } else {
        // Hutan hujan Manggarai
        const r = rnd();
        finalColor = r < 0.45 ? "#0F4C3A" : r < 0.8 ? "#17805F" : "#23966F";
        activeColor = "#8DE3BE";
      }

      raw.push({ x, y, dist, finalColor, activeColor });
    }
  }

  // Urutkan berdasarkan jarak dari pusat agar threshold 0..95 menjalar rapi dari tengah keluar
  const sorted = [...raw].sort((a, b) => a.dist - b.dist);
  const rankMap = new Map<string, number>();
  sorted.forEach((cell, idx) => {
    rankMap.set(`${cell.x},${cell.y}`, (idx / (sorted.length - 1)) * 94);
  });

  return raw.map((c) => ({
    x: c.x,
    y: c.y,
    threshold: rankMap.get(`${c.x},${c.y}`) ?? 0,
    finalColor: c.finalColor,
    activeColor: c.activeColor,
  }));
}

const CHUNK_CELLS = buildChunkMap();

type Phase = "loading" | "complete" | "exit" | "gone";

export default function PixelLoader() {
  const { setLoaderDone } = useApp();
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
  const [tip, setTip] = useState(0);
  const [dots, setDots] = useState(0);
  const startRef = useRef<number | null>(null);
  const skipRef = useRef(false);

  // Lewati bila sudah ditandai skip-loader
  useLayoutEffect(() => {
    if (document.documentElement.classList.contains("skip-loader")) {
      setPhase("gone");
      setLoaderDone(true);
    }
  }, [setLoaderDone]);

  // Animasi progres 0% -> 100%
  useEffect(() => {
    if (phase !== "loading") return;
    let raf = 0;
    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const p = skipRef.current ? 100 : progressAt(now - startRef.current);
      setProgress(p);
      if (p >= 100) {
        setPhase("complete");
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Pergantian tips tiap 0,5 detik & titik-titik
  useEffect(() => {
    if (phase === "gone") return;
    const a = setInterval(() => setTip((v) => (v + 1) % TIPS.length), 500);
    const b = setInterval(() => setDots((v) => (v + 1) % 4), 320);
    return () => {
      clearInterval(a);
      clearInterval(b);
    };
  }, [phase]);

  // Saat 100% -> tahan sebentar lalu masuk fase transisi keluar
  useEffect(() => {
    if (phase !== "complete") return;
    const id = setTimeout(() => setPhase("exit"), skipRef.current || reduced ? 100 : 420);
    return () => clearTimeout(id);
  }, [phase, reduced]);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {}
    document.documentElement.classList.remove("loader-active");
    setPhase("gone");
  }, []);

  // Fase keluar -> picu animasi masuk judul Hero & hapus loader
  useEffect(() => {
    if (phase !== "exit") return;
    const heroCue = setTimeout(() => setLoaderDone(true), reduced ? 0 : 240);
    const done = setTimeout(finish, reduced ? 400 : 1050);
    return () => {
      clearTimeout(heroCue);
      clearTimeout(done);
    };
  }, [phase, reduced, finish, setLoaderDone]);

  const skip = () => {
    if (phase === "loading") {
      skipRef.current = true;
    } else if (phase === "complete") {
      setPhase("exit");
    }
  };

  // Grid blok putih untuk transisi keluar (12x8)
  const exitTiles = useMemo(() => {
    const rnd = mulberry32(9);
    return Array.from({ length: EXIT_COLS * EXIT_ROWS }, (_, i) => {
      const c = i % EXIT_COLS;
      const r = Math.floor(i / EXIT_COLS);
      const delay = ((c + r) / (EXIT_COLS + EXIT_ROWS - 2)) * 0.48 + rnd() * 0.12;
      return { i, c, r, delay };
    });
  }, []);

  if (phase === "gone") return null;

  const exiting = phase === "exit";
  const pct = Math.round(progress);

  return (
    <motion.div
      className="pixel-loader fixed inset-0 z-[100] cursor-pointer select-none overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label={`Memuat peta Ranamese, ${pct} persen. Klik untuk melewati.`}
      onClick={skip}
      initial={false}
      animate={reduced && exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.38, ease: EASE }}
    >
      {/* Latar belakang putih polos yang terbelah menjadi grid blok saat selesai */}
      <div className="absolute inset-0" aria-hidden>
        {exitTiles.map(({ i, c, r, delay }) => (
          <motion.div
            key={i}
            className="pixelated absolute bg-white"
            style={{
              left: `${(c * 100) / EXIT_COLS}%`,
              top: `${(r * 100) / EXIT_ROWS}%`,
              width: `calc(${100 / EXIT_COLS}% + 1.5px)`,
              height: `calc(${100 / EXIT_ROWS}% + 1.5px)`,
            }}
            initial={false}
            animate={exiting && !reduced ? { opacity: 0, scale: 0.45 } : { opacity: 1, scale: 1 }}
            transition={
              exiting && !reduced
                ? { duration: 0.3, delay, ease: [0.55, 0, 0.85, 0.35] }
                : { duration: 0 }
            }
          />
        ))}
      </div>

      {/* Konten utama: Peta Chunk Menjalar + Persentase */}
      <motion.div
        className="relative flex h-full flex-col items-center justify-center px-6 text-center font-pixel text-ink"
        animate={exiting ? { opacity: 0, scale: 0.94, y: -10 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE }}
      >
        {/* Kanvas Peta Menjalar (World Chunk Generation Map) */}
        <motion.div
          animate={
            phase === "complete" && !reduced
              ? { scale: [1, 1.04, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.28 }}
          className="pixelated relative border-4 border-ink bg-[#f3f7f4] p-1.5 shadow-[6px_6px_0_#d8e2dc]"
        >
          <svg
            viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`}
            className="pixelated block h-[161px] w-[161px] sm:h-[184px] sm:w-[184px]"
            shapeRendering="crispEdges"
            aria-hidden
          >
            {/* Latar grid kosong */}
            <rect width={MAP_SIZE} height={MAP_SIZE} fill="#E9EFEA" />

            {/* Chunk yang menjalar keluar dari titik tengah */}
            {CHUNK_CELLS.map((cell) => {
              const delta = progress - cell.threshold;
              if (delta < 0) return null;
              // Chunk yang baru saja tersentuh (frontier) menyala terang sebelum menjadi warna peta
              const isFrontier = delta < 6.5 && progress < 99.5;
              const fill = isFrontier ? cell.activeColor : cell.finalColor;
              return (
                <rect
                  key={`${cell.x}-${cell.y}`}
                  x={cell.x}
                  y={cell.y}
                  width={1}
                  height={1}
                  fill={fill}
                />
              );
            })}

            {/* Penanda titik pusat saat awal mula menjalar */}
            <rect
              x={(MAP_SIZE - 1) / 2}
              y={(MAP_SIZE - 1) / 2}
              width={1}
              height={1}
              fill="#FFFFFF"
              opacity={progress < 18 ? 0.9 : 0}
            />
          </svg>
        </motion.div>

        {/* Persentase tepat di bawah peta menjalar */}
        <p className="mt-5 text-base font-bold tracking-wider text-ink tabular-nums sm:text-lg">
          {pct}%
        </p>

        {/* Status utama */}
        <p className="mt-3 text-[11px] leading-relaxed text-ink sm:text-[13px]">
          Membangun Ranamese
          <span className="inline-block w-[3ch] text-left">{".".repeat(dots)}</span>
        </p>

        {/* Teks tips berganti tiap ±0,5 detik */}
        <p className="mt-3 h-4 text-[9px] text-muted sm:text-[10px]">{TIPS[tip]}</p>

        <p className="absolute bottom-6 text-[8px] text-muted/60 sm:text-[9px]">
          klik di mana saja untuk lewati
        </p>
      </motion.div>
    </motion.div>
  );
}
