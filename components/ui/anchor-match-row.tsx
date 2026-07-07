"use client";

import * as React from "react";
import { RelevancyMeter } from "@/components/ui/relevancy-meter";
import { cn } from "@/lib/utils";

/** AnchorMatchRow — a row in the anchor-match results: the anchor phrase + how
 *  many referring domains and total links use it + an optional relevancy meter. */
export interface AnchorMatchRowProps extends React.HTMLAttributes<HTMLDivElement> {
  anchor: string;
  refDomains: number;
  totalLinks: number;
  relevancy?: number;
}

export function AnchorMatchRow({
  anchor,
  refDomains,
  totalLinks,
  relevancy,
  className,
  ...props
}: AnchorMatchRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-border/70 py-2.5 last:border-0 sm:grid-cols-[1fr_120px_auto_auto]",
        className,
      )}
      {...props}
    >
      <span className="min-w-0 truncate">
        <span className="rounded bg-muted px-1.5 py-0.5 text-[13px] font-medium text-foreground">
          {anchor}
        </span>
      </span>
      {relevancy != null && (
        <RelevancyMeter
          value={relevancy}
          className="hidden sm:flex"
        />
      )}
      <span className="w-16 text-right text-[13px] tabular-nums text-muted-foreground">
        {refDomains.toLocaleString()}
      </span>
      <span className="w-16 text-right text-[13px] tabular-nums text-muted-foreground">
        {totalLinks.toLocaleString()}
      </span>
    </div>
  );
}
