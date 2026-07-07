"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** LanguageBar — share-of-links by language. Same segmented-bar shape as the TTF
 *  distribution, but languages are NOT Majestic categories, so it uses neutral
 *  blue tints (chrome), never the data palette. */
export interface LanguageSegment {
  label: string;
  value: number;
}

export interface LanguageBarProps extends React.HTMLAttributes<HTMLDivElement> {
  segments: LanguageSegment[];
  showLegend?: boolean;
  height?: number;
}

function tintFor(index: number): string {
  const opacity = Math.max(0.25, 1 - index * 0.2);
  return `hsl(var(--primary) / ${opacity})`;
}

export function LanguageBar({
  segments,
  showLegend = true,
  height = 10,
  className,
  ...props
}: LanguageBarProps) {
  const ranked = [...segments].sort((a, b) => b.value - a.value);
  const total = ranked.reduce((s, x) => s + x.value, 0) || 1;

  return (
    <div
      className={cn("w-full", className)}
      {...props}
    >
      <div
        className="flex w-full overflow-hidden rounded-full bg-muted"
        style={{ height }}
        role="img"
        aria-label="Language distribution"
      >
        {ranked.map((seg, i) => (
          <div
            key={seg.label}
            title={`${seg.label} — ${((seg.value / total) * 100).toFixed(0)}%`}
            style={{ width: `${(seg.value / total) * 100}%`, backgroundColor: tintFor(i) }}
            className="h-full"
          />
        ))}
      </div>
      {showLegend && (
        <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
          {ranked.map((seg, i) => (
            <li
              key={seg.label}
              className="flex items-center gap-2 text-[13px]"
            >
              <span
                className="h-2.5 w-2.5 rounded-[3px]"
                style={{ backgroundColor: tintFor(i) }}
                aria-hidden
              />
              <span className="text-foreground">{seg.label}</span>
              <span className="tabular-nums text-muted-foreground">
                {((seg.value / total) * 100).toFixed(0)}%
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
