"use server";

import { db } from "@/src";
import { documentsTable } from "@/src/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

type UpdateDocumentPayload = {
  docId: string;
  DocTitle?: string;
  doctype?: string;
  Type?: string;
  ClientName?: string;
  ClientEmail?: string;
  Currency?: string;
  PricingAmount?: number;
  ServiceScope?: string[];
  CustomContent?: string;
  StartDate?: string;
  EndDate?: string;
  Duration?: string;
};

export async function updateDocumentInDB(payload: UpdateDocumentPayload) {
  const user = await currentUser();

  if (!user) return "No user logged in";

  const {
    docId,

    DocTitle,
    doctype,
    Type,
    ClientName,
    ClientEmail,
    Currency,
    PricingAmount,
    ServiceScope,
    CustomContent,
    StartDate,
    EndDate,
    Duration,
  } = payload;

  try {
    const updated = await db
      .update(documentsTable)
      .set({
        docTitle: DocTitle,
        doctype,
        docId,
        type: Type,
        clientName: ClientName,
        clientEmail: ClientEmail,
        currency: Currency,
        pricingAmount: PricingAmount,
        serviceScope: ServiceScope ? JSON.stringify(ServiceScope) : undefined,
        customContent: CustomContent,
        startDate: StartDate,
        endDate: EndDate,
        duration: Duration,
      })
      .where(
        and(
          eq(documentsTable.docId, docId),
          eq(documentsTable.clerkId, user.id)
        )
      )
      .returning();

    return { success: true, data: updated[0] };
  } catch (error) {
    console.error("Failed to update document:", error);
    return { success: false, error: "DB update failed" };
  }
}
