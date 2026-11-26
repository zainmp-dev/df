"use client";

import { useRef } from "react";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { marqueeItems } from "@/data/portfolio";

/** Continuous skills ticker (GSAP). Static for reduced-motion users. */
export function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      NO_REDUCED_MOTION,
      () => {
        const tween = gsap.to(".marquee-track", {
          xPercent: -50,
          duration: 38,
          ease: "none",
          repeat: -1,
        });
        const el = root.current;
        const slow = () => gsap.to(tween, { timeScale: 0.25, duration: 0.6 });
        const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
        el?.addEventListener("pointerenter", slow);
        el?.addEventListener("pointerleave", resume);
        return () => {
          el?.removeEventListener("pointerenter", slow);
          el?.removeEventListener("pointerleave", resume);
        };
      },
      root,
    );
    return () => mm.revert();
  }, []);

  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {marqueeItems.map((item) => (
        <li key={item} className="flex items-center">
          <span className="font-display px-6 text-2xl italic md:px-9 md:text-4xl">{item}</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-rose" />
        </li>
      ))}
    </ul>
  );

  return (
    <div
      ref={root}
      className="on-dark relative overflow-hidden bg-plum py-6 text-cream md:py-8"
      role="region"
      aria-label="Core tools and focus areas"
    >
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
