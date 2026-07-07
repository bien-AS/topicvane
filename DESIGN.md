---
name: TopicVane
colors:
  primary: "#0E1422"        # Ink — headings & core text (near-black navy)
  secondary: "#5A6577"      # Muted slate — labels, captions, metadata, borders
  tertiary: "#1E40AF"       # TopicVane Blue — single interaction/CTA accent
  neutral: "#F6F7FB"        # App background (cool off-white)
  surface: "#FFFFFF"        # Card / panel / input surfaces
  on-primary: "#FFFFFF"     # Text on ink surfaces
  on-tertiary: "#FFFFFF"    # Text on blue CTAs
  border: "#ECEDF3"         # Hairline dividers & card borders
  ring: "#1E40AF"           # Focus ring (blue, 3px tinted halo)
  error: "#DC2626"          # Destructive / validation errors
  success: "#0F9D58"        # Healthy / positive deltas / confirmations
  warning: "#D97706"        # Caution / attention
  info: "#2563EB"           # Neutral informational notices
typography:
  h1:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.02em
  h2:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.01em
  h3:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.0625rem
    fontWeight: 600
    lineHeight: 1.3
  metric:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.625rem
    fontWeight: 700
    lineHeight: 1.0
    fontVariantNumeric: tabular-nums
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: 400
    lineHeight: 1.5
  data:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: 500
    fontVariantNumeric: tabular-nums
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: 600
    textTransform: uppercase
    letterSpacing: 0.05em
rounded:
  none: 0px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
elevation:
  e0: "none"
  e1: "0 1px 2px rgba(16,20,34,0.04)"
  e2: "0 1px 2px rgba(16,20,34,0.04), 0 12px 28px -18px rgba(16,20,34,0.18)"
  e3: "0 8px 24px -8px rgba(16,20,34,0.16)"
  ring-focus: "0 0 0 3px rgba(30,64,175,0.18)"
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.on-tertiary}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    fontFamily: Plus Jakarta Sans
    fontWeight: 600
    fontSize: 0.8125rem
    boxShadow: "0 6px 16px -6px rgba(30,64,175,0.45)"
  button-primary-hover:
    backgroundColor: "#1A389B"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
    boxShadow: "{elevation.e1}"
  button-secondary-hover:
    backgroundColor: "#FAFBFD"
    border: "1px solid #E0E2EC"
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
  button-destructive:
    backgroundColor: "{colors.error}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
  button-disabled:
    opacity: 0.5
    cursor: not-allowed
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
    border: "1px solid {colors.border}"
    boxShadow: "{elevation.e2}"
  input:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.md}"
    padding: "9px 13px"
    fontFamily: Inter
    fontSize: 0.875rem
  input-focus:
    border: "1px solid {colors.tertiary}"
    boxShadow: "{elevation.ring-focus}"
  input-error:
    border: "1px solid {colors.error}"
    boxShadow: "0 0 0 3px rgba(220,38,38,0.15)"
  badge-status:
    rounded: "{rounded.full}"
    padding: "3px 9px"
    fontFamily: Plus Jakarta Sans
    fontWeight: 600
    fontSize: 0.6875rem
  badge-ttf:
    rounded: "{rounded.sm}"
    padding: "0 7px"
    minWidth: "30px"
    height: "22px"
    fontFamily: Plus Jakarta Sans
    fontWeight: 700
    fontSize: 0.75rem
    fontVariantNumeric: tabular-nums
    note: "Background + text color come from the Majestic TTF palette by parent category — see tokens/majestic-ttf-palette.css. Never recolor with brand colors."
  table:
    headerBackground: "#FBFBFD"
    headerColor: "{colors.secondary}"
    rowBorder: "1px solid #F2F3F7"
    rowHover: "#FAFBFF"
    numericAlign: right
    numericFont: "tabular-nums"
  tab:
    activeColor: "{colors.tertiary}"
    activeBorder: "2px solid {colors.tertiary}"
    inactiveColor: "{colors.secondary}"
---

## Overview

