/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const ArrowLeftRightIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="lucide lucide-arrow-right-left"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M16 3l4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16"></path>
  </svg>
);

export default memo(ArrowLeftRightIcon);
