/** @format */

import { FC, ReactNode } from "react";
import {
  MultiSelect,
  MultiSelectItem,
  SearchSelect,
  SearchSelectItem,
} from "@tremor/react";
import { UserCircleIcon } from "@heroicons/react/outline";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { StatusOnlineIcon, StatusOfflineIcon } from "@heroicons/react/outline";

interface MultiSelectorProps {
  items: Items[];
  selectedItem: string[];
  onValueChange: (e: any) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: string[];
  placeholderSearch?: string;
}
type Items = {
  name: string;
  value: string;
};

const MultiSelector: FC<MultiSelectorProps> = ({
  items,
  selectedItem,
  onValueChange,
  className,
  placeholder,
  defaultValue,
  placeholderSearch,
}) => {
  return (
    <MultiSelect
      className={cn("", className)}
      value={selectedItem}
      placeholder={placeholder || "Filter by..."}
      placeholderSearch={placeholderSearch}
      onValueChange={onValueChange}
      // icon={UserCircleIcon}
    >
      {/* <SearchSelectItem icon={UserCircleIcon} value="5">
        Very Long DropdownItem Value as an edge case
      </SearchSelectItem> */}
      {items?.map((val, index) => {
        return (
          <MultiSelectItem
            key={index}
            value={val.value}
            className="cursor-pointer"
            // icon={UserCircleIcon}
          >
            {val.name}
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
