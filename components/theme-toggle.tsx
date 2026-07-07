"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { useTheme } from "@/components/theme-provider";

/**
 * Icon button that flips between light and dark. The icon is driven purely by the `.dark`
 * class on <html> via Tailwind's `dark:` variant, so it needs no client state and can't
 * mismatch on hydration.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggle } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle light/dark theme"
      title="Toggle light/dark theme"
      className={className}
    >
      <Icons.moon className="dark:hidden" aria-hidden />
      <Icons.sun className="hidden dark:block" aria-hidden />
    </Button>
  );
}
