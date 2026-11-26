"use client";

import { useRef } from "react";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { workflow } from "@/data/portfolio";

export function Workflow() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const media = gsap.matchMedia();
    media.add(NO_REDUCED_MOTION, () => {
      const cards = gsap.utils.toArray<HTMLElement>(".workflow-card", section);
      const animations = cards.map((card, index) =>
        gsap.fromTo(
          card,
          { y: 22, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.65,
            delay: (index % 3) * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        ),
      );
      return () => animations.forEach((animation) => animation.kill());
    });

    return () => media.revert();
  }, []);

  return (
    <section id="workflow" ref={root} aria-label="How I work" className="section-y relative">
      <div className="container-x">
        <SectionHeader
          number="03"
          label="How I work"
          heading="From raw data to *decision.*"
          intro="Six practical steps in my day-to-day MIS work. Every card stays in the page flow—scroll down at your own pace."
        />

        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {workflow.map((item, index) => (
            <li key={item.step} className="workflow-card">
              <article className="flex h-full min-h-[17rem] flex-col rounded-[1.75rem] border border-plum/10 bg-cream-soft/80 p-6 transition-colors duration-300 hover:border-plum/25 hover:bg-cream-soft md:p-7">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-5xl italic leading-none text-plum md:text-6xl">
                    0{index + 1}
                  </span>
                  <span className="eyebrow text-ink-soft">{item.step}</span>
                </div>
                <h3 className="font-display mt-6 text-2xl leading-tight md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.text}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label={`${item.step} tools`}>
                  {item.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full bg-plum/10 px-3 py-1 text-xs font-semibold text-plum"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
