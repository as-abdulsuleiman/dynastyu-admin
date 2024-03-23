/** @format */

import { FC } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import CloseCircleLineIcon from "@/components/Icons/close-circle-line";

interface MultiTextInputProps {
  label?: string;
  error?: string;
  value: string;
  id?: string;
  name?: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onChange?: (value: string) => void;
  onKeyDown?: (val: string) => void;
  items: string[];
  handleRemoveItem?: (val: string | number) => void;
}

const MultiTextInput: FC<MultiTextInputProps> = ({
  id,
  label,
  error,
  value,
  type,
  items,
  onKeyDown,
  onChange,
  onBlur,
  handleRemoveItem,
  placeholder,
}) => {
  const className = `${
    error?.length
      ? "focus-within:ring-1 focus-within:ring-ring border border-input"
      : ""
  }`;
  return (
    <div className="relative w-full h-full">
      {label ? (
        <Label
          htmlFor={label}
          className="font-semibold text-left text-[13px] mb-11 d-flex"
          id={label}
        >
          {label}
        </Label>
      ) : null}
      <div
        tabIndex={-1}
        id={id}
        className={cn(
          "flex flex-col mt-1.5 h-auto min-h-[178px] w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <Input
          onBlur={onBlur}
          className="border-none ring-0 shadow-none focus-visible:ring-0 px-3 p-0 focus-visible:bg-transparent"
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => (onChange ? onChange(e.target.value) : {})}
          onKeyDown={(e) => {
            if (e?.key === "Enter") {
              e?.preventDefault();
              onKeyDown ? onKeyDown(value) : {};
            }
          }}
        />
        {items?.length ? (
          <ScrollArea className="h-32 flex flex-row">
            <div className="flex flex-row flex-wrap items-center pt-8 pb-2">
              {items?.map((val: string, index) => {
                return (
                  <div
                    className="mr-2 flex flex-row items-center justify-center bg-primary w-fit h-6 py-3 px-2 rounded-xl mb-2"
                    key={index}
                  >
                    <div className="text-[14px] dark:text-gray-200 text-gray-200">
                      {val}
                    </div>
                    <CloseCircleLineIcon
                      onClick={() =>
                        handleRemoveItem ? handleRemoveItem(val) : {}
                      }
                      className="h-[16px] w-[16px] cursor-pointer dark:stroke-gray-200 stroke-gray-200 ml-1.5"
                    />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        ) : null}
      </div>
      {error ? (
        <div className="absolute bottom-[-20px] ml-[2px] w-full flex flex-nowrap">
          <small className="text-red-500 font-medium text-xs"> {error}</small>
        </div>
      ) : null}
    </div>
  );
};

export default MultiTextInput;
