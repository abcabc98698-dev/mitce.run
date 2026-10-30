# Mitce (mitce.run)

Mitce is a modern, motion-led AI agent and customer operations platform website built with [Astro](https://astro.build).

## Key Features

- **SEO & Search Optimized**: Full Open Graph, Twitter Cards, dynamic Canonical URL system, Schema.org JSON-LD structured data, XML Sitemap, and RSS Feed (`/rss.xml`).
- **High Performance & Clean Code**: Zero external tracking scripts, self-contained local assets, and pure CSS/vanilla JS micro-modules.
- **Dynamic Content Architecture**: Markdown-powered engineering & operations blog with category filters, interactive accordions, and clean typography.
- **Interactive UI & Motion**:
  - Pinned feature workflows ("What Changes", "How it Works")
  - Interactive pricing plan switcher and feature comparison matrix
  - High-performance particle and WebGL visual effects
  - Accessible, responsive layouts supporting dark theme and `prefers-reduced-motion`

## Tech Stack

- **Framework**: Astro 7 (Static Site Generation)
- **Styling**: Modern CSS variables & tokens
- **Typography**: Self-hosted Figtree, Fragment Mono, and Climate Crisis via Fontsource
- **Sitemap & Feeds**: `@astrojs/sitemap`, `@astrojs/rss`

## Getting Started

### Development

```bash
npm install
npm run dev
```

Visit [http://localhost:4321](http://localhost:4321) (or the port indicated in your console) to preview the site.

### Build for Production

```bash
npm run build
```

The optimized static production build will be emitted to `dist/`.

### Preview Production Build

```bash
npm run preview
```

## Environment Configuration

Configure custom deployment URLs via environment variables:

```bash
SITE_URL=https://mitce.run
```
