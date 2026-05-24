"use client";

import { useState } from "react";
import { Heart, User, Mail, MessageSquare, CreditCard, Repeat, Gift, Check } from "lucide-react";

const AMOUNTS = [10, 25, 50, 100, 250, 500];

const PROJECTS = [
  { value: "general", label: "Ou le besoin est le plus urgent" },
  { value: "education", label: "Education — Ecoles et formation" },
  { value: "eau", label: "Eau potable — Forages et puits" },
  { value: "sante", label: "Sante — Centres medicaux" },
  { value: "logement", label: "Logement — Reconstruction" },
];

type DonationType = "unique" | "mensuel";
type Step = 1 | 2 | 3;

export default function DonationForm() {
  const [step, setStep] = useState<Step>(1);
  const [donationType, setDonationType] = useState<DonationType>("unique");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedProject, setSelectedProject] = useState("general");
  const [anonymous, setAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount || 0;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-secondary-600" />
          </div>
          <h2 className="font-heading font-bold text-neutral-900 text-3xl mb-4">
            Merci {formData.firstName} !
          </h2>
          <p className="text-neutral-500 text-lg mb-2">
            Votre don de <span className="font-bold text-secondary-600">{finalAmount}€</span>
            {donationType === "mensuel" ? " par mois" : ""} a bien ete enregistre.
          </p>
          <p className="text-neutral-400 text-sm mb-8">
            Un email de confirmation avec votre recu fiscal a ete envoye a {formData.email}
          </p>
          <div className="bg-secondary-50 border border-secondary-200 rounded-2xl p-6 mb-8">
            <p className="text-secondary-700 font-medium">
              Avec {finalAmount}€, vous pouvez financer :
            </p>
            <ul className="mt-3 text-left space-y-2 text-secondary-600 text-sm">
              {finalAmount >= 10 && <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Des fournitures scolaires pour 2 enfants</li>}
              {finalAmount >= 25 && <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Un kit medical de premiers secours</li>}
              {finalAmount >= 50 && <li className="flex items-center gap-2"><Check className="w-4 h-4" /> La formation d un agent de sante</li>}
              {finalAmount >= 100 && <li className="flex items-center gap-2"><Check className="w-4 h-4" /> Un mois d acces a l eau potable pour une famille</li>}
              {finalAmount >= 250 && <li className="flex items-center gap-2"><Check className="w-4 h-4" /> La construction d un point d eau dans un village</li>}
            </ul>
          </div>
          <a href="/" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all">
            Retour a l accueil
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[
            { num: 1, label: "Montant" },
            { num: 2, label: "Informations" },
            { num: 3, label: "Confirmation" },
          ].map((s, index) => (
            <div key={s.num} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                  step >= s.num
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-400"
                }`}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-sm font-medium hidden sm:block ${
                  step >= s.num ? "text-primary-600" : "text-neutral-400"
                }`}>
                  {s.label}
                </span>
              </div>
              {index < 2 && (
                <div className={`w-16 h-px ${step > s.num ? "bg-primary-600" : "bg-neutral-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Formulaire principal */}
          <div className="lg:col-span-2">

            {/* ÉTAPE 1 — Montant */}
            {step === 1 && (
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
                <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-6">
                  Choisissez votre don
                </h2>

                {/* Type de don */}
                <div className="flex gap-3 mb-8">
                  <button
                    onClick={() => setDonationType("unique")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                      donationType === "unique"
                        ? "border-primary-600 bg-primary-50 text-primary-700"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    <Gift className="w-4 h-4" />
                    Don unique
                  </button>
                  <button
                    onClick={() => setDonationType("mensuel")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${
                      donationType === "mensuel"
                        ? "border-primary-600 bg-primary-50 text-primary-700"
                        : "border-neutral-200 text-neutral-500 hover:border-neutral-300"
                    }`}
                  >
                    <Repeat className="w-4 h-4" />
                    Don mensuel
                  </button>
                </div>

                {/* Montants suggérés */}
                <p className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wide">
                  Montants suggeres
                </p>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }}
                      className={`py-4 rounded-xl border-2 font-bold text-lg transition-all ${
                        selectedAmount === amount && !customAmount
                          ? "border-primary-600 bg-primary-600 text-white shadow-lg"
                          : "border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"
                      }`}
                    >
                      {amount}€
                    </button>
                  ))}
                </div>

                {/* Montant libre */}
                <div className="mb-8">
                  <p className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wide">
                    Autre montant
                  </p>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Montant en euros"
                      value={customAmount}
                      onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                      className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-lg font-semibold"
                      min="1"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-lg">€</span>
                  </div>
                </div>

                {/* Projet */}
                <div className="mb-8">
                  <p className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wide">
                    Affecter a un projet
                  </p>
                  <div className="flex flex-col gap-2">
                    {PROJECTS.map((project) => (
                      <button
                        key={project.value}
                        onClick={() => setSelectedProject(project.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                          selectedProject === project.value
                            ? "border-primary-600 bg-primary-50"
                            : "border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          selectedProject === project.value
                            ? "border-primary-600 bg-primary-600"
                            : "border-neutral-300"
                        }`}>
                          {selectedProject === project.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className={`text-sm font-medium ${
                          selectedProject === project.value ? "text-primary-700" : "text-neutral-600"
                        }`}>
                          {project.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => finalAmount > 0 && setStep(2)}
                  disabled={finalAmount <= 0}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-lg transition-all hover:shadow-lg"
                >
                  Continuer avec {finalAmount > 0 ? `${finalAmount}€` : "..."}
                  {donationType === "mensuel" ? "/mois" : ""}
                </button>
              </div>
            )}

            {/* ÉTAPE 2 — Informations */}
            {step === 2 && (
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
                <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-6">
                  Vos informations
                </h2>

                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                        Prenom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Jean"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                        Nom
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Dupont"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                      <input
                        type="email"
                        placeholder="jean.dupont@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 transition-colors"
                      />
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">
                      Votre recu fiscal sera envoye a cette adresse
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      Message (optionnel)
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                      <textarea
                        placeholder="Laissez un message d encouragement..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={3}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                      />
                    </div>
                  </div>

                  {/* Don anonyme */}
                  <button
                    onClick={() => setAnonymous(!anonymous)}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 border-neutral-200 hover:border-neutral-300 transition-all text-left"
                  >
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                      anonymous ? "border-primary-600 bg-primary-600" : "border-neutral-300"
                    }`}>
                      {anonymous && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-700">Don anonyme</p>
                      <p className="text-xs text-neutral-400">Votre nom ne sera pas affiche publiquement</p>
                    </div>
                  </button>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 rounded-2xl border-2 border-neutral-200 text-neutral-600 font-semibold hover:border-neutral-300 transition-all"
                  >
                    Retour
                  </button>
                  <button
                    onClick={() => formData.firstName && formData.email && setStep(3)}
                    disabled={!formData.firstName || !formData.email}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all"
                  >
                    Continuer
                  </button>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 — Confirmation */}
            {step === 3 && (
              <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-8">
                <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-6">
                  Confirmation du don
                </h2>

                {/* Résumé */}
                <div className="bg-neutral-50 rounded-xl p-5 mb-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-sm">Type</span>
                    <span className="font-semibold text-neutral-900 capitalize">
                      {donationType === "mensuel" ? "Don mensuel" : "Don unique"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-sm">Montant</span>
                    <span className="font-bold text-primary-600 text-lg">
                      {finalAmount}€{donationType === "mensuel" ? "/mois" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-sm">Projet</span>
                    <span className="font-semibold text-neutral-900 text-sm">
                      {PROJECTS.find(p => p.value === selectedProject)?.label}
                    </span>
                  </div>
                  <div className="border-t border-neutral-200 pt-3 flex justify-between items-center">
                    <span className="text-neutral-500 text-sm">Donateur</span>
                    <span className="font-semibold text-neutral-900">
                      {anonymous ? "Anonyme" : `${formData.firstName} ${formData.lastName}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500 text-sm">Email</span>
                    <span className="font-semibold text-neutral-900 text-sm">{formData.email}</span>
                  </div>
                </div>

                {/* Paiement simulé */}
                <div className="bg-primary-50 border border-primary-100 rounded-xl p-5 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold text-primary-700">Paiement securise</span>
                    <span className="ml-auto text-xs bg-white text-primary-600 px-2 py-1 rounded-lg border border-primary-200 font-medium">
                      SSL 256-bit
                    </span>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Numero de carte"
                      className="w-full px-4 py-3 rounded-xl border-2 border-primary-100 bg-white focus:outline-none focus:border-primary-400 text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 rounded-xl border-2 border-primary-100 bg-white focus:outline-none focus:border-primary-400 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-4 py-3 rounded-xl border-2 border-primary-100 bg-white focus:outline-none focus:border-primary-400 text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-primary-500 mt-3">
                    Systeme de paiement en cours d integration (Stripe). Pour l instant, cliquez sur Confirmer pour voir la page de succes.
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 rounded-2xl border-2 border-neutral-200 text-neutral-600 font-semibold hover:border-neutral-300 transition-all"
                  >
                    Retour
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-4 rounded-2xl transition-all hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Heart className="w-5 h-5 fill-white" />
                    Confirmer {finalAmount}€
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar résumé */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-2xl p-6 text-white sticky top-28">
              <h3 className="font-heading font-bold text-lg mb-4">
                Votre impact
              </h3>

              {finalAmount > 0 ? (
                <div className="space-y-3 mb-6">
                  {finalAmount >= 10 && (
                    <div className="flex items-start gap-3 bg-white/10 rounded-xl p-3">
                      <span className="text-xl">📚</span>
                      <div>
                        <p className="text-sm font-semibold">Fournitures scolaires</p>
                        <p className="text-xs text-white/60">pour {Math.floor(finalAmount / 5)} enfants</p>
                      </div>
                    </div>
                  )}
                  {finalAmount >= 25 && (
                    <div className="flex items-start gap-3 bg-white/10 rounded-xl p-3">
                      <span className="text-xl">💊</span>
                      <div>
                        <p className="text-sm font-semibold">Kit medical</p>
                        <p className="text-xs text-white/60">premiers secours complet</p>
                      </div>
                    </div>
                  )}
                  {finalAmount >= 50 && (
                    <div className="flex items-start gap-3 bg-white/10 rounded-xl p-3">
                      <span className="text-xl">💧</span>
                      <div>
                        <p className="text-sm font-semibold">Eau potable</p>
                        <p className="text-xs text-white/60">pour {Math.floor(finalAmount / 10)} personnes / mois</p>
                      </div>
                    </div>
                  )}
                  {finalAmount >= 100 && (
                    <div className="flex items-start gap-3 bg-white/10 rounded-xl p-3">
                      <span className="text-xl">🏥</span>
                      <div>
                        <p className="text-sm font-semibold">Consultation medicale</p>
                        <p className="text-xs text-white/60">pour {Math.floor(finalAmount / 15)} patients</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-white/60 text-sm mb-6">
                  Choisissez un montant pour voir votre impact.
                </p>
              )}

              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">Votre don</span>
                  <span className="font-bold text-secondary-400 text-lg">
                    {finalAmount > 0 ? `${finalAmount}€` : "—"}
                    {donationType === "mensuel" && finalAmount > 0 ? "/mois" : ""}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-white/70">Sur le terrain</span>
                  <span className="font-bold text-secondary-400">
                    {finalAmount > 0 ? `${Math.round(finalAmount * 0.98)}€` : "—"}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[98%] bg-secondary-500 rounded-full" />
                </div>
                <p className="text-xs text-white/50 mt-2 text-center">
                  98% de chaque don utilise sur le terrain
                </p>
              </div>

              {/* Donateurs récents */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <p className="text-xs text-white/50 mb-3 uppercase tracking-wide">Dons recents</p>
                <div className="space-y-2">
                  {[
                    { name: "Marie D.", amount: 50, time: "il y a 2 min" },
                    { name: "Anonyme", amount: 100, time: "il y a 5 min" },
                    { name: "Pierre M.", amount: 25, time: "il y a 12 min" },
                  ].map((donor, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-bold">
                          {donor.name[0]}
                        </div>
                        <span className="text-white/70">{donor.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-secondary-400 font-semibold">{donor.amount}€</span>
                        <span className="text-white/30 ml-2">{donor.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}