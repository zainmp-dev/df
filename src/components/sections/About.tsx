"use client";

import { useRef } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { parseWords } from "@/lib/text";
import {
  aboutParagraphs,
  aboutStatement,
  certifications,
  languages,
  profile,
  skillGroups,
  strengths,
} from "@/data/portfolio";

const statementWords = parseWords(aboutStatement);

// Facts derived directly from the data so they can never drift from the CV.
const accountingTools = skillGroups.find((g) => g.id === "accounting")?.items.length ?? 0;
const facts = [
  { value: accountingTools, label: "Accounting platforms" },
  { value: certifications.length, label: "Certifications" },
  { value: languages.length, label: "Languages" },
] as const;

export function About() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      NO_REDUCED_MOTION,
      () => {
        // Statement lights up word by word as it scrolls through the viewport.
        gsap.fromTo(
          ".about-word",
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".about-statement",
              start: "top 82%",
              end: "bottom 48%",
              scrub: true,
            },
          },
        );
      },
      root,
    );
    return () => mm.revert();
  }, []);

  return (
    <section
      id="about"
      ref={root}
      aria-label="About"
      className="section-y relative"
    >
      <div className="container-x">
        <SectionHeader number="01" label="About" heading="Numbers, made *clear.*" />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="about-statement font-display text-[clamp(1.6rem,3.4vw,2.65rem)] leading-[1.2] tracking-[-0.02em]">
              {statementWords.map((word, i) => (
                <span key={`${word.text}-${i}`}>
                  {i > 0 && !word.glue ? " " : null}
                  <span className={`about-word inline-block ${word.em ? "italic text-plum" : ""}`}>
                    {word.text}
                  </span>
                </span>
              ))}
            </p>

            <div className="mt-8 grid gap-5 text-base leading-relaxed text-ink-soft md:grid-cols-2 md:gap-8">
              {aboutParagraphs.map((paragraph, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p>{paragraph}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8">
              <dl className="grid grid-cols-3 gap-4 border-y border-plum/15 py-8">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex flex-col">
                    <dt className="order-2 text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">
                      {fact.label}
                    </dt>
                    <dd className="font-display mb-1 text-5xl leading-none text-plum md:text-6xl">
                      <CountUp value={fact.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <div className="mx-auto max-w-[24rem] lg:max-w-none">
              <Image
                src={profile.aboutImage}
                alt={`${profile.name}, close portrait`}
                width={1280}
                height={1280}
                quality={85}
                sizes="(min-width: 1024px) 38vw, 24rem"
                className="h-auto w-full object-contain"
              />
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-ink-soft">
                <MapPin size={15} className="text-plum" aria-hidden="true" />
                Based in {profile.location}, India
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4" aria-label="Core strengths">
          {strengths.map((strength, i) => (
            <li key={strength.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="group h-full rounded-3xl border border-plum/10 bg-cream-soft/70 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-plum/30 hover:bg-cream-soft hover:shadow-[0_24px_50px_-30px_rgba(58,18,38,0.45)]">
                  <span className="font-display text-sm italic text-rose" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className="font-display mt-4 text-2xl leading-tight">{strength.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{strength.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
