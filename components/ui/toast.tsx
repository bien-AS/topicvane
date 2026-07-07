"use client"

import * as React from 'react'
import { createPortal } from 'react-dom'
import { CircleCheck, CircleAlert, TriangleAlert, Info, X } from 'lucide-react'
import { cn } from '@/lib/utils'

/** Toast — transient feedback. Mount <ToastProvider> once near the app root, then
 *  call `useToast().toast({ title, description, variant, action })` anywhere.
 *  Stacks bottom-right, auto-dismisses, aria-live for screen readers. */
export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info'

export interface ToastOptions {
  title?: string
  description?: string
  variant?: ToastVariant
  duration?: number
  action?: { label: string; onClick: () => void }
}
interface ToastItem extends ToastOptions {
  id: number
}

const ToastContext = React.createContext<{ toast: (o: ToastOptions) => void } | null>(null)

const ICONS: Record<ToastVariant, typeof Info> = {
  default: Info,
  success: CircleCheck,
  error: CircleAlert,
  warning: TriangleAlert,
  info: Info,
}
const TONE: Record<ToastVariant, string> = {
  default: 'text-muted-foreground',
  success: 'text-success',
  error: 'text-destructive',
  warning: 'text-warning',
  info: 'text-info',
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])
  const idRef = React.useRef(0)
  const remove = React.useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const toast = React.useCallback(
    (o: ToastOptions) => {
      const id = ++idRef.current
      setToasts((cur) => [...cur, { ...o, id }].slice(-3))
      window.setTimeout(() => remove(id), o.duration ?? 4500)
    },
    [remove]
  )
  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Toaster toasts={toasts} onDismiss={remove} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = React.useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

function Toaster({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: number) => void }) {
  if (typeof document === 'undefined') return null
  return createPortal(
    <div
      role="region"
      aria-live="polite"
      aria-label="Notifications"
      className="pointer-events-none fixed bottom-4 right-4 z-[60] flex w-full max-w-sm flex-col gap-2.5"
    >
      {toasts.map((t) => {
        const variant = t.variant ?? 'default'
        const Icon = ICONS[variant]
        return (
          <div
            key={t.id}
            role="status"
            className="pointer-events-auto flex items-start gap-3 rounded-lg border border-border bg-popover p-4 shadow-e3 animate-in fade-in slide-in-from-right-4"
          >
            <Icon className={cn('mt-0.5 h-4 w-4 shrink-0', TONE[variant])} />
            <div className="min-w-0 flex-1">
              {t.title && <div className="font-heading text-[13px] font-semibold text-foreground">{t.title}</div>}
              {t.description && <div className="mt-0.5 text-[13px] leading-snug text-muted-foreground">{t.description}</div>}
            </div>
            {t.action && (
              <button
                onClick={() => {
                  t.action!.onClick()
                  onDismiss(t.id)
                }}
                className="shrink-0 rounded-sm text-[13px] font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t.action.label}
              </button>
            )}
            <button
              onClick={() => onDismiss(t.id)}
              aria-label="Dismiss"
              className="shrink-0 rounded-sm text-muted-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )
      })}
    </div>,
    document.body
  )
}
