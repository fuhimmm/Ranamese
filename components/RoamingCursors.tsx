"use client";

import { AnimatePresence, motion, useAnimation, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface RoamingCursorConfig {
  name: string;
  initialDelay: number;
  messages: string[];
}

const CURSORS: RoamingCursorConfig[] = [
  {
    name: "Ranamese",
    initialDelay: 0,
    messages: [
      "Halo! Selamat datang 👋",
      "Tabe! Salam kenal dari Gilang🙌",
      "Selamat menjelajah!",
      "Ngopi dulu kawan ☕",
      "Jangan lupa mampir ya!",
      "Senang kamu berkunjung 😊",
    ],
  },
];

const sleep = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));
const toTransform = (x: number, y: number) => `translate3d(${x}px, ${y}px, 0)`;

function waitUntilVisible(): Promise<void> {
  return new Promise((resolve) => {
    if (!document.hidden) {
      resolve();
      return;
    }
    const onVis = () => {
      if (!document.hidden) {
        document.removeEventListener("visibilitychange", onVis);
        resolve();
      }
    };
    document.addEventListener("visibilitychange", onVis);
  });
}

function CursorArrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="relative z-10 h-6 w-6"
      aria-hidden
    >
      <path
        d="M5.5 3.5L19.5 9.8L12.6 12.6L9.8 19.5L5.5 3.5Z"
        fill="#F5A524"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SingleRoamingCursor({
  name,
  initialDelay,
  messages,
}: RoamingCursorConfig) {
  const controls = useAnimation();
  const reduced = useReducedMotion();
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (reduced) return;

    let mounted = true;
    let curX = Math.random() * Math.max(300, window.innerWidth - 160);
    let curY =
      window.scrollY +
      window.innerHeight / 2 +
      (Math.random() - 0.5) * 400;

    (async () => {
      await controls.set({
        transform: toTransform(curX, curY),
        opacity: 0,
      });

      if (initialDelay > 0) await sleep(initialDelay);
      if (!mounted) return;

      await controls.start({
        opacity: 1,
        transition: { duration: 1 },
      });

      while (mounted) {
        await waitUntilVisible();
        if (!mounted) return;

        // Algoritma identik dengan FakeCursor pada safwan.id:
        // Target acak di viewport aktif + titik lengkung tengah (midpoint) + durasi 0.8s..2.0s
        const nextX = Math.random() * Math.max(240, window.innerWidth - 140);
        const nextY =
          window.scrollY +
          Math.random() * Math.max(240, window.innerHeight - 120);
        const midX = (curX + nextX) / 2 + (Math.random() - 0.5) * 400;
        const midY = (curY + nextY) / 2 + (Math.random() - 0.5) * 400;

        await controls.start({
          transform: [
            toTransform(curX, curY),
            toTransform(midX, midY),
            toTransform(nextX, nextY),
          ],
          transition: {
            duration: 0.8 + Math.random() * 1.2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
          },
        });

        curX = nextX;
        curY = nextY;
        if (!mounted) return;

        if (Math.random() > 0.6) {
          setIsTyping(true);
          setTypedText("");
          await sleep(500 + Math.random() * 1000);
          if (!mounted) return;

          const msg = messages[Math.floor(Math.random() * messages.length)];
          for (let i = 0; i <= msg.length; i++) {
            if (!mounted) return;
            setTypedText(msg.substring(0, i));
            await sleep(30 + Math.random() * 90);
          }

          await sleep(2500 + Math.random() * 1500);
          if (!mounted) return;
          setIsTyping(false);
          setTypedText("");
        } else {
          await sleep(200 + Math.random() * 1300);
        }
      }
    })();

    return () => {
      mounted = false;
      controls.stop();
    };
  }, [controls, initialDelay, messages, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      animate={controls}
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 z-[75] hidden flex-col items-start drop-shadow-[1px_2px_3px_rgba(0,0,0,0.28)] will-change-transform md:flex"
    >
      <CursorArrow />

      {/* Saat tidak mengetik: tampilkan pill nama desa (Watu Mori / Golo Loni) */}
      {!isTyping && (
        <span className="absolute top-5 left-[18px] z-20 rounded-full bg-orange px-4 py-1.5 text-[12.5px] font-bold whitespace-nowrap text-ink shadow-glow-orange">
          {name}
        </span>
      )}

      {/* Saat mengetik: gelembung pesan seperti pada safwan.id */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, transformOrigin: "top left" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="absolute top-5 left-[19px] z-20 flex min-h-9 items-center rounded-r-2xl rounded-bl-2xl bg-orange px-3.5 py-2 text-[13.5px] font-semibold whitespace-nowrap text-ink shadow-md"
          >
            <span>{typedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="ml-[3px] h-3.5 w-0.5 rounded-full bg-ink"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RoamingCursors() {
  return (
    <>
      {CURSORS.map((c) => (
        <SingleRoamingCursor key={c.name} {...c} />
      ))}
    </>
  );
}
