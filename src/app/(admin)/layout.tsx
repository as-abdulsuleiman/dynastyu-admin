/** @format */

import SideBar from "@/components/side-bar";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:container w-full px-[16px] md:px-6">
      <div className="flex flex-row relative justify-between gap-x-9 w-full">
        <div className="h-[calc(100vh-5rem)] sm:max-w-[280px] w-full hidden lg:flex fixed top-[65px] border-t-0 z-50 bg-background shadow-sm border">
          <SideBar />
        </div>
        <div className="ml-[0px] w-full lg:ml-[300px] py-12 pt-32">
          {children}
        </div>
      </div>
    </div>
  );
}
