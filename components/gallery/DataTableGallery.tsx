"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { Pagination } from "@/components/ui/pagination";
import { TtfBadge } from "@/components/ui/ttf-badge";
import { Icons } from "@/lib/icons";
import { DEMO_DOMAINS, type DemoDomain } from "@/lib/tokens/demo-domains";
import { getTtfColor } from "@/lib/tokens/majestic-ttf";
import { Section } from "./Section";

const qualityBadge: Record<DemoDomain["quality"], React.ReactNode> = {
  strong: <Badge variant="success">Strong</Badge>,
  moderate: <Badge variant="info">Moderate</Badge>,
  weak: <Badge variant="warning">Weak</Badge>,
};
const qualityRank: Record<DemoDomain["quality"], number> = { weak: 1, moderate: 2, strong: 3 };

const columns: DataTableColumn<DemoDomain>[] = [
  {
    key: "domain",
    header: "Domain",
    emphasis: true,
    sortable: true,
    render: (d) => (
      <a
        href="#"
        className="text-primary hover:underline"
      >
        {d.domain}
      </a>
    ),
  },
  {
    key: "category",
    header: "Top category",
    sortValue: (d) => d.topics[0]?.value ?? 0,
    render: (d) => {
      const top = d.topics[0];
      return top ? (
        <span className="inline-flex items-center gap-2">
          <TtfBadge
            topic={top.topic}
            value={top.value}
          />
          <span className="text-muted-foreground">{getTtfColor(top.topic).name}</span>
        </span>
      ) : (
        <span className="text-muted-foreground/60">—</span>
      );
    },
  },
  { key: "trustFlow", header: "TF", numeric: true, sortable: true },
  { key: "citationFlow", header: "CF", numeric: true, sortable: true },
  {
    key: "refDomains",
    header: "Ref. domains",
    numeric: true,
    sortable: true,
    render: (d) => d.refDomains.toLocaleString(),
  },
  {
    key: "quality",
    header: "Candidate",
    sortable: true,
    sortValue: (d) => qualityRank[d.quality],
    render: (d) => qualityBadge[d.quality],
  },
];

function DataTableDemo() {
  const [state, setState] = React.useState<"default" | "loading" | "error">("default");
  const [selected, setSelected] = React.useState<string[]>([]);

  const states: Array<typeof state> = ["default", "loading", "error"];
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-[13px] text-muted-foreground">State:</span>
        {states.map((s) => (
          <Button
            key={s}
            size="sm"
            variant={state === s ? "default" : "secondary"}
            onClick={() => setState(s)}
            className="capitalize"
          >
            {s}
          </Button>
        ))}
        {selected.length > 0 && (
          <span className="ml-auto text-[13px] tabular-nums text-muted-foreground">
            {selected.length} row{selected.length > 1 ? "s" : ""} selected
          </span>
        )}
      </div>

      <DataTable
        columns={columns}
        data={DEMO_DOMAINS}
        getRowId={(d) => d.domain}
        state={state}
        selectable
        onSelectionChange={setSelected}
        search={{ placeholder: "Search domains…", keys: ["domain", "title"] }}
        toolbarActions={
          <Button size="sm">
            <Icons.add className="h-4 w-4" /> Add domains
          </Button>
        }
        pageSize={3}
        perPageOptions={[3, 5, 10]}
        error={{
          title: "Majestic scan failed",
          description: "We couldn’t reach the Majestic index. This is usually temporary.",
          retry: { label: "Retry scan", onClick: () => setState("default") },
        }}
        empty={{
          icon: Icons.domainInventory,
          title: "No domains in inventory yet",
          description:
            "Load expired domains one-per-line or via CSV to start matching them to topics.",
          action: { label: "Add domains", icon: Icons.add },
        }}
      />
    </div>
  );
}

/** Batch A3 — DataTable (composed) + its parts. */
export function DataTableGallery() {
  const [page, setPage] = React.useState(2);
  const [perPage, setPerPage] = React.useState(10);
  const [cb, setCb] = React.useState<boolean | "indeterminate">("indeterminate");

  return (
    <>
      <Section
        title="DataTable"
        subtitle="toolbar search · sortable columns · row selection · pagination · switchable loading / empty / error states"
      >
        <DataTableDemo />
      </Section>

      <Section
        title="Checkbox"
        subtitle="unchecked · checked · indeterminate (select-all) · disabled"
      >
        <div className="flex items-center gap-6">
          {/* biome-ignore lint/a11y/noLabelWithoutControl: checkbox is wrapped inside label */}
          <label className="flex items-center gap-2 text-[13px]">
            <Checkbox
              checked={cb}
              onCheckedChange={(v) => setCb(v)}
            />{" "}
            Interactive
          </label>
          <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Checkbox checked /> Checked
          </span>
          <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Checkbox checked="indeterminate" /> Indeterminate
          </span>
          <span className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <Checkbox disabled /> Disabled
          </span>
        </div>
      </Section>

      <Section
        title="Pagination"
        subtitle="rows-per-page + range + windowed page numbers — the control every table shares"
      >
        <Pagination
          page={page}
          pageCount={9}
          onPageChange={setPage}
          perPage={perPage}
          perPageOptions={[10, 25, 50]}
          onPerPageChange={setPerPage}
          totalItems={214}
        />
      </Section>
    </>
  );
}
