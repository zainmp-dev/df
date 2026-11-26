"use client";

import { motion } from "framer-motion";
import { parseWords, stripEmphasis } from "@/lib/text";

type AnimatedHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Extra classes for emphasised (*wrapped*) words. */
  emClassName?: string;
  delay?: number;
};

/** Staggered word-by-word mask reveal on scroll (Framer Motion). */
export function AnimatedHeading({
  text,
  as: Tag = "h2",
  className = "h-section",
  emClassName = "italic text-plum",
  delay = 0,
}: AnimatedHeadingProps) {
  const words = parseWords(text);
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      aria-label={stripEmphasis(text)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ staggerChildren: 0.04, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={`${word.text}-${i}`} aria-hidden="true">
          {i > 0 && !word.glue ? " " : null}
          <span className="inline-block overflow-hidden align-top pb-[0.14em] -mb-[0.14em] pr-[0.06em] -mr-[0.06em]">
            <motion.span
              className={`inline-block will-change-transform ${word.em ? emClassName : ""}`}
              variants={{
                hidden: { y: "110%" },
                show: {
                  y: "0%",
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word.text}
            </motion.span>
          </span>
        </span>
      ))}
    </MotionTag>
  );
}
