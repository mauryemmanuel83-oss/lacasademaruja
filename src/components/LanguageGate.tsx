import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Crest } from "./ui";
import { useI18n } from "../lib/i18n";
import hotel from "../content/hotel.json";

const SLIDE_MS = 5000;

/** Primera pantalla: elegir idioma antes de entrar. */
export default function LanguageGate() {
  const { choose } = useI18n();
  const [slide, setSlide] = useState(0);
  const images = hotel.heroImages;

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % images.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-night px-6"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Slideshow de fondo con las fotos de la casa */}
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.img
            key={slide}
            src={images[slide]}
            alt=""
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.2 }, scale: { duration: SLIDE_MS / 1000 + 1.5, ease: "linear" } }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-night/85 via-night/70 to-night/90" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center text-center"
      >
        <Crest size={100} />
        <h1 className="mt-6 font-display text-3xl tracking-wide text-gold sm:text-4xl">
          La Casa de Maruja
        </h1>
        <p className="mt-2 font-serif text-lg text-beige/80 italic">
          B&amp;B · Huaraz — Áncash — Perú
        </p>

        <div className="gold-rule my-8 w-48" />

        <p className="mb-6 text-sm tracking-[0.25em] text-beige/70 uppercase">
          Elige tu idioma · Choose your language
        </p>

        <div className="flex w-full max-w-sm flex-col gap-4 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => choose("es")}
            className="flex-1 rounded-xl border border-gold/40 bg-wine px-8 py-4 font-display text-lg text-cream shadow-lg transition-colors duration-300 hover:bg-wine-deep"
          >
            Español
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => choose("en")}
            className="glass-light flex-1 rounded-xl px-8 py-4 font-display text-lg text-gold transition-colors duration-300 hover:border-gold/50"
          >
            English
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
