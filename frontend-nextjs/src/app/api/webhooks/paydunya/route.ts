import { NextRequest, NextResponse } from "next/server";
import { markDonationTransactionStatus } from "@/lib/donations";
import { PayDunyaService } from "@/lib/payments/PayDunyaService";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const rawBody = await request.text();

  try {
    const result = await PayDunyaService.handleWebhook(rawBody);
    await markDonationTransactionStatus(result.transactionReference, result.status);
    console.log(`[PayDunya Webhook] Don ${result.status}: ${result.transactionReference}`);
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[PayDunya Webhook] Erreur:", error);
    return NextResponse.json({ received: true });
  }
}