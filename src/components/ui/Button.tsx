"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "outlineLight";
  icon?: ReactNode;
  download?: boolean;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
};

const variants = {
  primary:
    "bg-plum text-cream hover:bg-plum-deep shadow-[0_10px_30px_-12px_rgba(129,44,75,0.7)]",
  secondary:
    "border border-plum/25 bg-transparent text-plum hover:border-plum hover:bg-plum/5",
  light: "bg-cream text-plum-deep hover:bg-blush",
  outlineLight:
    "border border-cream/30 bg-transparent text-cream hover:border-cream hover:bg-cream/10",
} as const;

/** Pill button with a gentle magnetic pull on fine pointers (Framer Motion). */
export function Button({
  href,
  children,
  variant = "primary",
  icon,
  download,
  external,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduced || event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * 0.18);
    y.set((event.clientY - (rect.top + rect.height / 2)) * 0.28);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      download={download ? "Diya-Fathima-M-CV.pdf" : undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={ariaLabel}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 ease-out group-hover:translate-x-0.5"
        >
          {icon}
        </span>
      ) : null}
    </motion.a>
  );
}
