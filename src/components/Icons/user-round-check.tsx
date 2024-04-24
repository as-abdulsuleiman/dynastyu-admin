import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const UserRoundCheck = (props: LucideProps) => (
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
    className="lucide lucide-user-round-check"
    {...props}
  >
    <path d="M2 21a8 8 0 0 1 13.292-6" />
    <circle cx="10" cy="8" r="5" />
    <path d="m16 19 2 2 4-4" />
  </svg>
);

export default memo(UserRoundCheck);
