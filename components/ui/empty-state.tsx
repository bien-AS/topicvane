"use client";

import type { LucideIcon } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** EmptyState — the mandatory "nothing here yet" surface for every data view.
 *  Muted icon in a soft tile + one-line guidance + a single primary action.
 *  Never a dead end: always offer the next step. */
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: { label: string; onClick?: () => void; icon?: LucideIcon };
  secondaryAction?: { label: string; onClick?: () => void };
}

export function EmptyState({
  icon: Icon = Icons.empty,
  title,
  description,
  action,
  secondaryAction,
  className,
  ...props
}: EmptyStateProps) {
  const ActionIcon = action?.icon;
  return (
    <div
      className={cn("flex flex-col items-center justify-center px-6 py-12 text-center", className)}
      {...props}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-muted/60">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 font-heading text-[15px] font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-5 flex items-center gap-2.5">
          {action && (
            <Button
              size="sm"
              onClick={action.onClick}
            >
              {ActionIcon && <ActionIcon className="h-4 w-4" />}
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button
              size="sm"
              variant="ghost"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
