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
    name: "Sambelia",
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

/**
 * Ikon roaming pixel-art Lumbung Sasak Sambelia (menggantikan bentuk panah kursor).
 */
function RoamingMotifIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/sambelia-motif.png"
      alt=""
      aria-hidden
      style={{
        imageRendering: "pixelated",
        filter:
          "drop-shadow(1.2px 0 0 #0F2A21) drop-shadow(-1.2px 0 0 #0F2A21) drop-shadow(0 1.2px 0 #0F2A21) drop-shadow(0 -1.2px 0 #0F2A21) drop-shadow(0 3px 6px rgba(0,0,0,0.28))",
      }}
      className="relative z-10 h-8 w-8 shrink-0 select-none"
    />
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
    let curX = Math.random() * Math.max(220, window.innerWidth - 160);
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
        const nextX = Math.random() * Math.max(180, window.innerWidth - 150);
        const nextY =
          window.scrollY +
          Math.random() * Math.max(220, window.innerHeight - 140);
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
      className="pointer-events-none absolute top-0 left-0 z-[75] flex origin-top-left scale-90 flex-col items-start will-change-transform md:scale-100"
    >
      <RoamingMotifIcon />

      {/* Saat tidak mengetik: tampilkan pill nama "Sambelia" */}
      {!isTyping && (
        <span className="absolute top-6 left-7 z-20 rounded-full bg-orange px-4 py-1.5 text-[12.5px] font-bold whitespace-nowrap text-ink shadow-glow-orange">
          {name}
        </span>
      )}

      {/* Saat mengetik: gelembung sapaan */}
      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, transformOrigin: "top left" }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="absolute top-6 left-7 z-20 flex min-h-9 items-center rounded-r-2xl rounded-bl-2xl bg-orange px-3.5 py-2 text-[13.5px] font-semibold whitespace-nowrap text-ink shadow-md"
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
