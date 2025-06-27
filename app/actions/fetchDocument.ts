"use server";

import { db } from "@/src";
import { documentsTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function fetchDocumentById(docId: string) {
  try {
    const result = await db
      .select()
      .from(documentsTable)
      .where(eq(documentsTable.docId, docId))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error("Failed to fetch document:", error);
    return null;
  }
}
