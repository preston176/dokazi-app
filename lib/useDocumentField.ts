import { ChangeEvent, useEffect, useState } from "react";

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

type StoreShape = {
  document: Document;
  updateDocument: (partial: Partial<Document>) => void;
};

/**
 * Reusable document field hook for any Zustand store (draft or edit mode)
 */
export function useDocumentField<K extends keyof Document>(
  key: K,
  useStore: (selector: (state: StoreShape) => any) => any
) {
  const storeValue = useStore((state) => state.document[key]);
  const updateDocument = useStore((state) => state.updateDocument);

  const [localValue, setLocalValue] = useState(storeValue);

  // Keep local state in sync when external document updates (e.g., loadDocument)
  useEffect(() => {
    setLocalValue(storeValue);
  }, [storeValue]);

  // Debounced sync from local state to store
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localValue !== storeValue) {
        updateDocument({ [key]: localValue } as Partial<Document>);
      }
    }, 300); // ⏱️ Debounce timing

    return () => clearTimeout(timeout);
  }, [localValue]);

  // Handle input change (string or number)
  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const raw = e.target.value;
    const parsed = typeof storeValue === "number" ? Number(raw) : raw;
    setLocalValue(parsed as typeof storeValue);
  }

  return { value: localValue, onChange };
}
