"use client";

import { useRef } from "react";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

/** Oversized name that rises letter by letter as the footer scrolls into view (GSAP). */
export function Wordmark() {
  const root = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      NO_REDUCED_MOTION,
      () => {
        gsap.from(".wordmark-letter", {
          yPercent: 110,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.04,
          scrollTrigger: { trigger: root.current, start: "top 92%", once: true },
        });
      },
      root,
    );
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="container-x overflow-hidden pt-16 md:pt-24" aria-hidden="true">
      <p className="font-display select-none whitespace-nowrap text-center text-[clamp(2rem,10.2vw,9.5rem)] italic leading-[0.95] tracking-[-0.04em] text-plum/90">
        {profile.name.split("").map((char, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] pr-[0.02em]">
            <span className="wordmark-letter inline-block">{char === " " ? " " : char}</span>
          </span>
        ))}
      </p>
    </div>
  );
}
