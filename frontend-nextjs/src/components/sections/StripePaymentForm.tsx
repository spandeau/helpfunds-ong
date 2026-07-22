"use client";

import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Lock, Heart, ChevronLeft } from "lucide-react";

interface StripePaymentFormProps {
  amount: number;
  donationType: "unique" | "mensuel";
  onBack: () => void;
  onSuccess: () => void;
}

export default function StripePaymentForm({
  amount,
  donationType,
  onBack,
  onSuccess,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError("");
    setInfo("");

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Erreur de paiement");
      setLoading(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/don/succes`,
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Paiement echoue");
      setLoading(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      onSuccess();
      return;
    }

    if (paymentIntent?.status === "processing") {
      setInfo(
        "Votre paiement est en cours de traitement (cela peut prendre quelques jours pour un virement SEPA). Vous recevrez une confirmation par email des que le don sera valide."
      );
      setLoading(false);
      return;
    }

    setError(
      "Le paiement n'a pas pu etre confirme. Verifiez vos informations ou reessayez."
    );
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-4 flex items-center justify-between">
        <span className="text-primary-700 font-semibold text-sm">
          Montant du don
        </span>
        <span className="text-primary-700 font-black text-xl">
          {amount}€{donationType === "mensuel" ? "/mois" : ""}
        </span>
      </div>

      <PaymentElement
        options={{
          layout: "tabs",
          paymentMethodOrder: ["card", "sepa_debit"],
        }}
      />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {info && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-blue-700 text-sm">{info}</p>
        </div>
      )}

      <div className="flex items-center gap-2 text-xs text-neutral-400 bg-neutral-50 rounded-xl p-3">
        <Lock className="w-4 h-4 text-secondary-500 flex-shrink-0" />
        <span>Paiement 100% securise par Stripe — Chiffrement SSL 256 bits</span>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl border-2 border-neutral-200 text-neutral-600 font-semibold flex items-center justify-center gap-2 hover:bg-neutral-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-secondary-600 hover:bg-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Traitement...
            </>
          ) : (
            <>
              <Heart className="w-5 h-5 fill-white" />
              Confirmer {amount}€
            </>
          )}
        </button>
      </div>
    </form>
  );
}