/** @format */

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  id: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, label, id, ...props }, ref) => {
    return (
      <div className="relative w-full h-full">
        {label ? (
          <Label
            htmlFor={id}
            className="font-semibold text-left text-[13px] mb-11 d-flex"
            id={label}
          >
            {label}
          </Label>
        ) : null}
        <textarea
          id={id}
          className={cn(
            `flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
              label ? "mt-1.5" : ""
            }`,
            className
          )}
          ref={ref}
          {...props}
        />
        {error ? (
          <div className="absolute bottom-[-20px] ml-[2px] w-full flex flex-nowrap">
            <small className="text-red-500 font-medium text-xs"> {error}</small>
          </div>
        ) : null}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