TopicVane is a topical-authority engine for SEO operators — it reads Majestic Trust Flow data, finds authority domains, builds topical maps, and publishes AI-written sites. The interface must feel like a **premium, trustworthy data instrument**: a refined, light, Stripe-grade workspace where dense numbers stay calm and legible, and a single confident blue tells you what to do next. The mood is precise, modern, and quietly expensive — generous whitespace, soft depth, hairline structure, never loud. The audience is sophisticated marketers and agency operators who also use Ahrefs, Majestic, and Semrush; the design has to earn their trust at a glance by speaking their data language fluently — including using Majestic's exact category colors. The emotional target is *confidence*: "this tool knows what it's doing, and so will I."

## Colors

The system runs on **high-contrast neutrals plus one blue accent.** Restraint is the whole strategy — when the chrome is quiet, the *data* (and the single blue action) carries all the signal. There are two color systems and they never mix: the **brand/UI system** (below) and the **Majestic data palette** (a separate fixed set used only on data marks).

- **Primary / Ink (#0E1422):** Near-black navy for headings, primary text, and the active sidebar/score surfaces. The anchor of every screen. Use for H1–H3 and body text on light surfaces.
- **Secondary / Slate (#5A6577):** Muted slate for labels, captions, metadata, table headers, timestamps, and hairline-adjacent text. Never for headings, never for CTAs.
- **Tertiary / TopicVane Blue (#1E40AF):** The *sole* interaction driver — primary buttons, links, active tabs, active nav, focus rings, key data accents (sparklines, the Trust Flow ring). Its scarcity is its power. Do not use it for decorative fills or backgrounds.
- **Neutral / Background (#F6F7FB):** Cool off-white app canvas. Softer than pure white to let white cards lift off it.
- **Surface (#FFFFFF):** Cards, panels, inputs, popovers, table bodies. White-on-canvas creates depth without heavy shadow.
- **Border (#ECEDF3):** Hairline dividers and card borders — the primary structural device.
- **Success (#0F9D58):** Healthy domains, positive deltas (▲), confirmations only.
- **Error (#DC2626):** Destructive actions, validation errors, failed scans only.
- **Warning (#D97706):** Caution, quota nearing, attention-needed only.
- **Info (#2563EB):** Neutral informational banners/tooltips only.

**The Majestic Topical Trust Flow palette is a separate, fixed data palette** (16 parent categories, children inherit the parent hex — see `tokens/majestic-ttf-palette.css`). These colors appear **only** on data marks: TTF badges, the distribution bar, and category charts. They are never used for buttons, backgrounds, nav, or any UI chrome. Each category ships a verified text-contrast color; always use it. Split any TTF topic string on `" / "`, take the first segment as the parent, and look up the hex. This is non-negotiable: it is how TopicVane proves it speaks Majestic.

## Typography

Two Google-hosted families create a clean display/utility split, chosen specifically for a data-dense product.

- **Plus Jakarta Sans** (`Plus+Jakarta+Sans:wght@400;500;600;700;800`) — headings, metric values, buttons, tabs, labels, and badges. Geometric warmth that gives the brand personality without sacrificing clarity.
- **Inter** (`Inter:wght@400;500;600;700`) — all body copy, table text, form fields, and **all data/numbers**. Inter is the workhorse: flawless at 12–13px and built for dense UI.

**Tabular numerals are mandatory** on every figure — metrics, table cells, Trust/Citation Flow scores, badges, deltas — so columns and stat cards align perfectly. Apply `font-variant-numeric: tabular-nums`.

**Scale rationale:** A compact, utility-first scale (H1 at 1.75rem, body at 0.875rem/14px, label floor at 0.6875rem/11px). This is a workspace, not a landing page — headings command without shouting, and 14px is the comfortable reading baseline for dense screens.

**Weight rules:** 700–800 for H1/metrics, 600–700 for H2/H3/buttons/labels, 400–500 for body and data. Never below 400. Brand fonts Poppins/Raleway (from the original brand guide) are **marketing-only** and are not used in-app.

## Component Styles

Built to map 1:1 onto **shadcn/ui** (Radix + Tailwind). Token names below correspond to shadcn CSS variables: `--primary` = TopicVane Blue, `--background` = neutral, `--card`/`--popover` = surface, `--muted-foreground` = secondary, `--destructive` = error, `--border`/`--input` = border, `--ring` = blue. Base radius = 8px (`--radius: 0.5rem`).

### Buttons
- **Primary:** Blue fill, white text, 8px radius, soft blue glow shadow. One primary action per view section. Hover darkens to #1A389B.
- **Secondary:** White surface, ink text, hairline border, e1 shadow. Hover lifts border + faint tint.
- **Ghost:** No fill/border, slate text. Tertiary/cancel actions and icon buttons.
- **Destructive:** Error-red fill. Delete/remove only, usually behind a confirm.
- **Disabled (all):** 50% opacity, `not-allowed`. Never recolor for disabled — only reduce opacity.
- Sizes: sm (32px), md (38px default), lg (44px). Icon buttons ≥36px hit area.

### Inputs & Forms
- White surface, hairline border, 8px radius. Focus = blue border + 3px blue ring halo. Error = red border + red ring, with helper text in error color.
- Labels use body-sm 500 in slate; required marked with a blue dot, not a red asterisk.
- Selects, comboboxes, switches, checkboxes, radios all follow shadcn defaults retokenized to this palette.

### Cards & Panels
- White surface on canvas, 12px radius, 1px border, e2 shadow (the signature soft Stripe-grade lift). 24px (xl) internal padding.
- Hover (interactive cards only): border darkens slightly + e3 shadow. Static cards do not animate.

### Badges
- **Status badge:** pill, 11px caps, semantic tint — success/error/warning/info or neutral slate. Always pair the color with a word (e.g., "In use", "Available"), never color alone.
- **TTF badge:** 6px-radius chip showing the Trust Flow number, **colored from the Majestic palette by parent category** with its verified text color. The only multi-color component in the system.

### Navigation
- **Left sidebar** (white, hairline right border, 236px). Grouped by job: **Research / Build / Account** with `label-caps` group headers. Active item = blue-tinted pill (#F0F3FF) + blue text 700. Hover = faint neutral wash.
- **Top bar** (sticky, blurred white): a command/search field, the active-domain context with a Fresh/Historic segmented toggle, one primary action, and the avatar menu (billing/account live here — never as a loud top-bar button).
- **Tabs:** underline style; active = blue text + 2px blue underline. Used for workflow steps (Domain Topic → Subtopics → Generate Blog → Build Website).

### Data Tables
- Header: #FBFBFD background, slate caps labels, hairline bottom border, sticky on long tables.
- Rows: hairline dividers, #FAFBFF hover, one emphasized column per table. Numbers right-aligned, tabular. Links in blue (never orange). Consistent `per-page` + pagination control across every table.

### States (every data component ships all six)
default · hover/active · **loading** (skeleton shimmer) · **empty** (illustration + one-line guidance + primary action) · **error** (cause + recovery action) · **success** (confirmation). These are first-class, not afterthoughts.

## Layout & Spacing

- **Base unit:** 4px; the working rhythm is 8/12/16/24. Most gaps are 16px (lg) or 24px (xl).
- **App shell:** fixed 236px sidebar + fluid main. Sticky top bar (56px). Content padding 24–26px.
- **Content max-width:** 1320px for data pages; forms/settings constrain to ~720px for readability.
- **Grid:** 12-column main region, 24px gutters. Metric rows use a 300px score panel + flexible stat grid.
- **Whitespace rule:** when unsure, add space. Nothing sits closer than 12px (md) to its neighbor; section breaks get 24–32px.

## Depth & Elevation

Depth comes from **surface + hairline first, shadow second** — the refined-light signature.

1. **Surface step:** canvas (#F6F7FB) → white cards lift without heavy shadow.
2. **Hairline borders:** 1px #ECEDF3 separates most surfaces.
3. **Soft shadow:** cards use `e2` (a barely-there 28px ambient lift). Popovers/menus use `e3`. Buttons-primary carry a colored blue glow.
4. **Z-layers:** sticky topbar (z-10), dropdowns (z-40), modals/drawers (z-50), toasts (z-60).

Subtle gradients are permitted in two places only: the Trust Flow score card (faint radial blue tint) and the primary button (flat-to-slightly-deep blue). No decorative gradients anywhere else.

## Do's and Don'ts

### Do
- Keep one accent: blue for action/brand, neutrals for everything else.
- Use the Majestic palette **only** on data marks, always with its verified text color.
- Turn on tabular numerals for every number, everywhere.
- Give each table one emphasized column and right-align all numerics.
- Use real, plausible seed data in prototypes (domains, Trust Flow scores, link counts).
- Design the empty/loading/error state for every data surface.
- Pair every status color with a word or icon (never color alone).
- Keep billing/upgrade affordances calm and singular — one tasteful prompt, never stacked billboards.

### Don't
- Don't use orange (#FF5722) or purple gradients anywhere — both are retired from the legacy UI.
- Don't color TTF badges or category data with brand blue/green — those colors are reserved by Majestic category.
- Don't put more than one primary (blue) button in a viewport section.
- Don't stack "Upgrade your plan" blocks down a page (the legacy dashboard's worst habit) — one contextual prompt maximum.
- Don't render numbers in proportional figures — columns must align.
- Don't use Poppins or Raleway in the app — they're marketing-only; in-app is Plus Jakarta Sans + Inter.
- Don't lean on heavy drop shadows — depth is surface + hairline + one soft ambient shadow.
- Don't use link-colored text in orange — links are blue.
- Don't overload the top bar — search, domain context + Fresh/Historic, one action, avatar. Nothing else.
- Don't center body text or table content — left-align text, right-align numbers.
- Don't ship a data view without its empty and loading states.
- Don't introduce a second accent hue to "add energy" — energy comes from whitespace and type, not color.

## Responsive Behavior

- **Desktop-first** (this is a pro data tool): ≥1280px is the primary target — full sidebar, multi-column metric rows, full tables.
- **Laptop** 1024–1279px: sidebar persists; metric grids reflow to 2-up; tables scroll horizontally with sticky first column.
- **Tablet** 768–1023px: sidebar collapses to icon rail / drawer; cards stack; tables become horizontally scrollable or collapse to key columns.
- **Mobile** <768px: single column; sidebar becomes a drawer; dense tables collapse to stacked **record cards** (label–value pairs) rather than scroll; the website-builder and wizard get dedicated stacked flows.
- **Touch targets:** ≥44px on touch, ≥36px on desktop. **Type scaling:** H1 1.75→1.5rem on mobile; body holds at 14px, never below 13px.

## Agent Prompt Guide

Reusable prompts for generating on-brand TopicVane screens. Always end prompts with: *"Use only TopicVane design tokens (Plus Jakarta Sans + Inter, blue #1E40AF single accent, refined-light, shadcn/ui components). Majestic TTF colors only on data marks. Tabular numerals on all figures. Include empty and loading states."*

**Data analysis screen:**
"Build a domain Topical Trust Flow analysis page: sticky top bar (search + domain context with Fresh/Historic toggle + primary action + avatar), left sidebar (Research/Build/Account groups), a Trust Flow score card (radial ring, 0–100) beside a 3-up stat grid with sparklines, a Topical Trust Flow distribution bar with a ranked legend using the Majestic palette, and a topics table (Majestic TTF badges, right-aligned tabular numbers, one emphasized column). Refined-light, shadcn/ui."

**Wizard / setup:**
"Build a 4-step topical-authority setup wizard (Domain Topic → Subtopics → Generate Blog → Build Website) as a progressive flow — one decision cluster per step, smart defaults pre-filled, advanced options behind a disclosure. shadcn Stepper + Form. Refined-light."

**Dashboard:**
"Build a summary-first dashboard: a 'what changed since last visit' band, 4 KPI stat cards, the Trust Flow distribution as the hero, a recent-activity table, and exactly one tasteful upgrade prompt. No stacked upsell. Refined-light, shadcn/ui."

**Settings / billing:**
"Build an account settings shell: left sub-nav (Profile, Subscription, Invoices, API Keys, Support), shadcn Tabs + Card + Form, an invoices table consistent with the global table style, and a plan card showing current tier. Refined-light."

**Table-heavy management:**
"Build a Domain Inventory table: toolbar with TF/CF/Topic/Language filters, status badges (In use / Available), a single 'View' affordance opening a detail drawer, sticky header, tabular numerics, pagination. Include empty and loading states. Refined-light, shadcn/ui."
