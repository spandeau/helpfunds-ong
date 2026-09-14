import { NextRequest, NextResponse } from "next/server";
import { createPendingDonationTransaction } from "@/lib/donations";
import { PayDunyaService } from "@/lib/payments/PayDunyaService";
import { strapiClient } from "@/services/strapi";

export async function POST(request: NextRequest) {
  try {
    const {
      amount,
      currency = "XOF",
      firstName,
      lastName,
      email,
      phone,
      project,
      donationType,
      anonymous,
      message,
      campaignSlug,
    } = await request.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
    }

    let campaignId: string | undefined;
    if (campaignSlug) {
      try {
        const campaign = await strapiClient.findOneByField<{ documentId: string }>(
          "donation-campaigns",
          "slug",
          campaignSlug
        );
        if (campaign) campaignId = campaign.documentId;
      } catch (error) {
        console.warn("[create-paydunya-payment] Cagnotte introuvable pour slug", campaignSlug, error);
      }
    }

    // En local (npm run dev), on utilise toujours l'origine reelle de la requete
    // (localhost:3000), meme si NEXT_PUBLIC_SITE_URL pointe deja vers Vercel pour la prod.
    const siteUrl =
      process.env.NODE_ENV === "development"
        ? request.nextUrl.origin
        : process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;

    const payment = await PayDunyaService.createPayment({
      amount,
      currency,
      donorFirstName: firstName,
      donorLastName: lastName,
      donorEmail: email,
      donorPhone: phone,
      message,
      isRecurring: donationType === "mensuel",
      projectCategory: project,
      campaignSlug,
      returnUrl: `${siteUrl}/don/succes?provider=paydunya`,
      callbackUrl: `${siteUrl}/api/webhooks/paydunya`,
    });

    await createPendingDonationTransaction({
      paymentIntentId: payment.transactionReference,
      provider: "paydunya",
      amount,
      currency,
      donorFirstName: firstName,
      donorLastName: lastName,
      donorEmail: email,
      anonymous,
      message,
      isRecurring: donationType === "mensuel",
      projectCategory: project,
      campaignId,
    });

    return NextResponse.json({
      redirectUrl: payment.redirectUrl,
      transactionReference: payment.transactionReference,
    });
  } catch (error) {
    console.error("[create-paydunya-payment] Erreur:", error);
    return NextResponse.json(
      { error: "Erreur lors de la creation du paiement" },
      { status: 500 }
    );
  }
}