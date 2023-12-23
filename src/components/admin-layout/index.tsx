/** @format */

"use client";

import { FC } from "react";
import Navbar from "../navbar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="w-full mx-auto h-screen min-h-screen">
      <Navbar />
      <main className="w-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
