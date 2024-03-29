/** @format */

"use client";

import { FC, useEffect, useRef, useState } from "react";
import ThemeToggle from "../theme-toggle";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ArrowLeftIcon from "@/components/Icons/arrow-left";
import SidebarLinkGroup from "../sidebar-link-group";

interface SideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const SideBar: FC<SideBarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const router = useRouter();
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  const year = new Date().getFullYear();

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-[999] flex h-screen w-80 lg:w-[320px] flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col border border-1 w-full drop-shadow-md supports-backdrop-blur:bg-background/60 bg-background/95 backdrop-blur dark:bg-background/95">
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link
            href="/dashboard"
            className="flex gap-2 items-center justify-center mx-auto"
          >
            <p className="hidde text-lg font-medium md:block">
              <Image
                src="/images/dynastyu-logo.webp"
                alt="dynastyu-logo"
                title="dynastyu-logo"
                width={111}
                height={111}
                quality={100}
                className="object-cover h-auto w-auto"
                priority
              />
            </p>
          </Link>
          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <ArrowLeftIcon />
          </button>
        </div>
        <div className="w-full px-6 pt-3 pb-8 h-full shadow-xl">
          {/* <div className="text-msm">MENU</div> */}
          <div className="relative w-full h-full">
            <SidebarLinkGroup
              setSidebarExpanded={setSidebarExpanded}
              handleNavigation={(val) => router.push(val)}
              sidebarExpanded={sidebarExpanded}
            />
            <div className="absolute bottom-0">
              <ThemeToggle />
              <div className="text-[11px] mt-[20px] text-center font-medium">{`© ${year} DynastyU. All Rights Reserved`}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default observer(SideBar);
