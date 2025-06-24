import { Button } from "@/components/ui/button";
import { FileText, LogOut, Menu } from "lucide-react";

function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    return (
        <header className="flex items-center justify-between p-4 lg:p-6 bg-white border-b">
            <div className="flex items-center gap-2">
                {/* Mobile menu button */}
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={onMenuClick}>
                    <Menu className="w-5 h-5" />
                </Button>
                <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                <h1 className="text-lg lg:text-xl font-semibold text-gray-900">ProposalCraft</h1>
            </div>
            <div className="flex items-center gap-2 lg:gap-4">
                <span className="text-xs lg:text-sm text-gray-600 hidden sm:block">Welcome, rere</span>
                <Button variant="ghost" size="sm" className="gap-1 lg:gap-2">
                    <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="hidden sm:inline">Logout</span>
                </Button>
            </div>
        </header>
    )
}

export default Header;