import * as React from "react";
import { memo } from "react";
import { LucideProps } from "lucide-react";

const School2 = (props: LucideProps) => (
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
    className="lucide lucide-school-2"
    {...props}
  >
    <circle cx="12" cy="10" r="1" />
    <path d="M22 20V8h-4l-6-4-6 4H2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2Z" />
    <path d="M6 17v.01" />
    <path d="M6 13v.01" />
    <path d="M18 17v.01" />
    <path d="M18 13v.01" />
    <path d="M14 22v-5a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5" />
  </svg>
);

export default memo(School2);
