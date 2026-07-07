"use client"

import * as React from 'react'
import { cn } from '@/lib/utils'

/** MetricSparkline — a tiny, restrained hand-rolled SVG trend line (+ optional
 *  area). No chart library. Color follows `tone`. Default blue.
 *  For stat-card and domain-card trends. */
export interface MetricSparklineProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'tone'> {
  data: number[]
  width?: number
  height?: number
  area?: boolean
  tone?: string
}

export function MetricSparkline({
  data,
  width = 96,
  height = 32,
  area = true,
  tone = 'text-primary',
  className,
  ...props
}: MetricSparklineProps) {
  const gid = React.useId()
  if (!data.length) return null

  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const stepX = width / (data.length - 1 || 1)
  const pts = data.map((v, i) => [i * stepX, height - ((v - min) / span) * (height - 4) - 2] as const)
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const areaPath = `${line} L ${width.toFixed(1)} ${height} L 0 ${height} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      role="img"
      aria-label={props['aria-label'] ?? 'Trend'}
      className={cn(tone, className)}
      {...props}
    >
      {area && (
        <>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaPath} fill={`url(#${gid})`} />
        </>
      )}
      <path
        d={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

/** SparkBars — the sibling mini bar-column trend for KPI cards. Past periods
 *  render muted; the latest bar is full-strength. */
export function SparkBars({
  data,
  width = 96,
  height = 32,
  tone = 'text-primary',
  className,
  ...props
}: Omit<MetricSparklineProps, 'area'>) {
  if (!data.length) return null

  const max = Math.max(...data) || 1
  const gap = width * 0.035
  const bw = (width - gap * (data.length - 1)) / data.length

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      role="img"
      aria-label={props['aria-label'] ?? 'Trend'}
      className={cn(tone, className)}
      {...props}
    >
      {data.map((v, i) => {
        const h = Math.max(2.5, (v / max) * (height - 2))
        return (
          <rect
            key={i}
            x={i * (bw + gap)}
            y={height - h}
            width={bw}
            height={h}
            rx={Math.min(2, bw / 3)}
            fill="currentColor"
            opacity={i === data.length - 1 ? 1 : 0.28}
          />
        )
      })}
    </svg>
  )
}
