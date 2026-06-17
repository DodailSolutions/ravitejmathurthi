import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/footer";
import { MobileBottomMenu } from "@/components/mobile-bottom-menu";
import { AvatarBuddy } from "@/components/ui/avatar-buddy";
import { CommandPalette } from "@/components/ui/command-palette";
import { Cursor } from "@/components/ui/cursor";
import { Preloader } from "@/components/ui/preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Work />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <MobileBottomMenu />
      <AvatarBuddy />
      <CommandPalette />
      <Cursor />
    </>
  );
}
