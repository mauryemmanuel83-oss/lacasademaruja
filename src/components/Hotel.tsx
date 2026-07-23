import { useState } from "react";
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
  BookOpen,
  Tent,
  Copy,
  Siren,
  Users,
  Sparkles,
  Phone,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { Section, Reveal, SmartImage, Modal } from "./ui";
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
  tent: Tent,
};

const ABOUT_ICONS: Record<string, typeof BookOpen> = {
  history: BookOpen,
  who: Users,
  different: Sparkles,
};

type Service = (typeof hotel.services)[number];

type About = (typeof hotel.about)[number];

export default function Hotel() {
  const { t, L } = useI18n();
  const [about, setAbout] = useState<About | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [copied, setCopied] = useState(false);

  const handleService = (s: Service) => {
    if (s.action === "link" && "url" in s && s.url) {
      window.open(s.url, "_blank", "noopener,noreferrer");
    } else {
      setCopied(false);
      setService(s);
    }
  };

  const copyPassword = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback para navegadores sin Clipboard API
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const wifiService = hotel.services.find((s) => s.icon === "wifi")!;
  const quickLinks = [
    {
      Icon: Wifi,
      label: t("quick_wifi"),
      onClick: () => handleService(wifiService),
    },
    {
      Icon: MessageCircle,
      label: t("quick_whatsapp"),
      onClick: () => window.open("https://w.app/od6its", "_blank", "noopener,noreferrer"),
    },
    {
      Icon: Mountain,
      label: t("quick_tours"),
      onClick: () => window.open(hotel.contact.whatsappTours, "_blank", "noopener,noreferrer"),
    },
    {
      Icon: Siren,
      label: t("quick_sos"),
      onClick: () => document.getElementById("informacion")?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  return (
    <Section id="hotel" alt>
      {/* Acceso rápido para el viajero */}
      <Reveal className="mb-12">
        <div className="mx-auto grid max-w-3xl grid-cols-4 gap-2 sm:gap-3">
          {quickLinks.map(({ Icon, label, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className="card-hover flex flex-col items-center gap-2 rounded-xl border border-gold/25 bg-gradient-to-b from-wine/30 to-night p-3 sm:p-4"
            >
              <Icon size={20} className="text-gold" />
              <span className="text-[11px] leading-tight text-beige/85 sm:text-xs">{label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      {/* Cabecera compacta + chips "sobre nosotros" */}
      <Reveal className="mb-10 text-center">
        <h2 className="font-display text-3xl text-gold">{t("hotel_title")}</h2>
        <div className="gold-rule mx-auto mt-4 w-32" />
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {hotel.about.map((item) => {
            const Icon = ABOUT_ICONS[item.id] ?? BookOpen;
            return (
              <button
                key={item.id}
                onClick={() => setAbout(item)}
                className="flex items-center gap-1.5 rounded-full border border-cream/15 px-4 py-1.5 text-xs text-beige/75 transition-all duration-300 hover:border-gold/50 hover:text-gold"
              >
                <Icon size={13} className="text-copper" />
                {L(item.title)}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Modal sobre nosotros */}
      <Modal open={!!about} onClose={() => setAbout(null)}>
        {about && (
          <div className="p-6 sm:p-8">
            <div className="mb-4 flex items-center gap-3">
              {(() => {
                const Icon = ABOUT_ICONS[about.id] ?? BookOpen;
                return (
                  <span className="rounded-full bg-wine/25 p-3 text-gold">
                    <Icon size={20} />
                  </span>
                );
              })()}
              <h3 className="font-display text-xl text-gold">{L(about.title)}</h3>
            </div>
            <p className="leading-relaxed text-beige/85">{L(about.text)}</p>
          </div>
        )}
      </Modal>

      {/* Servicios interactivos */}
      <Reveal>
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
                <button
                  onClick={() => copyPassword(service.highlight!)}
                  className={`mx-auto mt-4 flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                    copied
                      ? "bg-emerald-900/60 text-emerald-300"
                      : "bg-gold text-night-deep hover:bg-gold-soft"
                  }`}
                >
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                  {copied ? t("copied") : t("copy")}
                </button>
              </div>
            )}

            {"list" in service && service.list && (
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {service.list.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-beige/85">
                    <Check size={15} className="mt-0.5 shrink-0 text-copper" />
                    {L(item)}
                  </li>
                ))}
              </ul>
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
