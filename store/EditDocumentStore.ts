"use client";

import { create } from "zustand";
import { getDocumentbyId } from "@/app/actions/getDocumentbyId";

type Document = {
  docId: string;
  DocTitle: string;
  doctype: string;
  Type: string;
  ClientName: string;
  ClientEmail: string;
  ServiceScope: string[];
  PricingAmount: number;
  Currency: string;
  StartDate: string;
  EndDate: string;
  Duration: string;
  CustomContent?: string;
  isDraft?:boolean;
};

type StoreState = {
  document: Document;
  docId: string | null;
  setDocId: (id: string) => void;
  loadDocument: (id: string) => Promise<void>;
  updateDocument: (partial: Partial<Document>) => Document | undefined;
};

const initialDocument: Document = {
  docId: "",
  DocTitle: "",
  doctype: "",
  Type: "",
  ClientName: "",
  ClientEmail: "",
  ServiceScope: [""],
  PricingAmount: 0,
  Currency: "",
  StartDate: "",
  EndDate: "",
  Duration: "",
  CustomContent: "",
};

// 🧠 Debounced background saving state
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let queuedUpdate: Document | null = null;

function transformFromDB(dbDoc: any): Document {
  return {
    docId: dbDoc.docId,
    DocTitle: dbDoc.docTitle ?? "",
    doctype: dbDoc.doctype ?? "",
    Type: dbDoc.type ?? "",
    ClientName: dbDoc.clientName ?? "",
    ClientEmail: dbDoc.clientEmail ?? "",
    ServiceScope: dbDoc.serviceScope?.split(",") ?? [],
    PricingAmount: dbDoc.pricingAmount ?? 0,
    Currency: dbDoc.currency ?? "",
    StartDate: dbDoc.startDate ?? "",
    EndDate: dbDoc.endDate ?? "",
    Duration: dbDoc.duration ?? "",
    CustomContent: dbDoc.customContent ?? "",
    isDraft: true,
  };
}

export const useEditDocStore = create<StoreState>((set, get) => ({
  document: initialDocument,
  docId: null,

  setDocId: (id) => set({ docId: id }),

  loadDocument: async (id: string) => {
    if (typeof window === "undefined") return;

    const local = localStorage.getItem(`doc-${id}`);
    if (local) {
      try {
        const parsed = JSON.parse(local);
        set({ document: parsed, docId: id });
        return;
      } catch (e) {
        console.error("Failed to parse local document:", e);
      }
    }

    try {
      const dbDoc = await getDocumentbyId(id);
      if (dbDoc) {
        const transformed = transformFromDB(dbDoc);
        set({ document: transformed, docId: id });

        // Cache to localStorage
        localStorage.setItem(`doc-${id}`, JSON.stringify(transformed));
      }
    } catch (err) {
      console.error("Failed to load document from DB", err);
    }
  },

  updateDocument: (partial) => {
    const { document, docId } = get();
    if (!docId) return;

    const updated = { ...document, ...partial };
    set({ document: updated });
    queuedUpdate = updated;

    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (typeof window !== "undefined" && queuedUpdate && docId) {
        try {
          localStorage.setItem(`doc-${docId}`, JSON.stringify(queuedUpdate));
        } catch (e) {
          console.error("Failed to save to localStorage", e);
        }
        queuedUpdate = null;
      }
    }, 500);

    return updated;
  },
}));
