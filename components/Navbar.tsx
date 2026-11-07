"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { Hash, House, Info, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/Providers";
import { navItems, type NavId } from "@/data/site";

const SECTION_ORDER: NavId[] = ["beranda", "tentang", "program", "kontak"];

// Geometri bar SVG (4 item)
const PAD_X = 36;
const SLOT_W = 96;
const BAR_W = PAD_X * 2 + SLOT_W * 4; // 456
const BAR_H = 68;
const BAR_R = 34;
const ORB_SIZE = 54;

function slotCenterX(index: number) {
  return PAD_X + index * SLOT_W + SLOT_W / 2;
}

/**
 * Membangun path SVG pill dengan lekukan (notch) cekung halus di posisi `cx`.
 * Lekukan memiliki jari-jari konsentris terhadap lingkaran melayang di atasnya.
 */
function buildNotchedPillPath(cx: number): string {
  const nHalf = 50;
  const c1 = 34;
  const c2 = 31;
  const depth = 38;

  const leftStart = Math.max(BAR_R, cx - nHalf);
  const rightEnd = Math.min(BAR_W - BAR_R, cx + nHalf);

  return [
    `M ${BAR_R} 0`,
    `L ${leftStart.toFixed(2)} 0`,
    `C ${(cx - c1).toFixed(2)} 0, ${(cx - c2).toFixed(2)} ${depth}, ${cx.toFixed(2)} ${depth}`,
    `C ${(cx + c2).toFixed(2)} ${depth}, ${(cx + c1).toFixed(2)} 0, ${rightEnd.toFixed(2)} 0`,
    `L ${BAR_W - BAR_R} 0`,
    `A ${BAR_R} ${BAR_R} 0 0 1 ${BAR_W} ${BAR_R}`,
    `A ${BAR_R} ${BAR_R} 0 0 1 ${BAR_W - BAR_R} ${BAR_H}`,
    `L ${BAR_R} ${BAR_H}`,
    `A ${BAR_R} ${BAR_R} 0 0 1 0 ${BAR_R}`,
    `A ${BAR_R} ${BAR_R} 0 0 1 ${BAR_R} 0`,
    "Z",
  ].join(" ");
}

function NavIcon({ id, className = "" }: { id: NavId; className?: string }) {
  switch (id) {
    case "beranda":
      return <House className={className} aria-hidden />;
    case "program":
      return <Hash className={className} aria-hidden />;
    case "tentang":
      return <Info className={className} aria-hidden />;
    case "kontak":
      return <MessageCircle className={className} aria-hidden />;
  }
}

export default function Navbar() {
  const { scrollTo } = useApp();
  const reduced = useReducedMotion();
  const [active, setActive] = useState<NavId>("beranda");
  const [scrolled, setScrolled] = useState(false);
  const manualUntilRef = useRef(0);

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === active),
  );
  const targetCx = slotCenterX(activeIndex);

  // Spring untuk posisi horizontal notch & lingkaran melayang
  const cxSpring = useSpring(targetCx, {
    stiffness: 340,
    damping: 30,
    mass: 0.75,
  });

  const [cx, setCx] = useState(targetCx);

  useEffect(() => {
    if (reduced) {
      cxSpring.jump(targetCx);
      setCx(targetCx);
    } else {
      cxSpring.set(targetCx);
    }
  }, [targetCx, reduced, cxSpring]);

  useMotionValueEvent(cxSpring, "change", (latest) => {
    setCx(latest);
  });

  // Scrollspy mengikuti section yang sedang terlihat
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 520);

      if (Date.now() < manualUntilRef.current) return;

      const probe = y + window.innerHeight * 0.36;
      let current: NavId = "beranda";
      for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + y;
        if (probe >= top) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSelect = (id: NavId) => {
    setActive(id);
    manualUntilRef.current = Date.now() + 950;
    const el = document.getElementById(id);
    if (el) {
      scrollTo(el, { offset: id === "beranda" ? 0 : -28 });
      history.replaceState(null, "", `#${id}`);
    }
  };

  const pathD = buildNotchedPillPath(cx);

  return (
    <div className="pointer-events-none sticky top-6 z-50 -mt-[255px] mb-[185px] flex justify-center px-2 sm:top-7 sm:-mt-[280px] sm:mb-[210px]">
      <motion.nav
        aria-label="Navigasi utama"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="pointer-events-auto relative origin-top scale-[0.78] pt-[24px] sm:scale-100"
      >
        <div
          className="relative"
          style={{ width: BAR_W, height: BAR_H }}
        >
          {/* Bentuk pill putih berlekuk (Notched Bar) */}
          <svg
            width={BAR_W}
            height={BAR_H}
            viewBox={`0 0 ${BAR_W} ${BAR_H}`}
            aria-hidden
            className={`pointer-events-none absolute inset-0 block transition-[filter] duration-500 ${
              scrolled
                ? "drop-shadow-[0_14px_30px_rgba(26,112,212,0.22)] drop-shadow-[0_4px_12px_rgba(15,42,33,0.14)]"
                : "drop-shadow-[0_16px_34px_rgba(4,20,15,0.28)] drop-shadow-[0_4px_14px_rgba(26,112,212,0.18)]"
            }`}
          >
            <path d={pathD} fill="#FFFFFF" />
          </svg>

          {/* Lingkaran melayang (Floating Orb) yang bergerak mengikuti lekukan */}
          <div
            aria-hidden
            style={{
              width: ORB_SIZE,
              height: ORB_SIZE,
              transform: `translate3d(${cx - ORB_SIZE / 2}px, ${4 - ORB_SIZE / 2}px, 0)`,
            }}
            className="pointer-events-none absolute top-0 left-0 z-20 grid place-items-center rounded-full bg-white shadow-[0_8px_24px_rgba(26,112,212,0.32),0_2px_8px_rgba(15,42,33,0.1)]"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={active}
                initial={
                  reduced
                    ? { opacity: 0 }
                    : { opacity: 0, y: 10, scale: 0.55 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduced
                    ? { opacity: 0 }
                    : { opacity: 0, y: 8, scale: 0.55 }
                }
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 24,
                }}
                className="grid place-items-center text-blue"
              >
                <NavIcon id={active} className="h-[22px] w-[22px] stroke-[2.3]" />
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Daftar item navigasi */}
          <div
            className="relative z-10 flex h-full items-center"
            style={{ paddingLeft: PAD_X, paddingRight: PAD_X }}
          >
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  style={{ width: SLOT_W }}
                  className="group relative flex h-full cursor-pointer flex-col items-center justify-center focus:outline-none"
                >
                  {/* Ikon pada posisi normal (naik & menghilang saat aktif karena berpindah ke lingkaran atas) */}
                  <motion.span
                    initial={false}
                    animate={
                      isActive
                        ? { y: -22, scale: 0.5, opacity: 0 }
                        : { y: -2, scale: 1, opacity: 1 }
                    }
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 360, damping: 26 }
                    }
                    className="text-[#9aa8a2] transition-colors duration-200 group-hover:text-ink"
                  >
                    <NavIcon id={item.id} className="h-[20px] w-[20px] stroke-[2]" />
                  </motion.span>

                  {/* Label item */}
                  <motion.span
                    initial={false}
                    animate={
                      isActive
                        ? { y: 4, scale: 1.02 }
                        : { y: 2, scale: 1 }
                    }
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 360, damping: 28 }
                    }
                    className={`mt-0.5 text-[12.5px] tracking-[-0.01em] transition-colors duration-200 ${
                      isActive
                        ? "font-bold text-blue"
                        : "font-medium text-[#9aa8a2] group-hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.nav>
    </div>
  );
}
