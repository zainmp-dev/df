import { CursorFollower } from "@/components/ui/CursorFollower";
import { ScrollTop } from "@/components/ui/ScrollTop";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Preloader } from "@/components/layout/Preloader";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Workflow } from "@/components/sections/Workflow";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[120] -translate-y-24 rounded-full bg-plum px-5 py-3 text-sm font-semibold text-cream transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Preloader />
      <Navbar />
      <CursorFollower />
      <ScrollTop />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Workflow />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
