/** @format */

"use client";

import { FC } from "react";
import ThemeToggle from "../theme-toggle";
import { observer } from "mobx-react-lite";
import SidebarItems from "../sidebar-items";
import { useRouter } from "next/navigation";

interface SideBarProps {}

const SideBar: FC<SideBarProps> = ({}) => {
  const router = useRouter();
  return (
    <div className="w-full px-6 pt-6 pb-8 h-full shadow-xl">
      <div className="relative w-full h-full">
        <div className="pt-[60px]">
          <SidebarItems handleNavigation={(val) => router.push(val)} />
        </div>
        <div className="absolute bottom-0">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default observer(SideBar);
