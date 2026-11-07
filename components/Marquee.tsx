"use client";

import { useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface MarqueeProps {
  items: ReactNode[];
  /** Durasi satu putaran penuh (detik) */
  speedSeconds?: number;
  className?: string;
}

/**
 * Komponen ticker/marquee horizontal tanpa henti, berhenti saat hover,
 * dan menghormati prefers-reduced-motion.
 */
export default function Marquee({
  items,
  speedSeconds = 28,
  className = "",
}: MarqueeProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className={`group relative flex overflow-hidden select-none ${className}`}
      aria-label="Informasi berjalan"
    >
      {[0, 1].map((dup) => (
        <div
          key={dup}
          aria-hidden={dup === 1}
          style={
            reduced
              ? undefined
              : { animation: `rm-marquee ${speedSeconds}s linear infinite` }
          }
          className="flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
        >
          {items.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-8">
              {item}
            </span>
          ))}
        </div>
      ))}
      <style jsx>{`
        @keyframes rm-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
