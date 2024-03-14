/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const UnfollowIcon = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="16"
      fill="none"
      viewBox="0 0 18 16"
      {...props}
    >
      <path
        fill="#8D97A5"
        d="M7 8a3.333 3.333 0 100-6.666A3.333 3.333 0 007 8zm0 1.666c-3.34 0-6.06 2.24-6.06 5a.33.33 0 00.333.334h11.454a.33.33 0 00.333-.334c0-2.76-2.72-5-6.06-5z"
      ></path>
      <path
        stroke="#8D97A5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M16.333 7.333h-4"
      ></path>
    </svg>
  );
};

export default memo(UnfollowIcon);
