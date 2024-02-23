/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const PhoneIcon = (props: LucideProps) => (
  <svg viewBox="0 0 16 16" width={16} height={16} fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        stroke="#8D97A5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.333 2.666H6l1.333 3.333-1.666 1A7.333 7.333 0 0 0 9 10.333l1-1.667 3.333 1.333v2.667A1.333 1.333 0 0 1 12 13.999 10.667 10.667 0 0 1 2 4a1.333 1.333 0 0 1 1.333-1.333"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default memo(PhoneIcon);
