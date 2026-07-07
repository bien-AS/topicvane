"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** ChartCard — the restrained wrapper every chart sits in: a title, an optional
 *  unit and delta-vs-prior, an action slot, and the chart as children. */
export interface ChartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  unit?: string;
  delta?: { value: string; direction?: "up" | "down" };
  action?: React.ReactNode;
}

export function ChartCard({
  title,
  unit,
  delta,
  action,
  className,
  children,
  ...props
}: ChartCardProps) {
  return (
    <Card
      className={cn("p-5", className)}
      {...props}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-heading text-[13px] font-semibold text-foreground">{title}</h3>
            {unit && <span className="text-[12px] text-muted-foreground">{unit}</span>}
          </div>
          {delta && (
            <div
              className={cn(
                "mt-1 inline-flex items-center gap-1 text-[12px] font-medium tabular-nums",
                delta.direction === "down" ? "text-destructive" : "text-success",
              )}
            >
              <span aria-hidden>{delta.direction === "down" ? "▼" : "▲"}</span>
              {delta.value}
            </div>
          )}
        </div>
        {action}
      </div>
      {children}
    </Card>
  );
}

/** A minimal, on-token category bar chart for use inside ChartCard. */
export interface CategoryBarChartDatum {
  label: string;
  value: number;
  color: string;
}

export function CategoryBarChart({
  data,
  className,
}: {
  data: CategoryBarChartDatum[];
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className={cn("space-y-2.5", className)}>
      {data.map((d, i) => (
        <div
          key={`${d.label}-${i}`}
          className="flex items-center gap-3"
        >
          <span className="w-28 shrink-0 truncate text-[13px] text-muted-foreground">
            {d.label}
          </span>
          <div className="h-4 flex-1 overflow-hidden rounded-[4px] bg-muted/60">
            <div
              className="h-full rounded-[4px]"
              style={{ width: `${(d.value / max) * 100}%`, backgroundColor: d.color }}
            />
          </div>
          <span className="w-7 shrink-0 text-right text-[13px] font-medium tabular-nums text-foreground">
            {d.value}
          </span>
        </div>
      ))}
    </div>
  );
}
