"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import ProgramCard from "@/components/ProgramCard";
import ProgramFilter from "@/components/ProgramFilter";
import ProgramModal from "@/components/ProgramModal";
import SectionHeading from "@/components/SectionHeading";
import {
  INITIAL_VISIBLE,
  programs,
  type Program,
  type ProgramFilterValue,
} from "@/data/programs";
import { PROGRAM_FILTER_EVENT } from "@/lib/motion";

export default function ProgramGrid() {
  const [active, setActive] = useState<ProgramFilterValue>("Semua");
  const [showAll, setShowAll] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  // Dengarkan event filter dari tautan footer
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ProgramFilterValue>).detail;
      if (!detail) return;
      setActive(detail);
      setShowAll(true);
    };
    window.addEventListener(PROGRAM_FILTER_EVENT, handler);
    return () => window.removeEventListener(PROGRAM_FILTER_EVENT, handler);
  }, []);

  const visiblePrograms = useMemo(() => {
    if (active !== "Semua") {
      return programs.filter((p) => p.category === active);
    }
    return showAll ? programs : programs.slice(0, INITIAL_VISIBLE);
  }, [active, showAll]);

  const handleFilterChange = (category: ProgramFilterValue) => {
    setActive(category);
  };

  const handleSeeAll = () => {
    if (active !== "Semua") {
      setActive("Semua");
      setShowAll(true);
      return;
    }
    setShowAll((prev) => !prev);
  };

  return (
    <section
      id="program"
      aria-labelledby="heading-program"
      className="relative mx-auto max-w-[1220px] px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="relative mx-auto max-w-[920px]" id="heading-program">
        <SectionHeading
          sansText="Program"
          serifText="DESA"
          subtitle="Sembilan program KKN di kedua desa — dari peta bahaya yang dibuat warga hingga wisata kopi untuk pengunjung."
        />
      </div>

      {/* Bar filter kategori + tombol Lihat Semua */}
      <ProgramFilter
        active={active}
        onChange={handleFilterChange}
        onSeeAll={handleSeeAll}
      />

      {/* Grid 3 → 2 → 1 */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-1 gap-x-7 gap-y-9 sm:mt-12 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visiblePrograms.map((program, idx) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={idx}
              onSelect={setSelectedProgram}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Pop-up Berita Program (berukuran besar & dapat di-scroll) */}
      <ProgramModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onSelectProgram={setSelectedProgram}
      />
    </section>
  );
}
