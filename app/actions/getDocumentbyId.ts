"use server";

import { db } from "@/src";
import { documentsTable } from "@/src/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

export async function getDocumentbyId(docId: string) {
  const user = await currentUser();

  if (!user?.id) return null;

  const result = await db
    .select()
    .from(documentsTable)
    .where(
      and(eq(documentsTable.docId, docId), eq(documentsTable.clerkId, user.id!))
    )
    .limit(1);

  return result[0] ?? null;
}
