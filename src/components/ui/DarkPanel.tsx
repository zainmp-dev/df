"use client";

import { useRef, type ReactNode } from "react";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";

type DarkPanelProps = {
  id: string;
  label: string;
  children: ReactNode;
  className?: string;
};

/**
 * Rounded dark panel used as a section transition: it settles from slightly
 * smaller to full width as it scrolls into place (GSAP ScrollTrigger).
 */
export function DarkPanel({ id, label, children, className = "" }: DarkPanelProps) {
  const wrapper = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      NO_REDUCED_MOTION,
      () => {
        gsap.fromTo(
          ".dark-panel",
          { scale: 0.93, borderRadius: "3.5rem" },
          {
            scale: 1,
            borderRadius: "2rem",
            ease: "none",
            transformOrigin: "50% 0%",
            scrollTrigger: {
              trigger: wrapper.current,
              start: "top bottom",
              end: "top 25%",
              scrub: true,
            },
          },
        );
      },
      wrapper,
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      id={id}
      ref={wrapper}
      aria-label={label}
      className="px-3 sm:px-5"
    >
      <div
        className={`dark-panel on-dark relative mx-auto max-w-[96rem] overflow-hidden rounded-[2rem] bg-plum-deep text-cream ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
