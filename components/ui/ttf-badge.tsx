import * as React from "react";
import { cn } from "@/lib/utils";
import { getTtfColor, getTtfParent } from "@/lib/tokens/majestic-ttf";

/*
  Majestic Topical Trust Flow chip — a DATA MARK, so it carries the category's own color
  (from lib/tokens/majestic-ttf.ts) rather than a UI token. This is the one place inline
  hex is correct. Pairs the color with the category label + optional tabular value, so
  meaning is never color-only.
*/

export interface TtfBadgeProps extends React.ComponentProps<"span"> {
  /** Full TTF topic, e.g. "Business / Investing". */
  topic: string;
  /** Optional TTF score/value shown as a tabular number. */
  value?: number;
  /** Show the parent name instead of the full topic string. */
  parentOnly?: boolean;
}

function TtfBadge({
  topic,
  value,
  parentOnly = false,
  className,
  ...props
}: TtfBadgeProps) {
  const { hex, on } = getTtfColor(topic);
  const parent = getTtfParent(topic);
  const label = parentOnly ? parent ?? topic : topic;

  return (
    <span
      data-slot="ttf-badge"
      title={topic}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold font-heading whitespace-nowrap",
        className
      )}
      style={{ backgroundColor: hex, color: on }}
      {...props}
    >
      <span className="max-w-[16ch] truncate">{label}</span>
      {value !== undefined && (
        <span className="tabular font-bold" style={{ color: on }}>
          {value}
        </span>
      )}
    </span>
  );
}

export { TtfBadge };
