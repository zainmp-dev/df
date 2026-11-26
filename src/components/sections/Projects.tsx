"use client";

import { useRef, type ReactNode } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  ClipboardList,
  Database,
  Filter,
  Globe2,
  Lightbulb,
  MapPin,
  Table2,
  Target,
  type LucideIcon,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { profile, projects } from "@/data/portfolio";

const processStages = [
  {
    label: "Frame the question",
    title: "Start with a clear question.",
    description:
      "Good analysis begins with the decision, not the dashboard. Define what needs to be learned and which data can answer it.",
    icon: Target,
    examples: [
      "A Microsoft Forms questionnaire explores consumer spending behaviour.",
      "A Kaggle dataset covering 2020–2024 provides a foundation for sales analysis.",
    ],
    tools: ["Research question", "Microsoft Forms", "Kaggle"],
  },
  {
    label: "Prepare the data",
    title: "Make the data reliable.",
    description:
      "Consistent, well-prepared inputs make every comparison easier to trust—from survey responses to sales records.",
    icon: ClipboardList,
    examples: [
      "Survey responses are collected in a structure ready for Excel analysis.",
      "The sales dataset is prepared and organised before patterns are explored.",
    ],
    tools: ["Microsoft Forms", "Advanced Excel", "Data preparation"],
  },
  {
    label: "Analyse patterns",
    title: "Find the patterns that matter.",
    description:
      "Use structured analysis and visual exploration to turn raw records into understandable trends and comparisons.",
    icon: BarChart3,
    examples: [
      "Excel analysis explores the survey responses and spending preferences.",
      "Power BI visualisations surface sales trends and product performance.",
    ],
    tools: ["Advanced Excel", "Power BI", "Data visualisation"],
  },
  {
    label: "Share the insight",
    title: "Make the findings useful.",
    description:
      "Bring the analysis together in clear dashboards and takeaways that make the story easier to understand and act on.",
    icon: Lightbulb,
    examples: [
      "Dashboards and recommendations communicate the research findings.",
      "Interactive reports highlight insights into sales behaviour.",
    ],
    tools: ["Dashboards", "Clear takeaways", "Recommendations"],
  },
] as const;

const flowIcons: Record<string, LucideIcon> = {
  "Microsoft Forms": ClipboardList,
  "Advanced Excel": Table2,
  "Power BI": BarChart3,
  Insights: Lightbulb,
  "Kaggle dataset": Database,
  "Data preparation": Filter,
};

function ScrollRevealCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [12, -12]);

  return (
    <motion.li
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
    >
      <motion.div style={{ y: parallaxY }} className="projects-card-parallax h-full">
        {children}
      </motion.div>
    </motion.li>
  );
}

