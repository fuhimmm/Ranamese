"use client";

import { AnimatePresence, motion, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface RoamingCursorConfig {
  name: string;
  initialDelay: number;
  messages: string[];
}

const CURSORS: RoamingCursorConfig[] = [
  {
    name: "Ranamese",
    initialDelay: 0,
    messages: [
      "Halo! Selamat datang 👋",
      "Tabe! Salam kenal dari Gilang🙌",
      "Selamat menjelajah!",
      "Ngopi dulu kawan ☕",
      "Jangan lupa mampir ya!",
      "Senang kamu berkunjung 😊",
    ],
  },
];

const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));
const toTransform = (x: number, y: number) => `translate3d(${x}px, ${y}px, 0)`;

function waitUntilVisible(): Promise<void> {
  return new Promise((resolve) => {
    if (!document.hidden) {
      resolve();
      return;
    }
    const onVis = () => {
      if (!document.hidden) {
        document.removeEventListener("visibilitychange", onVis);
        resolve();
      }
    };
    document.addEventListener("visibilitychange", onVis);
  });
}

/**
 * Kursor panah dengan isian motif tenun Songke Manggarai (Ntala.png)
 * di atas dasar kain hitam-emas khas Songke.
 */
function SongkeCursorPointer() {
  return (
    <svg
      viewBox="0 0 28 28"
      className="relative z-10 h-7 w-7 drop-shadow-[0_3px_6px_rgba(0,0,0,0.45)]"
      aria-hidden
    >
      <defs>
        <clipPath id="songke-cursor-clip">
          <path d="M4.2 3.2L23.2 10.8L14.4 14.4L10.8 23.2L4.2 3.2Z" />
        </clipPath>
      </defs>

      {/* Dasar kain tenun Songke gelap */}
      <path
        d="M4.2 3.2L23.2 10.8L14.4 14.4L10.8 23.2L4.2 3.2Z"
        fill="#111815"
      />

      {/* Motif kain Songke Ntala di dalam badan kursor */}
      <g clipPath="url(#songke-cursor-clip)">
        <image
          href="/images/ntala.png"
          x="4"
          y="3"
          width="17"
          height="17"
          preserveAspectRatio="xMidYMid slice"
          style={{ imageRendering: "pixelated" }}
        />
      </g>

      {/* Garis tepi emas Songke */}
      <path
        d="M4.2 3.2L23.2 10.8L14.4 14.4L10.8 23.2L4.2 3.2Z"
        fill="none"
        stroke="#F5A524"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SingleRoamingCursor({
  name,
  initialDelay,
  messages,
}: RoamingCursorConfig) {
  const controls = useAnimation();
  const reduced = useReducedMotion();
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (reduced) return;

    let mounted = true;
    let curX = Math.random() * Math.max(220, window.innerWidth - 160);
    let curY =
      window.scrollY +
      window.innerHeight / 2 +
      (Math.random() - 0.5) * 400;

    (async () => {
      await controls.set({
        transform: toTransform(curX, curY),
        opacity: 0,
      });

      if (initialDelay > 0) await sleep(initialDelay);
      if (!mounted) return;

      await controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });

      while (mounted) {
        await waitUntilVisible();
        if (!mounted) return;

        // Algoritma identik dengan FakeCursor pada safwan.id:
        // Target acak di viewport aktif + titik lengkung tengah (midpoint) + durasi 0.8s..2.0s
        const nextX = Math.random() * Math.max(180, window.innerWidth - 150);
        const nextY =
          window.scrollY +
          Math.random() * Math.max(220, window.innerHeight - 140);
        const midX = (curX + nextX) / 2 + (Math.random() - 0.5) * 400;
        const midY = (curY + nextY) / 2 + (Math.random() - 0.5) * 400;

        await controls.start({
          transform: [
            toTransform(curX, curY),
            toTransform(midX, midY),
            toTransform(nextX, nextY),
          ],
          transition: {
            duration: 0.8 + Math.random() * 1.2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          },
        });

        curX = nextX;
        curY = nextY;
        if (!mounted) return;

        if (Math.random() > 0.6) {
          setIsTyping(true);
          setTypedText("");
          await sleep(500 + Math.random() * 1000);
          if (!mounted) return;

          const msg = messages[Math.floor(Math.random() * messages.length)];
          for (let i = 0; i <= msg.length; i++) {
            if (!mounted) return;
            setTypedText(msg.substring(0, i));
            await sleep(30 + Math.random() * 90);
          }

          await sleep(2500 + Math.random() * 1500);
          if (!mounted) return;
          setIsTyping(false);
          setTypedText("");
        } else {
          await sleep(200 + Math.random() * 1300);
        }
      }
    })();

    return () => {
      mounted = false;
      controls.stop();
    };
  }, [controls, initialDelay, messages, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      animate={controls}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-[75] flex origin-top-left scale-90 flex-col items-start drop-shadow-[1px_3px_6px_rgba(0,0,0,0.34)] will-change-transform md:scale-100"
    >
      <SongkeCursorPointer />

      {/* Saat tidak mengetik: tampilkan pill nama "Ranamese" bermotif kain Songke Ntala */}
      {!isTyping && (
        <span className="relative top-[-4px] left-[20px] z-20 inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#F5A524]/85 bg-[#111815] px-3.5 py-1.5 text-[12.5px] font-bold whitespace-nowrap text-[#FDFCF8] shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
          {/* Latar tenun berulang motif Songke Ntala tipis */}
          <span
            aria-hidden
            style={{
              backgroundImage: "url('/images/ntala.png')",
              backgroundSize: "18px 18px",
              imageRendering: "pixelated",
            }}
            className="pointer-events-none absolute inset-0 opacity-[0.14]"
          />
          {/* Ornamen bintang Ntala di sisi kiri */}
          <img
            src="/images/ntala.png"
            alt=""
            className="relative z-10 h-4 w-4 shrink-0 [image-rendering:pixelated]"
          />
          <span className="relative z-10 tracking-wide text-[#F5D04A]">
            {name}
          </span>
        </span>
      )}

      {/* Saat mengetik: gelembung sapaan dengan aksen motif Songke Ntala */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, transformOrigin: "top left" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="relative top-[-4px] left-[20px] z-20 flex min-h-9 items-center gap-2 overflow-hidden rounded-r-2xl rounded-bl-2xl border border-[#F5A524]/85 bg-[#111815] px-3.5 py-2 text-[13px] font-semibold whitespace-nowrap text-[#FDFCF8] shadow-[0_8px_24px_rgba(0,0,0,0.38)]"
          >
            <span
              aria-hidden
              style={{
                backgroundImage: "url('/images/ntala.png')",
                backgroundSize: "18px 18px",
                imageRendering: "pixelated",
              }}
              className="pointer-events-none absolute inset-0 opacity-[0.12]"
            />
            <img
              src="/images/ntala.png"
              alt=""
              className="relative z-10 h-4 w-4 shrink-0 [image-rendering:pixelated]"
            />
            <span className="relative z-10">{typedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="relative z-10 ml-[2px] h-3.5 w-0.5 rounded-full bg-[#F5A524]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RoamingCursors() {
  return (
    <>
      {CURSORS.map((c) => (
        <SingleRoamingCursor key={c.name} {...c} />
      ))}
    </>
  );
}
