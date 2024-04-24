/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const Whistle = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      fill={props?.color}
      d="M2.507 2.466l-1.08.787 1.526 2.08a5.486 5.486 0 011.28-.48M7.333 6v1.333H12v.193l-3.333.947v1.86a3 3 0 11-3-3H6V6h-.333A4.333 4.333 0 1010 10.333v-1.06L14.667 8V6m-3.84-3.534l-1.594 2.2h1.647l1.027-1.413M6 1.333v3.333h1.333V1.333H6z"
    ></path>
  </svg>
);

export default memo(Whistle);
