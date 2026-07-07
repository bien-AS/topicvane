"use client";

import type { LucideIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

/** BacklinkStat — a compact, card-less label + value used in dense metric grids
 *  (domain detail, drawers). Lighter than StatCard. Value renders tabular. */
export interface BacklinkStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number | string;
  icon?: LucideIcon;
  delta?: { value: string; direction?: "up" | "down" };
}

export function BacklinkStat({
  label,
  value,
  icon: Icon,
  delta,
  className,
  ...props
}: BacklinkStatProps) {
  return (
    <div
      className={cn("space-y-1", className)}
      {...props}
    >
      <div className="flex items-center gap-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.04em] text-muted-foreground">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-heading text-lg font-bold leading-none tabular-nums text-foreground">
          {typeof value === "number" ? value.toLocaleString() : value}
        </span>
        {delta && (
          <span
            className={cn(
              "text-[11px] font-medium tabular-nums",
              delta.direction === "down" ? "text-destructive" : "text-success",
            )}
          >
            {delta.direction === "down" ? "▼" : "▲"} {delta.value}
          </span>
        )}
      </div>
    </div>
  );
}
