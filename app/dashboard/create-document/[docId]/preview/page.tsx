"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, RotateCcw, BrainCog, Download } from "lucide-react";
import useStore from "@/store/DocumentStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import jsPDF from "jspdf";
import { saveDocument } from "@/app/actions/saveDocument";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { deleteLocalDraft } from "@/lib/deleteLocalDraft";
import { deductUserCredit } from "@/app/actions/deductUserCredit";
import { useUser } from "@clerk/nextjs";


// Header
function PreviewHeader({

    onReset,
    onDownload,
}: {

    onReset: () => void;
    onDownload: () => void;
}) {
    const { user, isLoaded } = useUser();

    const router = useRouter();
    const handleSaveDocument = async () => {
        toast.loading("Saving Document")



        const state = useStore.getState();

        let docId = state.docId;

        //  Generate UUID if not already present
        if (!docId) {
            docId = uuidv4();
            useStore.getState().setDocId(docId);
        }

        const result = await saveDocument({
            ...state.document,
            docId,
        });

        if (result && result.success && result.data) {
            const newDocId = result.data.docId;

            deleteLocalDraft(docId)
            // ✅ Clear state
            useStore.setState({
                document: {
                    DocTitle: "",
                    doctype: "",
                    ClientName: "",
                    ClientEmail: "",
                    ServiceScope: [""],
                    PricingAmount: 0,
                    Currency: "",
                    Type: "",
                    StartDate: "",
                    EndDate: "",
                    Duration: "",
                    CustomContent: "",
                },
                docId: null,
            });


            // Optional toast / redirect logic here
            // console.log("Saved with ID:", newDocId);
            toast.success("Document saved!");
            deductUserCredit(user?.id!);

            // clear state
            router.replace(`/document/view/${newDocId}`);

        } else {
            // console.warn("Save failed or user not logged in:", result);
            toast.error("Error while saving document. " + result)
        }
    };


    // handle back

    const handleBack = () => {
        router.back()
    }
    return (
        <div className="fixed top-0 w-full md:sticky md:top-20 z-30 bg-white dark:bg-gray-900 border-b p-4 lg:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-y-0">
            {/* Left section */}
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
                    Document Preview
                </h1>
            </div>

            {/* Right section */}
            <div className="flex flex-row mt-4 md:mt-0  gap-2 md:gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="gap-2 text-red-600 dark:text-rose-400 hover:bg-red-50"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </Button>
                <Button variant="secondary" size="sm" className="gap-2">
                    <BrainCog className="w-4 h-4" />
                    Improve with AI
                </Button>
                {
                    isLoaded && <Button variant="default" className="gap-2 bg-emerald-700 hover:bg-gray-800 text-white" onClick={handleSaveDocument}>
                        <Save className="w-4 h-4" />
                        Save Document
                    </Button>
                }
            </div>
        </div>

    );
}


// Mapping
function mapDocumentToPreviewData(document: ReturnType<typeof useStore.getState>["document"]) {
    return {
        title: document.DocTitle,
        type: document.doctype,
        client: document.ClientName,
        clientEmail: document.ClientEmail,
        services: document.ServiceScope,
        investment: document.PricingAmount,
        timeline: document.Duration || `${document.StartDate} to ${document.EndDate}`,
    };
}

// Template Generator
function generateDocumentContent(data: ReturnType<typeof mapDocumentToPreviewData>) {
    const { type, client, clientEmail, services, investment, timeline, title } = data;

    switch (type) {
        case "proposal":
            return `PROJECT PROPOSAL

Dear ${client},

Thank you for considering our services. I'm excited to present this proposal for your project.

PROJECT OVERVIEW:

Client: ${client}
Email: ${clientEmail}
Services: ${services.join(", ")}
Timeline: ${timeline}
Investment: $${investment}

SCOPE OF WORK:
${services.map((service) => `• ${service}`).join("\n")}

TIMELINE:
The project will commence on and is expected to be completed by , spanning approximately ${timeline}.

INVESTMENT:
The total investment for this project is $${investment}.

NEXT STEPS:
Please review this proposal and let me know if you have any questions. I look forward to working with you.

Best regards,
[Your Name]`;

        case "contract":
            return `SERVICE AGREEMENT

This Service Agreement ("Agreement") is entered into between [Your Company] and ${client}.

CLIENT INFORMATION:
Name: ${client}
Email: ${clientEmail}

SERVICES TO BE PROVIDED:
${services.map((service) => `• ${service}`).join("\n")}

TERMS AND CONDITIONS:

1. SCOPE OF WORK
${services.map((service) => `- ${service}`).join("\n")}

2. TIMELINE
Project duration: ${timeline}

3. COMPENSATION
Total: $${investment}

SIGNATURES:
Client: ${client}
Date: ___________

Contractor: [Your Name]
Date: ___________`;

        case "nda":
            return `NON-DISCLOSURE AGREEMENT

This NDA ("Agreement") is between [Your Company] and ${client}.

PROJECT:
${title}

PARTIES:
Disclosing: [Your Company]
Receiving: ${client} (${clientEmail})

SERVICES:
${services.join(", ")}
Estimated Value: $${investment}

CONFIDENTIALITY:
1. Maintain secrecy
2. No third-party disclosure
3. Use for intended purpose only

TERM:
Project duration (${timeline}) + 2 years

SIGNATURES:
${client}: ___________  Date: ___________
[Your Name]: ___________  Date: ___________`;

        case "invoice":
            return `INVOICE

Invoice #: INV-001
Date: [Today]
Due: [Due Date]

BILL TO:
${client}
${clientEmail}

DESCRIPTION: ${title}

SERVICES:
${services.map((s) => `• ${s}`).join("\n")}

CHARGES:
${services.map((s) => `${s}: $${(investment / services.length).toFixed(2)}`).join("\n")}

TOTAL: $${investment}
Payment due in 30 days.`;

        case "quote":
            return `PROJECT QUOTE

Quote #: QUO-001
Date: [Today]
Valid Until: [30 days from today]

FOR:
${client}
${clientEmail}

PROJECT: ${title}

SERVICES:
${services.map((s) => `• ${s}`).join("\n")}

ESTIMATED TIMELINE: ${timeline}
TOTAL: $${investment}

TERMS:
• 50% upfront
• Remaining upon completion

Next steps: reply to confirm and receive contract & invoice.

Best,
[Your Name]`;

        default:
            return "Preview not available for this document type.";
    }
}

