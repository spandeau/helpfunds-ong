import { strapiClient } from "@/services/strapi";

export type DonationTransactionStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded"
  | "cancelled";

export interface CreatePendingDonationInput {
  paymentIntentId: string;
  amount: number;
  currency: string;
  donorFirstName?: string;
  donorLastName?: string;
  donorEmail?: string;
  anonymous?: boolean;
  message?: string;
  isRecurring?: boolean;
  projectCategory?: string;
}

export interface DonationTransactionRecord {
  id: number;
  documentId: string;
  reference: string;
  paymentStatus: DonationTransactionStatus;
}

export async function createPendingDonationTransaction(
  input: CreatePendingDonationInput
): Promise<DonationTransactionRecord | null> {
  try {
    const record = await strapiClient.create<DonationTransactionRecord>(
      "donation-transactions",
      {
        reference: input.paymentIntentId,
        paymentIntentId: input.paymentIntentId,
        amount: input.amount,
        currency: (input.currency || "EUR").toUpperCase(),
        paymentStatus: "pending",
        paymentMethod: "stripe",
        donorFirstName: input.donorFirstName || "",
        donorLastName: input.donorLastName || "",
        donorEmail: input.donorEmail || "",
        anonymous: input.anonymous ?? false,
        message: input.message || "",
        isRecurring: input.isRecurring ?? false,
        recurringInterval: input.isRecurring ? "monthly" : undefined,
        metadata: {
          projectCategory: input.projectCategory || "general",
          source: "helpfunds-website",
        },
      }
    );

    if (!record) {
      console.warn(
        `[Donations] Echec creation transaction pending pour ${input.paymentIntentId}`
      );
    }

    return record;
  } catch (error) {
    console.warn("[Donations] Erreur creation transaction pending:", error);
    return null;
  }
}

export async function markDonationTransactionStatus(
  paymentIntentId: string,
  status: DonationTransactionStatus
): Promise<DonationTransactionRecord | null> {
  try {
    const existing = await strapiClient.findOneByField<DonationTransactionRecord>(
      "donation-transactions",
      "reference",
      paymentIntentId
    );

    if (!existing) {
      console.warn(
        `[Donations] Aucune transaction trouvee pour ${paymentIntentId} (statut demande: ${status})`
      );
      return null;
    }

    return await strapiClient.update<DonationTransactionRecord>(
      "donation-transactions",
      existing.documentId,
      { paymentStatus: status }
    );
  } catch (error) {
    console.warn(
      `[Donations] Erreur mise a jour statut pour ${paymentIntentId}:`,
      error
    );
    return null;
  }
}