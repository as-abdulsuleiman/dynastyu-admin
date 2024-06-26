/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const PhoneIcon = (props: LucideProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-phone"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
  // <svg viewBox="0 0 16 16" width={16} height={16} fill="none" {...props}>
  //   <g clipPath="url(#a)">
  //     <path
  //       stroke="#8D97A5"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       strokeWidth={1.5}
  //       d="M3.333 2.666H6l1.333 3.333-1.666 1A7.333 7.333 0 0 0 9 10.333l1-1.667 3.333 1.333v2.667A1.333 1.333 0 0 1 12 13.999 10.667 10.667 0 0 1 2 4a1.333 1.333 0 0 1 1.333-1.333"
  //     />
  //   </g>
  //   <defs>
  //     <clipPath id="a">
  //       <path fill="#fff" d="M0 0h16v16H0z" />
  //     </clipPath>
  //   </defs>
  // </svg>
);

export default memo(PhoneIcon);
