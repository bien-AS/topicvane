"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** AreaChart — a clean, restrained hand-rolled SVG area chart (line + gradient
 *  fill) for trend series like backlink / referring-domain growth. */
export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: number[];
  labels?: string[];
  height?: number;
  tone?: string;
  valueFormat?: (v: number) => string;
}

const W = 600;

export function AreaChart({
  data,
  labels,
  height = 160,
  tone = "text-primary",
  valueFormat = (v) => Math.round(v).toLocaleString(),
  className,
  ...props
}: AreaChartProps) {
  const gid = React.useId();
  if (data.length < 2) return null;

  const H = height;
  const padY = 14;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const stepX = W / (data.length - 1);
  const y = (v: number) => H - padY - ((v - min) / span) * (H - padY * 2);
  const pts = data.map((v, i) => [i * stepX, y(v)] as const);
  const line = pts
    .map(([x, yy], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${yy.toFixed(1)}`)
    .join(" ");
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;
  const last = pts[pts.length - 1];
  const grid = [0.25, 0.5, 0.75].map((f) => padY + f * (H - padY * 2));

  return (
    <div
      className={cn("w-full", className)}
      {...props}
    >
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-[12px] text-muted-foreground">Latest</span>
        <span className="font-heading text-[15px] font-bold tabular-nums text-foreground">
          {valueFormat(max)}
        </span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height={H}
        preserveAspectRatio="none"
        role="img"
        aria-label="Trend chart"
        className={cn(tone, "overflow-visible")}
      >
        <defs>
          <linearGradient
            id={gid}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop
              offset="0%"
              stopColor="currentColor"
              stopOpacity="0.20"
            />
            <stop
              offset="100%"
              stopColor="currentColor"
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        {grid.map((gy, i) => (
          <line
            key={i}
            x1="0"
            x2={W}
            y1={gy}
            y2={gy}
            className="stroke-border"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          d={area}
          fill={`url(#${gid})`}
        />
        <path
          d={line}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx={last[0]}
          cy={last[1]}
          r={3.5}
          fill="currentColor"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {labels && labels.length >= 2 && (
        <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-muted-foreground">
          <span>{labels[0]}</span>
          <span>{labels[Math.floor(labels.length / 2)]}</span>
          <span>{labels[labels.length - 1]}</span>
        </div>
      )}
    </div>
  );
}
