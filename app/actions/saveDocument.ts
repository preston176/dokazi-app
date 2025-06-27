"use server";

import { db } from "@/src";
import { documentsTable } from "@/src/db/schema";
import { currentUser } from "@clerk/nextjs/server";

type DocumentPayload = {
  docId: string; 
  DocTitle: string;
  doctype: string;
  Type: string;
  ClientName: string;
  ClientEmail: string;
  Currency: string;
  PricingAmount: number;
  ServiceScope: string[];
  CustomContent?: string;
  StartDate: string;
  EndDate: string;
  Duration: string;
};

export async function saveDocument(document: DocumentPayload) {
  const user = await currentUser();

  if (!user) return { success: false, error: "No user logged in" };

  try {
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
    } = document;

    const inserted = await db
      .insert(documentsTable)
      .values({
        docId,
        clerkId: user.id,
        docTitle: DocTitle,
        doctype,
        type: Type,
        clientName: ClientName,
        clientEmail: ClientEmail,
        currency: Currency,
        pricingAmount: PricingAmount,
        serviceScope: JSON.stringify(ServiceScope),
        customContent: CustomContent || "",
        startDate: StartDate,
        endDate: EndDate,
        duration: Duration,
      })
      .returning();

    return { success: true, data: inserted[0] };
  } catch (error) {
    console.error("Failed to insert document:", error);
    return { success: false, error: "DB insert failed" };
  }
}
