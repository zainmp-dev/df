"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { DarkPanel } from "@/components/ui/DarkPanel";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollParallax } from "@/components/ui/ScrollParallax";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { experience } from "@/data/portfolio";

export function Experience() {
  const track = useRef<HTMLDivElement>(null);

  // The timeline rule fills in as the role is read (GSAP ScrollTrigger).
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      NO_REDUCED_MOTION,
      () => {
        gsap.fromTo(
          ".timeline-progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "50% 0%",
            scrollTrigger: {
              trigger: track.current,
              start: "top 65%",
              end: "bottom 70%",
              scrub: true,
            },
          },
        );
      },
      track,
    );
    return () => mm.revert();
  }, []);

  return (
    <>
      <DarkPanel id="experience" label="Work experience">
        <ScrollParallax
          distance={-16}
          className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(222,113,120,0.18),transparent_65%)]"
        />
        <div className="container-x relative py-16 md:py-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <SectionHeader
                  number="04"
                  label="Experience"
                  heading="Where the work *happens.*"
                  tone="dark"
                  intro="My current role, in my own words — every responsibility below comes straight from my CV."
                />
              </div>
            </div>

            <div className="lg:col-span-8">
              <div ref={track} className="relative pl-8 md:pl-14">
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-[0.45rem] top-2 w-px bg-cream/15 md:left-[0.95rem]"
                />
                <div
                  aria-hidden="true"
                  className="timeline-progress absolute bottom-0 left-[0.45rem] top-2 w-px bg-rose md:left-[0.95rem]"
                />

                {experience.map((job) => (
                  <article key={`${job.company}-${job.start}`} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center md:-left-14 md:h-[1.9rem] md:w-[1.9rem]"
                    >
                      <span className="absolute inline-flex h-full w-full rounded-full bg-rose/40 motion-safe:animate-ping" />
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-rose md:h-4 md:w-4" />
                    </span>

                    <Reveal>
                      <p className="eyebrow mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-rose">
                        <Briefcase size={14} aria-hidden="true" />
                        <time>{job.start}</time>
                        <span aria-hidden="true">—</span>
                        <span>{job.end}</span>
                      </p>
                      <h3 className="font-display text-4xl leading-[1.05] md:text-6xl">{job.role}</h3>
                      <p className="mt-3 text-lg font-semibold text-cream/80 md:text-xl">
                        {job.company}
                      </p>
                      <p className="mt-6 max-w-2xl text-base leading-relaxed text-cream/70 md:text-lg">
                        {job.intro}
                      </p>
                    </Reveal>

                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                      {job.themes.map((theme, i) => (
                        <motion.section
                          key={theme.title}
                          aria-label={theme.title}
                          className="rounded-3xl border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur-sm transition-colors duration-500 hover:border-rose/40 hover:bg-cream/[0.07] md:p-7"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                          transition={{
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                            delay: (i % 2) * 0.06,
                          }}
                        >
                          <h4 className="font-display text-2xl italic text-rose">{theme.title}</h4>
                          <ul className="mt-5 space-y-3.5 text-[0.95rem] leading-relaxed text-cream/75">
                            {theme.points.map((point) => (
                              <li key={point} className="flex gap-3">
                                <span
                                  aria-hidden="true"
                                  className="mt-[0.7em] h-px w-3 shrink-0 bg-rose"
                                />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.section>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DarkPanel>
    </>
  );
}
