/** @format */

"use client";

import { FC } from "react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="w-full mx-auto h-screen min-h-screen">
      <main className="w-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
