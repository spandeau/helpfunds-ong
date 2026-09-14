"use client";

import { useState, FormEvent } from "react";
import { sendPartnershipRequest, type PartnershipFormData } from "@/lib/partnership";

const initialState: PartnershipFormData = {
  organizationName: "",
  contactName: "",
  email: "",
  phone: "",
  website: "",
  message: "",
};

export default function PartnershipForm() {
  const [formData, setFormData] = useState<PartnershipFormData>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formData.organizationName || !formData.contactName || !formData.email || !formData.message) {
      setStatus("error");
      setFeedback("Merci de remplir tous les champs obligatoires.");
      return;
    }

    setStatus("loading");
    setFeedback("");

    const result = await sendPartnershipRequest(formData);

    if (result.success) {
      setStatus("success");
      setFeedback(result.message);
      setFormData(initialState);
    } else {
      setStatus("error");
      setFeedback(result.message);
    }
  }

  if (status === "success") {
    return (
      <div className="bg-primary-50 border border-primary-100 rounded-2xl p-8 text-center">
        <h3 className="font-heading font-bold text-neutral-900 text-xl mb-2">Demande envoyee !</h3>
        <p className="text-neutral-600">{feedback}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-100 p-6 sm:p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="organizationName" className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Organisation *
          </label>
          <input
            id="organizationName"
            name="organizationName"
            type="text"
            required
            value={formData.organizationName}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="contactName" className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Nom du contact *
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            required
            value={formData.contactName}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Telephone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="website" className="block text-sm font-semibold text-neutral-700 mb-1.5">
            Site web
          </label>
          <input
            id="website"
            name="website"
            type="url"
            placeholder="https://"
            value={formData.website}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-1.5">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">{feedback}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-6 py-3 transition-colors"
      >
        {status === "loading" ? "Envoi en cours..." : "Envoyer la demande"}
      </button>
    </form>
  );
}