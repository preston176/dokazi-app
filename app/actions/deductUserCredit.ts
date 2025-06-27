// app/actions/credits/deductCredit.ts
"use server";

import { db } from "@/src";
import { usersTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

/**
 * Deduct 1 credit from a user in the DB based on their Clerk ID
 */
export async function deductUserCredit(userId: string) {
  try {
    const [user] = await db
      .select({
        clerkId: usersTable.clerkId,
        creditsAvailable: usersTable.creditsAvailable,
        creditsUsed: usersTable.creditsUsed,
      })
      .from(usersTable)
      .where(eq(usersTable.clerkId, userId))
      .limit(1);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    const remaining = user.creditsAvailable ?? 0;
    const used = user.creditsUsed ?? 0;

    if (remaining <= 0) {
      return { success: false, message: "No credits left" };
    }

    // 💡 Perform the subtraction only here (server-side)
    await db
      .update(usersTable)
      .set({
        creditsAvailable: remaining - 1,
        creditsUsed: used + 1,
      })
      .where(eq(usersTable.clerkId, userId));

    return { success: true, message: "Credit deducted" };
  } catch (error) {
    console.error("❌ Error deducting credit:", error);
    return { success: false, message: "Internal server error" };
  }
}
