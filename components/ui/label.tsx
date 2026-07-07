"use client";

import { Label as LabelPrimitive } from "radix-ui";
import * as React from "react";
import { cn } from "@/lib/utils";

/*
  Field label. Required fields are marked with a small blue dot (not an asterisk) — quieter,
  on-brand, and the dot has an aria-label so it is not color-only.
*/
function Label({
  className,
  required = false,
  children,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> & { required?: boolean }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-1.5 text-sm font-medium text-foreground select-none",
        "group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      {required && (
        <span
          aria-hidden="true"
          className="size-1.5 rounded-full bg-primary"
        />
      )}
    </LabelPrimitive.Root>
  );
}

export { Label };
