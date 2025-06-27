"use client";

import { ArrowLeft, Edit, Download, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useStore from "@/store/DocumentStore";
import jsPDF from "jspdf";
import { useState, useRef, useEffect } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { useDebouncedEffect } from "@/hooks/useDebouncedEffect";
import { useRouter } from "next/navigation";


function PreviewHeader({ onBack, contentRef }: { onBack?: () => void; contentRef: React.RefObject<HTMLTextAreaElement | null> }) {
  const document = useStore((state) => state.document);

  const handleDownload = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    const lineHeight = 7;
    const margin = 20;
    let y = margin;

    const content = contentRef.current?.value || "No content";
    const lines = content.split("\n");

    lines.forEach((line) => {
      const trimmed = line.trim();

      const isHeading =
        trimmed === trimmed.toUpperCase() &&
        trimmed.length > 0 &&
        !trimmed.startsWith("-") &&
        !trimmed.startsWith("•") &&
        !trimmed.includes("@") &&
        !/^\d/.test(trimmed);

      const isLabel = trimmed.endsWith(":") && !trimmed.startsWith("-");

      if (isHeading || isLabel) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(13);
      } else {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(12);
      }

      const wrappedLines = pdf.splitTextToSize(trimmed, 170);
      wrappedLines.forEach((wrappedLine: any) => {
        if (y > 280) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(wrappedLine, margin, y);
        y += lineHeight;
      });
    });

    const filename = (document.DocTitle || "document").replace(/\s+/g, "_") + ".pdf";
    pdf.save(filename);
  };

  return (
    <div className="flex items-center justify-between p-4 lg:p-6 border-b bg-white dark:bg-black">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <h1 className="text-xl lg:text-2xl font-semibold">Document Preview</h1>
      </div>
      <div className="flex items-center gap-2">
        {/* <Button variant="outline" size="sm" className="gap-2">
          <Edit className="w-4 h-4" />
          Edit
        </Button> */}
        {/* <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                </Button> */}
        <Button className="gap-2 bg-gray-900 hover:bg-gray-800 text-white">
          <Save className="w-4 h-4" />
          Save Document
        </Button>
      </div>
    </div>
  );
}

