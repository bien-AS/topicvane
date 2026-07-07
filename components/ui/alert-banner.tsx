"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlert, CircleCheck, Info, type LucideIcon, TriangleAlert, X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";

/** AlertBanner — an inline, persistent notice (vs. the transient Toast). Semantic
 *  tint by variant, always paired with an icon + word. Optional action + dismiss. */
const alertVariants = cva("flex items-start gap-3 rounded-lg border p-4 text-[13px]", {
  variants: {
    variant: {
      info: "border-info/25 bg-info/5",
      success: "border-success/25 bg-success/5",
      warning: "border-warning/25 bg-warning/5",
      error: "border-destructive/25 bg-destructive/5",
    },
  },
  defaultVariants: { variant: "info" },
});

const ICONS: Record<string, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  error: CircleAlert,
};
const TONE: Record<string, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
};

export interface AlertBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  onDismiss?: () => void;
}

export function AlertBanner({
  className,
  variant = "info",
  title,
  icon,
  action,
  onDismiss,
  children,
  ...props
}: AlertBannerProps) {
  const Icon = icon ?? ICONS[variant ?? "info"];
  const tone = TONE[variant ?? "info"];
  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", tone)} />
      <div className="min-w-0 flex-1">
        {title && <div className="font-heading font-semibold text-foreground">{title}</div>}
        {children && (
          <div className={cn("leading-relaxed text-muted-foreground", title && "mt-0.5")}>
            {children}
          </div>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 rounded text-muted-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
