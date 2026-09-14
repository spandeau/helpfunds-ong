export type PaymentProvider = "stripe" | "paydunya";

export type VerifiedPaymentStatus = "pending" | "completed" | "failed" | "cancelled";

export interface CreatePaymentInput {
  amount: number;
  currency: string;
  donorFirstName?: string;
  donorLastName?: string;
  donorEmail?: string;
  donorPhone?: string;
  message?: string;
  isRecurring?: boolean;
  projectCategory?: string;
  campaignSlug?: string;
  returnUrl: string;
  cancelUrl?: string;
  callbackUrl: string;
  customData?: Record<string, string>;
}

export interface CreatePaymentResult {
  transactionReference: string;
  redirectUrl?: string;
  clientSecret?: string;
}

export interface VerifyPaymentResult {
  transactionReference: string;
  status: VerifiedPaymentStatus;
  raw?: unknown;
}

export interface RefundResult {
  supported: boolean;
  message: string;
}

export interface PaymentService {
  createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult>;
  verifyPayment(transactionReference: string): Promise<VerifyPaymentResult>;
  handleWebhook(rawBody: string): Promise<VerifyPaymentResult>;
  refundPayment(transactionReference: string): Promise<RefundResult>;
}