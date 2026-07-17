import { Footprints, Mountain } from "lucide-react";
import { Section, Reveal, SmartImage, Badge } from "./ui";
import { useI18n } from "../lib/i18n";
import hotel from "../content/hotel.json";

/** La palestra de la casa: escala gratis, zapatos incluidos. */
export default function Palestra() {
  const { t, L } = useI18n();
  const c = hotel.climbing;

  return (
    <Section id="palestra">
      <Reveal>
        <div className="mx-auto grid max-w-5xl items-center gap-8 overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-wine/20 via-night-deep to-night-deep md:grid-cols-2">
          <div className="relative h-64 md:h-full md:min-h-80">
            <SmartImage src={c.image} alt={L(c.title)} label={L(c.title)} className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-night-deep/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-night-deep/80" />
          </div>
          <div className="p-8 pt-2 md:p-10 md:pl-2">
            <p className="mb-3 font-sans text-xs font-semibold tracking-[0.35em] text-copper uppercase">
              {t("nav_rooms")}
            </p>
            <h2 className="font-display text-3xl text-gold">{L(c.title)}</h2>
            <div className="gold-rule my-5 w-24" />
            <p className="leading-relaxed text-beige/85">{L(c.text)}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge tone="gold">
                <Footprints size={11} /> {t("palestra_free")}
              </Badge>
              <Badge tone="wine">
                <Mountain size={11} /> Hatun Machay
              </Badge>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
