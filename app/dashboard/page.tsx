"use client"

import MainContent from "./_components/MainContent"
import CreditsSidebar from "./_components/CreditsSidebar"


// Main Dashboard Component
export default function ProposalCraftDashboard() {


  return (
    <div className="min-h-screen bg-white dark:bg-black ">

      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block border-r dark:border-gray-800 min-h-screen">
          <CreditsSidebar />
        </div>

        <MainContent />
      </div>
    </div>
  )
}
