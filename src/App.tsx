import { AnimatePresence } from "motion/react";
import { useI18n } from "./lib/i18n";
import LanguageGate from "./components/LanguageGate";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Hotel from "./components/Hotel";
import Palestra from "./components/Palestra";
import Tours from "./components/Tours";
import Restaurant from "./components/Restaurant";
import Drinks from "./components/Drinks";
import Vinyls from "./components/Vinyls";
import InfoUtil from "./components/InfoUtil";
import Events from "./components/Events";
import Gallery from "./components/Gallery";
import Contact, { Footer } from "./components/Contact";

export default function App() {
  const { chosen } = useI18n();

  return (
    <div className="min-h-dvh">
      <AnimatePresence>{!chosen && <LanguageGate />}</AnimatePresence>
      {chosen && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Hotel />
            <Tours />
            <InfoUtil />
            <Restaurant />
            <Drinks />
            <Palestra />
            <Events />
            <Vinyls />
            <Gallery />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
