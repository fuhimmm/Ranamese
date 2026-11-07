"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { useApp } from "@/components/Providers";
import { EASE } from "@/lib/motion";

const EYEBROW_PARTS = ["GOLO", "LONI", "·", "WATU", "MORI"];
const TITLE_CHARS = Array.from("Ranamese");

export default function Hero() {
  const { loaderDone } = useApp();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "16%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.03, reduced ? 1.03 : 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", reduced ? "0px" : "48px"]);

  return (
    <section
      id="beranda"
      ref={ref}
      aria-label="Beranda Ranamese"
      className="relative h-[680px] w-full overflow-hidden select-none sm:h-[860px] lg:h-[980px]"
    >
      {/* Latar foto + parallax ringan */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0 -top-6 h-[108%] w-full will-change-transform"
      >
        <Image
          src="/images/hero.jpg"
          alt="Pemandangan Danau Ranamese dikelilingi hutan perbukitan hijau di bawah langit biru cerah"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_38%]"
        />
        {/* Gradasi halus agar teks selalu kontras dan bagian bawah menyatu dengan siluet danau */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,34,74,0.18)_0%,rgba(4,34,74,0.02)_42%,rgba(4,24,18,0.22)_74%,rgba(3,21,16,0.72)_92%,#031510_100%)]"
        />
      </motion.div>

      {/* Teks judul di langit */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex flex-col items-center px-4 pt-[170px] text-center text-white sm:pt-[215px] lg:pt-[235px]"
      >
        {/* Eyebrow: GOLO LONI · WATU MORI */}
        <p className="flex flex-wrap items-center justify-center gap-x-2.5 text-[11px] font-semibold tracking-[0.26em] text-white/95 uppercase sm:text-[14px] md:text-[15px]">
          {EYEBROW_PARTS.map((word, idx) => (
            <span key={idx} className="inline-block overflow-hidden py-0.5">
              <motion.span
                className="inline-block"
                initial={reduced ? { opacity: 0 } : { y: "120%", opacity: 0 }}
                animate={
                  loaderDone
                    ? { y: "0%", opacity: 1 }
                    : reduced
                      ? { opacity: 0 }
                      : { y: "120%", opacity: 0 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.05 + idx * 0.045,
                  ease: EASE,
                }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>

        {/* Judul utama: Ranamese (mask slide-up per huruf) */}
        <h1
          aria-label="Ranamese"
          className="mt-2 font-display text-[54px] leading-[0.98] font-extrabold tracking-[-0.03em] text-white drop-shadow-[0_4px_24px_rgba(4,30,66,0.22)] sm:mt-2.5 sm:text-[84px] md:text-[104px] lg:text-[112px]"
        >
          {TITLE_CHARS.map((ch, idx) => (
            <span key={idx} className="inline-block overflow-hidden pb-2 -mb-2">
              <motion.span
                className="inline-block will-change-transform"
                initial={reduced ? { opacity: 0 } : { y: "112%" }}
                animate={
                  loaderDone
                    ? { y: "0%", opacity: 1 }
                    : reduced
                      ? { opacity: 0 }
                      : { y: "112%" }
                }
                transition={{
                  duration: 0.68,
                  delay: 0.14 + idx * 0.038,
                  ease: EASE,
                }}
              >
                {ch}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Siluet ombak gelap + transisi lengkung ke section berikutnya */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full leading-none"
      >
        <svg
          viewBox="0 0 1440 190"
          preserveAspectRatio="none"
          className="block h-[96px] w-full sm:h-[145px] lg:h-[185px]"
        >
          {/* Lapis ombak hijau tua transparan di atas air danau */}
          <path
            d="M0,48 C320,84 620,18 960,26 C1180,31 1330,52 1440,42 L1440,190 L0,190 Z"
            fill="#07231A"
            fillOpacity="0.62"
          />
          {/* Lapis siluet hijau gelap pekat */}
          <path
            d="M0,78 C360,58 760,52 1140,68 C1280,74 1380,82 1440,86 L1440,190 L0,190 Z"
            fill="#031510"
          />
          {/* Lengkungan cembung halaman (#F3F7F4) */}
          <path
            d="M0,152 Q720,86 1440,152 L1440,191 L0,191 Z"
            fill="#F3F7F4"
          />
        </svg>
      </div>
    </section>
  );
}
