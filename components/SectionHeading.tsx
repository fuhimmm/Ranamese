"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, VIEWPORT } from "@/lib/motion";

interface SectionHeadingProps {
  eyebrow?: string;
  sansText: string;
  serifText: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  sansText,
  serifText,
  subtitle,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const reduced = useReducedMotion();
  const isCenter = align === "center";

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className={`${isCenter ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
          }}
          className={`mb-2.5 inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-green uppercase sm:text-[12px] ${
            isCenter ? "justify-center" : "justify-start"
          }`}
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rotate-45 rounded-[1px] bg-orange"
          />
          <span>{eyebrow}</span>
        </motion.div>
      )}

      <h2
        className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 leading-[1.06] ${
          isCenter ? "justify-center" : "justify-start"
        }`}
      >
        {/* Kata Tebal (Sans) — masuk dari bawah */}
        <span className="inline-block overflow-hidden py-1 -my-1">
          <motion.span
            variants={{
              hidden: reduced ? { opacity: 0 } : { y: "105%", opacity: 0 },
              show: {
                y: "0%",
                opacity: 1,
                transition: { duration: 0.62, ease: EASE },
              },
            }}
            className="inline-block font-display text-[36px] font-extrabold tracking-[-0.03em] text-navy sm:text-[52px] lg:text-[62px]"
          >
            {sansText}
          </motion.span>
        </span>

        {/* KATA SERIF — fade-in dengan sedikit blur, bergantian */}
        <motion.span
          variants={{
            hidden: reduced
              ? { opacity: 0 }
              : { opacity: 0, y: 10, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.7, delay: 0.16, ease: EASE },
            },
          }}
          className="inline-block font-serif text-[38px] font-normal tracking-[0.02em] text-blue uppercase sm:text-[56px] lg:text-[66px]"
        >
          {serifText}
        </motion.span>
      </h2>

      {subtitle && (
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.24, ease: EASE },
            },
          }}
          className={`mt-3.5 text-[15px] leading-[1.65] text-muted sm:mt-4 sm:text-[17px] ${
            isCenter ? "mx-auto max-w-[560px]" : "max-w-[460px]"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
