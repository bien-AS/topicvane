# AGENTS.md — TopicVane

> This file is the persistent brief for AI coding agents working in this repo. Read it before any task.

## 1. What TopicVane is

TopicVane is a **topical-authority / SEO engine** for marketers and agencies. The pipeline:

1. **Topical Trust Flow analysis** — pull a domain's Majestic Trust Flow / Citation Flow, backlinks, anchors, and topic distribution.
2. **Domain matching** — scan for expired/available domains that match a topic by Trust Flow + anchor relevancy.
3. **Topical map** — AI generates subtopics → a topical authority map.
4. **Article generation** — bulk AI articles with types, scheduling, drip.
5. **Website builder** — templates + theme → publish.
6. **Projects** — manage domains, maps, content, sites.

It competes with Ahrefs / Majestic / Semrush on data, but uniquely chains analysis → build → publish. The UI reads as a **premium, credible data instrument** and speaks Majestic's data language fluently.

## 2. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| React | 19.2 |
| Styling | Tailwind CSS v4 (`@theme inline` in `app/globals.css`) |
| Components | shadcn/ui v4 (radix-vega style, Radix primitives) |
| Variants | `class-variance-authority` |
| Icons | Lucide only — import from `@/lib/icons` |
| Animation | GSAP + `@gsap/react` (`useGSAP`, count-up hook) |
| Fonts | Plus Jakarta Sans (headings) + Inter (body), loaded via `next/font/google` |

## 3. DESIGN.md is the law

`DESIGN.md` at the repo root defines every token, color, type scale, radius, shadow, and component rule. Read it before touching any UI code. Key rules (non-negotiable):

- **Single accent:** `#1E40AF` TopicVane Blue — primary buttons, links, active nav, focus rings. Never a second accent hue.
- **Headings:** Plus Jakarta Sans (600–800). **Body/data:** Inter (400–700). Never Poppins or Raleway in-app.
- **Tabular numerals:** Mandatory on every figure — use `tabular-nums` class.
- **Majestic TTF palette:** 16 fixed parent-category colors in `lib/tokens/majestic-ttf.ts`. Use ONLY on data marks (TTF badges, distribution bars, category charts). Never on UI chrome.
- **Component states:** Every data surface ships all six — default · hover · loading · empty · error · success.
- **Never:** orange `#FF5722`, purple gradients, >1 primary button per viewport section, stacked upgrade banners.

## 4. Repository map

