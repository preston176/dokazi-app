import { ModeToggle } from "@/components/dark-mode-toggle"
import { Button } from "@/components/ui/button"
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs"
import { FileText, LogOut, Menu } from "lucide-react"

function Header({ onMenuClick }: { onMenuClick?: () => void }) {

  const { user } = useUser()

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between p-4 lg:p-6 bg-white dark:bg-black border-b dark:border-gray-800">
      <div className="flex items-center gap-2">
        {/* Mobile menu button */}
        <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600 dark:text-blue-400" />
        <h1 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
          ProposalCraft
        </h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <ModeToggle />
        <UserButton />
        <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 hidden sm:block">
          Welcome {user?.firstName || user?.lastName || user?.emailAddresses[0].emailAddress}
        </span>
        
        <SignOutButton>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 lg:gap-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
        </SignOutButton>
      </div>
    </header>
  )
}

export default Header
