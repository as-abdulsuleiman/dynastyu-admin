/** @format */

import { CalculatorIcon, UserCircleIcon } from "@heroicons/react/outline";
import { Select, SelectItem } from "@tremor/react";
import { FC, useState } from "react";

interface SelectCardProps {
  items: Items[];
  selectedItem: string;
  onValueChange: (e: any) => void;
  className: string;
  placeholder?: string;
}

type Items = {
  name: string;
  value: string;
};

const SelectCard: FC<SelectCardProps> = ({
  items,
  selectedItem,
  onValueChange,
  className,
  placeholder,
}) => {
  return (
    <Select
      className={className}
      value={selectedItem}
      placeholder={placeholder || "Filter by..."}
      onValueChange={onValueChange}
    >
      {items?.map((a, index) => {
        return (
          <SelectItem
            key={index}
            value={a.value}
            icon={UserCircleIcon}
            className="cursor-pointer"
          >
            {a?.name}
          </SelectItem>
        );
      })}
    </Select>
  );
};

export default SelectCard;
