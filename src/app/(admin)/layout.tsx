/** @format */

"use client";

import { Suspense, useState } from "react";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import SuspenseLoader from "@/components/suspense-loader";
import { AnimatePresence, motion } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AnimatePresence mode="wait" initial={true}>
      <div className="flex h-screen overflow-hidden w-full">
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-scroll overflow-x-hidden p-0">
          <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="flex-1">
            <div className="mx-auto p-4 md:p-6 2xl:p-10">
              <Suspense fallback={<SuspenseLoader />}>{children}</Suspense>
            </div>
          </main>
        </div>
      </div>
    </AnimatePresence>
  );
}
