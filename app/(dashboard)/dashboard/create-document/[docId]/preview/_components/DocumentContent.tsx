"use client";

import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEditDocStore } from "@/store/EditDocumentStore";
import useStore from "@/store/DocumentStore";
import { useDocumentField } from "@/lib/useDocumentField";
import { mapDocumentToPreviewData, generateDocumentContent } from "../page";

type Props = {
  data: ReturnType<typeof mapDocumentToPreviewData>;
  onReset: () => void;
  refForPdf: React.RefObject<HTMLDivElement>;
  isEdit?: boolean;
};

export default function DocumentContent({
  data,
  onReset,
  refForPdf,
  isEdit,
}: Props) {
  // Select correct Zustand store
  const useCorrectStore = isEdit ? useEditDocStore : useStore;

  // Use document field hook for CustomContent
  const { value, onChange } = useDocumentField("CustomContent", useCorrectStore);

  // Get full document from Zustand
  const store = useCorrectStore();
  const document = store.document;
  const updateDocument = store.updateDocument;

  const defaultContent = generateDocumentContent(data);

  // When component mounts, populate default content if missing
  useEffect(() => {
    const needsDefault =

      document.CustomContent!.trim() === "" ||
      document.CustomContent!.trim() === "Preview not available for this document type.";

    if (needsDefault) {
      updateDocument({ CustomContent: defaultContent });
    }
  }, [ defaultContent, updateDocument]);

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
  onChange={onChange}
  className="w-full md:h-[1100px] min-h-[400px] resize-none bg-transparent outline-none text-sm sm:text-base leading-relaxed whitespace-pre-wrap text-wrap font-sans"
  style={{
    fontFamily: "inherit",
    lineHeight: "1.75",
    fontVariant: "normal",
    fontWeight: 400,
  }}
/>
        </div>
      </CardContent>
    </Card>
  );
}
