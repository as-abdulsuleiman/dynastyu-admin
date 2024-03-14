/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const FlagOffIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-flag-off"
    {...props}
  >
    <path d="M8 2c3 0 5 2 8 2s4-1 4-1v11" />
    <path d="M4 22V4" />
    <path d="M4 15s1-1 4-1 5 2 8 2" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);

export default memo(FlagOffIcon);
