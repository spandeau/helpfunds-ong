import { NextRequest, NextResponse } from "next/server";
import { markDonationTransactionStatus } from "@/lib/donations";
import { PayDunyaService } from "@/lib/payments/PayDunyaService";

export async function GET(request: NextRequest) {
  const reference = request.nextUrl.searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Reference manquante" }, { status: 400 });
  }

  try {
    const result = await PayDunyaService.verifyPayment(reference);
    await markDonationTransactionStatus(result.transactionReference, result.status);
    return NextResponse.json({ status: result.status });
  } catch (error) {
    console.error("[verify-paydunya-payment] Erreur:", error);
    return NextResponse.json({ error: "Impossible de verifier le paiement" }, { status: 500 });
  }
}