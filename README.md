# La Casa de Maruja — Guía Digital del Huésped

Web app premium para huéspedes del hotel **La Casa de Maruja B&B** (Huaraz, Perú).
Pensada para abrirse con un QR al llegar al hotel.

## Comandos

```bash
npm install     # instalar dependencias
npm run dev     # desarrollo → http://localhost:3100
npm run build   # build de producción → carpeta dist/
```

## Cómo agregar contenido (sin tocar código)

Todo el contenido vive en `src/content/*.json`:

| Archivo | Contenido |
|---|---|
| `hotel.json` | Historia, servicios, contacto, redes |
| `rooms.json` | Habitaciones |
| `tours.json` | Catálogo de tours |
| `menu.json` | Menú del restaurante |
| `drinks.json` | Carta de tragos |
| `vinyls.json` | Colección de vinilos (estado: `available` / `borrowed` / `listening`) |
| `info.json` | Checklist, consejos de altura, directorio de Huaraz |
| `events.json` | Eventos semanales |
| `gallery.json` | Fotos de la galería |

Cada texto es bilingüe: `{ "es": "...", "en": "..." }`.

## Cómo agregar fotos

Copia tus fotos a `public/assets/`:

```
public/assets/
  hero/hero.jpg          ← foto principal de portada
  rooms/single.jpg …     ← habitaciones
  tours/laguna69.jpg …   ← tours
  drinks/pisco-sour.jpg …← tragos
  vinyls/abbey-road.jpg …← portadas de discos
  gallery/terraza.jpg …  ← galería
  images/mapa.jpg        ← captura del mapa
```

Los nombres exactos están en los JSON (campo `image` / `cover` / `src`).
**Mientras no exista la foto, la app muestra un placeholder elegante con montañas** — nada se rompe.

## Deploy

Es un sitio estático: sube la carpeta `dist/` a Vercel, Netlify, Cloudflare Pages o cualquier hosting.
# lacasademaruja
