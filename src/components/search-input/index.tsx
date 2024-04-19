/** @format */

import { FC, forwardRef } from "react";
import { Icons } from "../Icons";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  label?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, label, placeholder, ...props }, ref) => {
    return (
      <div className="w-full h-full">
        <Label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center">
            <Icons.search className="h-4 w-4 ml-2.5" />
          </span>
          <Input
            className={cn(
              "block h-[40px] w-full p-6 py-2 pl-9 pr-3 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-none disabled:cursor-not-allowed disabled:opacity-50",
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
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
