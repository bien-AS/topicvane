"use client";

import * as React from "react";
import { BacklinkStat } from "@/components/ui/backlink-stat";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MetricSparkline } from "@/components/ui/metric-sparkline";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { TtfBadge } from "@/components/ui/ttf-badge";
import { Icons } from "@/lib/icons";
import { getTtfColor } from "@/lib/tokens/majestic-ttf";
import { cn } from "@/lib/utils";

/** DomainCard — the project/domain card for the Projects grid (S-21). Domain +
 *  status, the Trust Flow beside a trend sparkline, the top Majestic categories,
 *  and a compact metric row. Interactive: the whole card is the affordance. */
export interface DomainCardTopic {
  topic: string;
  value: number;
}

export interface DomainCardProps extends React.HTMLAttributes<HTMLDivElement> {
  domain: string;
  title?: string;
  trustFlow: number;
  status?: { label: string; variant?: BadgeProps["variant"] };
  topTopics?: DomainCardTopic[];
  metrics?: { label: string; value: number | string }[];
  trend?: number[];
  progress?: { published: number; total: number };
  wordpress?: "connected" | "error";
  onOpen?: () => void;
}

export function DomainCard({
  domain,
  title,
  trustFlow,
  status,
  topTopics = [],
  metrics = [],
  trend,
  progress,
  wordpress,
  onOpen,
  className,
  ...props
}: DomainCardProps) {
  const pct =
    progress && progress.total > 0 ? Math.round((progress.published / progress.total) * 100) : 0;
  return (
    <Card
      interactive
      onClick={onOpen}
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
      className={cn(
        "flex flex-col gap-4 p-5",
        onOpen &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <Icons.websiteBuilder className="h-4 w-4 shrink-0 text-muted-foreground" />
          <div className="min-w-0">
            <div className="truncate font-heading text-[14px] font-semibold text-foreground">
              {domain}
            </div>
            {title && <div className="truncate text-[12px] text-muted-foreground">{title}</div>}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {status && <Badge variant={status.variant ?? "neutral"}>{status.label}</Badge>}
          {wordpress && (
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground"
              title={`WordPress ${wordpress}`}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  wordpress === "connected" ? "bg-success" : "bg-destructive",
                )}
                aria-hidden
              />
              {wordpress === "connected" ? "WordPress" : "WP error"}
            </span>
          )}
        </div>
      </div>

      <Separator />

      <div className="flex items-end justify-between gap-4">
        <div className="shrink-0">
          <div className="font-heading text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
            Trust Flow
          </div>
          <div className="mt-0.5 font-heading text-[1.5rem] font-bold leading-none tabular-nums text-foreground">
            {trustFlow}
          </div>
        </div>
        {progress ? (
          <div className="min-w-0 flex-1 pl-4">
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
                Content
              </span>
              <span className="text-[12px] tabular-nums text-muted-foreground">
                <span className="font-semibold text-foreground">{progress.published}</span> /{" "}
                {progress.total} live
              </span>
            </div>
            <Progress
              value={pct}
              className="mt-1.5 h-1.5"
            />
          </div>
        ) : (
          trend &&
          trend.length > 1 && (
            <MetricSparkline
              data={trend}
              width={104}
              height={34}
            />
          )
        )}
      </div>

      {topTopics.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {topTopics.slice(0, 2).map((t) => (
            <span
              key={t.topic}
              className="inline-flex items-center gap-1.5"
            >
              <TtfBadge
                topic={t.topic}
                value={t.value}
              />
              <span className="text-[12px] text-muted-foreground">{getTtfColor(t.topic).name}</span>
            </span>
          ))}
        </div>
      )}

      {metrics.length > 0 && (
        <div className="mt-auto grid grid-cols-2 gap-3 border-t border-border pt-4">
          {metrics.slice(0, 2).map((m) => (
            <BacklinkStat
              key={m.label}
              label={m.label}
              value={m.value}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
