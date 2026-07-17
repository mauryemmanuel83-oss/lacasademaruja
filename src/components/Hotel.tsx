import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Wifi,
  Droplets,
  BellRing,
  Coffee,
  Shirt,
  Map,
  Mountain,
  Luggage,
  Check,
  MapPin,
  ChevronDown,
  BookOpen,
  Users,
  Sparkles,
  Phone,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { Section, SectionTitle, Reveal, SmartImage, Modal } from "./ui";
import { useI18n } from "../lib/i18n";
import hotel from "../content/hotel.json";

const SERVICE_ICONS: Record<string, typeof Wifi> = {
  wifi: Wifi,
  droplets: Droplets,
  bell: BellRing,
  coffee: Coffee,
  shirt: Shirt,
  map: Map,
  mountain: Mountain,
  luggage: Luggage,
};

const ABOUT_ICONS: Record<string, typeof BookOpen> = {
  history: BookOpen,
  who: Users,
  different: Sparkles,
};

type Service = (typeof hotel.services)[number];

export default function Hotel() {
  const { t, L } = useI18n();
  const [openAbout, setOpenAbout] = useState<string | null>(null);
  const [service, setService] = useState<Service | null>(null);

  const handleService = (s: Service) => {
    if (s.action === "link" && "url" in s && s.url) {
      window.open(s.url, "_blank", "noopener,noreferrer");
    } else {
      setService(s);
    }
  };

  return (
    <Section id="hotel" alt>
      <SectionTitle kicker="La Casa" title={t("hotel_title")} sub={t("hotel_sub")} />

      {/* Sobre nosotros — paneles desplegables compactos */}
      <div className="mx-auto max-w-3xl space-y-3">
        {hotel.about.map((item, i) => {
          const Icon = ABOUT_ICONS[item.id] ?? BookOpen;
          const open = openAbout === item.id;
          return (
            <Reveal key={item.id} delay={i * 0.06}>
              <div
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                  open ? "border-gold/40 bg-night" : "border-cream/8 bg-night hover:border-gold/25"
                }`}
              >
                <button
                  onClick={() => setOpenAbout(open ? null : item.id)}
                  className="flex w-full items-center justify-between gap-3 p-5 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="rounded-full bg-wine/25 p-2.5 text-gold">
                      <Icon size={17} />
                    </span>
                    <span className="font-display text-base text-cream">{L(item.title)}</span>
                  </span>
                  <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={18} className="text-gold/70" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 leading-relaxed text-beige/80">{L(item.text)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Servicios interactivos */}
      <Reveal className="mt-14">
        <h3 className="mb-3 text-center font-display text-2xl text-gold">{t("services")}</h3>
        <p className="mb-8 text-center font-serif text-sm text-beige/60 italic">
          {t("tap_service")}
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {hotel.services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon] ?? Check;
            return (
              <Reveal key={i} delay={i * 0.05}>
                <button
                  onClick={() => handleService(s)}
                  className="card-hover flex h-full w-full flex-col items-center gap-3 rounded-xl border border-cream/8 bg-night p-6 text-center"
                >
                  <span className="rounded-full bg-wine/25 p-3 text-gold">
                    <Icon size={22} />
                  </span>
                  <span className="text-sm text-beige/85">{L(s.name)}</span>
                  {s.action === "link" && (
                    <ExternalLink size={12} className="text-copper/60" />
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>
      </Reveal>

      {/* Modal de servicio */}
      <Modal open={!!service} onClose={() => setService(null)}>
        {service && (
          <div className="p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              {(() => {
                const Icon = SERVICE_ICONS[service.icon] ?? Check;
                return (
                  <span className="rounded-full bg-wine/25 p-3 text-gold">
                    <Icon size={22} />
                  </span>
                );
              })()}
              <h3 className="font-display text-xl text-gold">{L(service.name)}</h3>
            </div>

            {"image" in service && service.image && (
              <div className="mb-4 overflow-hidden rounded-xl border border-cream/10">
                <SmartImage src={service.image} alt={L(service.name)} className="h-52 w-full" />
              </div>
            )}

            <p className="leading-relaxed text-beige/85">{L(service.detail)}</p>

            {"highlight" in service && service.highlight && (
              <div className="mt-5 rounded-xl border border-gold/40 bg-night-deep p-5 text-center">
                <p className="font-display text-3xl tracking-[0.2em] text-gold select-all">
                  {service.highlight}
                </p>
                <p className="mt-2 text-xs tracking-widest text-beige/50 uppercase">{t("wifi_note")}</p>
              </div>
            )}

            {"phone" in service && service.phone && (
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${service.phone.replace(/\s/g, "")}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gold/40 py-3 text-sm font-medium text-gold transition-colors duration-300 hover:bg-gold/10"
                >
                  <Phone size={16} /> {service.phone}
                </a>
                <a
                  href={`https://wa.me/${service.phone.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-wine py-3 text-sm font-medium text-cream transition-colors duration-300 hover:bg-wine-deep"
                >
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Mapa embebido de Google Maps */}
      <Reveal className="mt-14">
        <div className="overflow-hidden rounded-2xl border border-cream/8">
          <iframe
            src={hotel.contact.mapsEmbed}
            title="Google Maps — La Casa de Maruja"
            className="h-72 w-full border-0 md:h-96"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="flex flex-col items-start justify-between gap-4 bg-night p-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-wine" />
              <p className="text-sm text-beige/85">{hotel.contact.address}</p>
            </div>
            <a
              href={hotel.contact.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg border border-gold/40 px-5 py-2.5 text-sm font-medium text-gold transition-colors duration-300 hover:bg-gold/10"
            >
              {t("see_map")}
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