export function Projects() {
  const root = useRef<HTMLElement>(null);
  const glowOne = useRef<HTMLDivElement>(null);
  const glowTwo = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const section = root.current;
    const firstGlow = glowOne.current;
    const secondGlow = glowTwo.current;
    if (!section || !firstGlow || !secondGlow) return;

    const media = gsap.matchMedia();
    media.add(NO_REDUCED_MOTION, () => {
      const firstParallax = gsap.to(firstGlow, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      const secondParallax = gsap.to(secondGlow, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      return () => {
        firstParallax.kill();
        secondParallax.kill();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={root}
      id="projects"
      aria-label="Projects"
      className="section-y isolate relative overflow-x-clip"
    >
      <div
        ref={glowOne}
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-24 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(222,113,120,0.12),transparent_68%)] blur-2xl"
      />
      <div
        ref={glowTwo}
        aria-hidden="true"
        className="pointer-events-none absolute -right-52 top-[32rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(129,44,75,0.09),transparent_68%)] blur-2xl"
      />

      <div className="container-x relative">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <motion.p
            className="eyebrow flex items-center gap-2 text-plum"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <Globe2 size={15} aria-hidden="true" />
            Analytics projects
          </motion.p>
          <motion.p
            className="flex items-center gap-2 text-sm font-semibold text-ink-soft"
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <MapPin size={15} className="text-plum" aria-hidden="true" />
            {profile.location}, India
          </motion.p>
        </div>

        <SectionHeader
          number="05"
          label="Projects"
          heading="Global presence, *local precision.*"
          intro={`Based in ${profile.location}, India. Clear, careful data work—grounded locally and built to support confident decisions.`}
        />

        <div className="mt-10 md:mt-14">
          <motion.div
            className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="eyebrow text-plum">The operating process</p>
              <h3 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
                From raw data to useful insight.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">
              Four practical stages, presented as complete cards. Scroll down naturally—no
              horizontal movement or hidden steps.
            </p>
          </motion.div>

          <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processStages.map((stage, index) => {
              const Icon = stage.icon;
              return (
                <ScrollRevealCard
                  key={stage.label}
                  className="h-full"
                  delay={(index % 2) * 0.05}
                >
                  <article className="group flex h-full flex-col rounded-3xl border border-plum/10 bg-gradient-to-br from-cream-soft via-cream-soft to-blush/40 p-5 shadow-[0_20px_55px_-42px_rgba(58,18,38,0.35)] transition duration-300 hover:-translate-y-1 hover:border-plum/25 hover:shadow-[0_24px_60px_-40px_rgba(58,18,38,0.42)] sm:p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-5xl italic leading-none text-plum md:text-6xl">
                        0{index + 1}
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-plum/15 bg-blush/60 text-plum transition-colors duration-300 group-hover:bg-plum group-hover:text-cream">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                    </div>

                    <p className="eyebrow mt-6 text-plum">{stage.label}</p>
                    <h4 className="font-display mt-2 text-2xl leading-tight text-ink">
                      {stage.title}
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {stage.description}
                    </p>

                    <ul className="mt-5 space-y-3 border-t border-plum/10 pt-4">
                      {stage.examples.map((example) => (
                        <li key={example} className="flex gap-2.5 text-sm leading-relaxed text-ink-soft">
                          <span
                            aria-hidden="true"
                            className="mt-[0.7em] h-px w-3 shrink-0 bg-rose"
                          />
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-auto flex flex-wrap gap-2 pt-5" aria-label={`${stage.label} tools`}>
                      {stage.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-full border border-plum/15 bg-cream/70 px-2.5 py-1 text-[0.7rem] font-semibold text-plum"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollRevealCard>
              );
            })}
          </ol>
        </div>

        <div className="mt-14 border-t border-plum/15 pt-10 md:mt-16 md:pt-12">
          <motion.div
            className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div>
              <p className="eyebrow text-plum">Selected work</p>
              <h3 className="font-display mt-2 text-3xl text-ink sm:text-4xl">
                The process in practice.
              </h3>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-soft">
              Two analytics projects, each moving from a defined source through analysis to a
              clear result.
            </p>
          </motion.div>

          <ol className="grid gap-4 lg:grid-cols-2">
            {projects.map((project, index) => (
              <ScrollRevealCard
                key={project.index}
                delay={index * 0.06}
              >
                <article className="h-full rounded-3xl border border-plum/10 bg-cream-soft/80 p-5 transition-colors duration-300 hover:border-plum/25 hover:bg-cream-soft sm:p-7">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display text-4xl italic leading-none text-plum">
                      {project.index}
                    </span>
                    <span className="rounded-full border border-plum/15 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink-soft">
                      {project.type}
                    </span>
                  </div>
                  <h4 className="font-display mt-5 text-2xl leading-tight text-ink sm:text-3xl">
                    {project.title}
                  </h4>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.description}</p>

                  <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-ink-soft">
                    {project.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-[0.7em] h-px w-3 shrink-0 bg-rose"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <ol
                    className="mt-6 flex flex-wrap gap-2 border-t border-plum/10 pt-5"
                    aria-label={`${project.short} end-to-end workflow`}
                  >
                    {project.flow.map((step, stepIndex) => {
                      const Icon = flowIcons[step] ?? Filter;
                      return (
                        <li
                          key={step}
                          className="flex items-center gap-2 rounded-full bg-plum/10 px-3 py-1.5 text-xs font-semibold text-plum"
                        >
                          <Icon size={14} aria-hidden="true" />
                          {step}
                          {stepIndex < project.flow.length - 1 ? (
                            <ArrowRight size={12} className="text-rose" aria-hidden="true" />
                          ) : null}
                        </li>
                      );
                    })}
                  </ol>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.short} tools`}>
                    {project.tools.map((tool) => (
                      <li
                        key={tool}
                        className="rounded-full border border-plum/10 px-2.5 py-1 text-[0.7rem] font-medium text-ink-soft"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollRevealCard>
            ))}
          </ol>

          <motion.a
            href="#contact"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-plum-deep focus-visible:outline-plum"
          >
            Discuss a project
            <ArrowDownRight size={16} aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
