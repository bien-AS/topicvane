"use client"

import { Section } from './Section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TtfBadge } from '@/components/ui/ttf-badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { MAJESTIC_TTF_LIST } from '@/lib/tokens/majestic-ttf'
import { Icons } from '@/lib/icons'

const NAV = [
  { icon: Icons.dashboard, label: 'Dashboard', active: true },
  { icon: Icons.trustFlow, label: 'Topical Trust Flow' },
  { icon: Icons.domainScan, label: 'Domain Scan' },
  { icon: Icons.projects, label: 'Projects' },
]

/** Batch A1 — P0 foundation & primitives. */
export function PrimitivesGallery() {
  return (
    <>
      <Section title="Buttons" subtitle="primary · secondary · ghost · destructive · disabled · icon">
        <div className="flex flex-wrap items-center gap-3">
          <Button>
            <Icons.topicalMap className="h-4 w-4" /> Build Topical Map <Icons.next className="h-4 w-4" />
          </Button>
          <Button variant="secondary">
            <Icons.export className="h-4 w-4" /> Export
          </Button>
          <Button variant="ghost">Cancel</Button>
          <Button variant="destructive">Delete</Button>
          <Button disabled>Disabled</Button>
          <Button size="icon" variant="secondary" aria-label="Filter">
            <Icons.filter className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      <Section title="Navigation icons (Lucide)">
        <nav className="max-w-xs space-y-1">
          {NAV.map(({ icon: Icon, label, active }) => (
            <a
              key={label}
              className={
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ' +
                (active
                  ? 'bg-accent text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground')
              }
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </a>
          ))}
        </nav>
      </Section>

      <Section title="Status badges" subtitle="color always paired with a word — never color alone">
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">Available</Badge>
          <Badge variant="info">In use</Badge>
          <Badge variant="warning">Quota 90%</Badge>
          <Badge variant="error">Scan failed</Badge>
          <Badge variant="neutral">Draft</Badge>
        </div>
      </Section>

      <Section title="Majestic TTF badges" subtitle="data palette — identical in light & dark, never recolored">
        <div className="flex flex-wrap gap-2">
          {MAJESTIC_TTF_LIST.map((c) => (
            <TtfBadge key={c.name} topic={c.name} value={30} />
          ))}
        </div>
      </Section>

      <Section title="Card" subtitle="static + interactive (hover to lift)">
        <div className="grid gap-5 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trust Flow analysis</CardTitle>
              <CardDescription>Fresh index · pulled 2 Jul 2026</CardDescription>
            </CardHeader>
            <CardContent className="flex items-baseline gap-2">
              <span className="font-heading text-[1.625rem] font-bold tabular-nums leading-none">31</span>
              <Badge variant="success">▲ 4 vs last scan</Badge>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="secondary">
                <Icons.export className="h-4 w-4" /> Export
              </Button>
            </CardFooter>
          </Card>
          <Card interactive>
            <CardHeader>
              <CardTitle>foodchainid.com</CardTitle>
              <CardDescription>Interactive card — hover to lift</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <TtfBadge topic="Business/Business Services" value={30} />
              <span className="text-[13px] text-muted-foreground">Business / Business Services</span>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section title="Input, Label & form states" subtitle="focus · error · disabled; required = blue dot">
        <div className="grid max-w-md gap-5">
          <div className="grid gap-1.5">
            <Label htmlFor="domain" required>Domain</Label>
            <Input id="domain" placeholder="example.com" defaultValue="foodchainid.com" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="tf">Min. Trust Flow</Label>
            <Input id="tf" type="number" defaultValue={20} className="tabular-nums" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="bad" className="text-destructive">API key</Label>
            <Input id="bad" aria-invalid defaultValue="wp_live_…invalid" />
            <p className="text-[13px] text-destructive">This key was rejected by WordPress. Re-copy it from Settings.</p>
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="dis">Disabled</Label>
            <Input id="dis" disabled placeholder="Locked while a scan runs" />
          </div>
        </div>
      </Section>

      <Section title="Skeleton" subtitle="loading building block — shimmer, reduced-motion → pulse">
        <div className="max-w-md space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3.5 w-2/5" />
              <Skeleton className="h-3 w-1/4" />
            </div>
            <Skeleton className="h-[22px] w-9 rounded-sm" />
          </div>
          <Separator />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </Section>

      <Section title="Separator, Avatar & Tooltip">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src="/brand/TopicVane-Mark-OnLight.svg" alt="" />
            <AvatarFallback>ZB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>TV</AvatarFallback>
          </Avatar>
          <Separator orientation="vertical" className="h-8" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="sm">
                <Icons.fresh className="h-4 w-4" /> Hover for tooltip
              </Button>
            </TooltipTrigger>
            <TooltipContent>Fresh index — data from the last 90 days</TooltipContent>
          </Tooltip>
        </div>
      </Section>
    </>
  )
}
