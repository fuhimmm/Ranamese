"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  MapPin,
  Share2,
  Sparkles,
  UserCheck,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/Providers";
import { programs, type Program } from "@/data/programs";
import { EASE } from "@/lib/motion";

interface ProgramModalProps {
  program: Program | null;
  onClose: () => void;
  onSelectProgram: (program: Program) => void;
}

export default function ProgramModal({
  program,
  onClose,
  onSelectProgram,
}: ProgramModalProps) {
  const { lenis } = useApp();
  const reduced = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [copied, setCopied] = useState(false);

  // Kunci scroll halaman utama selama pop-up berita terbuka
  useEffect(() => {
    if (!program) return;
    lenis?.stop();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      lenis?.start();
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [program, lenis, onClose]);

  // Reset posisi scroll modal saat berpindah berita
  useEffect(() => {
    if (!program) return;
    setScrollPct(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [program]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    setScrollPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
  };

  const handleShare = async () => {
    if (!program) return;
    const url = `${window.location.origin}/#program-${program.id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const currentIndex = program
    ? programs.findIndex((p) => p.id === program.id)
    : -1;
  const prevProgram =
    currentIndex >= 0
      ? programs[(currentIndex - 1 + programs.length) % programs.length]
      : null;
  const nextProgram =
    currentIndex >= 0
      ? programs[(currentIndex + 1) % programs.length]
      : null;

  return (
    <AnimatePresence>
      {program && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-program-title"
          className="fixed inset-0 z-[85] flex items-center justify-center p-3 sm:p-5 md:p-7"
        >
          {/* Backdrop gelap dengan efek blur */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={onClose}
            className="absolute inset-0 bg-[#04140f]/68 backdrop-blur-md"
          />

          {/* Kontainer Pop-up Berita berukuran besar & dapat di-scroll */}
          <motion.div
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: 28, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: 20, scale: 0.96 }
            }
            transition={{ duration: 0.42, ease: EASE }}
            className="relative z-10 flex max-h-[90vh] w-full max-w-[900px] flex-col overflow-hidden rounded-[28px] bg-surface shadow-[0_32px_80px_-16px_rgba(4,20,15,0.55)] ring-1 ring-white/25"
          >
            {/* Indikator progres baca di bagian paling atas modal */}
            <div aria-hidden className="h-1 w-full bg-line/60">
              <div
                style={{ width: `${scrollPct}%` }}
                className="h-full bg-blue transition-[width] duration-100"
              />
            </div>

            {/* Tombol Tutup (X) melayang di pojok kanan atas */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup berita program"
              className="absolute top-4 right-4 z-30 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/92 text-ink shadow-[0_8px_24px_rgba(4,20,15,0.28)] ring-1 ring-ink/10 backdrop-blur-md transition-transform duration-200 hover:scale-105 hover:bg-white sm:top-5 sm:right-5"
            >
              <X className="h-5 w-5 stroke-[2.2]" aria-hidden />
            </button>

            {/* Area isi berita yang dapat di-scroll penuh */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              data-lenis-prevent
              className="thin-scroll flex-1 overflow-y-auto"
            >
              {/* Foto Hero Berita */}
              <div className="relative h-[240px] w-full overflow-hidden bg-bg sm:h-[340px] md:h-[400px]">
                <Image
                  src={program.image}
                  alt={program.imageAlt}
                  fill
                  sizes="(max-width: 920px) 100vw, 900px"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,15,0.18)_0%,rgba(4,20,15,0.04)_45%,rgba(4,20,15,0.72)_100%)]"
                />

                {/* Badge kategori & metadata di atas gambar */}
                <div className="absolute right-5 bottom-5 left-5 flex flex-wrap items-end justify-between gap-3 sm:right-8 sm:bottom-6 sm:left-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/95 px-4 py-1.5 text-xs font-bold text-ink shadow-sm">
                      {program.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#04140f]/70 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-xs">
                      <MapPin className="h-3.5 w-3.5 text-orange" aria-hidden />
                      <span>{program.location}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#04140f]/70 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-xs">
                      <Calendar className="h-3.5 w-3.5 text-yellow" aria-hidden />
                      <span>{program.date}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Konten Artikel Berita */}
              <div className="px-5 pt-6 pb-8 sm:px-9 sm:pt-8 sm:pb-10 md:px-12">
                {/* Bar Penulis, Waktu Baca, & Bagikan */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 text-xs text-muted sm:text-[13px]">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                      <UserCheck className="h-4 w-4 text-green" aria-hidden />
                      <span>{program.article.author}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-blue" aria-hidden />
                      <span>{program.article.readTime}</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-line bg-bg px-3.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-blue hover:bg-blue-soft/40"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-green" aria-hidden />
                        <span>Tautan Tersalin ✓</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5 text-blue" aria-hidden />
                        <span>Bagikan Berita</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Judul Utama Berita */}
                <h2
                  id="modal-program-title"
                  className="mt-5 font-display text-[24px] leading-[1.2] font-extrabold tracking-[-0.02em] text-navy sm:text-[32px] md:text-[36px]"
                >
                  {program.title}
                </h2>

                {/* Paragraf Lead / Ringkasan Utama */}
                <p className="mt-4 text-[16px] leading-[1.7] font-medium text-ink sm:text-[18px]">
                  {program.article.lead}
                </p>

                {/* Grid 3 Sorotan Capaian Program */}
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  {program.article.highlights.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-[18px] border border-[#dce6e0] bg-bg px-4 py-3.5"
                    >
                      <p className="text-[11.5px] font-semibold tracking-wide text-muted uppercase">
                        {item.label}
                      </p>
                      <p className="mt-1 font-display text-[19px] font-extrabold text-navy sm:text-[21px]">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Paragraf Isi Berita (Bagian 1) */}
                <div className="mt-7 space-y-4 text-[15px] leading-[1.8] text-muted sm:text-[16px]">
                  {program.article.paragraphs.slice(0, 2).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Kutipan Warga / Tokoh Desa */}
                <figure className="my-7 rounded-[22px] border-l-4 border-orange bg-[#f4f8f5] p-5 sm:p-6">
                  <blockquote className="font-serif text-[19px] leading-[1.55] text-ink italic sm:text-[22px]">
                    “{program.article.quote.text}”
                  </blockquote>
                  <figcaption className="mt-3 text-xs font-semibold text-muted sm:text-[13.5px]">
                    <span className="font-bold text-ink">
                      {program.article.quote.speaker}
                    </span>{" "}
                    · {program.article.quote.role}
                  </figcaption>
                </figure>

                {/* Paragraf Isi Berita (Bagian 2) */}
                <div className="space-y-4 text-[15px] leading-[1.8] text-muted sm:text-[16px]">
                  {program.article.paragraphs.slice(2).map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Kotak Tahapan Kegiatan / Kurikulum */}
                <div className="mt-8 rounded-[22px] border border-line bg-bg p-5 sm:p-6">
                  <h3 className="inline-flex items-center gap-2 font-display text-[16px] font-extrabold text-ink sm:text-[18px]">
                    <Sparkles className="h-4 w-4 text-orange" aria-hidden />
                    <span>{program.article.stepsTitle}</span>
                  </h3>
                  <ol className="mt-4 space-y-2.5">
                    {program.article.steps.map((step, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-[14px] leading-relaxed text-ink sm:text-[15px]"
                      >
                        <span className="mt-0.5 inline-grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blue text-xs font-bold text-white">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Navigasi Berita Sebelumnya / Selanjutnya */}
                <div className="mt-9 grid grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-2">
                  {prevProgram && (
                    <button
                      type="button"
                      onClick={() => onSelectProgram(prevProgram)}
                      className="group flex cursor-pointer items-center gap-3 rounded-[18px] border border-line bg-white p-3.5 text-left transition-colors hover:border-blue hover:bg-bg"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bg text-ink transition-transform group-hover:-translate-x-0.5 group-hover:bg-blue-soft">
                        <ArrowLeft className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold text-muted uppercase">
                          Berita Sebelumnya
                        </span>
                        <span className="mt-0.5 block truncate text-[13.5px] font-bold text-ink">
                          {prevProgram.title}
                        </span>
                      </span>
                    </button>
                  )}

                  {nextProgram && (
                    <button
                      type="button"
                      onClick={() => onSelectProgram(nextProgram)}
                      className="group flex cursor-pointer items-center justify-end gap-3 rounded-[18px] border border-line bg-white p-3.5 text-right transition-colors hover:border-blue hover:bg-bg"
                    >
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold text-muted uppercase">
                          Berita Selanjutnya
                        </span>
                        <span className="mt-0.5 block truncate text-[13.5px] font-bold text-ink">
                          {nextProgram.title}
                        </span>
                      </span>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bg text-ink transition-transform group-hover:translate-x-0.5 group-hover:bg-blue-soft">
                        <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
