"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useReady } from "@/components/providers/ReadyProvider";
import { profile } from "@/data/portfolio";

const EASE_CURTAIN = [0.76, 0, 0.24, 1] as const;

/** Monogram + counter, then a curtain lift that hands over to the hero. */
export function Preloader() {
  const { setReady } = useReady();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const progress = useMotionValue(0);
  const count = useTransform(progress, (v) => Math.round(v));
  const barScale = useTransform(progress, (v) => v / 100);

  useEffect(() => {
    const root = document.documentElement;
    root.style.overflow = "hidden";
    let cancelled = false;

    const minimumTime = new Promise<void>((resolve) => {
      animate(progress, 100, {
        duration: reduced ? 0.2 : 0.9,
        ease: [0.65, 0, 0.35, 1],
        onComplete: () => resolve(),
      });
    });

    const fontsReady = Promise.race([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise<void>((resolve) => setTimeout(resolve, 1200)),
    ]);

    Promise.all([minimumTime, fontsReady]).then(() => {
      if (cancelled) return;
      setReady(true);
      setVisible(false);
    });

    return () => {
      cancelled = true;
      root.style.overflow = "";
    };
  }, [progress, reduced, setReady]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
        window.scrollTo(0, 0);
      }}
    >
      {visible ? (
        <motion.div
          key="preloader"
          data-preloader
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          className="on-dark fixed inset-0 z-[100] flex flex-col justify-between bg-plum-deep p-6 text-cream md:p-10"
          initial={{ y: 0, opacity: 1 }}
          exit={
            reduced
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { y: "-100%", transition: { duration: 0.75, ease: EASE_CURTAIN } }
          }
        >
          {/* Curved lower edge that trails the curtain as it lifts */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-full h-[10vw] bg-plum-deep"
            style={{ borderRadius: "0 0 50% 50% / 0 0 100% 100%" }}
          />

          <div className="flex items-start justify-between text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
            <span>{profile.name}</span>
            <span>Portfolio</span>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <div
              className="font-display flex text-[clamp(6rem,26vw,16rem)] leading-none italic"
              aria-hidden="true"
            >
              {profile.initials.split("").map((letter, i) => (
                <span key={letter} className="inline-block overflow-hidden pb-[0.08em] pr-[0.04em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: reduced ? 0 : 0.7,
                      delay: reduced ? 0 : 0.15 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cream/70">
                {profile.role}
              </span>
              <span className="font-display text-5xl tabular-nums leading-none md:text-6xl">
                <motion.span>{count}</motion.span>
              </span>
            </div>
            <div className="h-px w-full bg-cream/20">
              <motion.div
                className="h-px origin-left bg-rose"
                style={{ scaleX: barScale }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
