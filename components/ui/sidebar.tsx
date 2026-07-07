"use client";

import type { LucideIcon } from "lucide-react";
import * as React from "react";
import { Logo } from "@/components/brand/logo";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Sidebar — the fixed 236px left rail. The real TopicVane logo up top, nav
 *  grouped by job (Research / Build / Support) filling the middle, and the
 *  Account group pinned to a bottom footer. */
export interface SidebarItem {
  key: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
  indent?: boolean;
}
export interface SidebarGroup {
  label: string;
  items: SidebarItem[];
  footer?: boolean;
}
export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  groups: SidebarGroup[];
  activeKey?: string;
  onNavigate?: (key: string) => void;
  sticky?: boolean;
}

export function Sidebar({
  groups,
  activeKey,
  onNavigate,
  sticky,
  className,
  ...props
}: SidebarProps) {
  const topGroups = groups.filter((g) => !g.footer);
  const footerGroups = groups.filter((g) => g.footer);

  const renderItem = (item: SidebarItem) => {
    const active = item.key === activeKey;
    const Icon = item.icon;
    return (
      <button
        key={item.key}
        type="button"
        aria-current={active ? "page" : undefined}
        onClick={() => onNavigate?.(item.key)}
        className={cn(
          "relative flex w-full items-center gap-3 rounded-md px-3 py-2 text-[13px] transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          item.indent && "pl-7",
          active
            ? "bg-primary/10 font-semibold text-primary"
            : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
        )}
      >
        {active && (
          <span
            className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary"
            aria-hidden
          />
        )}
        {item.indent && (
          <span
            className="absolute bottom-0 left-4 top-0 w-px bg-border"
            aria-hidden
          />
        )}
        <Icon
          className={cn(
            "shrink-0",
            item.indent ? "h-[16px] w-[16px]" : "h-[18px] w-[18px]",
            active && "text-primary",
          )}
        />
        <span className="truncate">{item.label}</span>
        {item.badge && (
          <Badge
            variant="neutral"
            dot={false}
            className="ml-auto"
          >
            {item.badge}
          </Badge>
        )}
      </button>
    );
  };

  const renderGroup = (group: SidebarGroup, showHeader: boolean) => (
    <div key={group.label}>
      {showHeader && (
        <div className="px-3 pb-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
          {group.label}
        </div>
      )}
      <div className="space-y-0.5">{group.items.map(renderItem)}</div>
    </div>
  );

  return (
    <aside
      className={cn(
        "flex w-[236px] shrink-0 flex-col border-r border-border bg-card",
        sticky && "sticky top-0 h-screen",
        className,
      )}
      {...props}
    >
      <div className="flex h-14 shrink-0 items-center px-5">
        <Logo />
      </div>
      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {topGroups.map((g) => renderGroup(g, true))}
      </nav>
      {footerGroups.length > 0 && (
        <div className="shrink-0 space-y-1 border-t border-border px-3 py-3">
          {footerGroups.map((g) => renderGroup(g, false))}
        </div>
      )}
    </aside>
  );
}
