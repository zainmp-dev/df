"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { BarChart3, Calculator, HeartHandshake, Scale, Sparkles, Table2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrollParallax } from "@/components/ui/ScrollParallax";
import { skillGroups, type SkillGroup } from "@/data/portfolio";

const icons: Record<SkillGroup["icon"], ReactNode> = {
  chart: <BarChart3 size={20} aria-hidden="true" />,
  table: <Table2 size={20} aria-hidden="true" />,
  calculator: <Calculator size={20} aria-hidden="true" />,
  scale: <Scale size={20} aria-hidden="true" />,
  sparkles: <Sparkles size={20} aria-hidden="true" />,
  heart: <HeartHandshake size={20} aria-hidden="true" />,
};

type Theme = { card: string; icon: string; chip: string; count: string; title: string };

const light: Theme = {
  card: "border border-plum/10 bg-cream-soft/70",
  icon: "bg-plum/10 text-plum",
  chip: "border-plum/20 text-ink hover:border-plum hover:bg-plum hover:text-cream",
  count: "text-ink-soft",
  title: "text-ink",
};

const themes: Record<string, { span: string; theme: Theme }> = {
  reporting: { span: "lg:col-span-5", theme: light },
  excel: {
    span: "lg:col-span-7",
    theme: {
      card: "on-dark bg-plum-deep text-cream",
      icon: "bg-cream/10 text-rose",
      chip: "border-cream/25 text-cream hover:border-rose hover:bg-rose hover:text-plum-deep",
      count: "text-cream/60",
      title: "text-cream",
    },
  },
  accounting: {
    span: "lg:col-span-4",
    theme: {
      card: "bg-blush",
      icon: "bg-plum/10 text-plum",
      chip: "border-plum/25 text-ink hover:border-plum hover:bg-plum hover:text-cream",
      count: "text-ink-soft",
      title: "text-ink",
    },
  },
  finance: { span: "lg:col-span-4", theme: light },
  ai: {
    span: "lg:col-span-4",
    theme: {
      card: "border border-plum/10 bg-gradient-to-br from-cream-soft to-blush/70",
      icon: "bg-plum/10 text-plum",
      chip: "border-plum/20 text-ink hover:border-plum hover:bg-plum hover:text-cream",
      count: "text-ink-soft",
      title: "text-ink",
    },
  },
  soft: { span: "lg:col-span-12", theme: light },
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-label="Skills and technologies"
      className="section-y relative overflow-x-clip"
    >
      <ScrollParallax
        distance={-12}
        className="pointer-events-none absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(222,113,120,0.12),transparent_68%)] blur-2xl"
      />
      <ScrollParallax
        distance={16}
        className="pointer-events-none absolute -left-48 bottom-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(226,168,136,0.18),transparent_68%)] blur-2xl"
      />
      <div className="container-x">
        <SectionHeader
          number="02"
          label="Skills & technologies"
          heading="The toolkit behind the *reports.*"
          intro="Reporting, analytics, accounting and compliance skills from my CV, grouped by how I use them."
        />

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-12">
          {skillGroups.map((group, i) => {
            const { span, theme } = themes[group.id] ?? { span: "lg:col-span-4", theme: light };
            return (
              <motion.li
                key={group.id}
                className={span}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.06 }}
              >
                <motion.article
                  className={`h-full rounded-[1.75rem] p-6 md:p-8 ${theme.card}`}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                >
                  <header className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${theme.icon}`}
                      >
                        {icons[group.icon]}
                      </span>
                      <h3 className={`font-display text-2xl leading-tight ${theme.title}`}>
                        {group.title}
                      </h3>
                    </div>
                    <span
                      className={`font-display text-sm italic ${theme.count}`}
                      aria-label={`${group.items.length} items`}
                    >
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </header>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <span
                          className={`inline-block rounded-full border px-3.5 py-1.5 text-sm font-semibold transition-colors duration-300 ${theme.chip}`}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
