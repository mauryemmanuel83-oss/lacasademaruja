import { MessageCircle, Instagram, Facebook, MapPin, Mail, Phone } from "lucide-react";
import { Section, SectionTitle, Reveal, Crest } from "./ui";
import { useI18n } from "../lib/i18n";
import hotel from "../content/hotel.json";

export default function Contact() {
  const { t } = useI18n();
  const c = hotel.contact;

  const cards = [
    {
      Icon: MessageCircle,
      label: "WhatsApp",
      value: c.phone,
      href: `https://wa.me/${c.whatsapp}`,
      highlight: true,
    },
    { Icon: Mail, label: "Email", value: c.email, href: `mailto:${c.email}` },
    { Icon: Phone, label: t("nav_contact"), value: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
    { Icon: Instagram, label: "Instagram", value: c.instagramHandle, href: c.instagram },
    { Icon: Facebook, label: "Facebook", value: "La Casa de Maruja", href: c.facebook },
    { Icon: MapPin, label: "Google Maps", value: t("see_map"), href: c.maps },
  ];

  return (
    <Section id="contacto">
      <SectionTitle kicker="Hablemos" title={t("contact_title")} sub={t("contact_sub")} />

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ Icon, label, value, href, highlight }, i) => (
          <Reveal key={label} delay={(i % 3) * 0.06}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card-hover flex h-full items-center gap-4 rounded-2xl border p-5 ${
                highlight
                  ? "border-gold/40 bg-gradient-to-br from-wine/40 to-night-deep"
                  : "border-cream/8 bg-night-deep"
              }`}
            >
              <span className={`rounded-full p-3 ${highlight ? "bg-gold text-night-deep" : "bg-wine/25 text-gold"}`}>
                <Icon size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.25em] text-copper uppercase">{label}</p>
                <p className="truncate text-sm text-cream">{value}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <p className="mx-auto flex max-w-xl items-start justify-center gap-2 text-sm text-beige/60">
          <MapPin size={15} className="mt-0.5 shrink-0 text-wine" />
          {c.address}
        </p>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  const { t, L } = useI18n();
  return (
    <footer className="border-t border-gold/15 bg-night-deep px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <Crest size={52} />
        <div>
          <p className="font-display text-lg tracking-wide text-gold">La Casa de Maruja</p>
          <p className="mt-1 text-[10px] tracking-[0.4em] text-beige/50 uppercase">
            Huaraz · Áncash · Perú
          </p>
        </div>
        <div className="gold-rule w-56" />
        <p className="max-w-md font-serif text-sm text-beige/50 italic">"{L(hotel.motto)}"</p>
        <p className="text-xs text-beige/40">
          © {new Date().getFullYear()} La Casa de Maruja B&amp;B · {t("legal")}
        </p>
      </div>
    </footer>
  );
}
