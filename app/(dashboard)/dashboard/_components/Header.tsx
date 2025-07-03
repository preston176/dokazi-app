"use client";

import { useUser } from "@clerk/nextjs";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { DoorOpen, FileText, LogOut } from "lucide-react";
import { ModeToggle } from "@/components/dark-mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  // 🧹 Custom logout handler: clear drafts and then sign out
  const handleLogout = async () => {
    // Clear all draft documents from localStorage
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("doc-")
    );
    keys.forEach((key) => localStorage.removeItem(key));

    // Now sign out via Clerk
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 lg:p-6 bg-white dark:bg-black border-b dark:border-gray-800">
      <Link className="flex items-center gap-2" href={"/dashboard"}>
        <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600 dark:text-blue-400" />
        <h1 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
          DoKazi.app
        </h1>
      </Link>

      <div className="flex items-center gap-2 lg:gap-4">
        <ModeToggle />
        <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
          Welcome{" "}
          {user?.firstName || user?.lastName || user?.emailAddresses[0]?.emailAddress}
        </span>

        <UserButton userProfileMode="modal" />


        {isLoaded && (
          <div className="hidden md:flex">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-1 lg:gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
