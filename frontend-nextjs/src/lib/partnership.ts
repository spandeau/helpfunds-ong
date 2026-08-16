const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export interface PartnershipFormData {
  organizationName: string;
  contactName: string;
  email: string;
  phone?: string;
  website?: string;
  message: string;
}

export async function sendPartnershipRequest(data: PartnershipFormData): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/partnership-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`Erreur ${response.status}`);
    }

    return { success: true, message: "Demande envoyee avec succes !" };
  } catch (error) {
    console.error("[Partnership] Erreur envoi demande:", error);
    return { success: false, message: "Erreur lors de l envoi. Veuillez reessayer." };
  }
}