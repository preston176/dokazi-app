import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, FileText, Plus } from "lucide-react"

// Main Content Component
function MainContent() {
    return (
        <div className="flex-1 p-4 lg:p-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8 gap-4">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        My Documents
                    </h2>
                    <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
                        Create and manage your proposals, contracts, and NDAs
                    </p>
                </div>
                <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black gap-2 w-full sm:w-auto">
                    <Plus className="w-4 h-4" />
                    <span className="sm:hidden">Create Document</span>
                    <span className="hidden sm:inline">Create Document</span>
                </Button>
            </div>

            {/* Mobile Credits Card - Only visible on mobile */}
            <Card className="lg:hidden mb-6 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900 dark:to-green-900 border-blue-200 dark:border-blue-800">
                <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">⚡</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                                Credits
                            </span>
                        </div>
                        <Badge
                            variant="secondary"
                            className="bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-xs"
                        >
                            3 left
                        </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-center">
                            <div className="text-lg font-bold text-green-600 dark:text-green-300">
                                3
                            </div>
                            <div className="text-xs text-green-700 dark:text-green-400">
                                Remaining
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-300">
                                0
                            </div>
                            <div className="text-xs text-blue-700 dark:text-blue-400">Used</div>
                        </div>
                    </div>
                    <Button
                        size="sm"
                        className="w-full bg-gray-600 hover:bg-gray-700 dark:bg-gray-100 dark:hover:bg-gray-300 text-xs text-white dark:text-black"
                    >
                        <CreditCard className="w-3 h-3 mr-1" />
                        Upgrade Plan
                    </Button>
                </CardContent>
            </Card>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-12 lg:py-16 px-4 ">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                    No documents yet
                </h3>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md px-4">
                    Create your first proposal, contract, or NDA to get started
                </p>
                <Button className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black gap-2 w-full sm:w-auto">
                    <Plus className="w-4 h-4" />
                    Create Your First Document
                </Button>
            </div>
        </div>
    )
}

export default MainContent
