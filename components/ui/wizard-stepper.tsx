"use client"

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

/** WizardStepper — the horizontal step indicator for the builder sequence
 *  (Domain Topic → Subtopics → Blog Setup → Website → Generate). Done steps get a
 *  blue check, the current step a blue ring, upcoming steps a muted number. */
export interface WizardStep {
  key: string
  label: string
}

export interface WizardStepperProps {
  steps: WizardStep[]
  current: string
  onStepClick?: (key: string, index: number) => void
  className?: string
}

export function WizardStepper({ steps, current, onStepClick, className }: WizardStepperProps) {
  const currentIdx = steps.findIndex((s) => s.key === current)
  return (
    <ol className={cn('flex items-center', className)}>
      {steps.map((s, i) => {
        const status = i < currentIdx ? 'done' : i === currentIdx ? 'current' : 'upcoming'
        const clickable = Boolean(onStepClick) && i <= currentIdx
        return (
          <li key={s.key} className={cn('flex items-center', i < steps.length - 1 && 'flex-1')}>
            <button
              type="button"
              disabled={!clickable}
              aria-current={status === 'current' ? 'step' : undefined}
              onClick={() => clickable && onStepClick!(s.key, i)}
              className={cn(
                'flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                clickable ? 'cursor-pointer' : 'cursor-default'
              )}
            >
              <span
                className={cn(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-heading text-[12px] font-semibold tabular-nums transition-colors',
                  status === 'done' && 'bg-primary text-primary-foreground',
                  status === 'current' && 'border-2 border-primary text-primary',
                  status === 'upcoming' && 'border border-border text-muted-foreground'
                )}
              >
                {status === 'done' ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={cn(
                  'hidden whitespace-nowrap font-heading text-[13px] font-semibold md:inline',
                  status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'
                )}
              >
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <span className={cn('mx-3 h-px flex-1', i < currentIdx ? 'bg-primary' : 'bg-border')} aria-hidden />
            )}
          </li>
        )
      })}
    </ol>
  )
}
