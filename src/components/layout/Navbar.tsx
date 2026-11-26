"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Download, Menu, X } from "lucide-react";
import { useReady } from "@/components/providers/ReadyProvider";
import { navLinks, profile } from "@/data/portfolio";

export function Navbar() {
  const { ready } = useReady();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const closeRef = useRef<HTMLButtonElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 240 && !open);
  });

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: lock scroll, close on Escape, move focus inside.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const onChange = () => query.matches && setOpen(false);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-plum"
        style={{ scaleX: progress }}
      />

      <motion.header
        className="fixed inset-x-0 top-0 z-[70] px-3 pt-3 sm:px-5"
        initial={{ y: "-130%", opacity: 0 }}
        animate={
          ready
            ? { y: hidden ? "-130%" : "0%", opacity: 1 }
            : { y: "-130%", opacity: 0 }
        }
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          aria-label="Primary"
          className={`mx-auto flex max-w-[80rem] items-center justify-between rounded-full border py-2 pl-2 pr-2 shadow-[0_8px_30px_-14px_rgba(58,18,38,0.35)] backdrop-blur-xl transition-colors duration-500 md:pl-3 ${
            open ? "border-cream/15 bg-plum-deep/70 text-cream" : "border-plum/10 bg-cream/75"
          }`}
        >
          <a
            href="#home"
            className="flex items-center gap-3 rounded-full pr-3"
            aria-label={`${profile.name} — back to top`}
            onClick={() => setOpen(false)}
          >
            <span
              aria-hidden="true"
              className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-plum text-lg italic text-cream"
            >
              {profile.initials}
            </span>
            <span className="hidden text-sm font-bold tracking-tight sm:inline">
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative inline-flex rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive ? "text-plum" : "text-ink-soft hover:text-plum"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-plum/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={profile.cv}
              download="Diya-Fathima-M-CV.pdf"
              className="hidden items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-plum-deep md:inline-flex"
            >
              <Download size={15} aria-hidden="true" />
              CV
            </a>
            <button
              type="button"
              className={`flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
                open ? "bg-cream/15 text-cream" : "bg-plum/10 text-plum"
              }`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
              ref={open ? closeRef : undefined}
            >
              {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="on-dark fixed inset-0 z-[65] flex flex-col justify-between bg-plum-deep px-6 pb-8 pt-28 text-cream md:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 2.25rem) 2.25rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.25rem) 2.25rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.25rem) 2.25rem)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === link.id ? "location" : undefined}
                    className="font-display flex items-baseline gap-4 py-2 text-5xl leading-tight"
                  >
                    <span className="text-xs font-semibold tracking-widest text-rose">
                      0{i + 1}
                    </span>
                    <span className={active === link.id ? "italic text-rose" : ""}>
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="flex flex-col gap-4 border-t border-cream/15 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15, delay: 0 } }}
              transition={{ delay: 0.6 }}
            >
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 break-all text-base font-semibold"
              >
                {profile.email}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href={profile.cv}
                download="Diya-Fathima-M-CV.pdf"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-semibold text-plum-deep"
              >
                <Download size={16} aria-hidden="true" />
                Download CV
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
