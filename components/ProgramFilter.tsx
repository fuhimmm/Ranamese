"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import {
  PROGRAM_CATEGORIES,
  type ProgramFilterValue,
} from "@/data/programs";
import { EASE } from "@/lib/motion";

interface ProgramFilterProps {
  active: ProgramFilterValue;
  onChange: (category: ProgramFilterValue) => void;
  onSeeAll: () => void;
}

export default function ProgramFilter({
  active,
  onChange,
  onSeeAll,
}: ProgramFilterProps) {
  const reduced = useReducedMotion();
  const ctaRef = useRef<HTMLButtonElement | null>(null);
  const [mag, setMag] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduced || !ctaRef.current) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
    setMag({ x, y });
  };

  const handleMouseLeave = () => {
    setMag({ x: 0, y: 0 });
  };

  return (
    <div
      role="tablist"
      aria-label="Filter kategori program desa"
      className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10 sm:gap-3"
    >
      {PROGRAM_CATEGORIES.map((category) => {
        const isActive = active === category;
        return (
          <button
            key={category}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={`relative cursor-pointer rounded-full px-4 py-2.5 text-xs font-semibold transition-colors duration-200 sm:px-5 sm:text-[14px] ${
              isActive
                ? "text-ink"
                : "text-muted hover:text-ink"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="program-filter-pill"
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 360, damping: 30 }
                }
                className="absolute inset-0 -z-10 rounded-full bg-blue-soft"
              />
            )}
            <span>{category}</span>
          </button>
        );
      })}

      {/* CTA Oranye: Lihat Semua ↗ dengan efek magnetic ringan */}
      <motion.button
        ref={ctaRef}
        type="button"
        onClick={onSeeAll}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: mag.x, y: mag.y }}
        transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.5 }}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-orange px-5 py-2.5 text-xs font-bold text-ink shadow-glow-orange transition-shadow duration-300 hover:shadow-[0_14px_28px_-6px_rgba(245,165,36,0.75)] sm:px-6 sm:text-[14px]"
      >
        <span>Lihat Semua</span>
        <ArrowUpRight
          aria-hidden
          style={{
            transitionTimingFunction: `cubic-bezier(${EASE.join(",")})`,
          }}
          className="h-4 w-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </motion.button>
    </div>
  );
}
