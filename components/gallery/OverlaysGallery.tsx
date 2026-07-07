"use client";

import * as React from "react";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LockedState } from "@/components/ui/locked-state";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/ui/score-ring";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { StatCard } from "@/components/ui/stat-card";
import { useToast } from "@/components/ui/toast";
import { TtfDistributionBar } from "@/components/ui/ttf-distribution-bar";
import { Icons } from "@/lib/icons";
import { DEMO_DOMAINS_BY_NAME } from "@/lib/tokens/demo-domains";
import { Section } from "./Section";

const fc = DEMO_DOMAINS_BY_NAME["foodchainid.com"];

function ToastButtons() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2.5">
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          toast({
            variant: "success",
            title: "Domain added",
            description: "foodchainid.com is now in your inventory.",
          })
        }
      >
        Success
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          toast({
            variant: "error",
            title: "Scan failed",
            description: "Couldn’t reach the Majestic index.",
          })
        }
      >
        Error
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          toast({
            variant: "warning",
            title: "Quota at 90%",
            description: "You’ve used 90 of 100 domain scans this month.",
          })
        }
      >
        Warning
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          toast({
            variant: "info",
            title: "Generation queued",
            description: "30 articles scheduled across 5 silos.",
            action: { label: "View", onClick: () => {} },
          })
        }
      >
        Info + action
      </Button>
    </div>
  );
}

function GenerationProgress() {
  const { toast } = useToast();
  const [value, setValue] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    if (!running) return;
    if (value >= 100) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRunning(false);
      toast({
        variant: "success",
        title: "Generation complete",
        description: "All 30 articles were generated.",
      });
      return;
    }
    const t = window.setTimeout(() => setValue((v) => Math.min(100, v + 5)), 200);
    return () => window.clearTimeout(t);
  }, [running, value, toast]);

  const done = Math.round((value / 100) * 30);
  return (
    <div className="max-w-md space-y-3">
      <div className="flex items-center justify-between text-[13px]">
        <span className="text-muted-foreground">
          Generating articles — <span className="tabular-nums text-foreground">{done}</span> of 30
        </span>
        <span className="font-medium tabular-nums">{value}%</span>
      </div>
      <Progress value={value} />
      <Button
        size="sm"
        onClick={() => {
          setValue(0);
          setRunning(true);
        }}
        disabled={running}
      >
        <Icons.generate className="h-4 w-4" /> {running ? "Generating…" : "Start generation"}
      </Button>
    </div>
  );
}

/** Batch A6 — Feedback & overlays. */
export function OverlaysGallery() {
  return (
    <>
      <Section
        title="Dialog & Sheet"
        subtitle="centered confirm modal · right-side domain-detail drawer"
      >
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
              >
                <Icons.close className="h-4 w-4" /> Remove domain
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Remove foodchainid.com?</DialogTitle>
                <DialogDescription>
                  This removes the domain and wipes its topical map and generated articles. This
                  can&apos;t be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                  >
                    Remove domain
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
              >
                <Icons.domainInventory className="h-4 w-4" /> View domain detail
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle>foodchainid.com</SheetTitle>
                <SheetDescription>{fc.title}</SheetDescription>
              </SheetHeader>
              <div className="flex items-center gap-6">
                <ScoreRing
                  value={fc.trustFlow}
                  label="Trust Flow"
                  size={110}
                  strokeWidth={9}
                />
                <div className="grid flex-1 gap-3">
                  <StatCard
                    label="Citation Flow"
                    value={fc.citationFlow}
                    suffix="/ 100"
                    className="p-4"
                  />
                  <StatCard
                    label="Ref. Domains"
                    value={fc.refDomains}
                    className="p-4"
                  />
                </div>
              </div>
              <div>
                <div className="mb-3 font-heading text-[11px] font-semibold uppercase tracking-[0.05em] text-muted-foreground">
                  Topical Trust Flow
                </div>
                <TtfDistributionBar segments={fc.topics.slice(0, 5)} />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                  >
                    Close
                  </Button>
                </SheetClose>
                <Button size="sm">
                  Use in builder <Icons.next className="h-4 w-4" />
                </Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </Section>

      <Section
        title="Toast"
        subtitle="transient feedback — stacks bottom-right, auto-dismisses (click a button)"
      >
        <ToastButtons />
      </Section>

      <Section
        title="AlertBanner"
        subtitle="persistent inline notices — semantic tint, icon + word, optional action / dismiss"
      >
        <div className="space-y-3">
          <AlertBanner
            variant="info"
            title="Fresh index"
            onDismiss={() => {}}
          >
            You&apos;re viewing data from the last 90 days. Switch to Historic for the all-time
            profile.
          </AlertBanner>
          <AlertBanner
            variant="success"
            title="WordPress connected"
            onDismiss={() => {}}
          >
            Articles will push to foodchainid.com automatically on schedule.
          </AlertBanner>
          <AlertBanner
            variant="warning"
            title="Trust Flow is low"
            action={
              <Button
                size="sm"
                variant="secondary"
              >
                Review
              </Button>
            }
          >
            superiorgrouting.com has TF 6 — a weak PBN candidate.
          </AlertBanner>
          <AlertBanner
            variant="error"
            title="Generation failed"
          >
            3 of 30 articles couldn&apos;t be generated. Retry the batch or check your API key.
          </AlertBanner>
        </div>
      </Section>

      <Section
        title="Popover & Progress"
        subtitle="filter panel · determinate generation bar (drives a toast on completion)"
      >
        <div className="flex flex-wrap items-start gap-10">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
              >
                <Icons.filter className="h-4 w-4" /> Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 space-y-4">
              <div className="font-heading text-[13px] font-semibold">Filter domains</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-muted-foreground">Min. Trust Flow</span>
                  <span className="font-medium tabular-nums">20</span>
                </div>
                <Slider
                  defaultValue={[20]}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
              <div className="space-y-2">
                <span className="text-[13px] text-muted-foreground">Candidate</span>
                {["Strong", "Moderate", "Weak"].map((q, i) => (
                  // biome-ignore lint/a11y/noLabelWithoutControl: Checkbox is wrapped inside label
                  <label
                    key={q}
                    className="flex items-center gap-2 text-[13px]"
                  >
                    <Checkbox checked={i < 2} /> {q}
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2 border-t border-border pt-3">
                <Button
                  size="sm"
                  variant="ghost"
                >
                  Reset
                </Button>
                <Button size="sm">Apply</Button>
              </div>
            </PopoverContent>
          </Popover>

          <GenerationProgress />
        </div>
      </Section>

      <Section
        title="LockedState"
        subtitle="the single, tasteful plan-gate — never a stacked upsell"
      >
        <div className="mx-auto max-w-lg">
          <LockedState
            title="Website Builder is a Pro feature"
            description="Publish AI-built topical-authority sites to WordPress on your own expired domains."
            tier="Pro plan"
            cta={{ label: "Upgrade to Pro" }}
          />
        </div>
      </Section>
    </>
  );
}
