/** TopicVane brand + semantic colors (canonical hex).
 *  Components should consume these via Tailwind semantic tokens (bg-primary, etc.),
 *  not these literals — this file documents the source values and supports charts/JS. */

export const colors = {
  // Brand / chrome
  ink: "#0E1422", // foreground
  slate: "#5A6577", // muted-foreground
  blue: "#1E40AF", // primary — the single accent
  blueHover: "#1A389B",
  background: "#F6F7FB",
  surface: "#FFFFFF",
  border: "#ECEDF3",
  accentTint: "#F0F3FF", // blue tint for active/hover surfaces

  // Semantic (status only)
  success: "#0F9D58",
  error: "#DC2626",
  warning: "#D97706",
  info: "#2563EB",
} as const;

export type ColorToken = keyof typeof colors;
