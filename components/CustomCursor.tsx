"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Cursor custom (desktop / pointer:fine) yang membesar secara halus
 * ketika berada di atas kartu program ([data-cursor="card"]).
 */
export default function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [overCard, setOverCard] = useState(false);

  const x = useSpring(-100, { stiffness: 420, damping: 32, mass: 0.35 });
  const y = useSpring(-100, { stiffness: 420, damping: 32, mass: 0.35 });

  useEffect(() => {
    if (reduced) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      const target = e.target as HTMLElement | null;
      setOverCard(Boolean(target?.closest?.('[data-cursor="card"]')));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced, visible, x, y]);

  if (!enabled || reduced) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x, y }}
      animate={{
        width: overCard ? 54 : 14,
        height: overCard ? 54 : 14,
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-blue/45 bg-blue/12 backdrop-blur-[2px] lg:flex"
    >
      {overCard && (
        <span className="text-[10px] font-bold tracking-wider text-navy uppercase">
          Lihat
        </span>
      )}
    </motion.div>
  );
}
