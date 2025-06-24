"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Header Component
function CreateDocHeader({ onBack }: { onBack?: () => void }) {
    return (
        <div className="flex items-center gap-4 p-4 lg:p-6 border-b container mx-auto">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
            </Button>
            <h1 className="text-xl lg:text-2xl font-semibold">Create New Document</h1>
        </div>
    )
}

export default CreateDocHeader;