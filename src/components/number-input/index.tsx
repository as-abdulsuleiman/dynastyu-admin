/** @format */

import { FC } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface NumberInputProps {
  label?: string;
  error?: string;
  id: string;
  handleRegister: any;
}

const NumberInput: FC<NumberInputProps> = ({
  id,
  error,
  label,
  handleRegister,
  ...props
}) => {
  return (
    <div className="">
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 top-[29px] left-0 flex items-center pl-3">
          <span className="text-muted-foreground sm:text-sm">$</span>
        </div>
        <Input
          type="number"
          label={label}
          name={id}
          id={id}
          error={error}
          className="block w-full rounded-md bg-transparent py-1.5 pl-7 pr-3 text-muted-foreground placeholder:text-gray-400 border border-input sm:text-sm sm:leading-6 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="0.00"
          {...handleRegister}
          {...props}
        />
      </div>
      {/* {error ? (
        <div className="absolute bottom-[-20px] ml-[2px] w-full flex flex-nowrap">
          <small className="text-red-500 font-medium text-xs"> {error}</small>
        </div>
      ) : null} */}
    </div>
  );
};

export default NumberInput;

// <div className="absolute inset-y-0 right-0 items-center hidden">
// <label htmlFor="currency" className="sr-only">
//   Currency
// </label>
// <div>
//   <option>USD</option>
// </div>
// <select
//   id="currency"
//   name="currency"
//   className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm"
// >
//   <option>USD</option>
//   {/* <option>CAD</option>
//   <option>EUR</option> */}
// </select>
// </div>
