"use client";

import * as React from "react";
import { Logo } from "@/components/brand/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TtfBadge } from "@/components/ui/ttf-badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Icons } from "@/lib/icons";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="font-heading text-xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
      <Separator />
    </section>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-full bg-background">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur">
        <Logo />
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Component gallery</span>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] space-y-10 px-6 py-10">
        <div className="space-y-1">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight">
            TopicVane — Foundation &amp; P0 primitives
          </h1>
          <p className="text-muted-foreground">
            Blue <span className="tabular">#1E40AF</span> single accent · Plus Jakarta Sans +
            Inter · light &amp; dark. Toggle the theme, top-right.
          </p>
        </div>

        <Section
          title="Buttons"
          description="primary / secondary / ghost / outline / destructive / link · sizes · states"
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Add">
              <Icons.add />
            </Button>
            <Button disabled>Disabled</Button>
            <Button>
              <Icons.download /> With icon
            </Button>
          </div>
        </Section>

        <Section
          title="Status badges"
          description="color + word/icon together — never color-only"
        >
          <Badge variant="neutral" dot>
            Neutral
          </Badge>
          <Badge variant="success" dot>
            <Icons.success /> Healthy
          </Badge>
          <Badge variant="error" dot>
            <Icons.error /> Broken
          </Badge>
          <Badge variant="warning" dot>
            <Icons.warning /> Warning
          </Badge>
          <Badge variant="info" dot>
            <Icons.info /> Info
          </Badge>
          <Badge variant="primary">In use</Badge>
        </Section>

        <Section
          title="TTF badges (Majestic data marks)"
          description="⚠ placeholder colors — swap for the verified Majestic legend hexes"
        >
          <TtfBadge topic="Business / Investing" value={62} />
          <TtfBadge topic="Health / Fitness" value={48} />
          <TtfBadge topic="Computers / Software" value={71} />
          <TtfBadge topic="Arts / Music" value={35} />
          <TtfBadge topic="Sports / Soccer" value={29} />
          <TtfBadge topic="Unknown / Nowhere" value={5} />
          <TtfBadge topic="Recreation / Travel" parentOnly />
        </Section>

        <Section
          title="Form: Input + Label"
          description="default / focus / error / disabled + required dot + helper text"
        >
          <div className="w-64 space-y-1.5">
            <Label htmlFor="g-domain" required>
              Domain
            </Label>
            <Input id="g-domain" placeholder="yahoo.com" defaultValue="ahrefs.com" />
            <p className="text-xs text-muted-foreground">Root domain to analyze.</p>
          </div>
          <div className="w-64 space-y-1.5">
            <Label htmlFor="g-err">Trust Flow threshold</Label>
            <Input id="g-err" aria-invalid defaultValue="not-a-number" />
            <p className="text-xs text-destructive">Enter a number between 0 and 100.</p>
          </div>
          <div className="w-64 space-y-1.5">
            <Label htmlFor="g-dis">Disabled</Label>
            <Input id="g-dis" disabled placeholder="Unavailable" />
          </div>
        </Section>

        <Section title="Cards" description="default + interactive hover + loading">
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Trust Flow</CardTitle>
              <CardDescription>ahrefs.com · Fresh index</CardDescription>
              <CardAction>
                <Badge variant="success" dot>
                  +4
                </Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="font-heading text-3xl font-extrabold tabular">62</div>
            </CardContent>
            <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
              vs 58 last scan
            </CardFooter>
          </Card>

          <Card interactive className="w-72">
            <CardHeader>
              <CardTitle>Interactive card</CardTitle>
              <CardDescription>Hover me — lifts on hover.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Use for clickable project / domain cards.
            </CardContent>
          </Card>

          <Card className="w-72">
            <CardHeader>
              <CardTitle>Loading</CardTitle>
              <CardDescription>Skeleton building block</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </Section>

        <Section title="Avatar" description="image + initials fallback">
          <Avatar>
            <AvatarImage src="/next.svg" alt="" />
            <AvatarFallback>ZB</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>TV</AvatarFallback>
          </Avatar>
          <Avatar className="size-11">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Section>

        <Section title="Tooltip" description="hover or focus the trigger">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label="Refresh scan">
                <Icons.refresh />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Refresh scan</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">Hover for detail</Button>
            </TooltipTrigger>
            <TooltipContent>Trust Flow measures link quality.</TooltipContent>
          </Tooltip>
        </Section>

        <Section title="Separator" description="hairline divider">
          <div className="flex h-6 items-center gap-3 text-sm text-muted-foreground">
            <span>Fresh</span>
            <Separator orientation="vertical" />
            <span>Historic</span>
            <Separator orientation="vertical" />
            <span>All</span>
          </div>
        </Section>
      </main>
    </div>
  );
}
