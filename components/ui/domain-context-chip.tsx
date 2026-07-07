"use client";

import * as React from "react";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** DomainContextChip — the active-domain context in the top bar: the domain in
 *  focus + a Fresh/Historic index toggle. */
export type IndexMode = "fresh" | "historic";

export interface DomainContextChipProps extends React.HTMLAttributes<HTMLDivElement> {
  domain: string;
  mode: IndexMode;
  onModeChange: (mode: IndexMode) => void;
}

const MODES = [
  {
    value: "fresh" as const,
    label: "Fresh",
    icon: Icons.fresh,
    activeClass: "bg-success/15 text-success ring-1 ring-inset ring-success/25",
  },
  {
    value: "historic" as const,
    label: "Historic",
    icon: Icons.historic,
    activeClass: "bg-warning/15 text-warning ring-1 ring-inset ring-warning/25",
  },
];

export function DomainContextChip({
  domain,
  mode,
  onModeChange,
  className,
  ...props
}: DomainContextChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-md border border-border bg-card py-1 pl-2.5 pr-1 shadow-e1",
        className,
      )}
      {...props}
    >
      <Icons.websiteBuilder className="h-4 w-4 text-muted-foreground" />
      <span className="font-heading text-[13px] font-semibold text-foreground">{domain}</span>
      {/* biome-ignore lint/a11y/useSemanticElements: shadcn/ui pattern — fieldset introduces unwanted browser styling */}
      <div
        role="group"
        aria-label="Index freshness"
        className="flex items-center gap-0.5 rounded-[7px] bg-muted/60 p-0.5"
      >
        {MODES.map((m) => {
          const on = mode === m.value;
          const Icon = m.icon;
          return (
            <button
              key={m.value}
              type="button"
              aria-pressed={on}
              onClick={() => onModeChange(m.value)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-[5px] px-2 py-1 text-[12px] font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                on ? m.activeClass : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
