"use client";

import { Lock } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** LockedState — the ONE tasteful plan-gate. A calm, single upgrade prompt for
 *  a locked feature (never a stacked billboard). */
export interface LockedStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  tier?: string;
  cta?: { label: string; onClick?: () => void };
}

export function LockedState({
  title,
  description,
  tier,
  cta,
  className,
  ...props
}: LockedStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-xl border border-dashed border-border bg-accent/30 px-6 py-10 text-center",
        className,
      )}
      {...props}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent">
        <Lock className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mt-4 font-heading text-[15px] font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
      {tier && (
        <Badge
          variant="info"
          className="mt-3"
        >
          {tier}
        </Badge>
      )}
      <Button
        size="sm"
        className="mt-5"
        onClick={cta?.onClick}
      >
        {cta?.label ?? "Upgrade plan"}
      </Button>
    </div>
  );
}
