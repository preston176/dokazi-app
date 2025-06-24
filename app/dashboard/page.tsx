"use client"

import { FileText, Plus, LogOut, Clock, CreditCard, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useState } from "react"
import Header from "./_components/Header"
import MainContent from "./_components/MainContent"



// Credits Sidebar Component
function CreditsSidebar({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full lg:w-80 p-4 lg:p-6 bg-gray-50 ${className}`}>
      <div className="space-y-4">
        {/* Credits Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <h3 className="font-semibold text-gray-900">Your Credits</h3>
          </div>
          <Badge variant="secondary" className="bg-gray-800 text-white text-xs">
            3 credits left
          </Badge>
        </div>

        <p className="text-sm text-gray-600">Free Plan</p>

        {/* Credit Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3 lg:p-4 text-center">
              <div className="text-xl lg:text-2xl font-bold text-green-600">3</div>
              <div className="text-xs lg:text-sm text-green-700">Remaining</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3 lg:p-4 text-center">
              <div className="text-xl lg:text-2xl font-bold text-blue-600">0</div>
              <div className="text-xs lg:text-sm text-blue-700">Used this month</div>
            </CardContent>
          </Card>
        </div>

        {/* Free Plan Limits */}
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-orange-800 mb-1 text-sm lg:text-base">Free Plan Limits</h4>
                <p className="text-xs lg:text-sm text-orange-700">
                  You get 3 free documents per month. Credits reset on the 1st of each month.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upgrade Button */}
        <Button className="w-full bg-gray-600 hover:bg-gray-700 gap-2 text-sm">
          <CreditCard className="w-4 h-4" />
          Upgrade Plan
        </Button>
      </div>
    </div>
  )
}

// Mobile Credits Sheet Component
function MobileCreditsSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="p-0 w-80">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Account Overview</h2>
          {/* <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button> */}
        </div>
        <CreditsSidebar />
      </SheetContent>
    </Sheet>
  )
}


// Main Dashboard Component
export default function ProposalCraftDashboard() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />

      <div className="flex">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block border-r min-h-screen">
          <CreditsSidebar />
        </div>

        {/* Mobile Sidebar Sheet */}
        <MobileCreditsSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />

        <MainContent />
      </div>
    </div>
  )
}
