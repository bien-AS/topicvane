"use client"

import { Section } from './Section'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TtfBadge } from '@/components/ui/ttf-badge'
import { Skeleton } from '@/components/ui/skeleton'
import { StatCard } from '@/components/ui/stat-card'
import { ScoreRing } from '@/components/ui/score-ring'
import { TtfDistributionBar } from '@/components/ui/ttf-distribution-bar'
import { EmptyState } from '@/components/ui/empty-state'
import { ErrorState } from '@/components/ui/error-state'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'
import { DEMO_DOMAINS, DEMO_DOMAINS_BY_NAME } from '@/lib/tokens/demo-domains'
import { getTtfColor } from '@/lib/tokens/majestic-ttf'
import { Icons } from '@/lib/icons'

const fc = DEMO_DOMAINS_BY_NAME['foodchainid.com']

const qualityBadge = {
  strong: <Badge variant="success">Strong</Badge>,
  moderate: <Badge variant="info">Moderate</Badge>,
  weak: <Badge variant="warning">Weak</Badge>,
} as const

/** Batch A2 — P0 data surfaces (the product's core). */
export function DataSurfacesGallery() {
  return (
    <>
      <Section title="ScoreRing" subtitle="Trust / Citation Flow · arc sweeps + counts up on load · score is neutral ink, ring is the single blue">
        <div
          className="flex flex-wrap items-center gap-10 rounded-lg p-6"
          style={{ background: 'radial-gradient(circle at 50% -10%, hsl(var(--primary) / 0.08), transparent 60%)' }}
        >
          <ScoreRing value={fc.trustFlow} label="Trust Flow" sublabel="foodchainid.com" />
          <ScoreRing value={fc.citationFlow} label="Citation Flow" size={120} strokeWidth={9} />
        </div>
      </Section>

      <Section title="StatCard" subtitle="label-caps + tabular metric (counts up) + delta + sparkline slot">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Ext. Backlinks"
            value={fc.extBacklinks}
            icon={Icons.outbound}
            delta={{ value: '1,204 vs last scan', direction: 'up' }}
          />
          <StatCard
            label="Ref. Domains"
            value={fc.refDomains}
            icon={Icons.domainInventory}
            delta={{ value: '37 vs last scan', direction: 'up' }}
          />
          <StatCard
            label="Indexed URLs"
            value={fc.indexedURLs}
            icon={Icons.blog}
            delta={{ value: '112 vs last scan', direction: 'down' }}
          />
          <StatCard label="Ref. IPs" value={fc.refIPs} icon={Icons.topicalMap} />
        </div>
      </Section>

      <Section title="TtfDistributionBar" subtitle="the signature share-of-Trust viz — segments grow in, Majestic colors, ranked legend">
        <TtfDistributionBar segments={fc.topics.slice(0, 6)} />
      </Section>

      <Section title="Table" subtitle="sticky header · hover rows · one emphasized column · right-aligned tabular numerics · blue links">
        <div className="overflow-hidden rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>Top category</TableHead>
                <TableHead className="text-right">TF</TableHead>
                <TableHead className="text-right">CF</TableHead>
                <TableHead className="text-right">Ref. domains</TableHead>
                <TableHead>Candidate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEMO_DOMAINS.map((d) => {
                const top = d.topics[0]
                return (
                  <TableRow key={d.domain}>
                    <TableCell className="font-medium text-foreground">
                      <a href="#" className="text-primary hover:underline">
                        {d.domain}
                      </a>
                    </TableCell>
                    <TableCell>
                      {top ? (
                        <span className="inline-flex items-center gap-2">
                          <TtfBadge topic={top.topic} value={top.value} />
                          <span className="text-muted-foreground">{getTtfColor(top.topic).name}</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground/60">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{d.trustFlow}</TableCell>
                    <TableCell className="text-right tabular-nums">{d.citationFlow}</TableCell>
                    <TableCell className="text-right tabular-nums">{d.refDomains.toLocaleString()}</TableCell>
                    <TableCell>{qualityBadge[d.quality]}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </Section>

      <Section title="EmptyState & ErrorState" subtitle="every data view ships both — never a dead end">
        <div className="grid gap-5 md:grid-cols-2">
          <Card>
            <EmptyState
              icon={Icons.domainInventory}
              title="No domains in inventory yet"
              description="Load expired domains one-per-line or via CSV to start matching them to topics by Trust Flow."
              action={{ label: 'Add domains', icon: Icons.add }}
              secondaryAction={{ label: 'Import CSV' }}
            />
          </Card>
          <Card>
            <ErrorState
              title="Majestic scan failed"
              description="We couldn't reach the Majestic index for this domain. This is usually temporary."
              retry={{ label: 'Retry scan' }}
            />
          </Card>
        </div>
      </Section>

      <Section title="Loading state" subtitle="table skeleton — pairs with the same Table layout above">
        <div className="overflow-hidden rounded-lg border border-border">
          <div className="flex h-9 items-center gap-4 border-b border-border bg-muted/50 px-3">
            {['w-24', 'w-28', 'w-8', 'w-8', 'w-20', 'w-16'].map((w, i) => (
              <Skeleton key={i} className={`h-2.5 ${w}`} />
            ))}
          </div>
          {[0, 1, 2, 3].map((r) => (
            <div key={r} className="flex items-center gap-4 border-b border-border/70 px-3 py-3 last:border-0">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-[22px] w-9 rounded-sm" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-8" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="ml-auto h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
