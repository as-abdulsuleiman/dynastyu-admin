/** @format */

"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeToggle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={className} {...props}>
      <Button
        variant="outline"
        className="outline-0 focus:outline-none focus:ring-none focus-visible:ring-none focus-visible:ring-offset-0 focus-visible:ring-0"
        size="icon"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
};
export default ThemeToggle;
