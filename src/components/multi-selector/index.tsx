/** @format */

import { FC, ReactNode } from "react";
import { MultiSelect, MultiSelectItem } from "@tremor/react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { cn } from "@/lib/utils";

interface MultiSelectorProps {
  items: Items[];
  selectedItem: string[];
  onValueChange: (e: any) => void;
  className: string;
  placeholder?: string;
  defaultValue?: string;
}
type Items = {
  name: string;
  value: string;
  icon?: ReactNode;
};

const MultiSelector: FC<MultiSelectorProps> = ({
  items,
  selectedItem,
  onValueChange,
  className,
  placeholder,
  defaultValue,
}) => {
  return (
    <MultiSelect
      className={cn(
        "dark:bg-dark-tremor-background bg-background dark:bg-dark-background hover:bg-transparent dark:hover:bg-dark-bg-transparent",
        className
      )}
      value={selectedItem}
      placeholder={placeholder || "Filter by..."}
      onValueChange={onValueChange}
    >
      {items?.map((a, index) => {
        return (
          <MultiSelectItem
            key={index}
            value={a?.value}
            // icon={UserCircleIcon}
            className="cursor-pointer bg-background dark:bg-dark-background"
          >
            {a?.name}
          </MultiSelectItem>
        );
      })}
      {/* <MultiSelectItem value="1">Option 1</MultiSelectItem>
      <MultiSelectItem value="2">Option 2</MultiSelectItem>
      <MultiSelectItem value="3">Option 3</MultiSelectItem> */}
    </MultiSelect>
  );
};

export default MultiSelector;
