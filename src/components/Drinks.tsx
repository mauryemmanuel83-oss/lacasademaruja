import { useState } from "react";
import { Wine, Percent } from "lucide-react";
import { Section, SectionTitle, Reveal, SmartImage, Badge, Pill, Modal } from "./ui";
import { useI18n, STRINGS } from "../lib/i18n";
import drinks from "../content/drinks.json";

type Drink = (typeof drinks)[number];

const CATS = ["all", "pisco", "cerveza", "sin-alcohol"] as const;

export default function Drinks() {
  const { t, L } = useI18n();
  const [cat, setCat] = useState<(typeof CATS)[number]>("all");
  const [selected, setSelected] = useState<Drink | null>(null);

  const filtered = cat === "all" ? drinks : drinks.filter((d) => d.category === cat);

  return (
    <Section id="tragos" alt className="relative overflow-hidden">
      {/* ambiente de bar */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,30,35,0.18),transparent_60%)]" />

      <SectionTitle kicker="La Barra" title={t("drinks_title")} sub={t("drinks_sub")} />

      <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
        {CATS.map((c) => (
          <Pill key={c} active={cat === c} onClick={() => setCat(c)}>
            {c === "all" ? t("all") : t(`dcat_${c}` as keyof typeof STRINGS)}
          </Pill>
        ))}
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((drink, i) => (
          <Reveal key={drink.id} delay={(i % 3) * 0.07}>
            <article
              onClick={() => setSelected(drink)}
              className="card-hover group flex h-full cursor-pointer gap-4 rounded-2xl border border-cream/8 bg-night p-4"
            >
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                <SmartImage
                  src={drink.image}
                  alt={L(drink.name)}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-108"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-base text-gold">{L(drink.name)}</h3>
                  <span className="font-display text-sm whitespace-nowrap text-copper">
                    {L(drink.price)}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-beige/60">{L(drink.ingredients)}</p>
                <div className="mt-2.5 flex gap-2">
                  <Badge tone="wine">{t(`dcat_${drink.category}` as keyof typeof STRINGS)}</Badge>
                  <Badge tone="muted">
                    <Percent size={10} />
                    {drink.abv}
                  </Badge>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div>
            <div className="relative h-56">
              <SmartImage
                src={selected.image}
                alt={L(selected.name)}
                label={L(selected.name)}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-soft to-transparent" />
              <div className="absolute bottom-4 left-6">
                <h3 className="font-display text-2xl text-cream">{L(selected.name)}</h3>
                <p className="font-display text-sm text-gold">{L(selected.price)}</p>
              </div>
            </div>
            <div className="space-y-5 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <Badge tone="wine">
                  <Wine size={11} />
                  {t(`dcat_${selected.category}` as keyof typeof STRINGS)}
                </Badge>
                <Badge tone="muted">
                  {t("abv")}: {selected.abv}
                </Badge>
              </div>
              <div>
                <p className="mb-1 text-[10px] tracking-[0.25em] text-copper uppercase">
                  {t("ingredients")}
                </p>
                <p className="text-sm text-beige/85">{L(selected.ingredients)}</p>
              </div>
              <div>
                <p className="mb-1 text-[10px] tracking-[0.25em] text-copper uppercase">
                  {t("story")}
                </p>
                <p className="font-serif text-base leading-relaxed text-beige/85 italic">
                  {L(selected.story)}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
