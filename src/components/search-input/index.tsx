/** @format */

import { FC, forwardRef } from "react";
import { Icons } from "../Icons";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, label, placeholder, ...props }, ref) => {
    return (
      <Label className="relative block">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center">
          <Icons.search className="tremor-TextInput-icon shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle h-5 w-5 ml-2.5" />
        </span>
        <input
          className={cn(
            "block h-[38px] w-full ring-1 rounded-tremor-default ring-tremor-ring shadow-tremor-card dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand p-6 bg-background dark:bg-dark-background  py-2 pl-9 pr-3 text-sm  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          placeholder={placeholder}
          type="search"
          name="search"
          ref={ref}
          {...props}
        />
        {/* <span className="absolute inset-y-0 right-0 flex items-center">
          <Icons.search className="tremor-TextInput-icon shrink-0 text-tremor-content-subtle dark:text-dark-tremor-content-subtle h-5 w-5 ml-2.5" />
        </span> */}
      </Label>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
