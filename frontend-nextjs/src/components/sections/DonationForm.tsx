"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripePaymentForm from "@/components/sections/StripePaymentForm";
import {
  Heart, User, Mail, MessageSquare, CreditCard,
  Repeat, Gift, Check, ChevronLeft, ChevronRight,
  Shield, ArrowRight, Smartphone, X, Lock
} from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const AMOUNTS = [10, 25, 50, 100, 250, 500];

const PROJECTS = [
  { value: "general", label: "Ou le besoin est le plus urgent" },
  { value: "education", label: "Education - Ecoles et formation" },
  { value: "eau", label: "Eau potable - Forages et puits" },
  { value: "sante", label: "Sante - Centres medicaux" },
  { value: "logement", label: "Logement - Reconstruction" },
];

const IMPACT_SLIDES = [
  { id: 1, title: "Aide alimentaire", description: "Distribution de repas chauds aux familles vulnerables.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80", stat: "12 000 repas / mois", badge: "Alimentation", color: "from-orange-950/90 via-orange-900/70 to-transparent" },
  { id: 2, title: "Acces aux soins", description: "Consultations medicales gratuites pour les communautes isolees.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80", stat: "1 200 patients / mois", badge: "Sante", color: "from-blue-950/90 via-blue-900/70 to-transparent" },
  { id: 3, title: "Education des enfants", description: "Fournitures scolaires pour les enfants defavorises.", image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=800&q=80", stat: "3 500 enfants", badge: "Education", color: "from-green-950/90 via-green-900/70 to-transparent" },
  { id: 4, title: "Projets communautaires", description: "Construction de puits et projets agricoles durables.", image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=800&q=80", stat: "45 villages", badge: "Communaute", color: "from-purple-950/90 via-purple-900/70 to-transparent" },
];

const MOBILE_OPERATORS = [
  { value: "mtn", label: "MTN", color: "bg-yellow-400", textColor: "text-yellow-900", border: "border-yellow-400" },
  { value: "orange", label: "Orange", color: "bg-orange-500", textColor: "text-white", border: "border-orange-500" },
  { value: "moov", label: "Moov", color: "bg-blue-600", textColor: "text-white", border: "border-blue-600" },
  { value: "wave", label: "Wave", color: "bg-sky-400", textColor: "text-white", border: "border-sky-400" },
];

function ImpactSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40, align: "start" },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-bold text-neutral-900 text-lg">A quoi sert votre don ?</h3>
          <p className="text-neutral-400 text-xs mt-0.5">Decouvrez chaque action</p>
        </div>
        <div className="flex gap-2">
          <button onClick={scrollPrev} className="w-8 h-8 bg-neutral-100 hover:bg-primary-600 hover:text-white rounded-full flex items-center justify-center text-neutral-600 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={scrollNext} className="w-8 h-8 bg-neutral-100 hover:bg-primary-600 hover:text-white rounded-full flex items-center justify-center text-neutral-600 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-3">
          {IMPACT_SLIDES.map((slide, index) => (
            <Link key={slide.id} href="/projets" className="flex-none w-[calc(33.333%-8px)] min-w-[160px] group">
              <div className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 h-full ${selectedIndex === index ? "border-primary-500 shadow-lg" : "border-neutral-100 hover:border-primary-300 shadow-sm"}`}>
                <div className="relative h-32 overflow-hidden">
                  <Image src={slide.image} alt={slide.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 backdrop-blur text-neutral-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{slide.badge}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-yellow-300 font-bold text-[10px]">{slide.stat}</span>
                  </div>
                </div>
                <div className="bg-white p-3">
                  <h4 className="font-heading font-bold text-neutral-900 text-xs mb-1 line-clamp-1">{slide.title}</h4>
                  <p className="text-neutral-400 text-[10px] line-clamp-2 mb-2">{slide.description}</p>
                  <div className="flex items-center gap-1 text-primary-600 text-[10px] font-bold">Decouvrir <ArrowRight className="w-3 h-3" /></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-1.5 mt-4">
        {IMPACT_SLIDES.map((_, index) => (
          <button key={index} onClick={() => emblaApi?.scrollTo(index)} className={`transition-all duration-300 rounded-full ${index === selectedIndex ? "w-6 h-1.5 bg-primary-600" : "w-1.5 h-1.5 bg-neutral-300"}`} />
        ))}
      </div>
    </div>
  );
}

type Step = 1 | 2 | 3;
type DonationType = "unique" | "mensuel";
type PaymentMethod = "stripe" | "mobile_money" | null;

export default function DonationForm() {
  const [step, setStep] = useState<Step>(1);
  const [donationType, setDonationType] = useState<DonationType>("unique");
  const [customAmount, setCustomAmount] = useState<string>("50");
  const [selectedProject, setSelectedProject] = useState("general");
  const [anonymous, setAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [mobileData, setMobileData] = useState({ phone: "", operator: "mtn" });
  const [submitted, setSubmitted] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [loadingStripe, setLoadingStripe] = useState(false);

  const finalAmount = Number(customAmount) || 0;

  const handlePaymentChoice = async (method: "stripe" | "mobile_money") => {
    setPaymentMethod(method);
    setShowPaymentModal(false);

    if (method === "stripe") {
      setLoadingStripe(true);
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: finalAmount,
            currency: "eur",
            donorName: anonymous ? "Anonyme" : `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            project: selectedProject,
            donationType,
          }),
        });
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setStep(3);
        }
      } catch (error) {
        console.error("Erreur Stripe:", error);
      } finally {
        setLoadingStripe(false);
      }
    } else {
      setStep(3);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-secondary-600" />
          </div>
          <h2 className="font-heading font-bold text-neutral-900 text-3xl mb-4">Merci {formData.firstName} !</h2>
          <p className="text-neutral-500 text-lg mb-2">
            Votre don de <span className="font-bold text-secondary-600">{finalAmount}€</span>
            {donationType === "mensuel" ? " par mois" : ""} a bien ete enregistre.
          </p>
          <p className="text-neutral-400 text-sm mb-8">Un recu fiscal sera envoye a {formData.email}</p>
          <Link href="/" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all">
            Retour a l accueil
          </Link>
        </div>
      </section>
    );
  }

  return (
    <div>
      {/* Modal choix paiement */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-neutral-900 text-xl">Comment souhaitez-vous payer ?</h3>
              <button onClick={() => setShowPaymentModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-neutral-500 text-sm mb-6">
              Don de <span className="font-bold text-primary-600 text-base">{finalAmount}€</span>
              {donationType === "mensuel" ? "/mois" : ""}
            </p>

            <div className="space-y-3 mb-6">
              {/* Stripe - Carte bancaire */}
              <button
                onClick={() => handlePaymentChoice("stripe")}
                disabled={loadingStripe}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-neutral-100 hover:border-primary-400 hover:bg-primary-50 transition-all group disabled:opacity-50"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-neutral-900">Carte bancaire</p>
                  <p className="text-xs text-neutral-400">Visa, Mastercard, SEPA — Securise par Stripe</p>
                </div>
                {loadingStripe ? (
                  <div className="w-5 h-5 border-2 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-primary-500 transition-colors" />
                )}
              </button>

              {/* Mobile Money */}
              <button
                onClick={() => handlePaymentChoice("mobile_money")}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-neutral-100 hover:border-orange-400 hover:bg-orange-50 transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform">
                  <Smartphone className="w-7 h-7 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-neutral-900">Mobile Money</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {MOBILE_OPERATORS.map((op) => (
                      <div key={op.value} className={`${op.color} rounded px-1.5 py-0.5`}>
                        <span className={`text-[9px] font-black ${op.textColor}`}>{op.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-orange-500 transition-colors" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-secondary-500" />100% securise</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Shield className="w-3 h-3 text-secondary-500" />Donnees protegees</span>
            </div>
          </div>
        </div>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[{ num: 1, label: "Montant" }, { num: 2, label: "Informations" }, { num: 3, label: "Paiement" }].map((s, index) => (
              <div key={s.num} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s.num ? "bg-primary-600 text-white shadow-lg" : "bg-neutral-100 text-neutral-400"}`}>
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${step >= s.num ? "text-primary-600" : "text-neutral-400"}`}>{s.label}</span>
                </div>
                {index < 2 && <div className={`w-16 h-0.5 ${step > s.num ? "bg-primary-600" : "bg-neutral-200"}`} />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">

              {/* STEP 1 */}
              {step === 1 && (
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 md:p-8">
                  <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-6">Choisissez votre don</h2>
                  <div className="flex gap-3 mb-6">
                    <button onClick={() => setDonationType("unique")} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${donationType === "unique" ? "border-primary-600 bg-primary-50 text-primary-700" : "border-neutral-200 text-neutral-500"}`}>
                      <Gift className="w-4 h-4" />Don unique
                    </button>
                    <button onClick={() => setDonationType("mensuel")} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${donationType === "mensuel" ? "border-primary-600 bg-primary-50 text-primary-700" : "border-neutral-200 text-neutral-500"}`}>
                      <Repeat className="w-4 h-4" />Don mensuel
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {AMOUNTS.map((amount) => (
                      <button key={amount} onClick={() => setCustomAmount(String(amount))}
                        className={`py-4 rounded-xl border-2 font-bold text-lg transition-all ${Number(customAmount) === amount ? "border-primary-600 bg-primary-600 text-white shadow-lg scale-105" : "border-neutral-200 text-neutral-700 hover:border-primary-300 hover:bg-primary-50"}`}>
                        {amount}€
                      </button>
                    ))}
                  </div>
                  <div className="relative mb-6">
                    <input type="number" placeholder="Montant personnalise" value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-lg font-semibold" min="1" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-lg">€</span>
                  </div>
                  <div className="flex flex-col gap-2 mb-6">
                    {PROJECTS.map((project) => (
                      <button key={project.value} onClick={() => setSelectedProject(project.value)}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${selectedProject === project.value ? "border-primary-600 bg-primary-50" : "border-neutral-200 hover:border-neutral-300"}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedProject === project.value ? "border-primary-600 bg-primary-600" : "border-neutral-300"}`}>
                          {selectedProject === project.value && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <span className={`text-sm font-medium ${selectedProject === project.value ? "text-primary-700" : "text-neutral-600"}`}>{project.label}</span>
                      </button>
                    ))}
                  </div>
                  <button onClick={() => finalAmount > 0 && setStep(2)} disabled={finalAmount <= 0}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-lg transition-all hover:shadow-lg mb-2">
                    Continuer avec {finalAmount > 0 ? finalAmount + "€" : "..."}{donationType === "mensuel" ? "/mois" : ""}
                  </button>
                  <ImpactSlider />
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 md:p-8">
                  <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-6">Vos informations</h2>
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Prenom *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input type="text" placeholder="Jean" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Nom *</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input type="text" placeholder="Dupont" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Email *</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input type="email" placeholder="jean.dupont@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Message (optionnel)</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                        <textarea placeholder="Laissez un message..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 resize-none" />
                      </div>
                    </div>
                    <button onClick={() => setAnonymous(!anonymous)} className="flex items-center gap-3 p-4 rounded-xl border-2 border-neutral-200 hover:border-neutral-300 transition-all text-left">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${anonymous ? "border-primary-600 bg-primary-600" : "border-neutral-300"}`}>
                        {anonymous && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-neutral-700">Don anonyme</p>
                        <p className="text-xs text-neutral-400">Votre nom ne sera pas affiche publiquement</p>
                      </div>
                    </button>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl border-2 border-neutral-200 text-neutral-600 font-semibold flex items-center justify-center gap-2">
                      <ChevronLeft className="w-4 h-4" />Retour
                    </button>
                    <button onClick={() => formData.firstName && formData.email && setShowPaymentModal(true)}
                      disabled={!formData.firstName || !formData.email}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                      Choisir le paiement <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 - Stripe */}
              {step === 3 && paymentMethod === "stripe" && clientSecret && (
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-neutral-900 text-xl">Paiement securise</h2>
                      <p className="text-neutral-500 text-sm">Propulse par Stripe</p>
                    </div>
                  </div>
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#0092D2",
                          colorBackground: "#ffffff",
                          colorText: "#1e293b",
                          borderRadius: "12px",
                          fontFamily: "Inter, system-ui, sans-serif",
                        },
                      },
                    }}
                  >
                    <StripePaymentForm
                      amount={finalAmount}
                      donationType={donationType}
                      onBack={() => { setStep(2); setShowPaymentModal(true); }}
                      onSuccess={() => setSubmitted(true)}
                    />
                  </Elements>
                </div>
              )}

              {/* STEP 3 - Mobile Money */}
              {step === 3 && paymentMethod === "mobile_money" && (
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                      <Smartphone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-neutral-900 text-xl">Mobile Money</h2>
                      <p className="text-neutral-500 text-sm">Montant : <span className="font-bold text-primary-600">{finalAmount}€</span></p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-3">Choisissez votre operateur</label>
                      <div className="grid grid-cols-2 gap-3">
                        {MOBILE_OPERATORS.map((op) => (
                          <button key={op.value} onClick={() => setMobileData({ ...mobileData, operator: op.value })}
                            className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${mobileData.operator === op.value ? `${op.border} ring-2 ring-offset-1` : "border-neutral-200 hover:border-neutral-300"}`}>
                            <div className={`w-10 h-10 ${op.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                              <span className={`font-black text-xs ${op.textColor}`}>{op.label}</span>
                            </div>
                            <span className="font-semibold text-neutral-800 text-sm">{op.label}</span>
                            {mobileData.operator === op.value && <Check className="w-4 h-4 text-secondary-600 ml-auto" />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Numero de telephone</label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input type="tel" placeholder="+228 XX XX XX XX" value={mobileData.phone} onChange={(e) => setMobileData({ ...mobileData, phone: e.target.value })} className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500" />
                      </div>
                    </div>
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                      <p className="text-sm text-orange-800 font-semibold mb-2">Comment ca fonctionne :</p>
                      <ol className="text-xs text-orange-700 space-y-1.5">
                        <li className="flex items-center gap-2"><span className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</span>Cliquez sur Confirmer le don</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</span>Vous recevrez une notification sur votre telephone</li>
                        <li className="flex items-center gap-2"><span className="w-5 h-5 bg-orange-200 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</span>Validez avec votre code secret</li>
                      </ol>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                    <button onClick={() => { setStep(2); setShowPaymentModal(true); }} className="flex-1 py-4 rounded-2xl border-2 border-neutral-200 text-neutral-600 font-semibold flex items-center justify-center gap-2">
                      <ChevronLeft className="w-4 h-4" />Retour
                    </button>
                    <button onClick={() => setSubmitted(true)} disabled={!mobileData.phone}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                      <Smartphone className="w-5 h-5" />Confirmer {finalAmount}€
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar impact */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-2xl p-6 text-white sticky top-28">
                <h3 className="font-heading font-bold text-lg mb-4">Votre impact</h3>
                {finalAmount > 0 ? (
                  <div className="space-y-3 mb-6">
                    {finalAmount >= 10 && <div className="flex items-start gap-3 bg-white/10 rounded-xl p-3"><span className="text-xl">📚</span><div><p className="text-sm font-semibold">Fournitures scolaires</p><p className="text-xs text-white/60">pour {Math.floor(finalAmount / 5)} enfants</p></div></div>}
                    {finalAmount >= 25 && <div className="flex items-start gap-3 bg-white/10 rounded-xl p-3"><span className="text-xl">💊</span><div><p className="text-sm font-semibold">Kit medical</p><p className="text-xs text-white/60">premiers secours</p></div></div>}
                    {finalAmount >= 50 && <div className="flex items-start gap-3 bg-white/10 rounded-xl p-3"><span className="text-xl">💧</span><div><p className="text-sm font-semibold">Eau potable</p><p className="text-xs text-white/60">pour {Math.floor(finalAmount / 10)} personnes</p></div></div>}
                    {finalAmount >= 100 && <div className="flex items-start gap-3 bg-white/10 rounded-xl p-3"><span className="text-xl">🏥</span><div><p className="text-sm font-semibold">Consultation medicale</p><p className="text-xs text-white/60">pour {Math.floor(finalAmount / 15)} patients</p></div></div>}
                  </div>
                ) : <p className="text-white/60 text-sm mb-6">Choisissez un montant pour voir votre impact.</p>}
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white/70">Votre don</span>
                    <span className="font-bold text-secondary-400 text-lg">{finalAmount > 0 ? finalAmount + "€" : "-"}{donationType === "mensuel" && finalAmount > 0 ? "/mois" : ""}</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-secondary-500 rounded-full" />
                  </div>
                  <p className="text-xs text-white/50 mt-2 text-center">98% sur le terrain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}