/** @format */

"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Template = ({ children }: any) => {
  return (
    <>
      <ProgressBar
        height="2px"
        color="#dc2626"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default Template;
