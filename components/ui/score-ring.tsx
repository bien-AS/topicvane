"use client"

import * as React from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

/** ScoreRing — the Trust/Citation Flow radial (0–100). The arc sweeps and the
 *  number counts up on mount (GSAP), both honoring reduced-motion. The ring is
 *  the single blue accent and the number is neutral ink. */
export interface ScoreRingProps {
  value: number
  max?: number
  label?: string
  sublabel?: string
  size?: number
  strokeWidth?: number
  className?: string
}

export function ScoreRing({
  value,
  max = 100,
  label = 'Trust Flow',
  sublabel,
  size = 140,
  strokeWidth = 10,
  className,
}: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(1, value / max))
  const offset = circumference * (1 - pct)

  const scope = React.useRef<HTMLDivElement>(null)
  const arcRef = React.useRef<SVGCircleElement>(null)
  const numRef = React.useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (arcRef.current) {
        if (reduce) gsap.set(arcRef.current, { strokeDashoffset: offset })
        else
          gsap.fromTo(
            arcRef.current,
            { strokeDashoffset: circumference },
            { strokeDashoffset: offset, duration: 1.2, ease: 'power2.out' }
          )
      }
      if (numRef.current) {
        if (reduce) numRef.current.textContent = String(Math.round(value))
        else {
          const o = { n: 0 }
          gsap.to(o, {
            n: value,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
              if (numRef.current) numRef.current.textContent = String(Math.round(o.n))
            },
          })
        }
      }
    },
    { scope, dependencies: [value, max] }
  )

  return (
    <div ref={scope} className={cn('inline-flex flex-col items-center', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90" aria-hidden>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth} className="stroke-muted" />
          <circle
            ref={arcRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="stroke-primary"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            ref={numRef}
            className="font-heading text-[1.75rem] font-bold leading-none tabular-nums text-foreground"
            aria-label={`${value} of ${max}`}
          >
            0
          </span>
          <span className="mt-0.5 text-[11px] tabular-nums text-muted-foreground">/ {max}</span>
        </div>
      </div>
      {label && (
        <div className="mt-2 text-center">
          <div className="font-heading text-[13px] font-semibold text-foreground">{label}</div>
          {sublabel && <div className="text-[12px] text-muted-foreground">{sublabel}</div>}
        </div>
      )}
    </div>
  )
}
