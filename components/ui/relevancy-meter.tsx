"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** RelevancyMeter — a slim 0–100 bar for match strength / anchor relevancy. Blue
 *  fill on a muted track (not a Majestic category — pure signal). */
export interface RelevancyMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

export function RelevancyMeter({
  value,
  max = 100,
  label,
  showValue = true,
  className,
  ...props
}: RelevancyMeterProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {label && <span className="shrink-0 text-[12px] text-muted-foreground">{label}</span>}
      {/* biome-ignore lint/a11y/useSemanticElements: native <meter> cannot be styled as flexibly */}
      <div
        className="h-1.5 w-full min-w-[56px] flex-1 overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showValue && (
        <span className="w-9 shrink-0 text-right text-[12px] font-medium tabular-nums text-foreground">
          {Math.round(pct)}%
        </span>
      )}
    </div>
  );
}
