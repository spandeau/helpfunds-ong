import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createPendingDonationTransaction } from "@/lib/donations";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-06-24.dahlia",
});

export async function POST(request: NextRequest) {
  try {
    const {
      amount,
      currency = "eur",
      donorName,
      firstName,
      lastName,
      email,
      project,
      donationType,
      anonymous,
      message,
    } = await request.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      automatic_payment_methods: { enabled: true },
      metadata: {
        donorName: donorName || "Anonyme",
        email: email || "",
        project: project || "general",
        donationType: donationType || "unique",
        source: "helpfunds-website",
      },
      description: `Don Help Funds — ${project || "general"} — ${donationType || "unique"}`,
      receipt_email: email || undefined,
    });

    // Enregistrement en attente dans Strapi — best effort, ne bloque jamais le paiement
    await createPendingDonationTransaction({
      paymentIntentId: paymentIntent.id,
      amount,
      currency,
      donorFirstName: firstName,
      donorLastName: lastName,
      donorEmail: email,
      anonymous,
      message,
      isRecurring: donationType === "mensuel",
      projectCategory: project,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la creation du paiement" },
      { status: 500 }
    );
  }
}