```
DESIGN.md                    ← design system law (read first)
AGENTS.md                    ← you are here
app/
  globals.css                ← Tailwind v4 @theme inline + light/dark CSS variables
  layout.tsx                 ← Root layout (ThemeProvider, TooltipProvider, ToastProvider, fonts)
  page.tsx                   ← Home page
  gallery/page.tsx           ← Living component gallery ( → components/gallery/GalleryMain)
components/
  ui/                        ← 52 components — shadcn v4 (18) + custom TopicVane (34)
    alert-banner.tsx, app-shell.tsx, area-chart.tsx, avatar.tsx,
    backlink-stat.tsx, badge.tsx, breadcrumb.tsx, button.tsx, calendar.tsx,
    card.tsx, chart-card.tsx, checkbox.tsx, command.tsx, confirm-dialog.tsx,
    data-table.tsx, dialog.tsx, domain-card.tsx, domain-context-chip.tsx,
    dropdown-menu.tsx, empty-state.tsx, error-state.tsx, form-field.tsx,
    input.tsx, input-group.tsx, label.tsx, language-bar.tsx, locked-state.tsx,
    metric-sparkline.tsx, pagination.tsx, popover.tsx, progress.tsx,
    radio-group.tsx, relevancy-meter.tsx, score-ring.tsx, segmented-control.tsx,
    select.tsx, separator.tsx, sheet.tsx, sidebar.tsx, skeleton.tsx,
    slider.tsx, stat-card.tsx, switch.tsx, table.tsx, tabs.tsx, textarea.tsx,
    toast.tsx, tooltip.tsx, top-bar.tsx, ttf-badge.tsx, ttf-distribution-bar.tsx,
    ttf-topic-row.tsx, wizard-stepper.tsx
  gallery/                   ← Living component gallery (7 batch sections)
    GalleryMain.tsx, Section.tsx, PrimitivesGallery.tsx,
    DataSurfacesGallery.tsx, DataTableGallery.tsx, AppShellGallery.tsx,
    FormsGallery.tsx, OverlaysGallery.tsx, DomainWidgetsGallery.tsx
  brand/logo.tsx             ← Theme-aware Logo / Mark components
  theme-provider.tsx         ← Light/dark/system theme context + persistence
  theme-toggle.tsx           ← Theme toggle button
lib/
  utils.ts                   ← cn() helper (clsx + tailwind-merge)
  icons.ts                   ← Curated Lucide icon registry (single source)
  use-count-up.ts            ← GSAP count-up hook (tabular numbers, reduced-motion aware)
  tokens/
    majestic-ttf.ts          ← 16 Majestic TTF categories + getTtfColor()
    majestic-ttf-palette.css ← --ttf-* CSS custom properties
    majestic-ttf-palette.json
    colors.ts                ← Brand + semantic color literals
    typography.ts            ← Type scale definitions
    demo-domains.ts          ← 5 real Majestic domain profiles
    majestic-backlinks.ts    ← Backlink sample data
public/brand/                ← Official SVGs (TopicVane-Logo, -Mark-OnDark, -Mark-OnLight)
```

## 5. Conventions

**Code**
- React function components + TypeScript. shadcn/ui v4 patterns (Radix primitives, `cn()`).
- **All interactive components** must start with `"use client"` (Next.js App Router).
- Import icons from `@/lib/icons` — never directly from `lucide-react` in feature code.
- Use semantic Tailwind tokens (`bg-primary`, `text-muted-foreground`, `border-border`) — never hardcode hex in components.
- Majestic TTF colors are the one exception: `getTtfColor(topic).hex` inline on data marks only.
- Numbers: apply `tabular-nums` on every numeric cell/metric.
- Accessibility: visible focus rings (`ring`), ≥36px hit areas, never color-only meaning.

**Import paths**
- `@/components/ui/*` — UI components
- `@/components/gallery/*` — gallery components
- `@/lib/*` — utilities, icons, hooks
- `@/lib/tokens/*` — design tokens, demo data, Majestic palette

**shadcn v4 patterns**
- Imports from `radix-ui` (single package), not `@radix-ui/react-*`.
- Components use `data-slot` attributes for internal styling.
- Button variants: `default` (primary), `secondary`, `ghost`, `outline`, `destructive`, `link`.
- `DialogContent` auto-wraps in Portal + Overlay (no separate `DialogPortal` / `DialogOverlay` needed).
- `DropdownMenuItem` uses `variant="destructive"` (not `destructive` prop).

## 6. Commands

```bash
npm run dev            # Start dev server (localhost:3000)
npm run build          # Production build (tsc + next build)
npm run lint           # ESLint

# Adding shadcn components (retokenize to our palette afterward):
npx shadcn@latest add <component>
```

## 7. Don't (from the critique)

- No orange `#FF5722` CTAs, no purple gradients, no second accent hue "for energy."
- Don't recolor TTF badges/category data with brand blue/green — Majestic palette only.
- Don't put >1 primary (blue) button per viewport section.
- Don't stack "Upgrade your plan" blocks — one tasteful prompt max.
- Don't use Poppins or Raleway in-app — Plus Jakarta Sans + Inter only.
- Don't use proportional numerals, heavy drop shadows, orange links, or center-aligned text.
- Don't overload the top bar — search + domain context + one action + avatar. Nothing else.
- Don't ship a data view without its empty + loading states.

---

*TopicVane is a premium SEO data instrument. Keep it precise, calm, and credible.*
