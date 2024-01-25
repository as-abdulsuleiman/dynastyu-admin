/** @format */

import { UserCircleIcon } from "@heroicons/react/outline";
import { Select, SelectItem } from "@tremor/react";
import { observer } from "mobx-react-lite";
import { FC } from "react";

interface SelectCardProps {
  items: Items[];
  selectedItem: string;
  onValueChange: (e: any) => void;
  className: string;
  placeholder?: string;
  defaultValue?: string;
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
  defaultValue,
}) => {
  return (
    <Select
      defaultValue={defaultValue}
      className={
        "bg-tremor-background dark:bg-dark-tremor-background bg-background dark:bg-dark-background hover:bg-transparent dark:hover:bg-dark-bg-transparent"
      }
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
            className="cursor-pointer bg-background dark:bg-dark-background"
          >
            {a?.name}
          </SelectItem>
        );
      })}
    </Select>
  );
};

export default observer(SelectCard);
