import type { Transition, Variants } from "framer-motion";

/** Easing utama: cubic-bezier(0.22, 1, 0.36, 1) */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const t = (duration = 0.6, delay = 0): Transition => ({ duration, delay, ease: EASE });

/** Scroll-reveal: fade + translateY 24px */
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: t(0.65) },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

export const VIEWPORT = { once: true, amount: 0.2 } as const;

/** Event global untuk memilih kategori program dari luar section (mis. footer) */
export const PROGRAM_FILTER_EVENT = "ranamese:program-filter";
