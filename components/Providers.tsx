"use client";

import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

interface AppState {
  /** true setelah loader selesai (atau dilewati) — memicu animasi masuk hero */
  loaderDone: boolean;
  setLoaderDone: (v: boolean) => void;
  /** Gulir halus ke target (selector / elemen / angka) */
  scrollTo: (target: string | HTMLElement | number, opts?: { offset?: number; immediate?: boolean }) => void;
  lenis: Lenis | null;
}

const Ctx = createContext<AppState | null>(null);

export function useApp() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp harus dipakai di dalam <Providers>");
  return v;
}

export default function Providers({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [loaderDone, setLoaderDone] = useState(false);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scroll (Lenis) — dimatikan bila prefers-reduced-motion
  useEffect(() => {
    if (reduced) return;
    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    lenisRef.current = instance;
    setLenis(instance);
    let raf = 0;
    const loop = (time: number) => {
      instance.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [reduced]);

  // Kunci scroll selama loader aktif
  useEffect(() => {
    const l = lenisRef.current;
    if (!l) return;
    if (loaderDone) l.start();
    else if (document.documentElement.classList.contains("loader-active")) l.stop();
  }, [loaderDone, lenis]);

  const scrollTo = useCallback<AppState["scrollTo"]>(
    (target, opts) => {
      const offset = opts?.offset ?? 0;
      const l = lenisRef.current;
      if (l) {
        l.scrollTo(target, { offset, duration: 1.2, immediate: opts?.immediate, easing: (x) => 1 - Math.pow(1 - x, 4) });
        return;
      }
      let y = 0;
      if (typeof target === "number") y = target;
      else {
        const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
        if (!el) return;
        y = el.getBoundingClientRect().top + window.scrollY;
      }
      window.scrollTo({ top: y + offset, behavior: reduced ? "auto" : "smooth" });
    },
    [reduced],
  );

  // Tangkap klik anchor "#id" agar memakai smooth scroll
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a[href^='#']") as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      scrollTo(el as HTMLElement, { offset: id === "#beranda" ? 0 : -24 });
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  const value = useMemo(() => ({ loaderDone, setLoaderDone, scrollTo, lenis }), [loaderDone, scrollTo, lenis]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
