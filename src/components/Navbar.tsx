import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Building2,
  Grip,
  Mountain,
  UtensilsCrossed,
  Martini,
  Disc3,
  Info,
  Phone,
  Menu,
  X,
  Languages,
} from "lucide-react";
import { Crest } from "./ui";
import { useI18n, type Lang } from "../lib/i18n";

const LINKS = [
  { id: "inicio", key: "nav_home", Icon: Home },
  { id: "hotel", key: "nav_hotel", Icon: Building2 },
  { id: "palestra", key: "nav_rooms", Icon: Grip },
  { id: "tours", key: "nav_tours", Icon: Mountain },
  { id: "restaurante", key: "nav_restaurant", Icon: UtensilsCrossed },
  { id: "tragos", key: "nav_drinks", Icon: Martini },
  { id: "vinilos", key: "nav_vinyls", Icon: Disc3 },
  { id: "informacion", key: "nav_info", Icon: Info },
  { id: "contacto", key: "nav_contact", Icon: Phone },
] as const;

export default function Navbar() {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("inicio");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // sección activa
      let current = "inicio";
      for (const l of LINKS) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 120) current = l.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLang = () => setLang((lang === "es" ? "en" : "es") as Lang);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-lg" : "bg-gradient-to-b from-black/60 to-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
          <button
            onClick={() => go("inicio")}
            className="flex items-center gap-3"
            aria-label="La Casa de Maruja — inicio"
          >
            <Crest size={34} />
            <div className="hidden text-left sm:block">
              <span className="block font-display text-sm leading-tight tracking-wide text-gold">
                La Casa de Maruja
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-beige/60 uppercase">
                Huaraz · Perú
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map(({ id, key, Icon }) => (
              <button
                key={id}
                onClick={() => go(id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] transition-colors duration-300 ${
                  active === id
                    ? "bg-wine/40 text-gold"
                    : "text-beige/75 hover:bg-cream/5 hover:text-gold"
                }`}
              >
                <Icon size={14} />
                {t(key)}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 rounded-full border border-gold/30 px-3 py-1.5 text-xs font-semibold text-gold transition-colors duration-300 hover:bg-gold/10"
              aria-label="Cambiar idioma / Switch language"
            >
              <Languages size={13} />
              {lang === "es" ? "EN" : "ES"}
            </button>
            <button
              className="rounded-lg p-2 text-gold lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-0 right-0 flex h-full w-72 flex-col border-l border-gold/20 bg-night-deep p-6"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crest size={30} />
                  <span className="font-display text-sm text-gold">La Casa de Maruja</span>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="p-1 text-beige/60">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-1">
                {LINKS.map(({ id, key, Icon }, i) => (
                  <motion.button
                    key={id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    onClick={() => go(id)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition-colors duration-300 ${
                      active === id ? "bg-wine/40 text-gold" : "text-beige/80 hover:bg-cream/5"
                    }`}
                  >
                    <Icon size={17} className="text-copper" />
                    {t(key)}
                  </motion.button>
                ))}
              </nav>
              <div className="gold-rule my-6" />
              <p className="text-center font-serif text-xs text-beige/40 italic">
                Huaraz · Áncash · Perú
              </p>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
