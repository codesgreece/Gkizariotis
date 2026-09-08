import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingCallCTA } from "./components/FloatingCallCTA";
import { Hero } from "./components/sections/Hero";
import { Intro } from "./components/sections/Intro";
import { Services } from "./components/sections/Services";
import { KeyInHand } from "./components/sections/KeyInHand";
import { Projects } from "./components/sections/Projects";
import { WhyUs } from "./components/sections/WhyUs";
import { Process } from "./components/sections/Process";
import { ServiceAreas } from "./components/sections/ServiceAreas";
import { CTABanner } from "./components/sections/CTABanner";
import { Contact } from "./components/sections/Contact";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Services />
        <KeyInHand />
        <Projects />
        <WhyUs />
        <Process />
        <ServiceAreas />
        <CTABanner />
        <Contact />
      </main>
      <Footer />
      <FloatingCallCTA />
    </>
  );
}
