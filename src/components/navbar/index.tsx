/** @format */

"use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import ThemeToggle from "../theme-toggle";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useRootStore } from "@/mobx";

const Navbar = () => {
  const { login, logout, isLoggedIn } = useAuth();
  const router = useRouter();

  const {
    authStore: { user },
  } = useRootStore();

  return (
    <header className="fixed top-0 supports-backdrop-blur:bg-background/60 inset-x-0 w-full z-50 border-b bg-background/95 backdrop-blur">
      <nav className="w-full h-16 mx-auto flex items-center md:container px-[16px] md:px-6">
        <Link href="/dashboard" className="flex gap-2 items-center">
          <p className="hidde text-md font-medium md:block">DynastyU</p>
        </Link>
        <div className="ml-auto flex items-center">
          {isLoggedIn ? (
            <Button
              onClick={async () => {
                logout();
                router.push("/sign-in");
              }}
            >
              Logout
            </Button>
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
          )}
          <ThemeToggle className="ml-3" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
