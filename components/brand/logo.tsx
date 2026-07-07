import * as React from "react";
import { cn } from "@/lib/utils";

/*
  TopicVane logo — PLACEHOLDER, token-aware inline SVG.
  The pennant mark and "Vane" use the brand accent (`text-primary`); "Topic" uses the muted
  slate. Because it is rendered with tokens/currentColor, it adapts to light and dark with no
  file swap. TODO(assets): replace geometry with the official brand SVGs in public/brand/.
*/

interface MarkProps extends React.SVGProps<SVGSVGElement> {
  /** pixel size of the square mark */
  size?: number;
}

/** The glyph only (pennant on a pole). */
export function Mark({ size = 24, className, ...props }: MarkProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      role="img"
      aria-label="TopicVane"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path
        d="M6 3v18"
        className="stroke-muted-foreground"
        strokeWidth={2}
        strokeLinecap="round"
      />
      <path
        d="M6 4.5 19 8.5 6 12.5Z"
        className="fill-primary"
      />
    </svg>
  );
}

interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** show the pennant mark before the wordmark (default true) */
  withMark?: boolean;
  /** mark size in px */
  markSize?: number;
}

/** Full wordmark: mark + "Topic" (slate) + "Vane" (blue). */
export function Logo({ withMark = true, markSize = 22, className, ...props }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-heading text-lg font-extrabold tracking-tight select-none",
        className,
      )}
      {...props}
    >
      {withMark && <Mark size={markSize} />}
      <span>
        <span className="text-muted-foreground">Topic</span>
        <span className="text-primary">Vane</span>
      </span>
    </span>
  );
}

/** Alias for the full lockup (mark + wordmark). */
export const LogoFull = Logo;
