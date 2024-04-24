import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const Check = (props: LucideProps) => (
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
    className="lucide lucide-check"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default memo(Check);
