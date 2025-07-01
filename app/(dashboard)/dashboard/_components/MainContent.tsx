"use client";

import { useEffect, useState } from "react";
import { getAllUserDocuments } from "@/app/actions/getAllUserDocuments";
import { deleteDocument } from "@/app/actions/deleteDocument";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, EyeIcon, FileText, Plus, TrashIcon } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { DocumentCardSkeleton } from "./DocumentCardSkeleton";
import { toast } from "sonner"; 

type Document = {
  docId: string;
  docTitle: string | null;
  doctype: string | null;
  clientName: string | null;
  pricingAmount: number | null;
  duration: string | null;
  createdAt: string;
};

function getLocalDrafts(): Document[] {
  const keys = Object.keys(localStorage).filter((key) => key.startsWith("doc-"));

  return keys
    .map((key) => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;

        const parsed = JSON.parse(raw);
        return {
          docId: key.replace("doc-", ""),
          docTitle: parsed.DocTitle || "Untitled",
          doctype: "draft",
          clientName: parsed.ClientName || "—",
          pricingAmount: parsed.PricingAmount || 0,
          duration: parsed.Duration || "—",
          createdAt: new Date().toISOString(),
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean) as Document[];
}

function DocumentCard({
  doc,
  onDelete,
}: {
  doc: Document;
  onDelete: (docId: string, isDraft: boolean) => void;
}) {
  const isDraft = doc.doctype === "draft";

  return (
    <div className="border rounded-lg p-4 shadow-sm space-y-2 max-w-sm w-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-md font-semibold text-gray-900 dark:text-white">
            {doc.docTitle || "Untitled"}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {doc.clientName} • {doc.doctype?.toUpperCase()}
          </p>
        </div>
        {isDraft && (
          <Badge variant="outline" className="text-xs">
            Draft
          </Badge>
        )}
      </div>

      <div className="text-sm text-gray-700 dark:text-gray-300 mt-2 space-y-1">
        <p>
          <strong>Value:</strong> ${doc.pricingAmount}
        </p>
        <p>
          <strong>Timeline:</strong> {doc.duration || "—"}
        </p>
        <p>
          <strong>Created:</strong> {format(new Date(doc.createdAt), "PPP")}
        </p>
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          href={
            isDraft
              ? `/dashboard/create-document/${doc.docId}`
              : `/document/view/${doc.docId}`
          }
          className="flex-1"
        >
          <Button variant="default" className="w-full bg-emerald-700 dark:text-white">
            <EyeIcon className="w-4 h-4 mr-2" />
            {isDraft ? "Resume" : "View"}
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
          onClick={() => onDelete(doc.docId, isDraft)}
        >
          <TrashIcon className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}

export default function MainContent() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [drafts, setDrafts] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDocs() {
      setLoading(true);
      const docs = await getAllUserDocuments();

      if (typeof docs === "string") {
        setDocuments([]);
      } else if (docs?.success && Array.isArray(docs.data)) {
        setDocuments(
          docs.data.map((d) => ({
            docId: d.docId,
            docTitle: d.docTitle,
            doctype: d.doctype,
            clientName: d.clientName,
            pricingAmount: d.pricingAmount,
            duration: d.duration,
            createdAt:
              typeof d.createdAt === "string"
                ? d.createdAt
                : d.createdAt
                ? new Date(d.createdAt).toISOString()
                : new Date().toISOString(),
          }))
        );
      }

      setDrafts(getLocalDrafts());
      setLoading(false);
    }

    fetchDocs();
  }, []);

  const handleDelete = async (docId: string, isDraft: boolean) => {
    const confirmDelete = window.confirm(
      isDraft
        ? "Are you sure you want to delete this draft?"
        : "Are you sure you want to delete this document?"
    );
    if (!confirmDelete) return;

    try {
      if (isDraft) {
        localStorage.removeItem(`doc-${docId}`);
        setDrafts((prev) => prev.filter((d) => d.docId !== docId));
        toast.success("Draft deleted");
      } else {
        await deleteDocument(docId);
        setDocuments((prev) => prev.filter((d) => d.docId !== docId));
        toast.success("Document deleted");
      }
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Something went wrong.");
    }
  };

  const hasDocuments = documents.length > 0;
  const hasDrafts = drafts.length > 0;

  return (
    <div className="flex-1 p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 lg:mb-8 gap-4">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Documents
          </h2>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
            Create and manage your proposals, contracts, and NDAs
          </p>
        </div>
        <Link href={"/dashboard/create-document"}>
          <Button className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black gap-2 w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            <span className="sm:hidden">Create Document</span>
            <span className="hidden sm:inline">Create Document</span>
          </Button>
        </Link>
      </div>

      {/* Loading or List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DocumentCardSkeleton />
          <DocumentCardSkeleton />
          <DocumentCardSkeleton />
        </div>
      ) : (
        <>
          {/* Drafts */}
          {hasDrafts && (
            <>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 mt-4">
                Drafts
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {drafts.map((draft) => (
                  <DocumentCard key={draft.docId} doc={draft} onDelete={handleDelete} />
                ))}
              </div>
            </>
          )}

          {/* Documents */}
          {hasDocuments ? (
            <>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Published Documents
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                  <DocumentCard key={doc.docId} doc={doc} onDelete={handleDelete} />
                ))}
              </div>
            </>
          ) : !hasDrafts ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No documents yet
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md px-4">
                Create your first proposal, contract, or NDA to get started
              </p>
              <Link href="/dashboard/create-document">
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Create Your First Document
                </Button>
              </Link>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
