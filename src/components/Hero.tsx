import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Compass, Mountain } from "lucide-react";
import { Crest } from "./ui";
import { useI18n } from "../lib/i18n";
import hotel from "../content/hotel.json";

const SLIDE_MS = 6000;

export default function Hero() {
  const { t, L } = useI18n();
  const [slide, setSlide] = useState(0);
  const images = hotel.heroImages;

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % images.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [images.length]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="inicio" className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden">
      {/* Slideshow de fondo */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/50 to-night" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <Crest size={110} />
        </motion.div>

        <h1 className="mt-6 font-display text-4xl leading-tight text-cream sm:text-6xl md:text-7xl">
          La Casa de <span className="text-gold">Maruja</span>
        </h1>
        <p className="mt-4 font-serif text-xl text-beige/85 italic sm:text-2xl">{L(hotel.motto)}</p>
        <p className="mt-2 text-xs tracking-[0.4em] text-copper uppercase">{L(hotel.tagline)}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => go("hotel")}
            className="flex items-center justify-center gap-2 rounded-xl bg-wine px-8 py-4 font-display text-base text-cream shadow-[0_10px_35px_-10px_rgba(139,30,35,0.8)] transition-colors duration-300 hover:bg-wine-deep"
          >
            <Compass size={18} />
            {t("explore")}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => go("tours")}
            className="glass-light flex items-center justify-center gap-2 rounded-xl px-8 py-4 font-display text-base text-gold transition-colors duration-300 hover:border-gold/60"
          >
            <Mountain size={18} />
            {t("bookTour")}
          </motion.button>
        </div>

        {/* Indicadores del slideshow */}
        <div className="mt-10 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === slide ? "w-8 bg-gold" : "w-3 bg-cream/30 hover:bg-cream/50"
              }`}
            />
          ))}
        </div>
      </motion.div>

      <motion.button
        onClick={() => go("hotel")}
        aria-label="Bajar"
        className="absolute bottom-8 z-10 text-gold/70"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
