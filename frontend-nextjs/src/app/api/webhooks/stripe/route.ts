import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { markDonationTransactionStatus } from "@/lib/donations";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");
  const rawBody = await request.text();

  if (!signature) {
    return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("[Stripe Webhook] Signature invalide:", error);
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await markDonationTransactionStatus(paymentIntent.id, "completed");
        console.log(`[Stripe Webhook] Don confirme: ${paymentIntent.id}`);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await markDonationTransactionStatus(paymentIntent.id, "failed");
        console.log(`[Stripe Webhook] Don echoue: ${paymentIntent.id}`);
        break;
      }

      case "payment_intent.canceled": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        await markDonationTransactionStatus(paymentIntent.id, "cancelled");
        console.log(`[Stripe Webhook] Don annule: ${paymentIntent.id}`);
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[Stripe Webhook] Erreur traitement evenement:", error);
    return NextResponse.json({ received: true });
  }
}