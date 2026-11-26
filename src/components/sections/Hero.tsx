"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, BarChart3, Download, FileSpreadsheet, MapPin } from "lucide-react";
import { useReady } from "@/components/providers/ReadyProvider";
import { Button } from "@/components/ui/Button";
import { NO_REDUCED_MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { profile } from "@/data/portfolio";

const nameLines = [
  [{ text: "Diya", em: false }],
  [
    { text: "Fathima", em: false },
    { text: "M", em: true },
  ],
] as const;

export function Hero() {
  const { ready } = useReady();
  const reduced = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  // GSAP owns the intro timeline, the portrait reveal and the scroll parallax.
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      NO_REDUCED_MOTION,
      () => {
        const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });

        tl.from(".hero-line-inner", { yPercent: 115, duration: 0.8, stagger: 0.08 }, 0.15)
          .from(".hero-fade", { y: 20, opacity: 0, duration: 0.65, stagger: 0.07 }, 0.35)
          .from(
            ".hero-arch-outline",
            { scale: 0.9, opacity: 0, duration: 0.9, ease: "power3.out" },
            0.05,
          )
          .fromTo(
            ".hero-clip",
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "power4.inOut" },
            0.1,
          )
          .from(".hero-img", { scale: 1.2, duration: 1.2, ease: "power3.out" }, 0.1)
          .from(".hero-monogram", { opacity: 0, duration: 1, ease: "power2.out" }, 0.1);

        timeline.current = tl;

        gsap.to(".hero-portrait-parallax", {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.to(".hero-blob-a", {
          yPercent: 28,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-blob-b", {
          yPercent: -22,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-monogram", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });

        return () => {
          timeline.current = null;
        };
      },
      root,
    );

    return () => mm.revert();
  }, []);

  // Start the intro as the preloader curtain lifts.
  useIsoLayoutEffect(() => {
    if (ready) timeline.current?.play();
  }, [ready]);

  const chipTransition = (delay: number) => ({
    opacity: { duration: 0.8, delay },
    y: reduced
      ? { duration: 0 }
      : { duration: 5.5, repeat: Infinity, ease: "easeInOut" as const, delay },
  });

  return (
    <section
      id="home"
      ref={root}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-14 pt-28 md:pb-20 md:pt-32"
    >
      {/* Background: drifting colour fields and a giant monogram echoing the DF mark */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-blob-a absolute -left-32 top-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(222,113,120,0.32),transparent_68%)] blur-2xl" />
        <div className="hero-blob-b absolute -right-40 bottom-[-6rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(226,168,136,0.45),transparent_68%)] blur-2xl" />
        <div className="hero-monogram font-display absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(18rem,52vw,48rem)] leading-none text-plum/[0.045]">
          DF
        </div>
      </div>

      <div className="container-x relative">
        <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <div className="contents lg:col-span-7 lg:block">
            <div className="order-1">
              <p className="hero-fade eyebrow mb-6 flex items-center gap-3 text-plum">
                <span aria-hidden="true" className="h-px w-10 bg-plum/50" />
                {profile.role}
              </p>

              <h1
                id="hero-title"
                className="font-display text-[clamp(3.4rem,13vw,6.25rem)] leading-[0.92] lg:text-[clamp(5rem,8vw,8.75rem)] tracking-[-0.035em] text-ink"
                aria-label={profile.name}
              >
                {nameLines.map((line, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="block overflow-hidden pb-[0.12em] -mb-[0.12em] pr-[0.05em]"
                  >
                    <span className="hero-line-inner block will-change-transform">
                      {line.map((word, j) => (
                        <span key={word.text}>
                          <span className={word.em ? "italic text-plum" : ""}>{word.text}</span>
                          {j < line.length - 1 ? " " : null}
                        </span>
                      ))}
                    </span>
                  </span>
                ))}
              </h1>
            </div>

            <div className="order-3 lg:mt-9">
              <p className="hero-fade max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
                {profile.heroLine}
              </p>

              <div className="hero-fade mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href="#contact"
                  icon={<ArrowDownRight size={17} />}
                >
                  Get in touch
                </Button>
                <Button
                  href={profile.cv}
                  variant="secondary"
                  download
                  icon={<Download size={16} />}
                >
                  Download CV
                </Button>
              </div>

              <p className="hero-fade mt-8 inline-flex items-center gap-2.5 rounded-full border border-plum/15 bg-cream-soft/70 py-2 pl-3 pr-4 text-sm font-semibold text-ink">
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-rose/60 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose" />
                </span>
                {profile.role} at Western International Group
              </p>

              <p className="hero-fade mt-4 flex items-center gap-2 text-sm font-semibold text-ink-soft">
                <MapPin size={16} className="text-plum" aria-hidden="true" />
                {profile.location}, India
              </p>
            </div>
          </div>

          <div className="order-2 lg:col-span-5">
            <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[26rem] lg:max-w-none">
              <div className="hero-portrait-parallax">
                <div className="relative">
                  <div
                    aria-hidden="true"
                    className="hero-arch-outline absolute inset-0 translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-[2rem] border border-plum/30 sm:translate-x-4 sm:translate-y-4"
                  />
                  <div className="hero-clip relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-cream-soft shadow-[0_40px_80px_-40px_rgba(58,18,38,0.55)]">
                    <Image
                      src={profile.portrait}
                      alt="Portrait of Diya Fathima M, wearing a burgundy blazer and a soft beige hijab"
                      fill
                      quality={75}
                      priority
                      sizes="(min-width: 1024px) 40vw, (min-width: 640px) 26rem, 21rem"
                      className="hero-img object-cover object-[50%_18%]"
                    />
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -left-2 bottom-14 z-10 flex items-center gap-3 rounded-2xl border border-plum/10 bg-cream-soft/90 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(58,18,38,0.5)] backdrop-blur sm:-left-8"
                initial={{ opacity: 0, y: 0 }}
                animate={ready ? { opacity: 1, y: reduced ? 0 : [0, -8, 0] } : { opacity: 0, y: 0 }}
                transition={chipTransition(0.8)}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-plum text-cream">
                  <FileSpreadsheet size={17} aria-hidden="true" />
                </span>
                <span className="text-sm font-bold leading-tight">
                  MIS Reporting
                  <span className="block text-xs font-medium text-ink-soft">SAP · Excel</span>
                </span>
              </motion.div>

              <motion.div
                className="absolute -right-1 top-[46%] z-10 flex items-center gap-3 rounded-2xl border border-plum/10 bg-cream-soft/90 px-4 py-3 shadow-[0_18px_40px_-20px_rgba(58,18,38,0.5)] backdrop-blur sm:-right-6"
                initial={{ opacity: 0, y: 0 }}
                animate={ready ? { opacity: 1, y: reduced ? 0 : [0, 8, 0] } : { opacity: 0, y: 0 }}
                transition={chipTransition(1)}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose text-plum-deep">
                  <BarChart3 size={17} aria-hidden="true" />
                </span>
                <span className="text-sm font-bold leading-tight">
                  Dashboards
                  <span className="block text-xs font-medium text-ink-soft">Power BI · Tableau</span>
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
