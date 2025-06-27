"use server";

import { db } from "@/src";
import { documentsTable } from "@/src/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function getAllUserDocuments() {
  const user = await currentUser();

  if (!user) return "No user logged in";

  try {
    const docs = await db
      .select()
      .from(documentsTable)
      .where(eq(documentsTable.clerkId, user.id));

    return { success: true, data: docs };
  } catch (error) {
    console.error("Error fetching documents:", error);
    return { success: false, error: "Failed to fetch documents" };
  }
}
