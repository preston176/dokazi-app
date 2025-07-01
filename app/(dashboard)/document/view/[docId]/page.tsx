"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Download, Share } from "lucide-react";
import jsPDF from "jspdf";
import { fetchDocumentById } from "@/app/actions/fetchDocument";
import { Card } from "@/components/ui/card";

function MacStyleTopBar() {
    return (
        <div className="w-full flex items-center justify-start gap-2 bg-gray-200 dark:bg-gray-800 px-4 py-2 border-b">
            <div className="flex gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
        </div>
    );
}

function generateFallbackContent(document: any) {
    return `
DOCUMENT TITLE: ${document.docTitle}
TYPE: ${document.type}
CLIENT: ${document.clientName}
EMAIL: ${document.clientEmail}
SERVICES: ${JSON.parse(document.serviceScope || "[]").join(", ")}
TIMELINE: ${document.duration || `${document.startDate} to ${document.endDate}`}
INVESTMENT: ${document.currency} ${document.pricingAmount}

---
This is an auto-generated summary based on the document metadata.
  `.trim();
}

export default function PreviewPage() {
    const { docId } = useParams();
    const [document, setDocument] = useState<any | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function load() {
            if (typeof docId === "string") {
                const doc = await fetchDocumentById(docId);
                if (doc) {
                    setDocument(doc);
                }
            }
        }

        load();
    }, [docId]);

    const handleDownload = () => {
        if (!document) return;
        const doc = new jsPDF("p", "pt", "a4");
        const content = document.customContent || generateFallbackContent(document);
        const lines = doc.splitTextToSize(content, 500);
        doc.setFont("Helvetica");
        doc.setFontSize(12);
        doc.text(lines, 40, 40);
        doc.save(`${document.docTitle || "document"+ Date.now().toLocaleString("en-GB")}.pdf`);
    };

    const handleShare = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    if (!document) {
        return <p className="p-6 text-gray-700 dark:text-gray-300">Loading document...</p>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 container mx-auto">
            <MacStyleTopBar />
            <div className="flex justify-between items-center px-4 py-4 border-b dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
                <h1 className="text-lg font-semibold truncate">{document.docTitle}</h1>
                <div className="flex gap-2">
                    <Button onClick={handleShare} variant="outline">
                        <Share className="w-4 h-4 mr-2" />
                        Share Link
                    </Button>
                    <Button onClick={handleDownload} variant="default">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                    </Button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6">
                <Card className="p-6 whitespace-pre-wrap bg-white dark:bg-black dark:text-white border dark:border-gray-800 shadow">
                    <div ref={contentRef}>
                        {document.customContent || generateFallbackContent(document)}
                    </div>
                </Card>
            </div>
        </div>
    );
}
