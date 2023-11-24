/** @format */

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, type, ...props }, ref) => {
    return (
      <label className="relative">
        {label ? (
          <span className="font-semibold text-left text-[14px] mb-11 d-flex">
            {label}
          </span>
        ) : null}
        <input
          type={type}
          className={cn(
            `flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${
              label ? "mt-1.5" : ""
            }`,
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <p className="text-red-500 text-xs absolute bottom-[-20px] ml-[2px] font-medium">
            {error}
          </p>
        ) : null}
      </label>
    );
  }
);
Input.displayName = "Input";

export { Input };
