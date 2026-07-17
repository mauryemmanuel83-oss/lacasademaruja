import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionTitle, Reveal, SmartImage } from "./ui";
import { useI18n } from "../lib/i18n";
import gallery from "../content/gallery.json";

export default function Gallery() {
  const { t, L } = useI18n();
  const [index, setIndex] = useState<number | null>(null);

  const prev = () => setIndex((i) => (i === null ? null : (i + gallery.length - 1) % gallery.length));
  const next = () => setIndex((i) => (i === null ? null : (i + 1) % gallery.length));

  return (
    <Section id="galeria" alt>
      <SectionTitle kicker="Momentos" title={t("gallery_title")} />

      {/* Masonry con CSS columns */}
      <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {gallery.map((photo, i) => (
          <Reveal key={i} delay={(i % 3) * 0.06}>
            <button
              onClick={() => setIndex(i)}
              className="group block w-full overflow-hidden rounded-xl border border-cream/8"
              aria-label={L(photo.alt)}
            >
              <SmartImage
                src={photo.src}
                alt={L(photo.alt)}
                label={L(photo.alt)}
                className={`w-full transition-transform duration-500 group-hover:scale-105 ${
                  photo.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              />
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {index !== null && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIndex(null)}
          >
            <button
              className="absolute top-5 right-5 rounded-full bg-cream/10 p-2.5 text-cream transition-colors duration-300 hover:bg-cream/20"
              aria-label="Cerrar"
            >
              <X size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 rounded-full bg-cream/10 p-2.5 text-cream transition-colors duration-300 hover:bg-cream/20 sm:left-6"
              aria-label="Anterior"
            >
              <ChevronLeft size={22} />
            </button>
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="max-h-[85dvh] w-full max-w-4xl overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage
                src={gallery[index].src}
                alt={L(gallery[index].alt)}
                label={L(gallery[index].alt)}
                className="max-h-[80dvh] w-full"
              />
              <p className="bg-night-deep p-4 text-center font-serif text-sm text-beige/80 italic">
                {L(gallery[index].alt)}
              </p>
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 rounded-full bg-cream/10 p-2.5 text-cream transition-colors duration-300 hover:bg-cream/20 sm:right-6"
              aria-label="Siguiente"
            >
              <ChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
