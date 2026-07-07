"use client";

import * as React from "react";
import { AppShell } from "@/components/ui/app-shell";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DomainContextChip, type IndexMode } from "@/components/ui/domain-context-chip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Sidebar, type SidebarGroup } from "@/components/ui/sidebar";
import { StatCard } from "@/components/ui/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopBar } from "@/components/ui/top-bar";
import { TtfBadge } from "@/components/ui/ttf-badge";
import { Icons } from "@/lib/icons";
import { DEMO_DOMAINS } from "@/lib/tokens/demo-domains";
import { getTtfColor } from "@/lib/tokens/majestic-ttf";
import { Section } from "./Section";

const NAV_GROUPS: SidebarGroup[] = [
  {
    label: "Research",
    items: [
      { key: "inventory", label: "Domain Inventory", icon: Icons.domainInventory },
      { key: "search", label: "Domain Search", icon: Icons.domainScan },
      { key: "ttf", label: "Topical Trust Flow", icon: Icons.trustFlow },
    ],
  },
  {
    label: "Build",
    items: [
      { key: "projects", label: "Projects", icon: Icons.projects, badge: "3" },
      { key: "builder", label: "Website Builder", icon: Icons.websiteBuilder },
    ],
  },
  {
    label: "Support",
    items: [
      { key: "tutorials", label: "Tutorials", icon: Icons.tutorials },
      { key: "feature", label: "Request a Feature", icon: Icons.generate },
      { key: "ticket", label: "Submit a Ticket", icon: Icons.support },
    ],
  },
  {
    label: "Account",
    footer: true,
    items: [{ key: "account", label: "Account", icon: Icons.account }],
  },
];

const qualityBadge = {
  strong: <Badge variant="success">Strong</Badge>,
  moderate: <Badge variant="info">Moderate</Badge>,
  weak: <Badge variant="warning">Weak</Badge>,
} as const;

function InventoryTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Domain</TableHead>
            <TableHead>Top category</TableHead>
            <TableHead className="text-right">TF</TableHead>
            <TableHead className="text-right">Ref. domains</TableHead>
            <TableHead>Candidate</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DEMO_DOMAINS.map((d) => {
            const top = d.topics[0];
            return (
              <TableRow key={d.domain}>
                <TableCell className="font-medium text-foreground">
                  <a
                    href="#"
                    className="text-primary hover:underline"
                  >
                    {d.domain}
                  </a>
                </TableCell>
                <TableCell>
                  {top ? (
                    <span className="inline-flex items-center gap-2">
                      <TtfBadge
                        topic={top.topic}
                        value={top.value}
                      />
                      <span className="text-muted-foreground">{getTtfColor(top.topic).name}</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground/60">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right tabular-nums">{d.trustFlow}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {d.refDomains.toLocaleString()}
                </TableCell>
                <TableCell>{qualityBadge[d.quality]}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function AppFrameDemo() {
  const [activeNav, setActiveNav] = React.useState("inventory");
  const [mode, setMode] = React.useState<IndexMode>("fresh");

  return (
    <div className="h-[640px] overflow-hidden rounded-xl border border-border shadow-e2">
      <AppShell
        embedded
        sidebar={
          <Sidebar
            groups={NAV_GROUPS}
            activeKey={activeNav}
            onNavigate={setActiveNav}
          />
        }
        topBar={
          <TopBar
            domainContext={
              <DomainContextChip
                domain="foodchainid.com"
                mode={mode}
                onModeChange={setMode}
              />
            }
            action={
              <Button size="sm">
                <Icons.add className="h-4 w-4" /> Add domains
              </Button>
            }
            user={{ name: "Zachery Brown", email: "zach@zacheryebrown.com", initials: "ZB" }}
          />
        }
      >
        <div className="mx-auto max-w-[1100px] space-y-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Research</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Domain Inventory</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div>
            <h1 className="font-heading text-[1.75rem] font-bold leading-tight tracking-tight">
              Domain Inventory
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Expired domains you own, matched to topics by Trust Flow —{" "}
              {mode === "fresh" ? "fresh" : "historic"} index.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              label="Domains"
              value={DEMO_DOMAINS.length}
              icon={Icons.domainInventory}
            />
            <StatCard
              label="In use"
              value={2}
              icon={Icons.projects}
            />
            <StatCard
              label="Avg. Trust Flow"
              value={15}
              suffix="/ 100"
              icon={Icons.trustFlow}
            />
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">
                All <span className="tabular-nums font-normal text-muted-foreground">5</span>
              </TabsTrigger>
              <TabsTrigger value="inuse">
                In use <span className="tabular-nums font-normal text-muted-foreground">2</span>
              </TabsTrigger>
              <TabsTrigger value="available">
                Available <span className="tabular-nums font-normal text-muted-foreground">3</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <InventoryTable />
            </TabsContent>
            <TabsContent value="inuse">
              <InventoryTable />
            </TabsContent>
            <TabsContent value="available">
              <InventoryTable />
            </TabsContent>
          </Tabs>
        </div>
      </AppShell>
    </div>
  );
}

/** Batch A4 — App shell & navigation. */
export function AppShellGallery() {
  const [mode, setMode] = React.useState<IndexMode>("fresh");

  return (
    <>
      <Section
        title="App frame"
        subtitle="Sidebar + TopBar + AppShell composed into a real screen — nav, domain context, tabs, and account menu are all live"
      >
        <AppFrameDemo />
      </Section>

      <Section
        title="Tabs"
        subtitle="underline workflow tabs — active = blue text + 2px underline"
      >
        <Tabs defaultValue="topic">
          <TabsList>
            <TabsTrigger value="topic">Domain Topic</TabsTrigger>
            <TabsTrigger value="subtopics">Subtopics</TabsTrigger>
            <TabsTrigger value="blog">Generate Blog</TabsTrigger>
            <TabsTrigger value="site">Build Website</TabsTrigger>
          </TabsList>
          <TabsContent
            value="topic"
            className="text-[13px] text-muted-foreground"
          >
            Pick the primary Topical Trust Flow category for this domain.
          </TabsContent>
          <TabsContent
            value="subtopics"
            className="text-[13px] text-muted-foreground"
          >
            Choose up to 5 subtopics — each becomes a silo.
          </TabsContent>
          <TabsContent
            value="blog"
            className="text-[13px] text-muted-foreground"
          >
            Set article types, quantity, and schedule.
          </TabsContent>
          <TabsContent
            value="site"
            className="text-[13px] text-muted-foreground"
          >
            Choose a template and publish.
          </TabsContent>
        </Tabs>
      </Section>

      <Section
        title="SegmentedControl & DomainContextChip"
        subtitle="Fresh / Historic index toggle"
      >
        <div className="flex flex-wrap items-center gap-6">
          <DomainContextChip
            domain="foodchainid.com"
            mode={mode}
            onModeChange={setMode}
          />
          <SegmentedControl
            options={[
              { value: "fresh", label: "Fresh", icon: Icons.fresh },
              { value: "historic", label: "Historic", icon: Icons.historic },
            ]}
            value={mode}
            onValueChange={(v) => setMode(v as IndexMode)}
          />
        </div>
      </Section>

      <Section title="Breadcrumb & DropdownMenu">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Build</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>foodchainid.com</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
              >
                <Icons.more className="h-4 w-4" /> Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>foodchainid.com</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icons.export /> Export report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.generate /> Rebuild topical map
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Icons.close /> Remove from inventory
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Section>
    </>
  );
}
