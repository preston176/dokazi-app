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
  updateDocument: (partial: Partial<Document>) => void;
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

// Debounced background saving state
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let queuedUpdate: Document | null = null;

const useStore = create<StoreState>((set, get) => ({
  document: initialDocument,
  docId: null,

  setDocId: (id) => set({ docId: id }),

  loadDocument: (id) => {
    if (typeof window === "undefined") return;

    try {
      const saved = localStorage.getItem(`doc-${id}`);
      if (saved) {
        set({ document: JSON.parse(saved), docId: id });
        return;
      }
    } catch (e) {
      console.error("Failed to parse saved doc:", e);
    }

    // fallback
    set({ document: initialDocument, docId: id });
  },

  updateDocument: (partial) => {
    const { document, docId } = get();
    if (!docId) return;

    // ✅ Immediate UI update
    const updatedDoc = { ...document, ...partial };
    set({ document: updatedDoc });

    // 🧠 Queue for background saving
    queuedUpdate = updatedDoc;

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
    }, 500); // Can be 300ms–1000ms
  },
}));


export default useStore