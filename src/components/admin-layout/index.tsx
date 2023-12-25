/** @format */

"use client";

import { FC } from "react";
import Navbar from "../navbar";
import { useAuth } from "@/hooks/useAuth";
import { useRootStore } from "@/mobx";
import { Toaster } from "../ui/toaster";
import { Analytics } from "@vercel/analytics/react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const { isLoggedIn, isInitializing } = useAuth();
  const {
    authStore: { user },
  } = useRootStore();

  return (
    <>
      <div className="w-full mx-auto h-screen min-h-screen">
        <Navbar
          user={user}
          isInitializing={isInitializing}
          isLoggedIn={isLoggedIn}
        />
        <main className="w-full">{children}</main>
      </div>
      <Toaster />
      <Analytics />
    </>
  );
};

export default AdminLayout;
