"use client"

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

/** FieldError — inline validation message in error color. */
export function FieldError({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  if (!children) return null
  return (
    <p className={cn('text-[13px] text-destructive', className)} {...props}>
      {children}
    </p>
  )
}

/** FormField — the label + control + (description | error) wrapper that every
 *  form row uses. Lightweight (no form library). */
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  htmlFor?: string
  required?: boolean
  description?: React.ReactNode
  error?: React.ReactNode
}

export function FormField({
  label,
  htmlFor,
  required,
  description,
  error,
  className,
  children,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn('grid gap-1.5', className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} required={required} className={error ? 'text-destructive' : undefined}>
          {label}
        </Label>
      )}
      {children}
      {error ? (
        <FieldError>{error}</FieldError>
      ) : description ? (
        <p className="text-[13px] text-muted-foreground">{description}</p>
      ) : null}
    </div>
  )
}
