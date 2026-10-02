import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import { AdminPage } from "./pages/AdminPage";

function HomePage() {
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
