"use client";

import { useRef } from "react";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";

type CountUpProps = { value: number; className?: string };

/** Counts from 0 to `value` when scrolled into view (GSAP). Final value is in the markup for SSR and reduced motion. */
export function CountUp({ value, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      NO_REDUCED_MOTION,
      () => {
        const state = { n: 0 };
        const el = ref.current;
        if (!el) return;
        el.textContent = "0";
        gsap.to(state, {
          n: value,
          duration: 1.6,
          ease: "power2.out",
          snap: { n: 1 },
          onUpdate: () => {
            el.textContent = String(state.n);
          },
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      },
      ref,
    );
    return () => mm.revert();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
