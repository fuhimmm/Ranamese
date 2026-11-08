"use client";

import { Check, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useApp } from "@/components/Providers";
import type { ProgramFilterValue } from "@/data/programs";
import { footerLinks, site } from "@/data/site";
import { PROGRAM_FILTER_EVENT } from "@/lib/motion";

export default function Footer() {
  const { scrollTo } = useApp();
  const [copied, setCopied] = useState<"email" | "phone" | null>(null);

  const handleCopy = async (key: "email" | "phone", val: string) => {
    try {
      await navigator.clipboard.writeText(val);
    } catch {}
    setCopied(key);
    window.setTimeout(() => {
      setCopied((curr) => (curr === key ? null : curr));
    }, 1800);
  };

  const handleProgramJump = (filter: ProgramFilterValue) => {
    window.dispatchEvent(
      new CustomEvent<ProgramFilterValue>(PROGRAM_FILTER_EVENT, {
        detail: filter,
      }),
    );
    const el = document.getElementById("program");
    if (el) scrollTo(el, { offset: -28 });
  };

  return (
    <footer className="bg-footer text-white">
      <div className="mx-auto max-w-[1220px] px-4 pt-16 pb-28 sm:px-6 sm:pt-20 md:pb-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_1fr_0.9fr_1.35fr] lg:gap-8">
          {/* Kolom 1: Logo & Wordmark */}
          <div className="flex items-start lg:items-center">
            <a
              href="#beranda"
              aria-label="Kembali ke beranda Ranamese"
              className="inline-flex items-center gap-3.5"
            >
              {/* Emblem belah ketupat konsentris sesuai desain */}
              <svg
                viewBox="0 0 36 36"
                className="h-9 w-9 shrink-0"
                aria-hidden
              >
                <rect
                  x="7"
                  y="7"
                  width="22"
                  height="22"
                  rx="1.5"
                  transform="rotate(45 18 18)"
                  fill="none"
                  stroke="#F5D04A"
                  strokeWidth="2.6"
                />
                <rect
                  x="12.5"
                  y="12.5"
                  width="11"
                  height="11"
                  rx="1"
                  transform="rotate(45 18 18)"
                  fill="#F5A524"
                />
                <circle cx="18" cy="18" r="2.2" fill="#04140F" />
              </svg>
              <span className="font-display text-[17px] font-extrabold tracking-[0.2em] text-white uppercase">
                RANAMESE
              </span>
            </a>
          </div>

          {/* Kolom 2: JELAJAHI */}
          <div>
            <h2 className="text-[12px] font-bold tracking-[0.16em] text-yellow uppercase">
              JELAJAHI
            </h2>
            <ul className="mt-5 space-y-3 text-[14px] text-white/85">
              {footerLinks.jelajahi.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() =>
                      handleProgramJump(item.filter as ProgramFilterValue)
                    }
                    className="cursor-pointer text-left text-white/85 transition-colors hover:text-yellow"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: DESA */}
          <div>
            <h2 className="text-[12px] font-bold tracking-[0.16em] text-yellow uppercase">
              DESA
            </h2>
            <ul className="mt-5 space-y-3 text-[14px] text-white/85">
              {footerLinks.desa.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-white/85 transition-colors hover:text-yellow"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 4: POSKO KKN */}
          <div>
            <h2 className="text-[12px] font-bold tracking-[0.16em] text-yellow uppercase">
              POSKO KKN
            </h2>
            <ul className="mt-5 space-y-3.5 text-[14px] text-white/85">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-yellow"
                  aria-hidden
                />
                <span className="leading-relaxed">
                  {site.address[0]}
                  <br />
                  {site.address[1]}
                </span>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleCopy("email", site.email)}
                  className="group inline-flex cursor-pointer items-center gap-3 text-left text-white/85 transition-colors hover:text-yellow"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-yellow"
                    aria-hidden
                  />
                  <span>{site.email}</span>
                  {copied === "email" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-yellow">
                      Tersalin <Check className="h-3 w-3" aria-hidden />
                    </span>
                  )}
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => handleCopy("phone", site.whatsapp)}
                  className="group inline-flex cursor-pointer items-center gap-3 text-left text-white/85 transition-colors hover:text-yellow"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-yellow"
                    aria-hidden
                  />
                  <span>{site.whatsapp}</span>
                  {copied === "phone" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-semibold text-yellow">
                      Tersalin <Check className="h-3 w-3" aria-hidden />
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Garis pemisah & hak cipta */}
        <div className="mt-14 border-t border-white/10 pt-7 text-[12.5px] text-white/65">
          {site.copyright}
        </div>
      </div>
    </footer>
  );
}
