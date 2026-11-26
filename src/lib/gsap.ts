"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Only run animation setup for people who have not asked for reduced motion. */
export const NO_REDUCED_MOTION = "(prefers-reduced-motion: no-preference)";

/** useLayoutEffect on the client, useEffect during SSR. */
export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
