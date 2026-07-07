"use client"

import * as React from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'
import { getTtfColor } from '@/lib/tokens/majestic-ttf'

/** TtfDistributionBar — the signature share-of-Trust viz. A single segmented bar
 *  where each segment's width is its share of total Trust Flow and its color is
 *  the Majestic parent-category hex (the ONLY palette use besides badges — a data
 *  mark, never chrome). Segments grow in on load (GSAP, reduced-motion aware). */
export interface TtfSegment {
  topic: string
  value: number
}

export interface TtfDistributionBarProps extends React.HTMLAttributes<HTMLDivElement> {
  segments: TtfSegment[]
  showLegend?: boolean
  height?: number
}

export function TtfDistributionBar({
  segments,
  showLegend = true,
  height = 12,
  className,
  ...props
}: TtfDistributionBarProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1
  const ranked = [...segments].sort((a, b) => b.value - a.value)
  const scope = React.useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduce) return
      gsap.from('[data-ttf-seg]', {
        scaleX: 0,
        transformOrigin: '0% 50%',
        duration: 0.9,
        stagger: 0.06,
        ease: 'power2.out',
      })
      gsap.from('[data-ttf-legend-row]', {
        autoAlpha: 0,
        y: 6,
        duration: 0.4,
        stagger: 0.04,
        delay: 0.15,
        ease: 'power2.out',
      })
    },
    { scope }
  )

  return (
    <div ref={scope} className={cn('w-full', className)} {...props}>
      <div
        className="flex w-full overflow-hidden rounded-full bg-muted"
        style={{ height }}
        role="img"
        aria-label="Topical Trust Flow distribution by category"
      >
        {ranked.map((seg, i) => {
          const { hex, name } = getTtfColor(seg.topic)
          const share = (seg.value / total) * 100
          return (
            <div
              key={`${seg.topic}-${i}`}
              data-ttf-seg
              title={`${seg.topic} — ${seg.value} (${share.toFixed(0)}%)`}
              className="h-full"
              style={{ width: `${share}%`, backgroundColor: hex }}
              aria-label={`${name} ${share.toFixed(0)}%`}
            />
          )
        })}
      </div>

      {showLegend && (
        <ul className="mt-4 space-y-2">
          {ranked.map((seg, i) => {
            const { hex, name } = getTtfColor(seg.topic)
            const share = (seg.value / total) * 100
            const child = seg.topic.split(/\s*\/\s*/).slice(1).join(' / ')
            return (
              <li
                key={`${seg.topic}-legend-${i}`}
                data-ttf-legend-row
                className="flex items-center gap-3 text-[13px]"
              >
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                  style={{ backgroundColor: hex }}
                  aria-hidden
                />
                <span className="font-medium text-foreground">{name}</span>
                {child && <span className="truncate text-muted-foreground">{child}</span>}
                <span className="ml-auto shrink-0 tabular-nums text-muted-foreground">{seg.value}</span>
                <span className="w-10 shrink-0 text-right tabular-nums font-medium text-foreground">
                  {share.toFixed(0)}%
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
