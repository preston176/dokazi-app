import { ChangeEvent, useEffect, useState } from "react";
import useStore from "@/store/DocumentStore";

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

export function useDocumentField<K extends keyof Document>(key: K) {
  const storeValue = useStore((state) => state.document[key]);
  const updateDocument = useStore((state) => state.updateDocument);

  const [localValue, setLocalValue] = useState(storeValue);

  // Sync local with global if external change happens
  useEffect(() => {
    setLocalValue(storeValue);
  }, [storeValue]);

  //  Debounce global update
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (localValue !== storeValue) {
        updateDocument({ [key]: localValue } as Partial<Document>);
      }
    }, 300); // ⏱️ adjust as needed

    return () => clearTimeout(timeout);
  }, [localValue]);

  function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const raw = e.target.value;
    const parsed = typeof storeValue === "number" ? Number(raw) : raw;
    setLocalValue(parsed as typeof storeValue); // instant UI
  }

  return { value: localValue, onChange };
}
