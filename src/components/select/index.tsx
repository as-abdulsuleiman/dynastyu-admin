/** @format */

import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { UserCircleIcon } from "@heroicons/react/outline";
import { Select, SelectItem } from "@tremor/react";
import { observer } from "mobx-react-lite";

interface SelectCardProps {
  items: Items[];
  selectedItem: string;
  onValueChange: (e: any) => void;
  className: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  enableClear?: boolean;
}

type Items = {
  name: string;
  value: string;
  icon?: ReactNode | JSX.Element;
};

const SelectCard: FC<SelectCardProps> = ({
  items,
  disabled,
  className,
  selectedItem,
  onValueChange,
  placeholder,
  defaultValue,
  enableClear = false,
}) => {
  return (
    <Select
      disabled={disabled}
      defaultValue={defaultValue}
      className={cn("hover:bg-transparent ", className)}
      value={selectedItem}
      placeholder={placeholder || "Filter by..."}
      onValueChange={onValueChange}
      enableClear={enableClear}
    >
      {items?.map((a, index) => {
        return (
          <SelectItem
            key={index}
            value={a?.value}
            // icon={a?.icon || UserCircleIcon}
            className="cursor-pointer"
          >
            {a?.name}
          </SelectItem>
        );
      })}
    </Select>
  );
};

export default observer(SelectCard);
