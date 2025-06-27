// app/actions/createOrGetUser.ts
"use server";

import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/src";
import { usersTable } from "@/src/db/schema";

export async function createOrGetUser() {
  const user = await currentUser();
  if (!user) {
    throw new Error("No authenticated user");
  }

  const { id: clerkId, emailAddresses, firstName, lastName } = user;

  const email = emailAddresses[0]?.emailAddress ?? "";
  const name = `${firstName ?? ""} ${lastName ?? ""}`.trim();

  if (!email || !clerkId) {
    throw new Error("Missing required user fields");
  }

  const existing = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkId, clerkId))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(usersTable).values({
      clerkId,
      email,
      name,
    });
  }

  return { success: true };
}
