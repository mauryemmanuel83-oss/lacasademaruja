import { useState } from "react";
import { Clock, Mountain, Gauge, Tag } from "lucide-react";
import { Section, SectionTitle, Reveal, SmartImage, Badge, Pill, Modal } from "./ui";
import { useI18n, STRINGS } from "../lib/i18n";
import tours from "../content/tours.json";
import hotel from "../content/hotel.json";

type Tour = (typeof tours)[number];

const CATEGORIES = ["all", "trekking", "escalada", "montanismo", "lagunas", "nevados", "cultural"] as const;

const DIFF_TONE: Record<string, "green" | "gold" | "copper" | "wine"> = {
  easy: "green",
  moderate: "gold",
  demanding: "copper",
  expert: "wine",
};

export default function Tours() {
  const { t, L } = useI18n();
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("all");
  const [selected, setSelected] = useState<Tour | null>(null);

  const filtered = cat === "all" ? tours : tours.filter((tr) => tr.category === cat);

  const diffLabel = (d: string) => t(`diff_${d}` as keyof typeof STRINGS);

  return (
    <Section id="tours" alt>
      <SectionTitle kicker="Aventura" title={t("tours_title")} sub={t("tours_sub")} />

      {/* Filtros */}
      <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <Pill key={c} active={cat === c} onClick={() => setCat(c)}>
            {c === "all" ? t("all") : t(`cat_${c}` as keyof typeof STRINGS)}
          </Pill>
        ))}
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tour, i) => (
          <Reveal key={tour.id} delay={(i % 3) * 0.08}>
            <article
              onClick={() => setSelected(tour)}
              className="card-hover group h-full cursor-pointer overflow-hidden rounded-2xl border border-cream/8 bg-night"
            >
              <div className="relative h-48 overflow-hidden">
                <SmartImage
                  src={tour.image}
                  alt={L(tour.name)}
                  label={L(tour.name)}
                  className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <Badge tone={DIFF_TONE[tour.difficulty] ?? "gold"}>{diffLabel(tour.difficulty)}</Badge>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg text-gold">{L(tour.name)}</h3>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-beige/65">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-copper" /> {L(tour.duration)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Mountain size={13} className="text-copper" /> {tour.altitude}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm text-beige/70">{L(tour.description)}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Detalle */}
      <Modal open={!!selected} onClose={() => setSelected(null)} wide>
        {selected && (
          <div>
            <div className="relative h-60 sm:h-72">
              <SmartImage
                src={selected.image}
                alt={L(selected.name)}
                label={L(selected.name)}
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-soft to-transparent" />
              <h3 className="absolute bottom-4 left-6 font-display text-2xl text-cream sm:text-3xl">
                {L(selected.name)}
              </h3>
            </div>
            <div className="p-6 sm:p-8">
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  { Icon: Clock, label: t("duration"), value: L(selected.duration) },
                  { Icon: Mountain, label: t("altitude"), value: selected.altitude },
                  { Icon: Gauge, label: t("difficulty"), value: diffLabel(selected.difficulty) },
                  { Icon: Tag, label: t("price"), value: t("price_ask") },
                ].map(({ Icon, label, value }, i) => (
                  <div key={i} className="rounded-xl border border-cream/8 bg-night p-3 text-center">
                    <Icon size={16} className="mx-auto mb-1.5 text-copper" />
                    <p className="text-[10px] tracking-widest text-beige/50 uppercase">{label}</p>
                    <p className="mt-0.5 text-sm text-cream">{value}</p>
                  </div>
                ))}
              </div>
              <p className="leading-relaxed text-beige/85">{L(selected.description)}</p>
              <a
                href={hotel.contact.whatsappTours}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block rounded-xl bg-wine py-3.5 text-center font-display text-cream transition-colors duration-300 hover:bg-wine-deep"
              >
                {t("ask")} · WhatsApp
              </a>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
