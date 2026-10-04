# Lapse, an Astro theme for AI and SaaS products

A dark, motion-led, nine-page site for an AI product: scroll-pinned sections that explain what the product changes and how it works, a pricing page with a plan comparison, a Markdown blog, and a contact form. Static output, no UI framework: every interaction is a small vanilla JavaScript module.

Live demo: [lapse.startfrom.co](https://lapse.startfrom.co)

## Features

- Hero with a product screenshot and three stat cards
- "What changes": a pinned section whose four cards slide sideways as you scroll, each with a small UI panel
- "How it works": a pinned stage where four step cards fly in and out, with the step number lighting up
- Pricing with a monthly and annual toggle, a sticky comparison table (tabs on tablet and phone) and an FAQ
- Testimonials on an endless vertical ticker over an animated WebGL line field
- A closing call to action whose image is rebuilt from 45,000 particles the cursor can push and fling
- About page with a logo ticker, a pinned "rules" row and a team switcher with spring motion
- Blog with category tabs, a hover accordion of recent posts, and Markdown articles with callouts, numbered steps and figures
- Contact form with sending, sent and error states
- A WebGL shard field on the 404: the stream parts around the cursor, clicks send shockwave rings, press and hold gathers the shards into a cloud
- Honours `prefers-reduced-motion`; every page reads correctly with JavaScript off
- Figtree, Fragment Mono and Climate Crisis, self-hosted through Fontsource

## Getting started

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serves dist/
```

## Pages

| Route | What it is |
| --- | --- |
| `/` | hero, what changes, how it works, pricing, testimonials, FAQ, latest posts |
| `/about` | story, logos, rules, team |
| `/pricing` | plans, comparison table, FAQ |
| `/blog` | featured post, category tabs, post grid |
| `/blog/[slug]` | one page per file in `src/content/blog/` |
| `/contact` | contact form and next steps |
| `/terms`, `/privacy` | legal pages |
| `/404` | not found |

The closing call to action and footer appear on every page except the 404.

## Editing content

- `src/content/site.json`: navigation, closing call to action and footer.
- `src/content/pages/*.json`: the copy for each page, one file per page.
- `src/content/plans.json`: plans, prices (monthly and annual) and features, shared by the home and pricing pages.
- `src/content/blog/*.md`: one file per post; the filename is the URL. The frontmatter holds the card fields (title, category, date, read time, excerpt, cover, author). The body is Markdown: a blockquote whose first line is bold becomes a callout, an ordered list becomes numbered steps, and `<figure class="figure">` draws a bar chart. The schema in `src/content.config.ts` fails the build on a typo.
- Images live in `public/assets/`.
- Colours and the type scale are custom properties in `src/styles/tokens.css` and `src/styles/global.css`. Each component keeps its own styles.

## Project structure

```
src/
  components/        Nav, Footer (CTA + footer), StoreBadge
    sections/        one component per page section
    blog/            post meta and badges
    ui/              Button, Icon, ContactSubmit
  content/           site.json, plans.json, pages/, blog/
  icons/             SVG icons
  layouts/Base.astro head, nav, footer, scripts
  lib/               blog helpers, links
  pages/             routes
  scripts/entry.js   loads each effect on demand from data-fx="name"
  scripts/fx/        one module per behaviour
  styles/            tokens.css, global.css
```

## Environment variables

All optional and off by default. See `.env.example`.

| Variable | Effect |
| --- | --- |
| `PUBLIC_FORM_ENDPOINT` | URL the contact form posts to (Formspree, Basin, your own API). Unset, the form only shows its states. |
| `PUBLIC_VERCEL_ANALYTICS` | `true` loads Vercel Web Analytics and Speed Insights |
| `PUBLIC_STORE_BADGE` | `true` shows the fixed store badge in the corner |

## Deploy

Any static host works: build with `npm run build` and publish `dist/`. On Vercel or Netlify, import the repository and keep the defaults. Set `site` in `astro.config.mjs` to your domain so canonical URLs and social images point at it.

## Licence

MIT, see `LICENSE`. Every effect is original code with no runtime dependencies.

Fonts: Figtree, Fragment Mono and Climate Crisis, SIL Open Font License 1.1.
