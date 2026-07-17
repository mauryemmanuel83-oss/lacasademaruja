import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mountain } from "lucide-react";

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Section wrapper ---------- */
export function Section({
  id,
  children,
  className = "",
  alt = false,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
}) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-20 px-5 py-20 sm:px-8 md:py-28 ${
        alt ? "bg-night-deep" : "bg-night"
      } ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionTitle({
  kicker,
  title,
  sub,
}: {
  kicker?: string;
  title: string;
  sub?: string;
}) {
  return (
    <Reveal className="mb-12 text-center md:mb-16">
      {kicker && (
        <p className="mb-3 font-sans text-xs font-semibold tracking-[0.35em] text-copper uppercase">
          {kicker}
        </p>
      )}
      <h2 className="font-display text-3xl text-gold md:text-5xl">{title}</h2>
      <div className="gold-rule mx-auto mt-6 w-40" />
      {sub && (
        <p className="mx-auto mt-5 max-w-2xl font-serif text-lg text-beige/80 italic md:text-xl">
          {sub}
        </p>
      )}
    </Reveal>
  );
}

/* ---------- Badge ---------- */
export function Badge({
  children,
  tone = "gold",
}: {
  children: ReactNode;
  tone?: "gold" | "wine" | "copper" | "green" | "muted";
}) {
  const tones: Record<string, string> = {
    gold: "bg-gold/15 text-gold-soft border-gold/30",
    wine: "bg-wine/25 text-[#e8a0a4] border-wine/50",
    copper: "bg-copper/15 text-[#dfa671] border-copper/35",
    green: "bg-emerald-900/40 text-emerald-300/90 border-emerald-700/40",
    muted: "bg-cream/5 text-beige/60 border-cream/10",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

/* ---------- Filter pill ---------- */
export function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-300 ${
        active
          ? "border-gold bg-gold text-night-deep font-semibold shadow-[0_0_20px_-6px_rgba(199,160,74,0.6)]"
          : "border-cream/15 text-beige/70 hover:border-gold/50 hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}

/* ---------- Modal ---------- */
export function Modal({
  open,
  onClose,
  children,
  wide = false,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`relative max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl border border-gold/20 bg-night-soft shadow-2xl sm:rounded-2xl ${
              wide ? "max-w-3xl" : "max-w-xl"
            }`}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute top-4 right-4 z-10 rounded-full bg-night-deep/80 p-2 text-beige/70 transition-colors duration-300 hover:text-gold"
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- SmartImage: shows warm placeholder until real photo exists ---------- */
export function SmartImage({
  src,
  alt,
  className = "",
  label,
}: {
  src: string;
  alt: string;
  className?: string;
  label?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-wood/60 via-night-soft to-wine/30 ${className}`}
      >
        <div className="absolute inset-0 opacity-[0.15]">
          <svg viewBox="0 0 400 200" className="h-full w-full" preserveAspectRatio="xMidYMax slice">
            <path d="M0 200 L80 90 L140 150 L210 60 L280 140 L340 90 L400 160 L400 200 Z" fill="#C7A04A" />
            <path d="M0 200 L60 140 L130 180 L200 110 L290 180 L400 120 L400 200 Z" fill="#8B1E23" opacity="0.8" />
          </svg>
        </div>
        <div className="relative flex flex-col items-center gap-2 p-4 text-center">
          <Mountain className="text-gold/50" size={28} />
          {label && (
            <span className="font-serif text-sm text-beige/50 italic">{label}</span>
          )}
        </div>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  );
}

/* ---------- Logo del hotel ---------- */
export function Crest({ size = 56 }: { size?: number }) {
  return (
    <img
      src="/assets/logos/logo.png"
      alt="La Casa de Maruja B&B"
      width={size}
      height={size}
      className="object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
      style={{ width: size, height: "auto" }}
    />
  );
}