function DocumentDetails() {
  const document = useStore((state) => state.document);
  return (
    <Card className="bg-white dark:bg-neutral-900 text-black dark:text-white">
      <CardHeader>
        <CardTitle className="text-lg">Document Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Title</span>
          <div className="font-medium text-blue-600">{document.DocTitle}</div>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Type</span>
          <div className="font-medium capitalize">{document.doctype}</div>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Client</span>
          <div className="font-medium">{document.ClientName}</div>
          <div className="text-blue-600 text-sm">{document.ClientEmail}</div>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Services</span>
          <div className="space-y-1">
            {document.ServiceScope.map((s, i) => (
              <div key={i} className="font-medium">
                • {s}
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Investment</span>
          <div className="font-medium">${document.PricingAmount}</div>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Timeline</span>
          <div className="font-medium">{document.Duration}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentContent({ contentRef }: { contentRef: React.RefObject<HTMLTextAreaElement | null> }) {
  const document = useStore((state) => state.document);
  const defaultContent = generateContent(document);
  const storageKey = "document-content";
  const [content, setContent] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setContent(saved || defaultContent);
  }, [defaultContent]);

  // Debounced save to localStorage
  useDebouncedEffect(() => {
    localStorage.setItem(storageKey, content);
  }, [content], 500); // Adjust delay (ms) as needed

  return (
    <Card
      id="document-pdf"
      className="bg-white text-black p-6 rounded-lg shadow-sm border text-sm font-sans leading-relaxed"
    >
      <CardHeader>
        <CardTitle className="text-lg font-bold">{document.DocTitle || "Document Content"}</CardTitle>
      </CardHeader>
      <CardContent>
        <textarea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full md:h-[580px] h-full min-h-[200px] resize-none md:text-lg font-sans leading-relaxed text-gray-800 bg-white outline-none"
        />
      </CardContent>
      {/* Footer */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Download className="w-4 h-4 opacity-70" />
        <span>This is a live preview of how your PDF will look.</span>
      </div>
    </Card>
  );
}



function generateContent(doc: ReturnType<typeof useStore.getState>["document"]): string {
  const { doctype, DocTitle, ClientName, ClientEmail, ServiceScope, PricingAmount, Duration } = doc;

  switch (doctype) {
    case "proposal":
      return `PROJECT PROPOSAL\n\nDear ${ClientName},\n\nWe appreciate the opportunity to collaborate with you on the ${DocTitle} project. This proposal outlines the services we will provide, the timeline, and the investment required.\n\nCLIENT DETAILS:\nName: ${ClientName}\nEmail: ${ClientEmail}\n\nSERVICES OFFERED:\n${ServiceScope.map((s) => `- ${s}`).join("\n")}\n\nPROJECT TIMELINE:\nThe project will span approximately ${Duration}, beginning upon mutual agreement.\n\nINVESTMENT:\nThe total cost for the outlined services is $${PricingAmount}.\n\nThank you for considering this proposal. We look forward to delivering exceptional results.`;

    case "contract":
      return `SERVICE AGREEMENT\n\nThis Agreement is made between [Your Company] and ${ClientName}. The purpose of this contract is to clearly define the scope, duration, and financial terms of the ${DocTitle} engagement.\n\nCLIENT:\n${ClientName} (${ClientEmail})\n\nSCOPE OF WORK:\n${ServiceScope.map((s) => `• ${s}`).join("\n")}\n\nDURATION:\n${Duration}\n\nPAYMENT TERMS:\nA total investment of $${PricingAmount}, payable in accordance with the agreed schedule.\n\nSigned by both parties to indicate mutual agreement and commitment to the project.`;

    case "nda":
      return `NON-DISCLOSURE AGREEMENT (NDA)\n\nThis NDA is entered into between [Your Company] and ${ClientName} to protect sensitive and confidential information exchanged during the ${DocTitle} project.\n\nPARTIES:\nDisclosing Party: [Your Company]\nReceiving Party: ${ClientName} (${ClientEmail})\n\nCONFIDENTIAL INFORMATION:\nIncludes all materials, data, and communications related to ${ServiceScope.join(", ")} and associated deliverables.\n\nDURATION:\nThe confidentiality obligation shall remain in effect throughout the project (${Duration}) and 2 years thereafter.\n\nBoth parties agree not to disclose, replicate, or misuse any shared information.`;

    case "invoice":
      return `INVOICE\n\nInvoice To: ${ClientName}\nEmail: ${ClientEmail}\n\nDESCRIPTION OF SERVICES:\n${ServiceScope.map((s) => `• ${s}`).join("\n")}\n\nTOTAL DUE: $${PricingAmount}\nDue within 30 days of issuance.\n\nPlease make payments via [Preferred Method]. Thank you for your business.`;

    case "quote":
      return `PROJECT QUOTE\n\nClient: ${ClientName}\nProject: ${DocTitle}\n\nSERVICES QUOTED:\n${ServiceScope.map((s) => `• ${s}: $${(PricingAmount / ServiceScope.length).toFixed(2)}`).join("\n")}\n\nESTIMATED TOTAL: $${PricingAmount}\n\nTIMELINE:\n${Duration}\n\nThis quote is valid for 30 days. To proceed, kindly confirm via email.`;

    default:
      return "Document content will be generated based on your selections.";
  }
}

export default function DocumentPreview() {

  const router = useRouter()

  const handleBack = () => router.back();
  const contentRef = useRef<HTMLTextAreaElement | null>(null);
  const updateDocument = useStore((state) => state.updateDocument);
  const document = useStore((state) => state.document);
  useScrollToTop();

  // 👇 Run only once to manually restore persisted state
  useEffect(() => {
    const raw = localStorage.getItem("zustand-document");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.state?.document) {
          updateDocument(parsed.state.document);
        }
      } catch (err) {
        console.error("Failed to load persisted document:", err);
      }
    }
  }, [updateDocument]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <PreviewHeader onBack={handleBack} contentRef={contentRef}/>
      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
        <div className="w-full lg:w-80">
          <DocumentDetails />
        </div>
        <div className="flex-1">
          <DocumentContent contentRef={contentRef!} />

        </div>
      </div>
          
    </div>
  );
}