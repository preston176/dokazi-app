export const deleteLocalDraft = (docId: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(`doc-${docId}`);
  }
};
