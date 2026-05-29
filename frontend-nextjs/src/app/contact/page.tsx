"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, Send, Check, MessageSquare, Heart } from "lucide-react";

const CONTACT_REASONS = [
  "Faire un don",
  "Devenir benevole",
  "Proposer un partenariat",
  "Demander des informations",
  "Signaler un probleme",
  "Autre",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", reason: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
              <MessageSquare className="w-4 h-4" />
              Nous sommes a votre ecoute
            </div>
            <h1 className="font-heading font-bold text-white mb-4">
              Contactez <span className="text-secondary-400">Help Funds</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Une question, un projet de partenariat, une envie de nous rejoindre ? Notre equipe repond sous 24h.
            </p>
          </div>
        </section>

        <section className="py-16 bg-neutral-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

              <div className="lg:col-span-1 space-y-5">
                <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                  <h2 className="font-heading font-bold text-neutral-900 text-lg mb-5">Nos coordonnees</h2>
                  <div className="space-y-4">
                    {[
                      { icon: Mail, label: "Email", value: "contact@helpfunds.org", href: "mailto:contact@helpfunds.org" },
                      { icon: Phone, label: "Telephone", value: "+33 1 23 45 67 89", href: "tel:+33123456789" },
                      { icon: MapPin, label: "Adresse", value: "15 Rue de la Solidarite, 75001 Paris", href: null },
                      { icon: Clock, label: "Horaires", value: "Lun - Ven : 9h - 18h", href: null },
                    ].map(({ icon: Icon, label, value, href }) => (
                      <div key={label} className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-xs text-neutral-400 font-medium mb-0.5">{label}</p>
                          {href ? (
                            <a href={href} className="text-sm font-semibold text-neutral-900 hover:text-primary-600 transition-colors">{value}</a>
                          ) : (
                            <p className="text-sm font-semibold text-neutral-900">{value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                  <h2 className="font-heading font-bold text-neutral-900 text-lg mb-4">Suivez-nous</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { name: "Facebook", letter: "f", color: "hover:bg-blue-600" },
                      { name: "Instagram", letter: "ig", color: "hover:bg-pink-600" },
                      { name: "Twitter", letter: "x", color: "hover:bg-neutral-800" },
                      { name: "YouTube", letter: "yt", color: "hover:bg-red-600" },
                      { name: "LinkedIn", letter: "in", color: "hover:bg-blue-700" },
                      { name: "Snapchat", letter: "sc", color: "hover:bg-yellow-400" },
                    ].map((social) => (
                      <a key={social.name} href="#" className={"h-10 bg-neutral-100 " + social.color + " hover:text-white rounded-xl flex items-center justify-center text-xs font-bold text-neutral-600 transition-all"}>
                        {social.letter}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-2xl p-6 text-white">
                  <Heart className="w-8 h-8 text-secondary-400 fill-secondary-400 mb-3" />
                  <h3 className="font-heading font-bold text-lg mb-2">Faire un don</h3>
                  <p className="text-white/70 text-sm mb-4">Chaque contribution compte et change des vies sur le terrain.</p>
                  <a href="/don" className="flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-500 text-white font-bold py-3 rounded-xl transition-all">
                    <Heart className="w-4 h-4 fill-white" />
                    Faire un don maintenant
                  </a>
                </div>
              </div>

              <div className="lg:col-span-2">
                {submitted ? (
                  <div className="bg-white rounded-2xl p-10 border border-neutral-100 shadow-sm text-center">
                    <div className="w-20 h-20 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <Check className="w-10 h-10 text-secondary-600" />
                    </div>
                    <h3 className="font-heading font-bold text-2xl text-neutral-900 mb-3">Message envoye !</h3>
                    <p className="text-neutral-500 mb-6 max-w-md mx-auto">Merci pour votre message. Notre equipe vous repondra dans les 24 heures.</p>
                    <button onClick={() => { setSubmitted(false); setFormData({ firstName: "", lastName: "", email: "", phone: "", reason: "", message: "" }); }} className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl transition-all">
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm">
                    <h2 className="font-heading font-bold text-neutral-900 text-xl mb-6">Envoyez-nous un message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Prenom</label>
                          <input type="text" required placeholder="Jean" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Nom</label>
                          <input type="text" required placeholder="Dupont" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Email</label>
                          <input type="email" required placeholder="jean@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Telephone</label>
                          <input type="tel" placeholder="+33 6 00 00 00 00" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Sujet</label>
                        <select required value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm bg-white">
                          <option value="">Selectionnez un sujet</option>
                          {CONTACT_REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Message</label>
                        <textarea required rows={5} placeholder="Ecrivez votre message ici..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm resize-none" />
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                        <input type="checkbox" required id="privacy" className="mt-1 w-4 h-4 accent-primary-600" />
                        <label htmlFor="privacy" className="text-sm text-neutral-600">
                          J accepte que mes donnees soient utilisees pour traiter ma demande.
                        </label>
                      </div>
                      <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-300 text-white font-bold py-4 rounded-2xl transition-all text-base">
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                        {loading ? "Envoi en cours..." : "Envoyer le message"}
                      </button>
                    </form>
                  </div>
                )}

                <div className="mt-6 bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
                  <div className="h-64 bg-gradient-to-br from-primary-50 to-neutral-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                      <p className="font-semibold text-neutral-700">15 Rue de la Solidarite</p>
                      <p className="text-neutral-500 text-sm">75001 Paris, France</p>
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all">
                        Ouvrir dans Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading font-bold text-neutral-900 text-2xl text-center mb-8">Questions frequentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { q: "Quel est le delai de reponse ?", r: "Notre equipe repond a tous les messages sous 24 heures ouvrables." },
                { q: "Comment faire un don ?", r: "Rendez-vous sur notre page Faire un don pour contribuer en ligne de facon securisee." },
                { q: "Comment devenir benevole ?", r: "Contactez-nous via ce formulaire en selectionnant Devenir benevole comme sujet." },
                { q: "Proposer un partenariat ?", r: "Nous sommes ouverts a tous les partenariats. Contactez-nous pour en discuter." },
              ].map((faq) => (
                <div key={faq.q} className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100">
                  <h3 className="font-semibold text-neutral-900 text-sm mb-2">{faq.q}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{faq.r}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
