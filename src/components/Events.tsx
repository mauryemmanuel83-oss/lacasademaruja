import { Disc3, Flame, Map, Wine, CalendarDays, Clock } from "lucide-react";
import { Section, SectionTitle, Reveal, SmartImage, Badge } from "./ui";
import { useI18n } from "../lib/i18n";
import events from "../content/events.json";

const ICONS: Record<string, typeof Flame> = {
  "disc-3": Disc3,
  flame: Flame,
  map: Map,
  wine: Wine,
};

export default function Events() {
  const { t, L } = useI18n();

  return (
    <Section id="eventos">
      <SectionTitle kicker="Agenda" title={t("events_title")} sub={t("events_sub")} />

      <div className="mx-auto max-w-4xl space-y-8">
        {events.map((ev, i) => {
          const Icon = ICONS[ev.icon] ?? CalendarDays;
          return (
            <Reveal key={ev.id} delay={i * 0.08}>
              <article className="card-hover overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-wine/25 via-night-deep to-night-deep">
                {/* Fotos del evento */}
                {ev.images && ev.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-1">
                    {ev.images.slice(0, 3).map((img, j) => (
                      <SmartImage
                        key={j}
                        src={img}
                        alt={L(ev.name)}
                        className={`h-40 w-full sm:h-52 ${j === 0 ? "col-span-1" : ""}`}
                      />
                    ))}
                  </div>
                )}
                <div className="p-7 sm:p-9">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                    <span className="rounded-full bg-wine/40 p-3 text-gold">
                      <Icon size={22} />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl text-cream">{L(ev.name)}</h3>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <Badge tone="gold">
                          <CalendarDays size={11} /> {L(ev.day)}
                        </Badge>
                        <Badge tone="copper">
                          <Clock size={11} /> {ev.time}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 leading-relaxed text-beige/80">{L(ev.description)}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
