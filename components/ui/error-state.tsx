"use client"

import * as React from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Icons } from '@/lib/icons'

/** ErrorState — the mandatory failure surface for a data view. States the cause
 *  in plain language and offers a recovery action (usually retry). Error tone is
 *  used for the icon/label only; the recovery button stays the standard primary. */
export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon
  title?: string
  description?: string
  retry?: { label?: string; onClick?: () => void }
}

export function ErrorState({
  icon: Icon = Icons.error,
  title = 'Something went wrong',
  description,
  retry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10">
        <Icon className="h-6 w-6 text-destructive" />
      </div>
      <h3 className="mt-4 font-heading text-[15px] font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">{description}</p>
      )}
      {retry && (
        <Button size="sm" variant="secondary" className="mt-5" onClick={retry.onClick}>
          <Icons.loading className="h-4 w-4" />
          {retry.label ?? 'Try again'}
        </Button>
      )}
    </div>
  )
}
