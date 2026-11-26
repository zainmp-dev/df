"use client";

import { useRef, type ReactNode } from "react";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";

type TiltCardProps = { children: ReactNode; max?: number; className?: string };

/** Gentle 3D tilt toward the pointer, mouse only (GSAP quickTo). */
export function TiltCard({ children, max = 4, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`(hover: hover) and (pointer: fine) and ${NO_REDUCED_MOTION}`, () => {
      const rx = gsap.quickTo(el, "rotationX", { duration: 0.6, ease: "power3.out" });
      const ry = gsap.quickTo(el, "rotationY", { duration: 0.6, ease: "power3.out" });

      const move = (event: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        ry(px * max * 2);
        rx(-py * max * 2);
      };
      const leave = () => {
        rx(0);
        ry(0);
      };

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
        gsap.set(el, { clearProps: "rotationX,rotationY,transform" });
      };
    });
    return () => mm.revert();
  }, [max]);

  return (
    <div className={className} style={{ perspective: 1200 }}>
      <div ref={ref} style={{ transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </div>
  );
}
