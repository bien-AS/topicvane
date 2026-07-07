"use client";

import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState, type EmptyStateProps } from "@/components/ui/empty-state";
import { ErrorState, type ErrorStateProps } from "@/components/ui/error-state";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** A column definition. `render` controls the cell; `sortValue` provides the key
 *  to sort by (falls back to the raw `key` field). */
export interface DataTableColumn<T> {
  key: string;
  header: React.ReactNode;
  numeric?: boolean;
  emphasis?: boolean;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  getRowId: (row: T) => string;
  state?: "default" | "loading" | "error";
  search?: { placeholder?: string; keys: (keyof T)[] };
  filters?: React.ReactNode;
  toolbarActions?: React.ReactNode;
  pageSize?: number;
  perPageOptions?: number[];
  selectable?: boolean;
  onSelectionChange?: (ids: string[]) => void;
  empty?: EmptyStateProps;
  error?: ErrorStateProps;
  loadingRows?: number;
}

export function DataTable<T>({
  columns,
  data,
  getRowId,
  state = "default",
  search,
  filters,
  toolbarActions,
  pageSize = 10,
  perPageOptions = [10, 25, 50],
  selectable = false,
  onSelectionChange,
  empty,
  error,
  loadingRows = 6,
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState<{ key: string; dir: "asc" | "desc" } | null>(null);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(pageSize);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  const filtered = React.useMemo(() => {
    if (!search || !query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      search.keys.some((k) =>
        String(row[k] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [data, search, query]);

  const sorted = React.useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return filtered;
    const val = (row: T) =>
      col.sortValue
        ? col.sortValue(row)
        : ((row as Record<string, unknown>)[col.key] as string | number);
    return [...filtered].sort((a, b) => {
      const av = val(a);
      const bv = val(b);
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sort, columns]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / perPage));
  const currentPage = Math.min(page, pageCount);
  const pageRows = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => {
    setPage(1);
  }, []);

  const emit = (next: Set<string>) => {
    setSelected(next);
    onSelectionChange?.([...next]);
  };
  const filteredIds = filtered.map(getRowId);
  const selectedInView = filteredIds.filter((id) => selected.has(id));
  const headerChecked: boolean | "indeterminate" =
    filteredIds.length > 0 && selectedInView.length === filteredIds.length
      ? true
      : selectedInView.length > 0
        ? "indeterminate"
        : false;
  const toggleAll = () => {
    const next = new Set(selected);
    if (headerChecked === true) {
      for (const id of filteredIds) next.delete(id);
    } else {
      for (const id of filteredIds) next.add(id);
    }
    emit(next);
  };
  const toggleRow = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    emit(next);
  };

  const toggleSort = (key: string) => {
    setSort((s) =>
      s?.key === key ? (s.dir === "asc" ? { key, dir: "desc" } : null) : { key, dir: "asc" },
    );
  };

  const showToolbar = Boolean(
    search || filters || toolbarActions || (selectable && selected.size > 0),
  );

  return (
    <div className="space-y-3">
      {showToolbar && (
        <div className="flex flex-wrap items-center gap-3">
          {search && (
            <div className="relative w-full max-w-xs">
              <Icons.domainScan className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={search.placeholder ?? "Search…"}
                className="pl-9"
                disabled={state === "loading"}
              />
            </div>
          )}
          {filters}
          {selectable && selected.size > 0 && (
            <span className="text-[13px] tabular-nums text-muted-foreground">
              {selected.size} selected
            </span>
          )}
          {toolbarActions && (
            <div className="ml-auto flex items-center gap-2">{toolbarActions}</div>
          )}
        </div>
      )}

      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-10">
                  <Checkbox
                    checked={headerChecked}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                    disabled={state !== "default" || filteredIds.length === 0}
                  />
                </TableHead>
              )}
              {columns.map((col) => (
                <TableHead
                  key={col.key}
                  className={cn(col.numeric && "text-right")}
                >
                  {col.sortable && state === "default" ? (
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className={cn(
                        "inline-flex items-center gap-1 rounded transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        col.numeric && "flex-row-reverse",
                        sort?.key === col.key && "text-foreground",
                      )}
                    >
                      {col.header}
                      {sort?.key === col.key ? (
                        sort.dir === "asc" ? (
                          <ChevronUp className="h-3.5 w-3.5" />
                        ) : (
                          <ChevronDown className="h-3.5 w-3.5" />
                        )
                      ) : (
                        <ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {state === "loading" &&
              Array.from({ length: loadingRows }).map((_, r) => (
                <TableRow key={`sk-${r}`}>
                  {selectable && (
                    <TableCell>
                      <Skeleton className="h-4 w-4 rounded-[5px]" />
                    </TableCell>
                  )}
                  {columns.map((col) => (
                    <TableCell
                      key={col.key}
                      className={cn(col.numeric && "text-right")}
                    >
                      <Skeleton className={cn("h-3", col.numeric ? "ml-auto w-10" : "w-24")} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {state === "default" &&
              pageRows.map((row) => {
                const id = getRowId(row);
                const isSel = selected.has(id);
                return (
                  <TableRow
                    key={id}
                    data-state={isSel ? "selected" : undefined}
                  >
                    {selectable && (
                      <TableCell>
                        <Checkbox
                          checked={isSel}
                          onCheckedChange={() => toggleRow(id)}
                          aria-label="Select row"
                        />
                      </TableCell>
                    )}
                    {columns.map((col) => (
                      <TableCell
                        key={col.key}
                        className={cn(
                          col.numeric && "text-right tabular-nums",
                          col.emphasis && "font-medium text-foreground",
                        )}
                      >
                        {col.render
                          ? col.render(row)
                          : String((row as Record<string, unknown>)[col.key] ?? "")}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>

        {state === "error" && (
          <ErrorState
            title={error?.title ?? "Couldn't load this table"}
            description={error?.description}
            retry={error?.retry}
            {...error}
          />
        )}
        {state === "default" && sorted.length === 0 && (
          <EmptyState
            title={query ? `No results for "${query}"` : (empty?.title ?? "Nothing here yet")}
            description={query ? "Try a different search term." : empty?.description}
            {...(query ? {} : empty)}
          />
        )}
      </div>

      {state === "default" && sorted.length > 0 && (
        <Pagination
          page={currentPage}
          pageCount={pageCount}
          onPageChange={setPage}
          perPage={perPage}
          perPageOptions={perPageOptions}
          onPerPageChange={setPerPage}
          totalItems={sorted.length}
        />
      )}
    </div>
  );
}
