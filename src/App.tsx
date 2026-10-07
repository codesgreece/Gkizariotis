import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { FloatingCallCTA } from "./components/FloatingCallCTA";
import { SeoHead } from "./components/SeoHead";
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
import { NotFoundPage } from "./pages/NotFoundPage";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
} from "./lib/site";

function HomePage() {
  return (
    <>
      <SeoHead
        title={DEFAULT_TITLE}
        description={DEFAULT_DESCRIPTION}
        path="/"
        robots="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <a href="#main-content" className="skip-link">
        Μετάβαση στο περιεχόμενο
      </a>
      <Header />
      <main id="main-content">
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

function AdminRoute() {
  return (
    <>
      <SeoHead
        title={`Διαχείριση έργων | ${SITE_NAME}`}
        description="Ιδιωτική σελίδα διαχείρισης έργων."
        path="/admin"
        robots="noindex, nofollow"
      />
      <AdminPage />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
