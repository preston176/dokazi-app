"use server";

import { db } from "@/src";
import { documentsTable } from "@/src/db/schema";
import { and, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function deleteDocument(docId: string) {
  const user = await currentUser();
  if (!user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  // Delete from DB if exists
  const deleted = await db
    .delete(documentsTable)
    .where(
      and(eq(documentsTable.docId, docId), eq(documentsTable.clerkId, user.id))
    );

  return {
    success: true,
    deletedRows: deleted.rowCount ?? 0,
  };
}
