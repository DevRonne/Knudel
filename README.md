# Knudel Haustechnik Website

Moderne Website für Knudel Haustechnik - Heizung & Sanitär in Bad Oeynhausen und Löhne.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Terminbuchung:** Cal.com Embed
- **Hosting:** Vercel

## Erste Schritte

### Installation

```bash
npm install
```

### Entwicklung

```bash
npm run dev
```

Die Website ist dann unter [http://localhost:3000](http://localhost:3000) erreichbar.

### Build

```bash
npm run build
```

## Projektstruktur

```
knudel-website/
├── app/                    # Next.js App Router Seiten
│   ├── page.tsx           # Homepage
│   ├── heizung/           # Heizung & Haustechnik
│   ├── sanitaer/          # Bäder & Sanitär
│   ├── kundendienst/      # Kundendienst
│   ├── kontakt/           # Kontakt & Terminbuchung
│   ├── impressum/         # Impressum
│   └── datenschutz/       # Datenschutz
├── components/            # React Komponenten
├── lib/                   # Hilfsfunktionen
└── public/               # Statische Dateien
```

## Cal.com Einrichtung

1. Erstelle einen kostenlosen Account auf [cal.com](https://cal.com)
2. Erstelle einen Event-Typ (z.B. "Termin")
3. Ersetze den `calLink` in `components/CalBooking.tsx` mit deinem Link

```tsx
<CalBooking calLink="dein-benutzername/dein-event" />
```

## Deployment auf Vercel

1. Pushe das Repository zu GitHub
2. Verbinde das Repository mit [Vercel](https://vercel.com)
3. Vercel deployed automatisch bei jedem Push
4. Konfiguriere deine Custom Domain in den Vercel Einstellungen

## Anpassungen

### Kontaktdaten ändern

Die Kontaktdaten befinden sich in:
- `components/Header.tsx` - Telefonnummer in der Top-Bar
- `components/Footer.tsx` - Alle Kontaktinformationen
- `app/kontakt/page.tsx` - Kontaktseite
- `app/impressum/page.tsx` - Impressum
- `app/datenschutz/page.tsx` - Datenschutz

### Farben anpassen

Die Farbpalette ist in `tailwind.config.ts` definiert:
- `primary` - Hauptfarbe (Blau)
- `accent` - Akzentfarbe (Orange)

## Lizenz

Proprietär - Alle Rechte vorbehalten.
