"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import CreateDocHeader from "./_components/CreateDocHeader";
import DocDetails from "./_components/DocDetails";
import ClientInfo from "./_components/ClientInfo";
import ServiceScopeSection from "./_components/ServiceScopeSection";
import PricingSection from "./_components/PricingSection";
import TimelineSection from "./_components/TimelineSection";
import useStore from "@/store/DocumentStore";

// Form Actions
function FormActions({
    onCancel,
    onPreview,
}: {
    onCancel?: () => void;
    onPreview?: () => void;
}) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-end p-4 lg:p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
            <Button
                variant="outline"
                onClick={onCancel}
                className="w-full sm:w-auto dark:border-gray-700 dark:text-white"
            >
                Cancel
            </Button>
            <Button
                onClick={onPreview}
                className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:hover:bg-gray-200 dark:text-black"
            >
                Preview Document
            </Button>
        </div>
    );
}

// Main Page Component
export default function CreateDocument() {
    const router = useRouter();
    const params = useParams();
    const docId = params.docId as string;

    const document = useStore((state) => state.document);
    const loadDocument = useStore((state) => state.loadDocument);

    useEffect(() => {
        if (docId) {
            loadDocument(docId); // sets both document + docId
        }
    }, [docId, loadDocument]);

    const handleBack = () => {
        window.location.href = "/dashboard";
    };

    const handleCancel = () => {
        console.log("Cancel form");
    };

    const handlePreview = () => {
        if (!docId) {
            console.warn("No docId available");
            return;
        }

        router.push(`/dashboard/create-document/${docId}/preview`);
    };
    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto">
                <CreateDocHeader onBack={handleBack} />
            </div>

            <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
                <DocDetails />
                <ClientInfo />
                <ServiceScopeSection />
                <PricingSection />
                <TimelineSection />
                {/* <CustomContentSection /> */}
            </div>

            <FormActions onCancel={handleCancel} onPreview={handlePreview} />
        </div>
    );
}
