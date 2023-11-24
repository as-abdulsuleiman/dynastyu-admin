/** @format */

import { CalculatorIcon, UserCircleIcon } from "@heroicons/react/outline";
import { Select, SelectItem } from "@tremor/react";
import { FC, useState } from "react";

interface SelectCardProps {
  items: Items[];
  selectedItem: string;
  onValueChange: (e: any) => void;
  className: string;
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
}) => {
  return (
    <div className={className}>
      <Select value={selectedItem} onValueChange={onValueChange}>
        {items.map((a, index) => {
          return (
            <SelectItem
              key={index}
              value={a.value}
              icon={UserCircleIcon}
              className="cursor-pointer"
            >
              {a.name}
            </SelectItem>
          );
        })}
      </Select>
    </div>
  );
};

export default SelectCard;
