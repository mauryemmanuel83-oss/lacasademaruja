import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  ListChecks,
  MountainSnow,
  ShieldAlert,
  CloudSun,
  Banknote,
  Landmark,
  Pill,
  Hospital,
  UtensilsCrossed,
  ShoppingBasket,
  Bus,
  CarTaxiFront,
  Siren,
  Check,
} from "lucide-react";
import { Section, SectionTitle, Reveal } from "./ui";
import { useI18n } from "../lib/i18n";
import info from "../content/info.json";

const DIR_ICONS: Record<string, typeof Banknote> = {
  banknote: Banknote,
  landmark: Landmark,
  pill: Pill,
  hospital: Hospital,
  utensils: UtensilsCrossed,
  "shopping-basket": ShoppingBasket,
  bus: Bus,
  "car-taxi-front": CarTaxiFront,
  siren: Siren,
};

function Accordion({
  title,
  Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  Icon: typeof ListChecks;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-2xl border border-cream/8 bg-night">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 p-5 text-left transition-colors duration-300 hover:bg-cream/[0.03]"
      >
        <span className="flex items-center gap-3">
          <span className="rounded-full bg-wine/25 p-2.5 text-gold">
            <Icon size={18} />
          </span>
          <span className="font-display text-base text-cream">{title}</span>
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
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function InfoUtil() {
  const { t, L } = useI18n();

  return (
    <Section id="informacion" alt>
      <SectionTitle kicker="Huaraz" title={t("info_title")} sub={t("info_sub")} />

      <div className="mx-auto max-w-3xl space-y-4">
        <Reveal>
          <Accordion title={L(info.checklist.title)} Icon={ListChecks} defaultOpen>
            <ul className="space-y-2.5">
              {info.checklist.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-beige/80">
                  <Check size={15} className="mt-0.5 shrink-0 text-copper" />
                  {L(item)}
                </li>
              ))}
            </ul>
          </Accordion>
        </Reveal>

        <Reveal delay={0.05}>
          <Accordion title={L(info.altitude.title)} Icon={MountainSnow}>
            <ul className="space-y-2.5">
              {info.altitude.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-beige/80">
                  <Check size={15} className="mt-0.5 shrink-0 text-copper" />
                  {L(item)}
                </li>
              ))}
            </ul>
          </Accordion>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion title={L(info.dontDo.title)} Icon={ShieldAlert}>
            <ul className="space-y-2.5">
              {info.dontDo.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-beige/80">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-wine" />
                  {L(item)}
                </li>
              ))}
            </ul>
          </Accordion>
        </Reveal>

        <Reveal delay={0.15}>
          <Accordion title={L(info.weather.title)} Icon={CloudSun}>
            <p className="text-sm leading-relaxed text-beige/80">{L(info.weather.text)}</p>
          </Accordion>
        </Reveal>
      </div>

      {/* Directorio */}
      <Reveal className="mt-14">
        <h3 className="mb-8 text-center font-display text-2xl text-gold">{t("directory")}</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {info.directory.map((d, i) => {
            const Icon = DIR_ICONS[d.icon] ?? Landmark;
            return (
              <Reveal key={i} delay={(i % 3) * 0.05}>
                <div className="card-hover h-full rounded-xl border border-cream/8 bg-night p-5">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-copper/15 p-2.5 text-copper">
                      <Icon size={17} />
                    </span>
                    <h4 className="font-display text-sm text-cream">{L(d.name)}</h4>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-beige/65">{L(d.detail)}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Reveal>
    </Section>
  );
}
