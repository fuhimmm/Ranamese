"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import type { Program } from "@/data/programs";
import { EASE } from "@/lib/motion";

interface ProgramCardProps {
  program: Program;
  index: number;
  onSelect: (program: Program) => void;
}

export default function ProgramCard({
  program,
  index,
  onSelect,
}: ProgramCardProps) {
  const reduced = useReducedMotion();

  return (
    <motion.article
      layout
      data-cursor="card"
      role="button"
      tabIndex={0}
      aria-label={`Baca berita lengkap: ${program.title}`}
      onClick={() => onSelect(program)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(program);
        }
      }}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: 0.58,
        delay: (index % 3) * 0.08,
        ease: EASE,
        layout: { duration: 0.45, ease: EASE },
      }}
      whileHover={reduced ? undefined : { y: -7 }}
      className="group relative flex h-full cursor-pointer flex-col text-left"
    >
      {/* Pelat belakang miring biru muda sesuai desain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 translate-y-2 -translate-x-1 -rotate-[1.65deg] rounded-[28px] bg-[#b3c3d8]/85 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-3 group-hover:-rotate-[2.2deg]"
      />

      {/* Permukaan kartu putih */}
      <div className="relative flex h-full flex-col rounded-[26px] bg-surface p-4 shadow-card ring-1 ring-ink/5 transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:shadow-card-hover sm:p-[18px]">
        {/* Foto program */}
        <div className="relative aspect-[706/560] w-full overflow-hidden rounded-[18px] bg-bg">
          <Image
            src={program.image}
            alt={program.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 380px"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />

          {/* Label kategori di kiri atas */}
          <span className="absolute top-3.5 left-3.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[12px] font-bold text-ink shadow-[0_4px_12px_rgba(15,42,33,0.14)] backdrop-blur-xs">
            {program.category}
          </span>
        </div>

        {/* Metadata lokasi & waktu */}
        <div className="mt-4 flex items-center gap-1.5 text-[12.5px] font-medium text-muted sm:text-[13px]">
          <MapPin className="h-3.5 w-3.5 shrink-0 stroke-[2] text-muted" aria-hidden />
          <span>{program.location}</span>
          <span aria-hidden>·</span>
          <span>{program.date}</span>
        </div>

        {/* Judul 2 baris sesuai desain */}
        <h3 className="mt-2 font-display text-[18.5px] leading-[1.26] font-extrabold tracking-[-0.015em] text-ink transition-colors group-hover:text-navy sm:text-[20px]">
          {program.titleLines[0]}
          <br />
          {program.titleLines[1]}
        </h3>

        {/* Deskripsi */}
        <p className="mt-2.5 text-[13.5px] leading-[1.62] text-muted sm:text-[14px]">
          {program.description}
        </p>
      </div>
    </motion.article>
  );
}
