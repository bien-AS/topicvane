"use client";

import * as React from "react";
import { TtfBadge } from "@/components/ui/ttf-badge";
import { getTtfColor } from "@/lib/tokens/majestic-ttf";

/** TtfTopicRow — a Topical Trust Flow row (the S-09 pattern, matching Majestic's
 *  Site Explorer). Shows the category value badge + topic, and three counts on
 *  the right. */
export interface TtfTopicRowProps {
  topic: string;
  value: number;
  referringUrls: number;
  referringDomains: number;
  onTopicLinks: number;
  backlinks?: Array<{
    topicTf: number;
    sourceTf: number;
    source: string;
    target: string;
    anchor?: string;
  }>;
}

const fmt = (n: number) => n.toLocaleString();
const short = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

type Panel = "urls" | "ondomains" | null;

export function TtfTopicRow({
  topic,
  value,
  referringUrls,
  referringDomains,
  onTopicLinks,
  backlinks = [],
}: TtfTopicRowProps) {
  const [open, setOpen] = React.useState<Panel>(null);
  const { name } = getTtfColor(topic);
  const child = topic
    .split(/\s*\/\s*/)
    .slice(1)
    .join(" / ");
  const toggle = (p: Panel) => setOpen((cur) => (cur === p ? null : p));

  const countBtn =
    "w-28 shrink-0 text-right text-[13px] font-medium tabular-nums text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded";

  return (
    <div className="border-b border-border last:border-0">
      <div className="flex items-center gap-3 px-3 py-2.5 text-[13px]">
        <TtfBadge
          topic={topic}
          value={value}
        />
        <span className="flex min-w-0 flex-1 items-baseline gap-2">
          <span className="font-medium text-foreground">{name}</span>
          {child && <span className="truncate text-muted-foreground">{child}</span>}
        </span>
        <button
          type="button"
          onClick={() => toggle("urls")}
          className={countBtn}
          aria-expanded={open === "urls"}
        >
          {fmt(referringUrls)}
        </button>
        <span className="w-24 shrink-0 text-right tabular-nums text-muted-foreground">
          {fmt(referringDomains)}
        </span>
        <button
          type="button"
          onClick={() => toggle("ondomains")}
          className={countBtn}
          aria-expanded={open === "ondomains"}
        >
          {fmt(onTopicLinks)}
        </button>
      </div>

      {open && (
        <div className="bg-muted/20 px-3 pb-3 pt-1">
          <p className="mb-2 max-w-3xl text-[12px] leading-relaxed text-muted-foreground">
            {open === "urls"
              ? `Backlinks from referring domains that carry Trust Flow in ${name}. A 0-value source means all the incoming ${name} Trust Flow comes from the domain.`
              : `External referring URLs that carry ${name} Trust Flow.`}
          </p>
          {backlinks.length ? (
            <div className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="flex items-center gap-3 border-b border-border bg-muted/40 px-3 py-1.5 font-heading text-[10px] font-semibold uppercase tracking-[0.04em] text-muted-foreground">
                <span className="w-12 shrink-0 text-center">TF · Dom</span>
                <span className="flex-1">Source URL → Target URL</span>
                <span className="w-56 shrink-0">Anchor text</span>
              </div>
              <ul className="divide-y divide-border/70">
                {backlinks.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 text-[12px]"
                  >
                    <span className="flex w-12 shrink-0 items-center justify-center gap-1">
                      <span className="rounded-[4px] bg-muted px-1 font-heading text-[11px] font-bold tabular-nums text-foreground">
                        {b.topicTf}
                      </span>
                      {open === "urls" && (
                        <span className="rounded-[4px] bg-accent px-1 font-heading text-[11px] font-bold tabular-nums text-accent-foreground">
                          {b.sourceTf}
                        </span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <a
                        href="#"
                        className="block truncate font-medium text-primary hover:underline"
                      >
                        {short(b.source)}
                      </a>
                      <span className="block truncate text-muted-foreground">
                        ↳ {short(b.target)}
                      </span>
                    </span>
                    <span className="w-56 shrink-0 truncate text-muted-foreground">
                      {b.anchor || "—"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="px-1 py-2 text-[12px] text-muted-foreground">
              No sample links for this topic.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
