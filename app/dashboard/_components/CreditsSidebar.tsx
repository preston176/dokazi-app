"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/UserStore"; // Make sure this is correctly imported
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CreditCard } from "lucide-react";

function CreditsSidebar({ className = "" }: { className?: string }) {
  const { user, loading, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const creditsLeft = user ? user.creditsAvailable - user.creditsUsed : 0;

  return (
    <div className={`w-full h-fit lg:w-80 p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="space-y-4">
        {/* Credits Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚡</span>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">Your Credits</h3>
          </div>
          <Badge
            variant="secondary"
            className="bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-xs"
          >
            {loading ? "Loading..." : `${creditsLeft} left`}
          </Badge>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400">Free Plan</p>

        {/* Credit Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700">
            <CardContent className="p-3 lg:p-4 text-center">
              <div className="text-xl lg:text-2xl font-bold text-green-600 dark:text-green-300">
                {loading ? "..." : creditsLeft}
              </div>
              <div className="text-xs lg:text-sm text-green-700 dark:text-green-400">
                Remaining
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-700">
            <CardContent className="p-3 lg:p-4 text-center">
              <div className="text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-300">
                {loading ? "..." : user?.creditsUsed ?? 0}
              </div>
              <div className="text-xs lg:text-sm text-blue-700 dark:text-blue-400">
                Used this month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Free Plan Limits */}
        <Card className="bg-orange-50 dark:bg-orange-900 border-orange-200 dark:border-orange-700">
          <CardContent className="p-3 lg:p-4">
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-300 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-1 text-sm lg:text-base">
                  Free Plan Limits
                </h4>
                <p className="text-xs lg:text-sm text-orange-700 dark:text-orange-400">
                  You get 3 free documents per month. Credits reset on the 1st of
                  each month.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Mobile View Credits Summary */}
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
                {loading ? "..." : `${creditsLeft} left`}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="text-center">
                <div className="text-lg font-bold text-green-600 dark:text-green-300">
                  {loading ? "..." : creditsLeft}
                </div>
                <div className="text-xs text-green-700 dark:text-green-400">
                  Remaining
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600 dark:text-blue-300">
                  {loading ? "..." : user?.creditsUsed ?? 0}
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

        {/* Upgrade Button */}
        <Button className="w-full bg-gray-600 dark:bg-gray-100 hover:bg-gray-700 dark:hover:bg-gray-300 text-white dark:text-black gap-2 text-sm">
          <CreditCard className="w-4 h-4" />
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
}

export default CreditsSidebar;
