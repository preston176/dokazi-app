import { Button } from "@/components/ui/button"
import CreateDocHeader from "./_components/CreateDocHeader";
import DocDetails from "./_components/DocDetails";
import ClientInfo from "./_components/ClientInfo";
import ServiceScopeSection from "./_components/ServiceScopeSection";
import PricingSection from "./_components/PricingSection";
import TimelineSection from "./_components/TimelineSection";
import CustomContentSection from "./_components/CustomContentSection";

// Form Actions
function FormActions({ onCancel, onPreview }: { onCancel?: () => void; onPreview?: () => void }) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end p-4 lg:p-6 border-t bg-gray-50">
            <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
                Cancel
            </Button>
            <Button onClick={onPreview} className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800">
                Preview Document
            </Button>
        </div>
    )
}

// Main Create Document Component
export default function CreateDocument() {
    const handleBack = () => {
        // Handle navigation back to dashboard
        console.log("Navigate back to dashboard")
    }

    const handleCancel = () => {
        // Handle form cancellation
        console.log("Cancel form")
    }

    const handlePreview = () => {
        // Handle document preview
        console.log("Preview document")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <CreateDocHeader onBack={handleBack} />

            <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
                <DocDetails />
                <ClientInfo />
                <ServiceScopeSection />
                <PricingSection />
                <TimelineSection />
                <CustomContentSection />
            </div>

            <FormActions onCancel={handleCancel} onPreview={handlePreview} />
        </div>
    )
}
