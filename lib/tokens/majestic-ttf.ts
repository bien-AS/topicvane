/**
 * Majestic Topical Trust Flow (TTF) categorical palette.
 *
 * 16 fixed parent categories; subtopics inherit their parent (ingest by splitting
 * the topic string on " / ", take the first segment, look it up). These colors are
 * DATA MARKS ONLY (badges, distribution bars, category charts) — never UI chrome.
 *
 * SCAFFOLD — placeholder colors. The `bg`/`text` values below are NOT the real
 * Majestic hexes. Replace every entry with the verified values (and contrast-checked
 * text color) from `Majestic_TTF_Color_Legend.xlsx` before shipping.
 * TODO(assets): swap placeholders for verified Majestic legend hexes.
 */

export type TtfParent =
  | "Arts"
  | "Business"
  | "Computers"
  | "Games"
  | "Health"
  | "Home"
  | "News"
  | "Recreation"
  | "Reference"
  | "Regional"
  | "Science"
  | "Shopping"
  | "Society"
  | "Sports"
  | "Adult"
  | "Kids and Teens";

export interface TtfColor {
  /** Background hex for the data mark. TODO: verified Majestic hex. */
  bg: string;
  /** Contrast-correct text/foreground hex for content on `bg`. TODO: verify AA. */
  text: string;
}

/** Neutral fallback for unknown / unmatched topics. */
export const TTF_FALLBACK: TtfColor = { bg: "#e5e7eb", text: "#111827" };

/**
 * Parent → color registry. Ordered as Majestic lists its 16 parents.
 * PLACEHOLDER COLORS — see file header.
 */
export const MAJESTIC_TTF: Record<TtfParent, TtfColor> = {
  Arts: { bg: "#7c3aed", text: "#ffffff" }, // TODO: verified hex
  Business: { bg: "#2563eb", text: "#ffffff" }, // TODO: verified hex
  Computers: { bg: "#0ea5e9", text: "#04121b" }, // TODO: verified hex
  Games: { bg: "#db2777", text: "#ffffff" }, // TODO: verified hex
  Health: { bg: "#059669", text: "#ffffff" }, // TODO: verified hex
  Home: { bg: "#65a30d", text: "#ffffff" }, // TODO: verified hex
  News: { bg: "#dc2626", text: "#ffffff" }, // TODO: verified hex
  Recreation: { bg: "#f59e0b", text: "#1a1204" }, // TODO: verified hex
  Reference: { bg: "#0891b2", text: "#ffffff" }, // TODO: verified hex
  Regional: { bg: "#4f46e5", text: "#ffffff" }, // TODO: verified hex
  Science: { bg: "#0d9488", text: "#ffffff" }, // TODO: verified hex
  Shopping: { bg: "#ea580c", text: "#ffffff" }, // TODO: verified hex
  Society: { bg: "#9333ea", text: "#ffffff" }, // TODO: verified hex
  Sports: { bg: "#16a34a", text: "#ffffff" }, // TODO: verified hex
  Adult: { bg: "#be123c", text: "#ffffff" }, // TODO: verified hex
  "Kids and Teens": { bg: "#eab308", text: "#1a1500" }, // TODO: verified hex
};

/** Normalize a raw parent segment to a known `TtfParent`, or `null`. */
function normalizeParent(segment: string): TtfParent | null {
  const key = segment.trim().toLowerCase();
  for (const parent of Object.keys(MAJESTIC_TTF) as TtfParent[]) {
    if (parent.toLowerCase() === key) return parent;
  }
  // Common Majestic spelling of the last category.
  if (key === "kids & teens" || key === "kids and teens") return "Kids and Teens";
  return null;
}

/**
 * Resolve a full TTF topic string (e.g. "Business / Investing") to its color.
 * Splits on " / ", takes the first segment, looks up the parent, falls back to neutral.
 */
export function getTtfColor(topic: string): TtfColor {
  if (!topic) return TTF_FALLBACK;
  const first = topic.split(" / ")[0] ?? topic;
  const parent = normalizeParent(first);
  return parent ? MAJESTIC_TTF[parent] : TTF_FALLBACK;
}

/** The parent name for a topic string, or `null` if unmatched. */
export function getTtfParent(topic: string): TtfParent | null {
  if (!topic) return null;
  return normalizeParent(topic.split(" / ")[0] ?? topic);
}
