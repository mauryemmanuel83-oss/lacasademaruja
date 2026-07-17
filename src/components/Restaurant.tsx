import { useState } from "react";
import { Sunrise, UtensilsCrossed, Moon, Cookie, Coffee, CakeSlice } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Section, SectionTitle, Reveal, Pill } from "./ui";
import { useI18n } from "../lib/i18n";
import menu from "../content/menu.json";

const ICONS: Record<string, typeof Coffee> = {
  sunrise: Sunrise,
  utensils: UtensilsCrossed,
  moon: Moon,
  cookie: Cookie,
  coffee: Coffee,
  cake: CakeSlice,
};

export default function Restaurant() {
  const { t, L } = useI18n();
  const [active, setActive] = useState(menu.categories[0].id);
  const category = menu.categories.find((c) => c.id === active)!;

  return (
    <Section id="restaurante">
      <SectionTitle kicker="Sabores" title={t("restaurant_title")} sub={t("restaurant_sub")} />

      <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
        {menu.categories.map((c) => (
          <Pill key={c.id} active={active === c.id} onClick={() => setActive(c.id)}>
            {L(c.name)}
          </Pill>
        ))}
      </Reveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mx-auto max-w-3xl"
        >
          <div className="rounded-2xl border border-gold/20 bg-night-deep p-8 sm:p-10">
            <div className="mb-8 flex items-center justify-center gap-3">
              {(() => {
                const Icon = ICONS[category.icon] ?? Coffee;
                return <Icon size={22} className="text-copper" />;
              })()}
              <h3 className="font-display text-2xl text-gold">{L(category.name)}</h3>
            </div>

            <ul className="space-y-7">
              {category.items.map((item, i) => (
                <li key={i}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-lg font-semibold text-cream">
                      {L(item.name)}
                    </span>
                    <span className="mx-1 flex-1 border-b border-dotted border-gold/25" />
                    <span className="font-display text-sm whitespace-nowrap text-gold">
                      {L(item.price)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-beige/65">{L(item.desc)}</p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
}
