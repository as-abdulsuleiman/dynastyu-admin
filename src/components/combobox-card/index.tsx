/** @format */

"use client";

import { FC } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "../ui/scroll-area";

interface ComboBoxCardProps {
  scrollAreaClass?: string;
  id: string;
  displayKey: string;
  IdKey?: string;
  valueKey: string;
  items: any[];
  error?: string;
  label?: string;
  isOpen: boolean;
  placeholder?: string;
  hasSearch?: boolean;
  onClose: () => void;
  selectedValue: any;
  onSelectValue: (item: any | null) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
}

const ComboBoxCard: FC<ComboBoxCardProps> = ({
  id,
  error,
  items,
  isOpen,
  onClose,
  hasSearch,
  label,
  onBlur,
  IdKey = "label",
  displayKey = "label",
  valueKey = "value",
  placeholder,
  selectedValue,
  onSelectValue,
  scrollAreaClass,
}) => {
  return (
    <div className="w-full relative" onBlur={onBlur}>
      {label ? (
        <label
          htmlFor={id}
          className="font-semibold text-left text-[14px] mb-11 d-flex"
          id={id}
        >
          {label}
        </label>
      ) : null}
      <Popover open={isOpen} onOpenChange={onClose}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-[100%] max-w-[100%] mt-1.5 min-w-[100%] justify-between h-[40px]"
          >
            {selectedValue[valueKey] ? (
              items?.find(
                (item: Record<string, any>) =>
                  item[valueKey] === selectedValue[valueKey]
              )?.[displayKey]
            ) : (
              <>{placeholder || "Select one..."}</>
            )}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          sticky="always"
          sideOffset={5}
          className="PopoverContent"
        >
          <ScrollArea className={`h-72 rounded-md border ${scrollAreaClass}`}>
            <Command className="w-[100%] max-w-[100%] min-w-[100%]">
              {hasSearch ? (
                <>
                  <CommandInput
                    placeholder="Search framework..."
                    className="h-9 w-[100%] max-w-[100%] min-w-[100%]"
                  />
                  <CommandEmpty>No result found.</CommandEmpty>
                </>
              ) : null}
              <CommandGroup className="w-[100%] max-w-[100%] min-w-[100%]">
                {items?.map((item: Record<string, any>, id) => {
                  return (
                    <CommandItem
                      className="capitalize"
                      key={item?.id || item[IdKey] || id}
                      value={item[valueKey]}
                      onSelect={(currentValue) => {
                        onSelectValue(
                          currentValue ===
                            selectedValue[valueKey]?.toLowerCase()
                            ? ""
                            : item
                        );
                        onClose();
                      }}
                    >
                      {item[displayKey]}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedValue[valueKey] === item[valueKey]
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Command>
          </ScrollArea>
        </PopoverContent>
      </Popover>
      {error ? (
        <div className=" absolute bottom-[-20px] ml-[2px]  w-full flex flex-nowrap">
          <small className="text-red-500 font-medium text-xs "> {error}</small>
        </div>
      ) : null}
    </div>
  );
};

export default ComboBoxCard;
