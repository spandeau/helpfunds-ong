import crypto from "crypto";
import type {
  PaymentService,
  CreatePaymentInput,
  CreatePaymentResult,
  VerifyPaymentResult,
  VerifiedPaymentStatus,
  RefundResult,
} from "./PaymentService";

const isLive = process.env.PAYDUNYA_MODE === "live";

const BASE_URL = isLive
  ? "https://app.paydunya.com/api/v1"
  : "https://app.paydunya.com/sandbox-api/v1";

function authHeaders() {
  return {
    "Content-Type": "application/json",
    "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY!,
    "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY!,
    "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN!,
  };
}

function mapStatus(status: string): VerifiedPaymentStatus {
  if (status === "completed" || status === "failed" || status === "cancelled") {
    return status;
  }
  return "pending";
}

// PayDunya renvoie un hash SHA-512 de votre Master Key avec chaque reponse de verification/IPN,
// pour prouver que la donnee vient bien de leurs serveurs.
function verifyHash(receivedHash: string): boolean {
  const expected = crypto
    .createHash("sha512")
    .update(process.env.PAYDUNYA_MASTER_KEY!)
    .digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(receivedHash || "");
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export const PayDunyaService: PaymentService = {
  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    // ATTENTION devise : PayDunya facture en FCFA (XOF). Ce point n'est pas encore resolu,
    // voir la note juste apres le code.
    const body = {
      invoice: {
        total_amount: Math.round(input.amount),
        description: `Don Help Funds — ${input.projectCategory || "general"}${
          input.isRecurring ? " (mensuel)" : ""
        }`,
        customer: {
          name: [input.donorFirstName, input.donorLastName].filter(Boolean).join(" ") || "Anonyme",
          email: input.donorEmail || "",
          phone: input.donorPhone || "",
        },
      },
      store: { name: "Help Funds" },
      custom_data: input.customData || {},
      actions: {
        cancel_url: input.cancelUrl || input.returnUrl,
        return_url: input.returnUrl,
        callback_url: input.callbackUrl,
      },
    };

    const response = await fetch(`${BASE_URL}/checkout-invoice/create`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.response_code !== "00") {
      throw new Error(`[PayDunya] Echec creation invoice: ${data.response_text}`);
    }

    return {
      transactionReference: data.token,
      redirectUrl: data.response_text,
    };
  },

  async verifyPayment(transactionReference: string): Promise<VerifyPaymentResult> {
    const response = await fetch(
      `${BASE_URL}/checkout-invoice/confirm/${transactionReference}`,
      { headers: authHeaders() }
    );

    const data = await response.json();

    if (data.response_code !== "00") {
      throw new Error(`[PayDunya] Echec verification: ${data.response_text}`);
    }
    if (!verifyHash(data.hash)) {
      throw new Error("[PayDunya] Hash invalide sur verifyPayment, reponse rejetee");
    }

    return {
      transactionReference: data.invoice?.token || transactionReference,
      status: mapStatus(data.status),
      raw: data,
    };
  },

  async handleWebhook(rawBody: string): Promise<VerifyPaymentResult> {
    // PayDunya poste l'IPN en application/x-www-form-urlencoded avec des cles imbriquees
    // (data[status], data[invoice][token]...) - qs.parse gere cette notation, contrairement
    // a URLSearchParams qui reste a plat.
    const qs = await import("qs");
    const parsed = qs.parse(rawBody) as any;
    const payload = parsed.data;

    if (!payload) {
      throw new Error("[PayDunya] IPN: structure inattendue (noeud data absent)");
    }
    if (!verifyHash(payload.hash)) {
      throw new Error("[PayDunya] IPN: hash invalide, notification rejetee");
    }

    return {
      transactionReference: payload.invoice?.token,
      status: mapStatus(payload.status),
      raw: payload,
    };
  },

  async refundPayment(_transactionReference: string): Promise<RefundResult> {
    return {
      supported: false,
      message:
        "PayDunya n'expose pas d'API de remboursement publique. A traiter manuellement aupres de leur support.",
    };
  },
};