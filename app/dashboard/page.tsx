"use client";

import MainContent from "./_components/MainContent";
import CreditsSidebar from "./_components/CreditsSidebar";

export default function ProposalCraftDashboard() {
  return (
    <div className="min-h-screen bg-white dark:bg-black container mx-auto px-4 py-6">
      <div className="flex flex-col-reverse lg:flex-row gap-6">
        {/* Sidebar: show inline on mobile, side on desktop */}
        <div className="lg:w-1/4 w-full">
          <CreditsSidebar />
        </div>

        {/* Main content: take full width on mobile, expand on desktop */}
        <div className="flex-1">
          <MainContent />
        </div>
      </div>
    </div>
  );
}
