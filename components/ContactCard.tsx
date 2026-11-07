"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";
import { EASE, VIEWPORT, revealUp } from "@/lib/motion";

export default function ContactCard() {
  const [copiedKey, setCopiedKey] = useState<"email" | "wa" | null>(null);

  const handleCopy = async (key: "email" | "wa", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopiedKey(key);
    window.setTimeout(() => {
      setCopiedKey((curr) => (curr === key ? null : curr));
    }, 2000);
  };

  return (
    <motion.div
      variants={revealUp}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      className="flex flex-col justify-center"
    >
      <SectionHeading
        align="left"
        eyebrow="KONTAK & PENGADUAN"
        sansText="Lapor ke"
        serifText="POSKO"
      />

      <p className="mt-5 max-w-[445px] text-[15px] leading-[1.68] text-muted sm:text-[16.5px]">
        Melihat retakan tanah baru, saluran air tersumbat, atau tumpukan sampah
        liar? Sampaikan ke posko KKN dan perangkat desa agar segera
        ditindaklanjuti.
      </p>

      {/* Tombol kontak (Salin Email & WhatsApp) */}
      <div className="mt-7 max-w-[445px] space-y-3.5">
        {/* Email */}
        <button
          type="button"
          onClick={() => handleCopy("email", site.email)}
          aria-label={`Salin alamat email ${site.email}`}
          className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-[18px] bg-[#093278] px-4 py-3.5 text-left text-white shadow-[0_14px_28px_-12px_rgba(7,47,115,0.55)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
        >
          <span className="flex min-w-0 items-center gap-3.5">
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/12 text-white"
            >
              <Mail className="h-5 w-5 stroke-[1.9]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] text-white/75">Email</span>
              <span className="block truncate text-[15px] font-bold tracking-[-0.01em] text-white">
                {site.email}
              </span>
            </span>
          </span>

          <AnimatePresence mode="wait" initial={false}>
            {copiedKey === "email" ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white"
              >
                <span>Tersalin</span>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="shrink-0 rounded-full bg-white/0 px-2.5 py-1 text-xs font-medium text-white/70 opacity-0 transition-opacity group-hover:opacity-100"
              >
                Salin
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={() => handleCopy("wa", site.whatsapp)}
          aria-label={`Salin nomor WhatsApp ${site.whatsapp}`}
          className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-[18px] bg-green px-4 py-3.5 text-left text-white shadow-[0_14px_28px_-12px_rgba(23,128,95,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
        >
          <span className="flex min-w-0 items-center gap-3.5">
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/14 text-white"
            >
              <MessageCircle className="h-5 w-5 stroke-[1.9]" />
            </span>
            <span className="min-w-0">
              <span className="block text-[12px] text-white/80">WhatsApp</span>
              <span className="block truncate text-[15px] font-bold tracking-[-0.01em] text-white">
                {site.whatsapp}
              </span>
            </span>
          </span>

          <AnimatePresence mode="wait" initial={false}>
            {copiedKey === "wa" ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.2, ease: EASE }}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white"
              >
                <span>Tersalin</span>
                <Check className="h-3.5 w-3.5 stroke-[2.5]" aria-hidden />
              </motion.span>
            ) : (
              <motion.span
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="shrink-0 rounded-full bg-white/0 px-2.5 py-1 text-xs font-medium text-white/75 opacity-0 transition-opacity group-hover:opacity-100"
              >
                Salin
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Dua kartu info kecil: Jam layanan & Kondisi darurat */}
      <div className="mt-6 grid max-w-[445px] grid-cols-1 gap-3.5 sm:grid-cols-2">
        <div className="rounded-[18px] bg-surface px-4 py-3.5 ring-1 ring-line/85">
          <p className="text-[12px] text-muted">Jam layanan posko</p>
          <p className="mt-1 text-[14.5px] font-bold text-ink">{site.hours}</p>
        </div>

        <div className="rounded-[18px] bg-surface px-4 py-3.5 ring-1 ring-line/85">
          <p className="text-[12px] text-muted">Kondisi darurat</p>
          <p className="mt-1 text-[14.5px] font-bold text-ink">
            {site.emergency}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
