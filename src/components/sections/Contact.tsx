import { ArrowUpRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { DarkPanel } from "@/components/ui/DarkPanel";
import { ScrollParallax } from "@/components/ui/ScrollParallax";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/portfolio";

const channels = [
  {
    label: "LinkedIn",
    value: "diya-fathima-m",
    href: profile.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  {
    label: "Based in",
    value: `${profile.location}, India`,
    Icon: MapPin,
  },
] as const;

export function Contact() {
  return (
    <DarkPanel id="contact" label="Contact">
      <ScrollParallax
        distance={18}
        className="pointer-events-none absolute -left-40 -bottom-48 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(226,168,136,0.16),transparent_65%)]"
      />
      <div className="container-x relative py-16 md:py-20">
        <SectionHeader
          number="07"
          label="Contact"
          heading="Have a report to build? *Let's talk.*"
          tone="dark"
          intro="I'm happy to talk about MIS reporting, audit support and data analysis. The quickest way to reach me is by email."
        />

        <Reveal className="mt-8 md:mt-10">
          <a
            href={`mailto:${profile.email}`}
            className="font-display group inline-flex max-w-full items-center gap-3 text-[clamp(1.1rem,5.6vw,4.25rem)] leading-tight md:gap-4 underline decoration-cream/25 decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-rose"
          >
            {profile.email}
            <ArrowUpRight
              aria-hidden="true"
              className="h-[0.7em] w-[0.7em] shrink-0 text-rose transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </a>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center gap-3" delay={0.1}>
          <Button href={`mailto:${profile.email}`} variant="light" icon={<ArrowUpRight size={17} />}>
            Email me
          </Button>
          <CopyEmail email={profile.email} />
          <Button href={profile.cv} variant="outlineLight" download>
            Download CV
          </Button>
        </Reveal>

        <ul className="mt-10 grid gap-4 border-t border-cream/15 pt-8 md:grid-cols-2">
          {channels.map((channel, i) => {
            const { label, value, Icon } = channel;
            const href = "href" in channel ? channel.href : undefined;
            const external = "external" in channel;
            const inner = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream/10 text-rose">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-cream/50">
                    {label}
                  </span>
                  <span className="mt-1 block break-words text-base font-semibold">{value}</span>
                </span>
              </>
            );
            return (
              <li key={label}>
                <Reveal delay={i * 0.08} className="h-full">
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="flex h-full items-center gap-4 rounded-3xl border border-cream/10 bg-cream/[0.04] p-5 transition-colors duration-300 hover:border-rose/50 hover:bg-cream/[0.08]"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="flex h-full items-center gap-4 rounded-3xl border border-cream/10 bg-cream/[0.04] p-5">
                      {inner}
                    </div>
                  )}
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </DarkPanel>
  );
}
