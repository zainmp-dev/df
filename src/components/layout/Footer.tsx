import { Mail } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";
import { Wordmark } from "@/components/ui/Wordmark";
import { footerLinks, profile } from "@/data/portfolio";

const socials = [
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
  { label: "LinkedIn", href: profile.linkedin, Icon: LinkedInIcon, external: true },
] as const;

export function Footer() {
  return (
    <footer>
      <Wordmark />
      <div className="container-x py-12 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="font-display flex h-12 w-12 items-center justify-center rounded-full bg-plum text-xl italic text-cream"
            >
              {profile.initials}
            </span>
            <div>
              <p className="text-base font-bold">{profile.name}</p>
              <p className="text-sm text-ink-soft">
                {profile.role} · {profile.location}
              </p>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink-soft">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="transition-colors hover:text-plum">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-3">
            {socials.map(({ label, href, Icon, ...rest }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  target={"external" in rest ? "_blank" : undefined}
                  rel={"external" in rest ? "noopener noreferrer" : undefined}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-plum/20 text-plum transition-colors hover:border-plum hover:bg-plum hover:text-cream"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-plum/10 pt-6 text-xs text-ink-soft sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <p>
            <a href="#home" className="font-semibold transition-colors hover:text-plum">
              Back to top ↑
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
