# TopicVane

**Topical-authority engine for SEO operators.** Analyze Majestic Trust Flow data, match expired domains to topics, build topical maps, generate AI articles, and publish white-hat PBN sites — all in one pipeline.

---

## How it works

1. **Topical Trust Flow analysis** — pull a domain's Majestic Trust Flow / Citation Flow, backlinks, anchors, and topic distribution.
2. **Domain matching** — scan for expired/available domains that match a topic by Trust Flow + anchor relevancy.
3. **Topical map** — AI generates subtopics organized into a topical authority map with silos, pillars, and supporting articles.
4. **Article generation** — bulk AI articles with configurable types, quantities, scheduling, and drip publishing.
5. **Website builder** — select a template, theme it, and publish with one click.
6. **Projects** — manage domains, topical maps, content pipelines, and live sites from a single dashboard.

TopicVane competes with Ahrefs, Majestic, and Semrush on the data side, but uniquely chains analysis → content strategy → build → publish into one workflow.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| UI | [shadcn/ui](https://ui.shadcn.com) v4 (radix-vega) + [Radix Primitives](https://www.radix-ui.com) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Icons | [Lucide](https://lucide.dev) |
| Animation | [GSAP](https://gsap.com) + `@gsap/react` |
| Fonts | Plus Jakarta Sans (headings) + Inter (body/data) |
| Language | TypeScript |

---

## Getting started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) — the `/gallery` route shows the living component library with every UI primitive, form control, data surface, overlay, and domain widget in both light and dark themes.

---

## Project structure

```
app/                  Next.js App Router (pages, layouts, globals.css)
components/
  ui/                 52 components — shadcn v4 base + custom TopicVane widgets
  gallery/            Living component gallery with interactive demos
  brand/              Theme-aware Logo and Mark (official SVGs in public/brand/)
  theme-provider.tsx  Light/dark/system theme context with persistence
lib/
  utils.ts            cn() classname merge utility
  icons.ts            Curated Lucide icon registry (single import source)
  use-count-up.ts     GSAP animated number hook (reduced-motion aware)
  tokens/             Design tokens, Majestic TTF palette, demo domain data
public/brand/         Official TopicVane logo SVGs
```

---

## Design system

The interface follows a **Refined Light** direction — Stripe-grade polish with generous whitespace, soft depth, and hairline structure. A single confident blue (`#1E40AF`) drives every interaction; the rest is high-contrast neutrals that let the data speak.

- **Colors** — near-black navy ink, muted slate labels, cool off-white canvas, white surfaces, hairline borders
- **Typography** — Plus Jakarta Sans for headings/metrics, Inter for body/data. Tabular numerals on every figure
- **Elevation** — depth from surface contrast + hairline borders first, soft shadow second
- **States** — every data component ships six states: default, hover, loading, empty, error, success
- **Majestic TTF palette** — 16 fixed parent-category colors used exclusively on data marks (TTF badges, distribution bars, category charts)

See [`DESIGN.md`](DESIGN.md) for the complete spec — token definitions, component rules, do's and don'ts, responsive breakpoints, and reusable agent prompts.

---

## Component gallery

The living gallery at `/gallery` showcases every component in context:

| Batch | Contents |
|---|---|
| Foundation & primitives | Buttons, badges, cards, inputs, skeletons, avatars, tooltips |
| Data surfaces | Score rings, stat cards, TTF distribution bar, tables, empty/error states |
| DataTable | Composed data grid with search, sort, selection, pagination, all states |
| App shell & navigation | Sidebar, top bar, tabs, breadcrumb, domain context chip, account menu |
| Forms & inputs | Select, switch, radio group cards, slider, textarea, form field wrapper |
| Feedback & overlays | Dialogs, sheets, toasts, progress, alert banners, locked state |
| Domain widgets | Domain cards, TTF topic rows, anchor match rows, sparklines, chart cards |

---

## Adding components

New shadcn components can be added via the CLI, then retokenized to TopicVane's palette:

```bash
npx shadcn@latest add <component-name>
```

Custom components follow the same patterns — React function components with TypeScript, `class-variance-authority` for variants, `cn()` for class merging, and semantic Tailwind tokens (never hardcoded hex values).

For AI coding agent conventions and the full repository guide, see [`AGENTS.md`](AGENTS.md).
