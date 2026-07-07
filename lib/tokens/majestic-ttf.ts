/** Majestic Topical Trust Flow — fixed categorical DATA palette.
 *  16 parent categories; subtopics inherit the parent. Use ONLY on data marks
 *  (TTF badges, distribution bars, category charts) — never on UI chrome.
 *  Transcribed from ../Majestic_TTF_Color_Legend.xlsx. Do not hand-edit colors. */

export interface TtfCategory {
  /** Parent category name as Majestic renders it */
  name: string;
  /** Background hex */
  hex: string;
  /** Verified text-contrast color for text/number on this background */
  on: string;
}

export const MAJESTIC_TTF: Record<string, TtfCategory> = {
  Adult: { name: "Adult", hex: "#333333", on: "#FFFFFF" },
  Arts: { name: "Arts", hex: "#FF6700", on: "#FFFFFF" },
  Business: { name: "Business", hex: "#C5C88E", on: "#000000" },
  Computers: { name: "Computers", hex: "#DD3333", on: "#FFFFFF" },
  Games: { name: "Games", hex: "#557832", on: "#FFFFFF" },
  Health: { name: "Health", hex: "#000099", on: "#FFFFFF" },
  Home: { name: "Home", hex: "#DD9955", on: "#000000" },
  News: { name: "News", hex: "#76D54B", on: "#000000" },
  Recreation: { name: "Recreation", hex: "#89C7CB", on: "#000000" },
  Reference: { name: "Reference", hex: "#C84770", on: "#FFFFFF" },
  Regional: { name: "Regional", hex: "#F582B9", on: "#000000" },
  Science: { name: "Science", hex: "#6BD39A", on: "#000000" },
  Shopping: { name: "Shopping", hex: "#660000", on: "#FFFFFF" },
  Society: { name: "Society", hex: "#7A69CD", on: "#FFFFFF" },
  Sports: { name: "Sports", hex: "#55355D", on: "#FFFFFF" },
  World: { name: "World", hex: "#557777", on: "#FFFFFF" },
};

const FALLBACK: TtfCategory = { name: "Other", hex: "#5A6577", on: "#FFFFFF" };

function normalizeParent(segment: string): string | null {
  const key = segment.trim().toLowerCase();
  for (const parent of Object.keys(MAJESTIC_TTF)) {
    if (parent.toLowerCase() === key) return parent;
  }
  if (key === "kids & teens" || key === "kids and teens") return "Kids and Teens";
  return null;
}

/** Resolve a Majestic TTF topic string to its category colors.
 *  Handles both Majestic UI format ("Business / Agriculture") and API format
 *  ("Business/Agriculture and Forestry") — splits on "/" with optional spaces
 *  and uses the first segment (the parent). */
export function getTtfColor(topic: string): TtfCategory {
  const parent = (topic ?? "").split(/\s*\/\s*/)[0]?.trim();
  if (!parent) return FALLBACK;
  const resolved = normalizeParent(parent);
  return resolved ? MAJESTIC_TTF[resolved] : FALLBACK;
}

/** The parent category name for a topic string, or `null` if unmatched. */
export function getTtfParent(topic: string): string | null {
  if (!topic) return null;
  const parent = (topic ?? "").split(/\s*\/\s*/)[0]?.trim();
  if (!parent) return null;
  return normalizeParent(parent);
}

export const MAJESTIC_TTF_LIST = Object.values(MAJESTIC_TTF);
