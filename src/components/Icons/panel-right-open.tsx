/** @format */

import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const PanelRightOpen = (props: LucideProps) => (
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
    className="lucide lucide-panel-right-open"
    {...props}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M15 3v18" />
    <path d="m10 15-3-3 3-3" />
  </svg>
);

export default memo(PanelRightOpen);
