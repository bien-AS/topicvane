"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** AppShell — the frame every screen sits in: a sidebar + a main column with a
 *  sticky top bar over the content. */
export interface AppShellProps {
  sidebar: React.ReactNode;
  topBar: React.ReactNode;
  children: React.ReactNode;
  embedded?: boolean;
  className?: string;
  contentClassName?: string;
}

export function AppShell({
  sidebar,
  topBar,
  children,
  embedded,
  className,
  contentClassName,
}: AppShellProps) {
  return (
    <div
      className={cn(
        "flex w-full bg-background",
        embedded ? "h-full min-h-0 overflow-hidden" : "min-h-screen",
        className,
      )}
    >
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {topBar}
        <main className={cn("flex-1 p-6", embedded && "overflow-auto", contentClassName)}>
          {children}
        </main>
      </div>
    </div>
  );
}
