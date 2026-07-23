import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "es" | "en";
export type Bi = { es: string; en: string } | string;

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  chosen: boolean;
  choose: (l: Lang) => void;
  t: (key: keyof typeof STRINGS) => string;
  L: (field: Bi | undefined) => string;
};

/** Cadenas de interfaz (el contenido vive en /content como {es,en}) */
export const STRINGS = {
  explore: { es: "Explorar el Hotel", en: "Explore the Hotel" },
  bookTour: { es: "Reservar Tour", en: "Book a Tour" },
  nav_home: { es: "Inicio", en: "Home" },
  nav_hotel: { es: "Hotel", en: "Hotel" },
  nav_rooms: { es: "Palestra", en: "Climbing Wall" },
  nav_tours: { es: "Tours", en: "Tours" },
  nav_restaurant: { es: "Restaurante", en: "Restaurant" },
  nav_drinks: { es: "Carta de Bebidas", en: "Drinks" },
  nav_vinyls: { es: "Vinilos", en: "Vinyls" },
  nav_info: { es: "Información", en: "Info" },
  nav_contact: { es: "Contacto", en: "Contact" },
  services: { es: "Servicios incluidos", en: "Included services" },
  rooms_title: { es: "Habitaciones", en: "Rooms" },
  rooms_sub: {
    es: "Cálidas, limpias y pensadas para descansar después de un día en la montaña.",
    en: "Warm, clean and designed to rest after a day in the mountains.",
  },
  guests: { es: "huéspedes", en: "guests" },
  guest: { es: "huésped", en: "guest" },
  tours_title: { es: "Tours & Aventuras", en: "Tours & Adventures" },
  tours_sub: {
    es: "La Cordillera Blanca y Huayhuash desde la casa de un guía de montaña.",
    en: "The Cordillera Blanca and Huayhuash from a mountain guide's home.",
  },
  all: { es: "Todos", en: "All" },
  cat_trekking: { es: "Trekking", en: "Trekking" },
  cat_escalada: { es: "Escalada", en: "Climbing" },
  cat_montanismo: { es: "Montañismo", en: "Mountaineering" },
  cat_lagunas: { es: "Lagunas", en: "Lakes" },
  cat_nevados: { es: "Nevados", en: "Glaciers" },
  cat_cultural: { es: "Cultural", en: "Cultural" },
  duration: { es: "Duración", en: "Duration" },
  altitude: { es: "Altitud", en: "Altitude" },
  difficulty: { es: "Dificultad", en: "Difficulty" },
  price: { es: "Precio", en: "Price" },
  ask: { es: "Consultar", en: "Inquire" },
  diff_easy: { es: "Fácil", en: "Easy" },
  diff_moderate: { es: "Moderado", en: "Moderate" },
  diff_demanding: { es: "Exigente", en: "Demanding" },
  diff_expert: { es: "Experto", en: "Expert" },
  restaurant_title: { es: "Restaurante", en: "Restaurant" },
  restaurant_sub: {
    es: "Cocina casera peruana, café de altura y el desayuno que enamora.",
    en: "Peruvian home cooking, highland coffee and the breakfast guests fall in love with.",
  },
  drinks_title: { es: "Carta de Bebidas", en: "Drinks Menu" },
  drinks_sub: {
    es: "Pisco sour de la casa, cervezas y bebidas para cerrar el día de montaña.",
    en: "House pisco sour, beers and drinks to end a mountain day.",
  },
  dcat_cerveza: { es: "Cervezas", en: "Beers" },
  price_ask: { es: "Consultar en recepción", en: "Ask at reception" },
  wifi_note: { es: "Válida para todos los pisos", en: "Valid on all floors" },
  copy: { es: "Copiar", en: "Copy" },
  copied: { es: "¡Copiada!", en: "Copied!" },
  quick_wifi: { es: "Clave WiFi", en: "WiFi Key" },
  quick_whatsapp: { es: "Recepción", en: "Reception" },
  quick_tours: { es: "Reservar Tour", en: "Book Tour" },
  quick_sos: { es: "Emergencias", en: "Emergencies" },
  tap_service: {
    es: "Toca cada servicio para ver detalles o pedir ayuda",
    en: "Tap each service for details or to ask for help",
  },
  open_whatsapp: { es: "Abrir WhatsApp", en: "Open WhatsApp" },
  palestra_free: {
    es: "Zapatos de escalada gratis para que pruebes",
    en: "Free climbing shoes so you can try",
  },
  dcat_pisco: { es: "Pisco", en: "Pisco" },
  dcat_gin: { es: "Gin", en: "Gin" },
  dcat_ron: { es: "Ron", en: "Rum" },
  dcat_whisky: { es: "Whisky", en: "Whisky" },
  dcat_clasicos: { es: "Clásicos", en: "Classics" },
  dcat_autor: { es: "De autor", en: "Signature" },
  "dcat_sin-alcohol": { es: "Sin alcohol", en: "Non-alcoholic" },
  ingredients: { es: "Ingredientes", en: "Ingredients" },
  story: { es: "Historia", en: "Story" },
  abv: { es: "Alcohol", en: "ABV" },
  vinyls_title: { es: "Biblioteca de Vinilos", en: "Vinyl Library" },
  vinyls_sub: {
    es: "Nuestra colección gira todas las noches. Elige un disco y pídenos ponerlo.",
    en: "Our collection spins every night. Pick a record and ask us to play it.",
  },
  vinyls_browse: { es: "Explorar la colección", en: "Browse the collection" },
  vinyls_hide: { es: "Ocultar la colección", en: "Hide the collection" },
  vstatus_available: { es: "Disponible", en: "Available" },
  vstatus_borrowed: { es: "Prestado", en: "Borrowed" },
  vstatus_listening: { es: "Escuchando", en: "Now playing" },
  gcat_rock: { es: "Rock", en: "Rock" },
  gcat_jazz: { es: "Jazz", en: "Jazz" },
  gcat_blues: { es: "Blues", en: "Blues" },
  gcat_peruano: { es: "Peruano", en: "Peruvian" },
  gcat_latino: { es: "Latino", en: "Latin" },
  gcat_pop: { es: "Pop", en: "Pop" },
  gcat_disco: { es: "Disco", en: "Disco" },
  gcat_funk: { es: "Funk", en: "Funk" },
  gcat_soul: { es: "Soul", en: "Soul" },
  gcat_clasica: { es: "Clásica", en: "Classical" },
  tracks: { es: "Canciones", en: "Tracks" },
  year: { es: "Año", en: "Year" },
  genre: { es: "Género", en: "Genre" },
  country: { es: "País", en: "Country" },
  info_title: { es: "Información Útil", en: "Useful Information" },
  info_sub: {
    es: "Todo lo que necesitas saber sobre Huaraz, la altura y tu seguridad.",
    en: "Everything you need to know about Huaraz, altitude and your safety.",
  },
  events_title: { es: "Eventos de la Casa", en: "House Events" },
  events_sub: {
    es: "Lo que se viene en La Casa de Maruja.",
    en: "What's coming up at La Casa de Maruja.",
  },
  gallery_title: { es: "Galería", en: "Gallery" },
  contact_title: { es: "Contacto", en: "Contact" },
  contact_sub: {
    es: "Escríbenos por WhatsApp o visítanos — la puerta siempre está abierta.",
    en: "Message us on WhatsApp or visit us — the door is always open.",
  },
  see_map: { es: "Ver en Google Maps", en: "View on Google Maps" },
  legal: {
    es: "Guía digital del huésped · Todos los derechos reservados",
    en: "Digital guest guide · All rights reserved",
  },
  hotel_title: { es: "El Hotel", en: "The Hotel" },
  hotel_sub: {
    es: "Una casa familiar al pie de la Cordillera Blanca.",
    en: "A family home at the foot of the Cordillera Blanca.",
  },
  welcome: { es: "Bienvenido", en: "Welcome" },
  choose_lang: { es: "Elige tu idioma", en: "Choose your language" },
  lang_es: { es: "Español", en: "Spanish" },
  lang_en: { es: "Inglés", en: "English" },
  close: { es: "Cerrar", en: "Close" },
  directory: { es: "Directorio de Huaraz", en: "Huaraz Directory" },
  view_room: { es: "Ver detalles", en: "View details" },
  per_night: { es: "por noche", en: "per night" },
  whatsapp_cta: { es: "Escríbenos por WhatsApp", en: "Message us on WhatsApp" },
} as const;

const Ctx = createContext<I18nCtx | null>(null);
const LS_KEY = "maruja-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved === "en" || saved === "es" ? saved : "es";
  });
  const [chosen, setChosen] = useState(() => localStorage.getItem(LS_KEY) !== null);

  useEffect(() => {
    localStorage.setItem(LS_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const choose = (l: Lang) => {
    setLang(l);
    setChosen(true);
  };

  const t = (key: keyof typeof STRINGS) => STRINGS[key][lang];
  const L = (field: Bi | undefined) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    return field[lang];
  };

  return <Ctx.Provider value={{ lang, setLang, chosen, choose, t, L }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
