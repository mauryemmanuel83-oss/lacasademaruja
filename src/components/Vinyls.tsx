import { useState } from "react";
import { Disc3, Play, Youtube, Music2 } from "lucide-react";
import { Section, Reveal, SmartImage, Badge, Pill, Modal } from "./ui";
import { useI18n, STRINGS } from "../lib/i18n";
import vinyls from "../content/vinyls.json";

type Vinyl = (typeof vinyls)[number];

const GENRES = ["all", "rock", "pop", "peruano", "latino"] as const;

const STATUS_TONE: Record<string, "green" | "copper" | "wine"> = {
  available: "green",
  borrowed: "copper",
  listening: "wine",
};

export default function Vinyls() {
  const { t, L } = useI18n();
  const [genre, setGenre] = useState<(typeof GENRES)[number]>("all");
  const [selected, setSelected] = useState<Vinyl | null>(null);
  const [open, setOpen] = useState(false);

  const filtered = genre === "all" ? vinyls : vinyls.filter((v) => v.genre === genre);

  return (
    <Section id="vinilos" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(111,78,55,0.22),transparent_55%)]" />

      {/* Cabecera compacta con botón desplegable */}
      <Reveal className="text-center">
        <h2 className="font-display text-3xl text-gold">{t("vinyls_title")}</h2>
        <div className="gold-rule mx-auto mt-4 w-32" />
        <p className="mx-auto mt-4 max-w-xl font-serif text-base text-beige/75 italic">
          {t("vinyls_sub")}
        </p>
        <button
          onClick={() => setOpen(!open)}
          className={`mx-auto mt-6 flex items-center gap-2 rounded-xl border px-6 py-3 font-display text-sm transition-all duration-300 ${
            open
              ? "border-cream/20 text-beige/70 hover:border-gold/40 hover:text-gold"
              : "border-gold/50 bg-wine/30 text-gold hover:bg-wine/50"
          }`}
        >
          <Disc3 size={17} className={open ? "" : "vinyl-spin"} />
          {open ? t("vinyls_hide") : `${t("vinyls_browse")} (${vinyls.length})`}
        </button>
      </Reveal>

      {open && (
      <div className="mt-10">
      <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
        {GENRES.map((g) => (
          <Pill key={g} active={genre === g} onClick={() => setGenre(g)}>
            {g === "all" ? t("all") : t(`gcat_${g}` as keyof typeof STRINGS)}
          </Pill>
        ))}
      </Reveal>

      {/* Estantería */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {filtered.map((vinyl, i) => (
          <Reveal key={vinyl.id} delay={(i % 4) * 0.06}>
            <button
              onClick={() => setSelected(vinyl)}
              className="group block w-full text-left"
              aria-label={`${vinyl.title} — ${vinyl.artist}`}
            >
              {/* Funda + disco asomando */}
              <div className="relative">
                <div className="card-hover relative z-10 aspect-square overflow-hidden rounded-lg border border-cream/10 bg-night-deep shadow-xl">
                  <SmartImage
                    src={vinyl.cover}
                    alt={vinyl.title}
                    label={vinyl.title}
                    className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />
                  {vinyl.status === "listening" && (
                    <div className="absolute right-2 bottom-2 rounded-full bg-wine p-1.5 text-cream shadow-lg">
                      <Disc3 size={14} className="vinyl-spin" />
                    </div>
                  )}
                </div>
                {/* disco de vinilo detrás */}
                <div className="absolute top-1/2 -right-3 z-0 h-[85%] w-[85%] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#1a1715_28%,#0d0c0b_29%,#211d1a_31%,#0d0c0b_33%,#211d1a_60%,#0d0c0b_62%)] opacity-0 transition-all duration-300 group-hover:-right-6 group-hover:opacity-100" />
              </div>
              <div className="mt-3 px-0.5">
                <p className="truncate font-serif text-base font-semibold text-cream">{vinyl.title}</p>
                <p className="truncate text-xs text-beige/60">
                  {vinyl.artist} · {vinyl.year}
                </p>
                <div className="mt-1.5">
                  <Badge tone={STATUS_TONE[vinyl.status] ?? "muted"}>
                    {t(`vstatus_${vinyl.status}` as keyof typeof STRINGS)}
                  </Badge>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
      </div>
      )}

      {/* Ficha del disco */}
      <Modal open={!!selected} onClose={() => setSelected(null)} wide>
        {selected && (
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row">
              <div className="relative mx-auto w-48 shrink-0 sm:mx-0 sm:w-56">
                <div className="aspect-square overflow-hidden rounded-lg border border-cream/10 shadow-2xl">
                  <SmartImage
                    src={selected.cover}
                    alt={selected.title}
                    label={selected.title}
                    className="h-full w-full"
                  />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-2xl text-gold">{selected.title}</h3>
                <p className="mt-1 font-serif text-lg text-cream italic">{selected.artist}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone="muted">{t("year")}: {selected.year}</Badge>
                  <Badge tone="gold">{t(`gcat_${selected.genre}` as keyof typeof STRINGS)}</Badge>
                  <Badge tone="muted">{selected.country}</Badge>
                  <Badge tone={STATUS_TONE[selected.status] ?? "muted"}>
                    {t(`vstatus_${selected.status}` as keyof typeof STRINGS)}
                  </Badge>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-beige/85">{L(selected.description)}</p>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-[10px] tracking-[0.25em] text-copper uppercase">{t("tracks")}</p>
              <ol className="grid gap-1.5 sm:grid-cols-2">
                {selected.tracks.map((track, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-sm text-beige/80">
                    <span className="w-5 text-right font-display text-xs text-gold/60">{i + 1}</span>
                    <Music2 size={12} className="shrink-0 text-copper/60" />
                    {track}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={selected.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1d4a2b] py-3 text-sm font-medium text-emerald-100 transition-colors duration-300 hover:bg-[#256237]"
              >
                <Play size={16} /> Spotify
              </a>
              <a
                href={selected.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-wine py-3 text-sm font-medium text-cream transition-colors duration-300 hover:bg-wine-deep"
              >
                <Youtube size={16} /> YouTube
              </a>
            </div>
          </div>
        )}
      </Modal>
    </Section>
  );
}
