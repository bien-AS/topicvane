"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Pagination — the one control every table uses. Left: rows-per-page + a
 *  "1–10 of 42" range. Right: prev / windowed page numbers / next. All counts
 *  tabular. Page numbers are 1-based. */
export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  perPage?: number;
  perPageOptions?: number[];
  onPerPageChange?: (n: number) => void;
  totalItems?: number;
  className?: string;
}

function pageWindow(page: number, count: number): (number | "…")[] {
  const wanted = new Set([1, count, page, page - 1, page + 1]);
  const sorted = [...wanted].filter((p) => p >= 1 && p <= count).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("…");
    out.push(p);
    prev = p;
  }
  return out;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  perPage,
  perPageOptions = [10, 25, 50],
  onPerPageChange,
  totalItems,
  className,
}: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < pageCount;
  const start = perPage ? (page - 1) * perPage + 1 : undefined;
  const end = perPage && totalItems != null ? Math.min(page * perPage, totalItems) : undefined;

  const navBtn =
    "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-[13px] font-medium tabular-nums " +
    "text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
        {perPage != null && onPerPageChange && (
          <label className="flex items-center gap-2">
            <span>Rows per page</span>
            <select
              value={perPage}
              onChange={(e) => onPerPageChange(Number(e.target.value))}
              className="h-8 rounded-md border border-input bg-card px-2 text-[13px] tabular-nums text-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/[0.18] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {perPageOptions.map((n) => (
                <option
                  key={n}
                  value={n}
                >
                  {n}
                </option>
              ))}
            </select>
          </label>
        )}
        {start != null && end != null && totalItems != null && (
          <span className="tabular-nums">
            {start}–{end} of {totalItems.toLocaleString()}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          className={navBtn}
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrev}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {pageWindow(page, pageCount).map((p, i) =>
          p === "…" ? (
            <span
              key={`gap-${i}`}
              className="px-1 text-[13px] text-muted-foreground"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={cn(
                navBtn,
                p === page &&
                  "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              )}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          className={navBtn}
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
