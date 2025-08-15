import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-border bg-surface px-3 py-1 text-base text-text shadow-sm transition-colors outline-none",
        "placeholder:text-text-muted",
        "focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-error aria-invalid:ring-2 aria-invalid:ring-error/20",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text",
        "md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
