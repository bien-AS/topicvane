"use client";

import { AnchorMatchRow } from "@/components/ui/anchor-match-row";
import { Card } from "@/components/ui/card";
import { CategoryBarChart, ChartCard } from "@/components/ui/chart-card";
import { DomainCard, type DomainCardProps } from "@/components/ui/domain-card";
import { LanguageBar } from "@/components/ui/language-bar";
import { MetricSparkline } from "@/components/ui/metric-sparkline";
import { TtfTopicRow } from "@/components/ui/ttf-topic-row";
import { DEMO_DOMAINS, DEMO_DOMAINS_BY_NAME } from "@/lib/tokens/demo-domains";
import { backlinksForTopic, getBacklinks, topicCounts } from "@/lib/tokens/majestic-backlinks";
import { getTtfColor } from "@/lib/tokens/majestic-ttf";
import { Section } from "./Section";

const fc = DEMO_DOMAINS_BY_NAME["foodchainid.com"];
const sg = DEMO_DOMAINS_BY_NAME["superiorgrouting.com"];

const TREND: Record<string, number[]> = {
  "foodchainid.com": [24, 26, 25, 28, 29, 31, 31],
  "authoritysolutions.com": [22, 21, 20, 19, 20, 19, 19],
  "tristarbuilt.com": [14, 16, 17, 18, 20, 20, 21],
  "superiorgrouting.com": [8, 7, 7, 6, 6, 6, 6],
  "drbrianharkins.com": [3, 2, 2, 1, 1, 0, 0],
};
const STATUS: Record<string, DomainCardProps["status"]> = {
  "foodchainid.com": { label: "Live", variant: "success" },
  "authoritysolutions.com": { label: "Publishing", variant: "info" },
  "tristarbuilt.com": { label: "Live", variant: "success" },
  "superiorgrouting.com": { label: "Draft", variant: "neutral" },
  "drbrianharkins.com": { label: "Draft", variant: "neutral" },
};

const FC_BACKLINKS = getBacklinks("foodchainid.com");

const LANGUAGES = [
  { label: "English", value: 78 },
  { label: "Spanish", value: 9 },
  { label: "German", value: 6 },
  { label: "French", value: 4 },
  { label: "Other", value: 3 },
];

/** Batch A7 — Domain-specific widgets. */
export function DomainWidgetsGallery() {
  const topicTotal = fc.topics.slice(0, 5).reduce((s, t) => s + t.value, 0);

  return (
    <>
      <Section
        title="DomainCard (Projects grid)"
        subtitle="the S-21 project card — status · Trust Flow + trend · top categories · metrics · hover to lift"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {DEMO_DOMAINS.map((d) => (
            <DomainCard
              key={d.domain}
              domain={d.domain}
              title={d.title}
              trustFlow={d.trustFlow}
              status={STATUS[d.domain]}
              topTopics={d.topics.slice(0, 2)}
              trend={TREND[d.domain]}
              metrics={[
                { label: "Backlinks", value: d.extBacklinks },
                { label: "Ref. domains", value: d.refDomains },
              ]}
              onOpen={() => {}}
            />
          ))}
        </div>
      </Section>

      <Section
        title="TtfTopicRow — expandable"
        subtitle="Referring URLs & Links from On-Topic Domains expand to real backlinks (S-09). Majestic color on the value badge only"
      >
        <Card className="p-2">
          <div className="flex items-center gap-3 border-b border-border px-3 pb-2 pt-1 font-heading text-[10px] font-semibold uppercase leading-tight tracking-[0.04em] text-muted-foreground">
            <span className="flex-1">Topic · Trust Flow</span>
            <span className="w-28 shrink-0 text-right">Referring URLs</span>
            <span className="w-24 shrink-0 text-right">Referring Domains</span>
            <span className="w-28 shrink-0 text-right">Links from On-Topic Domains</span>
          </div>
          {fc.topics.slice(0, 5).map((t) => {
            const share = t.value / topicTotal;
            const counts = topicCounts(fc.refDomains, fc.extBacklinks, share);
            return (
              <TtfTopicRow
                key={t.topic}
                topic={t.topic}
                value={t.value}
                referringUrls={counts.referringUrls}
                referringDomains={counts.referringDomains}
                onTopicLinks={counts.onTopicLinks}
                backlinks={backlinksForTopic(FC_BACKLINKS, t.topic)}
              />
            );
          })}
        </Card>
      </Section>

      <Section
        title="AnchorMatchRow"
        subtitle="anchor-phrase matches with relevancy — real anchor data from superiorgrouting.com"
      >
        <Card className="p-4">
          <div className="mb-1 grid grid-cols-[1fr_auto_auto] gap-4 border-b border-border pb-2 font-heading text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground sm:grid-cols-[1fr_120px_auto_auto]">
            <span>Anchor</span>
            <span className="hidden sm:block">Relevancy</span>
            <span className="w-16 text-right">Ref. dom.</span>
            <span className="w-16 text-right">Links</span>
          </div>
          {sg.anchors?.map((a, i) => (
            <AnchorMatchRow
              key={a.text}
              anchor={a.text}
              refDomains={a.refDomains}
              totalLinks={a.totalLinks}
              relevancy={[92, 88, 64, 61, 20, 15][i] ?? 40}
            />
          ))}
        </Card>
      </Section>

      <Section
        title="ChartCard & MetricSparkline"
        subtitle="restrained wrappers — a trend sparkline and a Majestic category bar chart"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <ChartCard
            title="Referring domains"
            unit="last 6 months"
            delta={{ value: "+37", direction: "up" }}
          >
            <MetricSparkline
              data={[820, 870, 910, 980, 1010, 1049]}
              width={480}
              height={72}
              className="w-full"
            />
            <div className="mt-2 flex justify-between text-[11px] tabular-nums text-muted-foreground">
              <span>Feb</span>
              <span>Jul</span>
            </div>
          </ChartCard>

          <ChartCard
            title="Trust Flow by category"
            unit="foodchainid.com"
          >
            <CategoryBarChart
              data={fc.topics.slice(0, 5).map((t) => {
                const child = t.topic
                  .split(/\s*\/\s*/)
                  .slice(1)
                  .join(" / ");
                return {
                  label: child || getTtfColor(t.topic).name,
                  value: t.value,
                  color: getTtfColor(t.topic).hex,
                };
              })}
            />
          </ChartCard>
        </div>
      </Section>

      <Section
        title="LanguageBar"
        subtitle="share-of-links by language — neutral blue tints (languages aren't Majestic categories)"
      >
        <Card className="max-w-xl p-5">
          <LanguageBar segments={LANGUAGES} />
        </Card>
      </Section>
    </>
  );
}
