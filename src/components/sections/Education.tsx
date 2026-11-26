"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Languages } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollParallax } from "@/components/ui/ScrollParallax";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { certifications, education, languages } from "@/data/portfolio";

export function Education() {
  return (
    <section
      id="education"
      aria-label="Education and achievements"
      className="section-y relative overflow-x-clip"
    >
      <ScrollParallax
        distance={-14}
        className="pointer-events-none absolute -right-44 top-16 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(222,113,120,0.13),transparent_68%)] blur-2xl"
      />
      <div className="container-x">
        <SectionHeader
          number="06"
          label="Education & achievements"
          heading="Learning that *backs it up.*"
        />

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <h3 className="eyebrow mb-6 flex items-center gap-2.5 text-plum">
                <GraduationCap size={16} aria-hidden="true" />
                Education
              </h3>
            </Reveal>
            <ol className="space-y-4">
              {education.map((item, i) => (
                <li key={item.title}>
                  <motion.article
                    className="rounded-3xl border border-plum/10 bg-cream-soft/70 p-6 transition-colors duration-500 hover:border-plum/30 md:p-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                    whileHover={{ y: -4 }}
                  >
                    <p className="font-display text-sm italic text-plum">{item.period}</p>
                    <h4 className="font-display mt-3 text-2xl leading-tight md:text-3xl">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-base text-ink-soft">{item.institution}</p>
                  </motion.article>
                </li>
              ))}
            </ol>
          </div>

          <div className="space-y-8 lg:col-span-6">
            <div>
              <Reveal>
                <h3 className="eyebrow mb-6 flex items-center gap-2.5 text-plum">
                  <Award size={16} aria-hidden="true" />
                  Certifications
                </h3>
              </Reveal>
              <ul className="grid gap-4 sm:grid-cols-2">
                {certifications.map((cert, i) => (
                  <motion.li
                    key={cert}
                    className="flex gap-4 rounded-3xl bg-blush p-5 md:p-6"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                  >
                    <span
                      aria-hidden="true"
                      className="font-display text-sm italic leading-6 text-plum"
                    >
                      0{i + 1}
                    </span>
                    <span className="text-[0.95rem] font-semibold leading-snug">{cert}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <Reveal>
                <h3 className="eyebrow mb-6 flex items-center gap-2.5 text-plum">
                  <Languages size={16} aria-hidden="true" />
                  Languages
                </h3>
              </Reveal>
              <Reveal>
                <ul className="divide-y divide-plum/15 border-y border-plum/15">
                  {languages.map((language) => (
                    <li
                      key={language.name}
                      className="flex items-baseline justify-between gap-4 py-4"
                    >
                      <span className="font-display text-2xl">{language.name}</span>
                      <span className="text-sm font-semibold text-ink-soft">{language.level}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
