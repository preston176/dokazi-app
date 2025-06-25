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

const useStore = create<StoreState>((set) => ({
  document: initialDocument,
  updateDocument: (newDocument: Partial<Document>) =>
    set((state) => ({
      document: { ...state.document, ...newDocument },
    })),
}));

export default useStore;
