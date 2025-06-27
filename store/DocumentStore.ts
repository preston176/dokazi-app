// store/DocumentStore.ts
import { create } from "zustand";

type Document = {
  DocTitle: string;
  doctype: string;
  ClientName: string;
  ClientEmail: string;
  ServiceScope: string[];
  PricingAmount: number;
  Currency: string;
  Type: string;
  StartDate: string;
  EndDate: string;
  Duration: string;
  CustomContent?: string;
};

type StoreState = {
  document: Document;
  docId: string | null;
  setDocId: (id: string) => void;
  loadDocument: (id: string) => void;
  updateDocument: (newDocument: Partial<Document>) => void;
};

const initialDocument: Document = {
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
};

let debounceTimer: ReturnType<typeof setTimeout>;

const useStore = create<StoreState>((set, get) => ({
  document: initialDocument,
  docId: null,

  setDocId: (id) => set({ docId: id }),

  loadDocument: (id) => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(`doc-${id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        set({ document: parsed, docId: id });
      } catch (e) {
        console.error("Failed to parse local storage:", e);
        set({ document: initialDocument, docId: id });
      }
    } else {
      set({ document: initialDocument, docId: id });
    }
  },

  updateDocument: (newDocument) => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const { document, docId } = get();
      if (!docId) return;

      const updated = { ...document, ...newDocument };
      set({ document: updated });

      if (typeof window !== "undefined") {
        localStorage.setItem(`doc-${docId}`, JSON.stringify(updated));
      }
    }, 400);
  },
}));

export default useStore;
