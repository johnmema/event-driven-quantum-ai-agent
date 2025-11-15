import * as React from "react";

import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border-2 border-black/10 bg-white px-4 py-3 text-lg text-black placeholder:text-black/40 focus-visible:border-[#4b8afe] focus-visible:ring-4 focus-visible:ring-[#4b8afe]/30 focus-visible:outline-none transition",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
