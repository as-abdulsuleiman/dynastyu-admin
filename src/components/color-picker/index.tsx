/** @format */

"use client";

import { forwardRef } from "react";
import { ColorPicker, IColor, useColor } from "react-color-palette";
import { ChangeHandler } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ColorPickeCardProps {
  title: string;
  error?: string;
  header?: string;
  id?: string;
  name?: string;
  touched?: boolean;
  selectedColor: string;
  onBlur?: ChangeHandler;
  defaultColor: string;
  onSetColor: (color: IColor) => void;
}

const ColorPickeCard = forwardRef<HTMLButtonElement, ColorPickeCardProps>(
  (
    {
      name,
      id,
      selectedColor,
      onSetColor,
      onBlur,
      title,
      error,
      touched,
      header,
      defaultColor = "#dc2626",
      ...props
    },
    ref
  ) => {
    const defaultClr = selectedColor ? selectedColor : defaultColor;
    const [color, setColor] = useColor(defaultClr);

    return (
      <AlertDialog>
        <AlertDialogTrigger
          // asChild
          tabIndex={-1}
          onBlur={onBlur}
          id={id}
          name={name}
          ref={ref}
          {...props}
          className="hover:bg-transparent relative mt-1.5 w-full h-[40px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="flex flex-row items-center">
            <div className="font-semibold text-left text-[13px] text-muted-foreground d-flex">
              {selectedColor ? color?.hex : title}
            </div>
            <div
              style={{ background: color.hex }}
              className="h-[30px] w-[70px] rounded-md ml-auto"
            ></div>
          </div>
          {error ? (
            <div className="absolute bottom-[-20px] ml-[2px] px-0 w-full flex flex-nowrap left-0">
              <small className="text-red-500 font-medium text-xs">
                {error}
              </small>
            </div>
          ) : null}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{header}</AlertDialogTitle>
            <div>
              <ColorPicker
                height={200}
                hideInput={["rgb", "hsv"]}
                color={color}
                onChange={(color) => {
                  onSetColor(color);
                  setColor(color);
                }}
              />
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

ColorPickeCard.displayName = "ColorPickeCard";

export { ColorPickeCard };
