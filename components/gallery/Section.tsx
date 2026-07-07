"use client"

import * as React from 'react'

/** Gallery building blocks. Each component group lives in its own file under
 *  src/gallery/ and is composed by Gallery.tsx — so the living gallery stays
 *  organized as the library grows (one file per batch, not one growing blob). */

/** A titled demo card. */
export function Section({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-8">
      <div className="mb-3">
        <h3 className="font-heading text-[15px] font-bold text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-[13px] text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="rounded-lg border border-border bg-card p-6 shadow-e2">{children}</div>
    </section>
  )
}

/** A batch/group heading that separates major sections of the gallery. */
export function SectionGroup({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-5 mt-4 border-t border-border pt-8">
      {eyebrow && (
        <div className="font-heading text-[11px] font-semibold uppercase tracking-[0.06em] text-primary">
          {eyebrow}
        </div>
      )}
      <h2 className="mt-1 font-heading text-xl font-extrabold tracking-tight text-foreground">{title}</h2>
      {description && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}
