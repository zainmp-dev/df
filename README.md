# Diya Fathima M — Portfolio

Personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger and Lucide icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm run start
```

Set `NEXT_PUBLIC_SITE_URL` to your live domain before deploying so social-preview URLs resolve correctly.

## Where things live

- `src/data/portfolio.ts` — every piece of content (taken from the CV). Edit here to update the site.
- `src/components/sections/` — Hero, About, Skills, Experience, Projects, Education, Contact, Marquee.
- `src/components/layout/` — Preloader, Navbar, Footer.
- `src/components/ui/` — shared building blocks (Reveal, AnimatedHeading, Button, DarkPanel, …).
- `src/lib/gsap.ts` — GSAP/ScrollTrigger registration and the reduced-motion media query.
- `public/images/bannerimg.png` — hero banner portrait.
- `public/images/aboutimg.png` — About section portrait.
- `public/images/og.jpg` — social preview image. `public/Diya-Fathima-M-CV.pdf` — downloadable CV.

## Animation split

- **Framer Motion:** preloader, nav entrance/hide/active pill, mobile menu, scroll reveals, staggered headings, card and button interactions.
- **GSAP:** hero intro timeline and portrait reveal, scroll parallax, skills marquee, scroll-scrubbed About statement, count-up numbers, pinned sideways "How I work" section, 3D card tilt, cursor ring, timeline progress, dark-panel transitions, footer wordmark.
- Every GSAP setup runs inside `gsap.matchMedia()` and is reverted on unmount; reduced-motion users get a static page.