// Details Card
function DocumentDetails({ data }: { data: ReturnType<typeof mapDocumentToPreviewData> }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Document Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-900 dark:text-gray-200">
                {/* Same structure */}
                <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Title</span>
                    <div className="font-medium text-blue-600">{data.title}</div>
                </div>
                <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
                    <div className="font-medium capitalize">{data.type}</div>
                </div>
                <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Client</span>
                    <div className="font-medium">{data.client}</div>
                    <div className="text-blue-600 text-sm">{data.clientEmail}</div>
                </div>
                <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Services</span>
                    <div className="space-y-1">
                        {data.services.map((service, index) => (
                            <div key={index} className="font-medium">• {service}</div>
                        ))}
                    </div>
                </div>
                <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Investment</span>
                    <div className="font-medium">${data.investment}</div>
                </div>
                <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Timeline</span>
                    <div className="font-medium">{data.timeline}</div>
                </div>
            </CardContent>
        </Card>
    );
}

// Editable Text Area
function DocumentContent({
    data,
    onReset,
    refForPdf,
}: {
    data: ReturnType<typeof mapDocumentToPreviewData>;
    onReset: () => void;
    refForPdf: React.RefObject<HTMLDivElement>;
}) {
    const document = useStore((s) => s.document);
    const updateDocument = useStore((s) => s.updateDocument);

    const defaultContent = generateDocumentContent(data);

    const value = document.CustomContent?.trim() === ""
        ? defaultContent
        : document.CustomContent;

    useEffect(() => {
        if (!document.CustomContent || document.CustomContent.trim() === "") {
            updateDocument({ CustomContent: defaultContent });
        }
    }, [document.CustomContent, defaultContent, updateDocument]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateDocument({ CustomContent: e.target.value });
    };

    return (
        <Card className="h-fit">
            <CardHeader>
                <CardTitle className="text-lg">Document Content</CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    ref={refForPdf}
                    className="bg-white border shadow-sm rounded-lg p-4 md:p-6 max-w-full md:max-w-[794px] mx-auto font-sans text-gray-900"
                >
                    <textarea
                        value={value}
                        onChange={handleChange}
                        className="w-full md:h-[1100px] min-h-[400px] resize-none bg-transparent outline-none text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-wrap font-sans"
                        style={{ fontFamily: "inherit", lineHeight: "1.75" }}
                    />
                </div>
            </CardContent>
        </Card>
    );
}



// Main
export default function DocumentPreview() {
    const { docId } = useParams();
    const loadDocument = useStore((s) => s.loadDocument);
    const updateDocument = useStore((s) => s.updateDocument);
    const document = useStore((s) => s.document);

    const pdfRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

    useEffect(() => {
        if (typeof docId === "string") {
            loadDocument(docId);
        }
    }, [docId, loadDocument]);

    const data = mapDocumentToPreviewData(document);

    const handleReset = () => {
        const defaultContent = generateDocumentContent(data);
        updateDocument({ CustomContent: defaultContent });
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF("p", "pt", "a4");
        const content = document.CustomContent || generateDocumentContent(data);
        const lines = doc.splitTextToSize(content, 500);
        doc.setFont("Helvetica");
        doc.setFontSize(12);
        doc.text(lines, 40, 40);
        doc.save(`${data.title || "document"}.pdf`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 ">
            <PreviewHeader onReset={handleReset} onDownload={handleDownloadPDF} />
            <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
                <div className="w-full lg:w-80">
                    <DocumentDetails data={data} />
                </div>
                <div className="flex-1 overflow-x-auto">
                    <DocumentContent data={data} onReset={handleReset} refForPdf={pdfRef} />
                </div>
            </div>
        </div>
    );
}
