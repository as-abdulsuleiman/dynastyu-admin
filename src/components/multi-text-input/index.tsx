/** @format */

import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CloseCircleLineIcon } from "@/components/Icons";
import { Reorder, useDragControls } from "framer-motion";

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
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [newItems, setItems] = useState<string[]>([]);
  useEffect(() => {
    setItems([...items]);
  }, [items]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (draggedIndex !== null) {
      console.log("dragIndex", draggedIndex);
      const draggedItem = items[draggedIndex];
      const newItems = [...items];
      newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      console.log("newItemsDrag", newItems);
      setDraggedIndex(index);
    }
  };

  console.log("newItems", newItems);
  console.log("items", [...items]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    if (draggedIndex !== null && onChange) {
      const draggedItem = items[draggedIndex];
      console.log("draggedItem", draggedItem);
      const newItems = [...items];
      newItems.splice(draggedIndex, 1);
      newItems.splice(index, 0, draggedItem);
      onChange(newItems as any);
      setDraggedIndex(null);
      console.log("newItems", newItems);
    }
  };
  const controls = useDragControls();

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
        {newItems?.length ? (
          <ScrollArea className="h-32 flex flex-row">
            <Reorder.Group
              className="flex flex-row flex-wrap items-center pt-8 pb-2"
              values={newItems}
              onReorder={setItems}
              axis="y"
            >
              {/* <div className="flex flex-row flex-wrap items-center pt-8 pb-2"> */}
              {newItems?.map((val: string, index) => {
                return (
                  <Reorder.Item
                    dragControls={controls}
                    className="mr-2 flex flex-row items-center justify-center bg-primary w-fit h-6 py-3 px-2 rounded-xl mb-2"
                    key={index}
                    value={val}
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
                  </Reorder.Item>
                  // <div
                  //   draggable
                  //   onDragStart={(e) => handleDragStart(e, index)}
                  //   onDragOver={(e) => handleDragOver(e, index)}
                  //   onDrop={(e) => handleDrop(e, index)}
                  //   className="mr-2 flex flex-row items-center justify-center bg-primary w-fit h-6 py-3 px-2 rounded-xl mb-2"
                  //   key={index}
                  // >

                  //   {/* <div className="text-[14px] dark:text-gray-200 text-gray-200">
                  //     {val}
                  //   </div> */}
                  //   <CloseCircleLineIcon
                  //     onClick={() =>
                  //       handleRemoveItem ? handleRemoveItem(val) : {}
                  //     }
                  //     className="h-[16px] w-[16px] cursor-pointer dark:stroke-gray-200 stroke-gray-200 ml-1.5"
                  //   />
                  // </div>
                );
              })}
              {/* </div> */}
            </Reorder.Group>
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
