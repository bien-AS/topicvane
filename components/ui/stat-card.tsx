"use client";

import type { LucideIcon } from "lucide-react";
import * as React from "react";
import { Card } from "@/components/ui/card";
import { useCountUp } from "@/lib/use-count-up";
import { cn } from "@/lib/utils";

/** StatCard — a KPI tile: label-caps + a large tabular metric (counts up on
 *  mount) + an optional delta and a sparkline slot. Numeric values animate via
 *  GSAP and respect reduced-motion. */
export interface StatCardDelta {
  value: string;
  direction?: "up" | "down";
  tone?: "success" | "error" | "neutral";
}

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number | string;
  format?: (v: number) => string;
  suffix?: string;
  icon?: LucideIcon;
  delta?: StatCardDelta;
  sparkline?: React.ReactNode;
}

const deltaToneClass: Record<NonNullable<StatCardDelta["tone"]>, string> = {
  success: "text-success",
  error: "text-destructive",
  neutral: "text-muted-foreground",
};

export function StatCard({
  label,
  value,
  format,
  suffix,
  icon: Icon,
  delta,
  sparkline,
  className,
  ...props
}: StatCardProps) {
  const isNumeric = typeof value === "number";
  const numRef = useCountUp<HTMLSpanElement>(isNumeric ? (value as number) : 0, { format });
  const tone = delta?.tone ?? (delta?.direction === "down" ? "error" : "success");

  return (
    <Card
      className={cn("p-5", className)}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
          {label}
        </span>
        {Icon && <Icon className="h-4 w-4 text-muted-foreground/70" />}
      </div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="flex items-baseline gap-1">
          <span className="font-heading text-[1.625rem] font-bold leading-none tabular-nums text-foreground">
            {isNumeric ? <span ref={numRef}>0</span> : value}
          </span>
          {suffix && (
            <span className="text-[13px] font-medium text-muted-foreground">{suffix}</span>
          )}
        </div>
        {sparkline && <div className="h-8 w-24 shrink-0">{sparkline}</div>}
      </div>
      {delta && (
        <div
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-[12px] font-medium tabular-nums",
            deltaToneClass[tone],
          )}
        >
          <span aria-hidden>{delta.direction === "down" ? "▼" : "▲"}</span>
          {delta.value}
        </div>
      )}
    </Card>
  );
}
