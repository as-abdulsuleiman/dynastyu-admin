/** @format */

"use client";

import { FC } from "react";
import Spinner from "../spinner";

interface SuspenseLoaderProps {}

const SuspenseLoader: FC<SuspenseLoaderProps> = ({}) => {
  return (
    <div className="h-screen min-h-screen w-full">
      <div className="flex flex-row h-full items-center justify-center">
        <Spinner animationType="loading" />
      </div>
    </div>
  );
};

export default SuspenseLoader;
