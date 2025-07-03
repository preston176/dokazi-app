"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import CreateDocHeader from "./_components/CreateDocHeader";
import DocDetails from "./_components/DocDetails";
import ClientInfo from "./_components/ClientInfo";
import ServiceScopeSection from "./_components/ServiceScopeSection";
import PricingSection from "./_components/PricingSection";
import TimelineSection from "./_components/TimelineSection";

import { toast } from "sonner";
import useStore from "@/store/DocumentStore";
import { useEditDocStore } from "@/store/EditDocumentStore";

// Form Actions
function FormActions({
    onCancel,
    onPreview,
    isEdit,
}: {
    onCancel?: () => void;
    onPreview?: () => void;
    isEdit?: boolean;
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
                {isEdit ? "Update Document" : "Preview Document"}
            </Button>
        </div>
    );
}

// Main Page Component
export default function CreateDocument({ isEdit }: { isEdit?: boolean }) {

    const [isLoading, setIsloading] = useState(true);

    const router = useRouter();
    const params = useParams();
    const docId = params.docId as string;

    // Call both hooks unconditionally
    const editDoc = useEditDocStore((state) => state.document);
    const editLoadDocument = useEditDocStore((state) => state.loadDocument);

    const draftDoc = useStore((state) => state.document);
    const draftLoadDocument = useStore((state) => state.loadDocument);

    //  Choose values after hook calls
    const document = isEdit ? editDoc : draftDoc;
    const loadDocument = isEdit ? editLoadDocument : draftLoadDocument;

    useEffect(() => {
        if (docId) {
            const loadStateFromDraft = async () => {
               await loadDocument(docId);
            };

            try {
                loadStateFromDraft();
                setIsloading(false)
            } catch (error) {
                console.error("Error loading document")
            }
        }
    }, [docId, isEdit]);

    const handleBack = () => {
        router.push("/dashboard");
    };

    const handleCancel = () => {
        console.log("Cancel form");
    };

    const handlePreview = () => {
        if (!docId) {
            console.warn("No docId available");
            return;
        }
        toast.success("Document ready for preview");
        const previewPath = isEdit ? `/document/edit/${docId}/preview` : `/dashboard/create-document/${docId}/preview`;
        router.push(previewPath);
    };

    if (isLoading) return (
        <>Loading ...</>
    )

    return (
        <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
            <div className="max-w-7xl mx-auto">
                <CreateDocHeader onBack={handleBack} />
            </div>

            <div className="p-4 lg:p-6 space-y-6 max-w-5xl mx-auto">
                <DocDetails isEdit={isEdit} />
                <ClientInfo isEdit={isEdit} />
                <ServiceScopeSection isEdit={isEdit} />
                <PricingSection isEdit={isEdit} />
                <TimelineSection isEdit={isEdit} />
                {/* <CustomContentSection /> */}
            </div>

            <FormActions
                isEdit={isEdit}
                onCancel={handleCancel}
                onPreview={handlePreview}
            />
        </div>
    );
}
