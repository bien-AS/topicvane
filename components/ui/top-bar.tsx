"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

/** TopBar — the sticky 56px command bar. Carries ONLY: search · domain context ·
 *  one primary action · avatar menu (billing/account live in the menu). */
export interface TopBarUser {
  name: string;
  email?: string;
  initials: string;
  avatarUrl?: string;
}

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: (value: string) => void;
  domainContext?: React.ReactNode;
  action?: React.ReactNode;
  user?: TopBarUser;
}

export function TopBar({
  searchPlaceholder = "Search domains, projects…",
  onSearchChange,
  onSearchSubmit,
  domainContext,
  action,
  user,
  className,
  ...props
}: TopBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-5 backdrop-blur",
        className,
      )}
      {...props}
    >
      <div className="relative w-full max-w-xs">
        <Icons.domainScan className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearchChange?.(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearchSubmit?.((e.target as HTMLInputElement).value);
          }}
          className="pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        {domainContext}
        {action}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Account menu"
              >
                <Avatar>
                  {user.avatarUrl && (
                    <AvatarImage
                      src={user.avatarUrl}
                      alt=""
                    />
                  )}
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="min-w-[14rem]"
            >
              <DropdownMenuLabel className="flex flex-col gap-0.5">
                <span>{user.name}</span>
                {user.email && (
                  <span className="text-[12px] font-normal text-muted-foreground">
                    {user.email}
                  </span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icons.user /> Account settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.billing /> Billing & plan
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Icons.ticket /> Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Icons.outbound /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
