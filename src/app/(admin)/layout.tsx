/** @format */

import { Suspense } from "react";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import SuspenseLoader from "@/components/suspense-loader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <aside className="h-[calc(100vh-5rem)] hidden bg-background lg:flex shadow-sm border min-h-screen fixed top-0 left-0 transition-transform duration-300 transform -translate-x-full lg:translate-x-0 w-0 lg:w-72 z-10">
          <SideBar />
        </aside>
        <div className="ml-0 lg:ml-72">
          <div className="px-[16px] md:px-6 py-24 pb-6 ">
            <Suspense fallback={<SuspenseLoader />}>{children}</Suspense>
          </div>
        </div>
      </main>
    </>
  );
}
