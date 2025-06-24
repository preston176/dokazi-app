"use client"

import { Button } from "@/components/ui/button";
import { FileText, LogOut } from "lucide-react";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-6 bg-white border-b">
            <div className="flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-semibold text-gray-900">DoKazi</h1>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Welcome, User</span>
                <Button variant="ghost" size="sm" className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>
        </header>
    )
}