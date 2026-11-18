"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { gisMaps, type MapId } from "@/data/map";
import { EASE, VIEWPORT, revealUp } from "@/lib/motion";

export default function MapSection() {
  const [activeId, setActiveId] = useState<MapId>("irigasi");

  const activeMap = gisMaps.find((m) => m.id === activeId) ?? gisMaps[0];

  return (
    <section
      id="tentang"
      aria-labelledby="heading-peta"
      className="relative mx-auto max-w-[1220px] px-4 pt-6 pb-16 sm:px-6 sm:pt-10 sm:pb-24"
    >
      <div id="heading-peta">
        <SectionHeading
          eyebrow="TENTANG KAWASAN"
          sansText="Peta"
          serifText="SAMBELIA"
        />
      </div>

      <motion.div
        variants={revealUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-8 rounded-[28px] bg-surface p-4 shadow-panel ring-1 ring-ink/5 sm:mt-10 sm:p-6"
      >
        {/* Baris atas: Tab pemilih 3 peta */}
        <div className="flex flex-col justify-between gap-3 border-b border-line/80 pb-4 md:flex-row md:items-center">
          <div
            role="tablist"
            aria-label="Pilih peta kawasan Sambelia"
            className="flex flex-wrap items-center gap-2"
          >
            {gisMaps.map((m) => {
              const isActive = m.id === activeId;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(m.id)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 sm:px-5 sm:py-2.5 sm:text-[13.5px] ${
                    isActive
                      ? "bg-navy text-white shadow-[0_6px_18px_rgba(7,47,115,0.22)]"
                      : "border border-line bg-bg text-muted hover:border-blue-line/60 hover:text-ink"
                  }`}
                >
                  {m.tabLabel}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-medium text-muted">
            Kecamatan Sambelia · Kabupaten Lombok Timur, NTB
          </span>
        </div>

        {/* Grid Utama: Kanvas Peta (kiri) + Informasi Kartografi & Legenda (kanan) */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
          {/* Kolom Kiri: Kanvas Peta (Kosong / Placeholder bila imageSrc null) + Strip 3 Peta */}
          <div className="flex flex-col">
            <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-[22px] border border-dashed border-[#c7d6ce] bg-[#f6faf7] p-6 select-none sm:h-[500px] lg:h-[560px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMap.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: EASE }}
                  className="flex h-full w-full flex-col items-center justify-center text-center"
                >
                  {activeMap.imageSrc ? (
                    <Image
                      src={activeMap.imageSrc}
                      alt={activeMap.fullTitle}
                      width={activeMap.width}
                      height={activeMap.height}
                      priority
                      sizes="(max-width: 1024px) 100vw, 820px"
                      className="max-h-full max-w-full rounded-[10px] bg-white object-contain shadow-[0_8px_28px_rgba(15,42,33,0.1)]"
                    />
                  ) : (
                    <div className="mx-auto max-w-[420px] px-4">
                      <span className="inline-block rounded-full border border-line bg-white px-3.5 py-1 text-[11px] font-bold tracking-[0.14em] text-navy uppercase">
                        {activeMap.tabLabel}
                      </span>
                      <p className="mt-3 font-display text-[18px] font-extrabold text-ink sm:text-[20px]">
                        {activeMap.shortTitle}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                        Gambar peta untuk kawasan{" "}
                        <strong className="font-semibold text-ink">
                          Kecamatan Sambelia
                        </strong>{" "}
                        belum dimasukkan dan akan ditampilkan pada area ini.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Keterangan skala di sudut bawah kanvas */}
              <div className="pointer-events-none absolute right-3 bottom-3 left-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-muted">
                <span className="rounded-full bg-white/90 px-3 py-1 shadow-xs ring-1 ring-line backdrop-blur-xs">
                  {activeMap.village} · Skala {activeMap.scale}
                </span>
              </div>
            </div>

            {/* Pemilih cepat 3 kartu peta di bawah kanvas */}
            <div className="mt-3.5 grid grid-cols-3 gap-2.5 sm:gap-3">
              {gisMaps.map((m) => {
                const isSelected = m.id === activeId;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveId(m.id)}
                    className={`group flex cursor-pointer items-center gap-2.5 rounded-[16px] border p-2.5 text-left transition-all duration-200 sm:p-3 ${
                      isSelected
                        ? "border-blue bg-blue-soft/65 shadow-xs"
                        : "border-line bg-bg hover:border-blue-line/60 hover:bg-white"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-[11.5px] font-bold sm:text-[13px] ${
                          isSelected ? "text-navy" : "text-ink"
                        }`}
                      >
                        {m.tabLabel}
                      </p>
                      <p className="mt-0.5 truncate text-[10.5px] text-muted sm:text-[11.5px]">
                        Kec. Sambelia
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Kolom Kanan: Panel Detail Kartografi & Legenda */}
          <div
            data-lenis-prevent
            aria-label="Informasi detail peta dan legenda"
            className="thin-scroll flex max-h-[600px] flex-col justify-between overflow-y-auto rounded-[22px] border border-[#e2eae5] bg-white p-4 sm:p-5 lg:max-h-[640px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`meta-${activeMap.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: EASE }}
                className="space-y-4"
              >
                {/* Judul & Desa */}
                <div className="border-b border-line/80 pb-3.5">
                  <span className="inline-block rounded-full bg-blue-soft px-3 py-1 text-[10.5px] font-bold tracking-[0.14em] text-navy uppercase">
                    {activeMap.tabLabel}
                  </span>
                  <h3 className="mt-2 font-display text-[17px] leading-snug font-extrabold text-ink sm:text-[18px]">
                    {activeMap.fullTitle}
                  </h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted">
                    {activeMap.summary}
                  </p>
                </div>

                {/* Spesifikasi Teknis Peta */}
                <div className="rounded-2xl bg-bg p-3.5">
                  <p className="text-[10.5px] font-bold tracking-[0.14em] text-muted uppercase">
                    Informasi Kartografi
                  </p>
                  <dl className="mt-2.5 space-y-2 text-[12.5px]">
                    <div className="flex items-start justify-between gap-3 border-b border-line/60 pb-1.5">
                      <dt className="text-muted">Wilayah Kajian</dt>
                      <dd className="text-right font-semibold text-ink">
                        {activeMap.village}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-b border-line/60 pb-1.5">
                      <dt className="text-muted">Skala Peta</dt>
                      <dd className="font-semibold text-ink">{activeMap.scale}</dd>
                    </div>
                    <div className="flex items-center justify-between gap-3 border-b border-line/60 pb-1.5">
                      <dt className="text-muted">Datum & Grid</dt>
                      <dd className="text-right font-semibold text-ink">
                        {activeMap.datum} · {activeMap.grid}
                      </dd>
                    </div>
                    <div className="flex items-start justify-between gap-3 pt-0.5">
                      <dt className="text-muted">Penyusun</dt>
                      <dd className="text-right font-semibold text-ink">
                        {activeMap.author}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Legenda Peta */}
                <div className="rounded-2xl border border-line/85 bg-white p-3.5">
                  <p className="text-[10.5px] font-bold tracking-[0.14em] text-muted uppercase">
                    Keterangan Legenda Peta
                  </p>
                  <div className="mt-3 space-y-3.5">
                    {activeMap.legendGroups.map((group) => (
                      <div key={group.title}>
                        <p className="text-[11.5px] font-bold text-ink">
                          {group.title}
                        </p>
                        <div className="mt-1.5 grid grid-cols-2 gap-x-2.5 gap-y-1.5">
                          {group.items.map((item) => (
                            <div
                              key={item.label}
                              className="flex items-center gap-2 text-[12px] text-ink/90"
                            >
                              {item.line ? (
                                <span
                                  aria-hidden
                                  style={{ backgroundColor: item.color }}
                                  className="inline-block h-[3.5px] w-4 shrink-0 rounded-full"
                                />
                              ) : (
                                <span
                                  aria-hidden
                                  style={{
                                    backgroundColor: item.color,
                                    borderColor:
                                      item.border ?? "rgba(15,42,33,0.18)",
                                  }}
                                  className="inline-block h-3.5 w-4 shrink-0 rounded-[3px] border"
                                />
                              )}
                              <span className="truncate">{item.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sumber Data */}
                <div className="rounded-2xl bg-bg p-3.5">
                  <p className="text-[10.5px] font-bold tracking-[0.14em] text-muted uppercase">
                    Sumber Data Spasial
                  </p>
                  <ul className="mt-2 space-y-1 text-[12px] text-ink/90">
                    {activeMap.sources.map((src, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-semibold text-muted">{i + 1}.</span>
                        <span>{src}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
