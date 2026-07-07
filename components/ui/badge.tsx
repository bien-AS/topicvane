import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import * as React from "react";

import { cn } from "@/lib/utils";

/*
  Status badge. Color carries meaning ONLY together with a word/icon (never color-alone).
  Soft tinted fills keep chrome calm; the optional dot reinforces status non-color users.
*/
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-semibold whitespace-nowrap font-heading transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        neutral: "border-border bg-muted text-muted-foreground",
        success: "border-transparent bg-success/10 text-success dark:bg-success/15",
        error: "border-transparent bg-destructive/10 text-destructive dark:bg-destructive/15",
        warning: "border-transparent bg-warning/10 text-warning dark:bg-warning/15",
        info: "border-transparent bg-info/10 text-info dark:bg-info/15",
        primary: "border-transparent bg-primary/10 text-primary dark:bg-primary/15",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  },
);

const dotColor: Record<NonNullable<BadgeProps["variant"]>, string> = {
  neutral: "bg-muted-foreground",
  success: "bg-success",
  error: "bg-destructive",
  warning: "bg-warning",
  info: "bg-info",
  primary: "bg-primary",
};

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
  /** show a leading status dot */
  dot?: boolean;
}

function Badge({
  className,
  variant = "neutral",
  dot = false,
  asChild = false,
  children,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot.Root : "span";
  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {dot && (
        <span
          aria-hidden
          className={cn("size-1.5 rounded-full", dotColor[variant ?? "neutral"])}
        />
      )}
      {children}
    </Comp>
  );
}

export { Badge, badgeVariants };
