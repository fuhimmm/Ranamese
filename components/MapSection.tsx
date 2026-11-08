"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { gisMaps, type MapId } from "@/data/map";
import { EASE, VIEWPORT, revealUp } from "@/lib/motion";

export default function MapSection() {
  const [activeId, setActiveId] = useState<MapId>("irigasi");
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const dragStartRef = useRef<{ x: number; y: number; panX: number; panY: number }>({
    x: 0,
    y: 0,
    panX: 0,
    panY: 0,
  });

  const activeMap = gisMaps.find((m) => m.id === activeId) ?? gisMaps[0];

  const handleSelectMap = (id: MapId) => {
    setActiveId(id);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom((z) => Math.min(3, Number((z + 0.4).toFixed(2))));
  };

  const handleZoomOut = () => {
    setZoom((z) => {
      const next = Math.max(1, Number((z - 0.4).toFixed(2)));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || zoom <= 1) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const limit = (zoom - 1) * 260;
    setPan({
      x: Math.max(-limit, Math.min(limit, dragStartRef.current.panX + dx)),
      y: Math.max(-limit, Math.min(limit, dragStartRef.current.panY + dy)),
    });
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  // Tutup lightbox dengan tombol Escape
  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen]);

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
          serifText="RANAMESE"
        />
      </div>

      <motion.div
        variants={revealUp}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-8 rounded-[28px] bg-surface p-4 shadow-panel ring-1 ring-ink/5 sm:mt-10 sm:p-6"
      >
        {/* Baris atas: Tab pemilih 3 peta + Kontrol perbesaran */}
        <div className="flex flex-col justify-between gap-3 border-b border-line/80 pb-4 md:flex-row md:items-center">
          <div
            role="tablist"
            aria-label="Pilih peta kawasan Ranamese"
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
                  onClick={() => handleSelectMap(m.id)}
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

          {/* Kontrol Zoom & Layar Penuh (tanpa ikon AI berlebihan) */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            <div className="inline-flex items-center rounded-full border border-line bg-bg p-0.5">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 1}
                aria-label="Perkecil tampilan peta"
                className="h-7 w-7 cursor-pointer rounded-full text-sm font-bold text-ink transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                −
              </button>
              <button
                type="button"
                onClick={handleResetZoom}
                className="cursor-pointer px-2.5 text-[11.5px] font-bold tabular-nums text-ink hover:text-blue"
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                aria-label="Perbesar tampilan peta"
                className="h-7 w-7 cursor-pointer rounded-full text-sm font-bold text-ink transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              className="cursor-pointer rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-blue hover:text-blue"
            >
              Layar Penuh ↗
            </button>
          </div>
        </div>

        {/* Grid Utama: Kanvas Peta PNG/JPEG (kiri) + Informasi Kartografi & Legenda (kanan) */}
        <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_360px]">
          {/* Kolom Kiri: Kanvas Peta + Strip Galeri 3 Peta */}
          <div className="flex flex-col">
            <div
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              onDoubleClick={() => (zoom > 1 ? handleResetZoom() : handleZoomIn())}
              className={`relative flex h-[430px] w-full items-center justify-center overflow-hidden rounded-[22px] border border-[#dfe8e2] bg-[#f8faf8] p-3 select-none sm:h-[560px] sm:p-5 lg:h-[620px] ${
                zoom > 1
                  ? isDragging
                    ? "cursor-grabbing"
                    : "cursor-grab"
                  : "cursor-zoom-in"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMap.id}
                  initial={{ opacity: 0, scale: 0.985 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: 0.26, ease: EASE }}
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
                    transition: isDragging ? "none" : "transform 0.2s ease-out",
                  }}
                  className="relative flex h-full w-full items-center justify-center"
                >
                  <Image
                    src={activeMap.imageSrc}
                    alt={activeMap.fullTitle}
                    width={activeMap.width}
                    height={activeMap.height}
                    priority
                    draggable={false}
                    sizes="(max-width: 1024px) 100vw, 820px"
                    className="max-h-full max-w-full rounded-[10px] bg-white object-contain shadow-[0_8px_28px_rgba(15,42,33,0.1)]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Petunjuk singkat di sudut bawah kanvas */}
              <div className="pointer-events-none absolute right-3 bottom-3 left-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium text-muted">
                <span className="rounded-full bg-white/90 px-3 py-1 shadow-xs ring-1 ring-line backdrop-blur-xs">
                  {activeMap.village} · Skala {activeMap.scale}
                </span>
                <span className="hidden rounded-full bg-white/90 px-3 py-1 shadow-xs ring-1 ring-line backdrop-blur-xs sm:inline-block">
                  {zoom > 1
                    ? "Geser untuk melihat detail · Klik 2× untuk reset"
                    : "Klik 2× untuk memperbesar detail peta"}
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
                    onClick={() => handleSelectMap(m.id)}
                    className={`group flex cursor-pointer items-center gap-2.5 rounded-[16px] border p-2 text-left transition-all duration-200 sm:p-2.5 ${
                      isSelected
                        ? "border-blue bg-blue-soft/65 shadow-xs"
                        : "border-line bg-bg hover:border-blue-line/60 hover:bg-white"
                    }`}
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[10px] border border-line bg-white sm:h-14 sm:w-14">
                      <Image
                        src={m.imageSrc}
                        alt={m.tabLabel}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-[11.5px] font-bold sm:text-[13px] ${
                          isSelected ? "text-navy" : "text-ink"
                        }`}
                      >
                        {m.tabLabel}
                      </p>
                      <p className="mt-0.5 truncate text-[10.5px] text-muted sm:text-[11.5px]">
                        {m.village.replace(", Kec. Rana Mese", "")}
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
            className="thin-scroll flex max-h-[620px] flex-col justify-between overflow-y-auto rounded-[22px] border border-[#e2eae5] bg-white p-4 sm:p-5 lg:max-h-[710px]"
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

                {/* Legenda Peta (Swatch warna bersih sesuai peta asli) */}
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
                                    borderColor: item.border ?? "rgba(15,42,33,0.18)",
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

                {/* Tombol aksi buka resolusi penuh */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(true)}
                    className="flex-1 cursor-pointer rounded-full bg-navy px-4 py-2.5 text-center text-xs font-bold text-white transition-colors hover:bg-blue"
                  >
                    Lihat Peta Ukuran Penuh
                  </button>
                  <a
                    href={activeMap.imageSrc}
                    download
                    className=" rounded-full border border-line bg-bg px-4 py-2.5 text-xs font-bold text-ink transition-colors hover:border-blue hover:bg-white"
                  >
                    Unduh
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Modal untuk melihat peta resolusi penuh */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.24, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[92vh] w-full max-w-[1160px] flex-col overflow-hidden rounded-[24px] bg-white shadow-2xl"
            >
              {/* Header Lightbox */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3 sm:px-6">
                <div>
                  <p className="text-xs font-bold text-blue uppercase">
                    {activeMap.tabLabel}
                  </p>
                  <h4 className="font-display text-sm font-extrabold text-ink sm:text-base">
                    {activeMap.fullTitle}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={activeMap.imageSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-xs font-semibold text-ink hover:border-blue"
                  >
                    Buka Gambar Asli ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setLightboxOpen(false)}
                    className="cursor-pointer rounded-full bg-ink px-3.5 py-1.5 text-xs font-bold text-white hover:bg-navy"
                  >
                    Tutup ✕
                  </button>
                </div>
              </div>

              {/* Isi Gambar Peta yang Bisa Discroll */}
              <div
                data-lenis-prevent
                className="flex-1 overflow-auto bg-[#f3f6f4] p-3 sm:p-6"
              >
                <Image
                  src={activeMap.imageSrc}
                  alt={activeMap.fullTitle}
                  width={activeMap.width}
                  height={activeMap.height}
                  className="mx-auto h-auto max-w-full rounded-lg bg-white shadow-md"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
