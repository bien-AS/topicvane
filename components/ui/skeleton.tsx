import * as React from "react";
import { cn } from "@/lib/utils";

/*
  Loading placeholder — the building block for every loading state. Subtle pulse on a muted
  fill. Give it width/height/rounding via className to match the content it stands in for.
*/
function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
