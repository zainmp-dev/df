"use client";

import { useRef } from "react";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";

type ScrollParallaxProps = {
  className: string;
  distance?: number;
};

export function ScrollParallax({ className, distance = 14 }: ScrollParallaxProps) {
  const layer = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const element = layer.current;
    const section = element?.closest("section");
    if (!element || !section) return;

    const media = gsap.matchMedia();
    media.add(NO_REDUCED_MOTION, () => {
      const tween = gsap.to(element, {
        yPercent: distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      return () => tween.kill();
    });

    return () => media.revert();
  }, [distance]);

  return <div ref={layer} aria-hidden="true" className={className} />;
}
