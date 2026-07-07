"use client"

import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

/** SegmentedControl — a compact binary/n-ary toggle on a muted track; the active
 *  segment lifts to a white/card pill. Used for Fresh/Historic and other binary
 *  switches. Not the Majestic palette — pure chrome. */
export interface SegmentedOption {
  value: string
  label: string
  icon?: LucideIcon
}

export interface SegmentedControlProps extends React.HTMLAttributes<HTMLDivElement> {
  options: SegmentedOption[]
  value: string
  onValueChange: (value: string) => void
  size?: 'sm' | 'md'
}

export function SegmentedControl({
  options,
  value,
  onValueChange,
  size = 'md',
  className,
  ...props
}: SegmentedControlProps) {
  return (
    <div
      role="group"
      className={cn('inline-flex items-center gap-0.5 rounded-md bg-muted p-0.5', className)}
      {...props}
    >
      {options.map((o) => {
        const active = o.value === value
        const Icon = o.icon
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={active}
            onClick={() => onValueChange(o.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-[6px] font-heading font-semibold transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-muted',
              size === 'sm' ? 'h-7 px-2.5 text-[12px]' : 'h-8 px-3 text-[13px]',
              active ? 'bg-card text-foreground shadow-e1' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" />}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
