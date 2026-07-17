import { motion } from "motion/react";
import { Crest } from "./ui";
import { useI18n } from "../lib/i18n";

/** Primera pantalla: elegir idioma antes de entrar. */
export default function LanguageGate() {
  const { choose } = useI18n();

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night px-6"
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* fondo con montañas sutiles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.07]">
        <svg viewBox="0 0 1200 600" className="absolute bottom-0 w-full" preserveAspectRatio="xMidYMax slice">
          <path d="M0 600 L200 250 L340 420 L520 150 L720 400 L880 230 L1200 480 L1200 600 Z" fill="#C7A04A" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center text-center"
      >
        <Crest size={84} />
        <h1 className="mt-6 font-display text-3xl tracking-wide text-gold sm:text-4xl">
          La Casa de Maruja
        </h1>
        <p className="mt-2 font-serif text-lg text-beige/70 italic">
          B&amp;B · Huaraz — Áncash — Perú
        </p>

        <div className="gold-rule my-8 w-48" />

        <p className="mb-6 text-sm tracking-[0.25em] text-beige/60 uppercase">
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
