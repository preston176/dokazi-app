"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import useStore from "@/store/DocumentStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import jsPDF from "jspdf";

import PreviewHeader from "./_components/PreviewHeader";
import DocumentContent from "./_components/DocumentContent";
import { useEditDocStore } from "@/store/EditDocumentStore";
import cluster from "cluster";



// Mapping
export function mapDocumentToPreviewData(document: ReturnType<typeof useStore.getState>["document"]) {
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
export function generateDocumentContent(data: ReturnType<typeof mapDocumentToPreviewData>) {

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
export function DocumentDetails({ data }: { data: ReturnType<typeof mapDocumentToPreviewData> }) {
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

// Main
export default function DocumentPreview({ isEdit }: { isEdit?: boolean }) {
    const { docId } = useParams();
    // if edit mode, load edit states that had been updated from db
    let loadDocument;
    let updateDocument;
    let document;

    if (isEdit) {
        loadDocument = useEditDocStore((s) => s.loadDocument);
        updateDocument = useEditDocStore((s) => s.updateDocument);
        document = useEditDocStore((s) => s.document);
    } else {
        loadDocument = useStore((s) => s.loadDocument);
        updateDocument = useStore((s) => s.updateDocument);
        document = useStore((s) => s.document);
    }




    const pdfRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

    useEffect(() => {
        if (typeof docId === "string") {
            loadDocument(docId);
        }
    }, [docId, loadDocument]);

    const data = mapDocumentToPreviewData(document!);


    const handleReset = () => {
        const defaultContent = generateDocumentContent(data);

         updateDocument({ CustomContent: defaultContent });
         
    };

    // function to handle PDF Download
    const handleDownloadPDF = () => {
        const doc = new jsPDF("p", "pt", "a4");
        const content = document?.CustomContent || generateDocumentContent(data);
        const lines = doc.splitTextToSize(content, 500);
        doc.setFont("Helvetica");
        doc.setFontSize(12);
        doc.text(lines, 40, 40);
        doc.save(`${data.title || "document"}.pdf`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 ">
            <PreviewHeader onReset={handleReset} onDownload={handleDownloadPDF} isEdit={isEdit} />
            <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
                <div className="w-full lg:w-80">
                    <DocumentDetails data={data} />
                </div>
                <div className="flex-1 overflow-x-auto">
                    <DocumentContent data={data} onReset={handleReset} refForPdf={pdfRef} isEdit={isEdit} />
                </div>
            </div>
        </div>
    );
}
