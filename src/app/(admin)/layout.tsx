/** @format */

"use client";

import SideBar from "@/components/side-bar";
import Spinner from "@/components/spinner";
import { useAuth } from "@/hooks/useAuth";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isInitializing } = useAuth();

  const siteUrl =
    process?.env?.NODE_ENV === "production"
      ? process?.env?.NEXT_PUBLIC_KNEXTT_URL
      : typeof window !== "undefined" && window?.location?.origin;

  if (isInitializing)
    return (
      <div className="h-screen min-h-screen w-full">
        <div className="flex flex-row h-full items-center justify-center">
          <Spinner animationType="loading" />
        </div>
      </div>
    );

  if (!isLoggedIn) return (window.location.href = `${siteUrl}/sign-in`);

  return (
    <div className="w-full h-full">
      <aside className="h-[calc(100vh-5rem)] hidden bg-background lg:flex shadow-sm border min-h-screen fixed top-0 left-0 transition-transform duration-300 transform -translate-x-full lg:translate-x-0 w-0 lg:w-64 z-10">
        <SideBar />
      </aside>
      <main className="ml-0 lg:ml-64">
        <div className=" px-[16px] md:px-6 py-32">{children}</div>
      </main>
    </div>
  );
}
