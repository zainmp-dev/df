import type { ReactNode } from "react";
import { AnimatedHeading } from "./AnimatedHeading";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  number: string;
  label: string;
  heading: string;
  intro?: ReactNode;
  tone?: "light" | "dark";
  headingId?: string;
};

export function SectionHeader({
  number,
  label,
  heading,
  intro,
  tone = "light",
}: SectionHeaderProps) {
  const dark = tone === "dark";
  return (
    <header className="max-w-4xl">
      <Reveal>
        <p
          className={`eyebrow mb-6 flex items-center gap-3 ${
            dark ? "text-rose" : "text-plum"
          }`}
        >
          <span aria-hidden="true">{number}</span>
          <span
            aria-hidden="true"
            className={`h-px w-10 ${dark ? "bg-rose/60" : "bg-plum/40"}`}
          />
          <span>{label}</span>
        </p>
      </Reveal>
      <AnimatedHeading
        text={heading}
        emClassName={dark ? "italic text-rose" : "italic text-plum"}
        className={`h-section ${dark ? "text-cream" : "text-ink"}`}
      />
      {intro ? (
        <Reveal delay={0.15}>
          <p
            className={`mt-6 max-w-xl text-base leading-relaxed md:text-lg ${
              dark ? "text-cream/70" : "text-ink-soft"
            }`}
          >
            {intro}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
