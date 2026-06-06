const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface NewsletterSubscribeResult {
  success: boolean;
  message: string;
  alreadySubscribed?: boolean;
}

export async function subscribeToNewsletter(
  email: string,
  source: string = "footer",
  firstName?: string,
  lastName?: string
): Promise<NewsletterSubscribeResult> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/newsletter-subscribers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          email,
          firstName: firstName || "",
          lastName: lastName || "",
          source,
          active: true,
          subscribedAt: new Date().toISOString(),
        },
      }),
    });

    if (response.status === 400) {
      const error = await response.json();
      if (error?.error?.message?.includes("unique")) {
        return {
          success: true,
          message: "Vous etes deja abonne a notre newsletter.",
          alreadySubscribed: true,
        };
      }
    }

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}`);
    }

    return {
      success: true,
      message: "Merci ! Vous etes maintenant abonne a notre newsletter.",
    };
  } catch (error) {
    console.error("[Newsletter] Erreur abonnement:", error);
    return {
      success: false,
      message: "Une erreur est survenue. Veuillez reessayer.",
    };
  }
}