"use client"

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Icons } from '@/lib/icons'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'

/** ConfirmDialog — the guardrail for expensive/destructive actions.
 *  Shows a plain-language impact/cost preview before the user commits. */
export interface ConfirmImpact {
  label: string
  value: string
}

export interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  impact?: ConfirmImpact[]
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  impact = [],
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                destructive ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'
              )}
            >
              {destructive ? <Icons.error className="h-4 w-4" /> : <Icons.generate className="h-4 w-4" />}
            </span>
            <DialogTitle>{title}</DialogTitle>
          </div>
          {description && <DialogDescription className="pt-1">{description}</DialogDescription>}
        </DialogHeader>

        {impact.length > 0 && (
          <dl className="divide-y divide-border rounded-lg border border-border bg-muted/30">
            {impact.map((row) => (
              <div key={row.label} className="flex items-center justify-between px-3.5 py-2.5 text-[13px]">
                <dt className="text-muted-foreground">{row.label}</dt>
                <dd className="font-heading font-semibold tabular-nums text-foreground">{row.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? 'destructive' : 'default'}
            size="sm"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
