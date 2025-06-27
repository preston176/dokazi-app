"use server";

import { db } from "@/src";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function getUserDetails() {
  const user = await currentUser();
  if (!user?.id) return null;

  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, user.id))
    .limit(1);

  return result[0] ?? null;
}
