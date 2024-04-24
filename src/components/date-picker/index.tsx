/** @format */

"use client";

import { forwardRef } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalenderDaysIcon } from "../Icons";
import { ChangeHandler } from "react-hook-form";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps {
  placeholder?: string;
  id: string;
  label: string;
  error?: string;
  name?: string;
  touched?: boolean;
  onBlur?: ChangeHandler;
  onSelect: SelectSingleEventHandler;
  value: Date | null;
  dateFormat?: string;
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      placeholder,
      label,
      id,
      name,
      touched,
      onBlur,
      error,
      onSelect,
      value,
      dateFormat = "PPP",
      ...props
    },
    ref
  ) => {
    // const [date, setDate] = useState<Date>();

    return (
      <Popover modal>
        <PopoverTrigger
          // asChild
          id={id}
          tabIndex={-1}
          name={name}
          onBlur={onBlur}
          className="w-full justify-start items-start"
          {...props}
        >
          <div className="w-full h-full relative" ref={ref}>
            <div
              // variant={"outline"}
              className={cn(
                "w-full text-left h-[40px] bg-background border border-input px-[12px] py-[4px] relative hover:bg-transparent inline-flex items-center justify-start rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                !value && "text-muted-foreground"
              )}
            >
              <CalenderDaysIcon className="mr-2 h-4 w-4 " />
              {value ? format(value, dateFormat) : <span>Pick a date</span>}
            </div>
            {touched && error ? (
              <div className="absolute bottom-[-20px] ml-[2px] px-0 w-full flex flex-nowrap left-0">
                <small className="text-red-500 font-medium text-xs">
                  {error}
                </small>
              </div>
            ) : null}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? value : new Date()}
            onSelect={onSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };

// const DatePicker: FC<DatePickerProps> = ({
//   placeholder,
//   label,
//   id,
//   name,
//   touched,
//   onBlur,
//   error,
//   ...props
// }) => {

// };

// export default DatePicker;
