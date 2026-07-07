"use client"

import { ThemeToggle } from '@/components/theme-toggle'
import { Logo } from '@/components/brand/logo'
import { SectionGroup } from './Section'
import { PrimitivesGallery } from './PrimitivesGallery'
import { DataSurfacesGallery } from './DataSurfacesGallery'
import { DataTableGallery } from './DataTableGallery'
import { AppShellGallery } from './AppShellGallery'
import { FormsGallery } from './FormsGallery'
import { OverlaysGallery } from './OverlaysGallery'
import { DomainWidgetsGallery } from './DomainWidgetsGallery'

/** Living component gallery. Verifies tokens, motion, and every component in
 *  light AND dark. Each batch is its own file under src/gallery/ — add a
 *  <SectionGroup> + module here as batches land (see docs/03_COMPONENT_BUILD_PLAN.md). */
export function Gallery() {
  return (
      <div className="min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-7 py-3">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="hidden text-[13px] text-muted-foreground sm:inline">component gallery</span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-7 pb-16">
          <SectionGroup
            eyebrow="Phase A · Batch A1"
            title="Foundation & primitives"
            description="The atoms every screen composes from — buttons, badges, cards, inputs, and the loading/structure primitives."
          />
          <PrimitivesGallery />

          <SectionGroup
            eyebrow="Phase A · Batch A2"
            title="Data surfaces"
            description="The product's core: score rings, KPI stat cards, the signature Trust-Flow distribution bar, tables, and the mandatory empty / error / loading states. Numbers and charts animate on load (GSAP, reduced-motion aware)."
          />
          <DataSurfacesGallery />

          <SectionGroup
            eyebrow="Phase A · Batch A3"
            title="DataTable"
            description="The composed data grid every management screen is built from — toolbar search, sortable columns, row selection, pagination, and the mandatory loading / empty / error states, all wired together."
          />
          <DataTableGallery />

          <SectionGroup
            eyebrow="Phase A · Batch A4"
            title="App shell & navigation"
            description="The frame every screen sits in — the 236px sidebar, the sticky command bar (search · domain context · one action · avatar), tabs, breadcrumb, and the account menu, composed into a real, interactive screen."
          />
          <AppShellGallery />

          <SectionGroup
            eyebrow="Phase A · Batch A5"
            title="Forms & inputs"
            description="The controls the setup wizard and settings screens are built from — Select, Switch, RadioGroup option cards, Slider, and Textarea, composed with FormField (label + control + help/error)."
          />
          <FormsGallery />

          <SectionGroup
            eyebrow="Phase A · Batch A6"
            title="Feedback & overlays"
            description="The modals, drawers, and notices that carry state changes — confirm Dialog, the right-side domain-detail Sheet, transient Toasts, persistent AlertBanners, filter Popover, the generation Progress bar, and the single tasteful plan-gate."
          />
          <OverlaysGallery />

          <SectionGroup
            eyebrow="Phase A · Batch A7"
            title="Domain-specific widgets"
            description="The specialized data widgets the research screens are built from — the expandable TTF/backlink row, anchor-match rows with relevancy, the project DomainCard, hand-rolled sparklines, the restrained ChartCard, and the language distribution bar."
          />
          <DomainWidgetsGallery />
        </main>
      </div>
  )
}
