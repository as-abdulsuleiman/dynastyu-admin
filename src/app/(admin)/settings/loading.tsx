/** @format */

"use client";

import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="h-screen min-h-screen w-full">
      <div className="flex flex-row h-full items-center justify-center">
        <Spinner animationType="loading" />
      </div>
    </div>
  );
}
