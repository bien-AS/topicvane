# Brand assets — PLACEHOLDERS

These SVGs are **scaffold placeholders**, not the official TopicVane brand.

- `TopicVane-Logo.svg` — full wordmark (pennant mark + "Topic" grey / "Vane" blue)
- `TopicVane-Mark-OnLight.svg` — glyph for light backgrounds
- `TopicVane-Mark-OnDark.svg` — glyph for dark backgrounds

**TODO:** drop the official SVGs in here (same filenames) to replace the placeholders.
The React components in `components/brand/logo.tsx` render an inline, token-aware version
today; once official assets land, either keep the inline version or switch the components
to reference these files via `next/image`.
