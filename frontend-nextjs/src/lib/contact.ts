const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  reason: string;
  message: string;
}

export async function sendContactMessage(data: ContactFormData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/contact-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}`);
    }

    return { success: true, message: "Message envoye avec succes !" };
  } catch (error) {
    console.error("[Contact] Erreur envoi message:", error);
    return { success: false, message: "Erreur lors de l envoi. Veuillez reessayer." };
  }
}