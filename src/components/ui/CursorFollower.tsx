"use client";

import { useRef } from "react";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";

/** Soft ring that trails the mouse and grows over links and buttons. Mouse only; the real cursor stays visible. */
export function CursorFollower() {
  const ring = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const el = ring.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`(hover: hover) and (pointer: fine) and ${NO_REDUCED_MOTION}`, () => {
      gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
      const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
      const interactive = "a, button, [role='button']";

      const move = (event: PointerEvent) => {
        x(event.clientX);
        y(event.clientY);
        gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
        const hot = (event.target as Element | null)?.closest(interactive);
        gsap.to(el, {
          scale: hot ? 1.9 : 1,
          backgroundColor: hot ? "rgba(129,44,75,0.12)" : "rgba(129,44,75,0)",
          duration: 0.35,
          overwrite: "auto",
        });
      };
      const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });

      window.addEventListener("pointermove", move);
      document.documentElement.addEventListener("pointerleave", leave);
      return () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", leave);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] h-9 w-9 rounded-full border border-plum/60 opacity-0 mix-blend-multiply"
    />
  );
}
