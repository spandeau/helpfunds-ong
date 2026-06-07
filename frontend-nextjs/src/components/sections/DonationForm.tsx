"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Heart, User, Mail, MessageSquare, CreditCard,
  Repeat, Gift, Check, ChevronLeft, ChevronRight,
  Shield, ArrowRight, Smartphone, X
} from "lucide-react";

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
  { id: 5, title: "Aide aux familles", description: "Soutien psychologique pour les familles en detresse.", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80", stat: "800 familles", badge: "Famille", color: "from-red-950/90 via-red-900/70 to-transparent" },
];

function ImpactSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40, align: "start" }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);
  useEffect(() => { if (!emblaApi) return; onSelect(); emblaApi.on("select", onSelect); return () => { emblaApi.off("select", onSelect); }; }, [emblaApi, onSelect]);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-heading font-bold text-neutral-900 text-lg">A quoi sert votre don ?</h3>
          <p className="text-neutral-400 text-xs mt-0.5">Cliquez pour decouvrir chaque action</p>
        </div>
        <div className="flex gap-2">
          <button onClick={scrollPrev} className="w-8 h-8 bg-neutral-100 hover:bg-primary-600 hover:text-white rounded-full flex items-center justify-center text-neutral-600 transition-all"><ChevronLeft className="w-4 h-4" /></button>
          <button onClick={scrollNext} className="w-8 h-8 bg-neutral-100 hover:bg-primary-600 hover:text-white rounded-full flex items-center justify-center text-neutral-600 transition-all"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-3">
          {IMPACT_SLIDES.map((slide, index) => (
            <Link key={slide.id} href="/projets" className="flex-none w-[calc(33.333%-8px)] min-w-[160px] group">
              <div className={`rounded-2xl overflow-hidden border-2 transition-all duration-300 h-full ${selectedIndex === index ? "border-primary-500 shadow-lg" : "border-neutral-100 hover:border-primary-300 shadow-sm"}`}>
                <div className="relative h-32 overflow-hidden">
                  <Image src={slide.image} alt={slide.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 backdrop-blur text-neutral-800 text-[10px] font-bold px-2 py-0.5 rounded-full">{slide.badge}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-yellow-300 font-bold text-[10px]">{slide.stat}</span>
                  </div>
                </div>
                <div className="bg-white p-3">
                  <h4 className="font-heading font-bold text-neutral-900 text-xs mb-1 leading-tight line-clamp-1">{slide.title}</h4>
                  <p className="text-neutral-400 text-[10px] leading-tight line-clamp-2 mb-2">{slide.description}</p>
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

function PaymentLogos() {
  return (
    <div className="my-5 p-4 bg-neutral-50 rounded-xl border border-neutral-100">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-secondary-600" />
        <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wide">Moyens de paiement acceptes</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <div className="h-8 px-4 bg-white border border-neutral-200 rounded-lg flex items-center shadow-sm">
          <span className="text-[#1A1F71] font-black text-sm tracking-tight italic">VISA</span>
        </div>
        <div className="h-8 w-12 bg-white border border-neutral-200 rounded-lg flex items-center justify-center shadow-sm">
          <div className="flex"><div className="w-4 h-4 rounded-full bg-[#EB001B]" /><div className="w-4 h-4 rounded-full bg-[#F79E1B] -ml-2 opacity-90" /></div>
        </div>
        <div className="h-8 px-3 bg-black rounded-lg flex items-center gap-1 shadow-sm">
          <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          <span className="text-white font-semibold text-xs">Pay</span>
        </div>
        <div className="h-8 px-3 bg-white border border-neutral-200 rounded-lg flex items-center gap-0.5 shadow-sm">
          <span className="font-bold text-xs" style={{color:"#4285F4"}}>G</span>
          <span className="text-neutral-700 font-semibold text-xs ml-0.5">Pay</span>
        </div>
        <div className="h-8 px-3 bg-[#2E77BC] rounded-lg flex items-center shadow-sm">
          <span className="text-white font-black text-xs tracking-widest">AMEX</span>
        </div>
        <div className="h-8 px-3 bg-[#635BFF] rounded-lg flex items-center shadow-sm">
          <span className="text-white font-bold text-xs">stripe</span>
        </div>
        <div className="h-8 px-3 bg-orange-500 rounded-lg flex items-center gap-1 shadow-sm">
          <Smartphone className="w-3 h-3 text-white" />
          <span className="text-white font-bold text-xs">Mobile Money</span>
        </div>
      </div>
    </div>
  );
}

type Step = 1 | 2 | 3 | 4;
type DonationType = "unique" | "mensuel";
type PaymentMethod = "mobile_money" | "card" | null;

export default function DonationForm() {
  const [step, setStep] = useState<Step>(1);
  const [donationType, setDonationType] = useState<DonationType>("unique");
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>("50");
  const [selectedProject, setSelectedProject] = useState("general");
  const [anonymous, setAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [mobileData, setMobileData] = useState({ phone: "", operator: "mtn" });
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = Number(customAmount) || 0;

  const handleAmountClick = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(String(amount));
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(0);
  };

  const handleStep2Continue = () => {
    if (formData.firstName && formData.email) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentChoice = (method: "mobile_money" | "card") => {
    setPaymentMethod(method);
    setShowPaymentModal(false);
    setStep(3);
  };

  const handleSubmit = () => setSubmitted(true);

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
          <a href="/" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all">Retour a l accueil</a>
        </div>
      </section>
    );
  }

  return (
    <div>
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold text-neutral-900 text-xl">
                Comment souhaitez-vous effectuer votre don ?
              </h3>
              <button onClick={() => setShowPaymentModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors">
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>
            <p className="text-neutral-500 text-sm mb-6">
              Montant : <span className="font-bold text-primary-600">{finalAmount}€</span>
              {donationType === "mensuel" ? "/mois" : ""}
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handlePaymentChoice("mobile_money")}
                className="flex items-center gap-4 p-5 rounded-2xl border-2 border-neutral-200 hover:border-orange-400 hover:bg-orange-50 transition-all group"
              >
                <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-7 h-7 text-orange-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-neutral-900 text-base">Mobile Money</p>
                  <p className="text-neutral-500 text-sm">MTN, Orange, Moov, Wave...</p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-orange-500 ml-auto transition-colors" />
              </button>

              <button
                onClick={() => handlePaymentChoice("card")}
                className="flex items-center gap-4 p-5 rounded-2xl border-2 border-neutral-200 hover:border-primary-400 hover:bg-primary-50 transition-all group"
              >
                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-7 h-7 text-primary-600" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-neutral-900 text-base">Carte bancaire</p>
                  <p className="text-neutral-500 text-sm">Visa, Mastercard, AMEX...</p>
                </div>
                <ArrowRight className="w-5 h-5 text-neutral-300 group-hover:text-primary-500 ml-auto transition-colors" />
              </button>
            </div>
            <p className="text-xs text-neutral-400 text-center mt-5 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              Paiement 100% securise — SSL 256-bit
            </p>
          </div>
        </div>
      )}

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-12">
            {[
              { num: 1, label: "Montant" },
              { num: 2, label: "Informations" },
              { num: 3, label: "Paiement" },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s.num ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-400"}`}>
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`text-sm font-medium hidden sm:block ${step >= s.num ? "text-primary-600" : "text-neutral-400"}`}>{s.label}</span>
                </div>
                {index < 2 && <div className={`w-16 h-px ${step > s.num ? "bg-primary-600" : "bg-neutral-200"}`} />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">

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

                  <p className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wide">Montants suggeres</p>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {AMOUNTS.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountClick(amount)}
                        className={`py-4 rounded-xl border-2 font-bold text-lg transition-all ${Number(customAmount) === amount ? "border-primary-600 bg-primary-600 text-white shadow-lg" : "border-neutral-200 text-neutral-700 hover:border-primary-300"}`}
                      >
                        {amount}€
                      </button>
                    ))}
                  </div>

                  <p className="text-sm font-semibold text-neutral-500 mb-2 uppercase tracking-wide">Autre montant</p>
                  <div className="relative mb-4">
                    <input
                      type="number"
                      placeholder="Saisissez un montant"
                      value={customAmount}
                      onChange={(e) => handleCustomAmountChange(e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-lg font-semibold"
                      min="1"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold">€</span>
                  </div>

                  <PaymentLogos />

                  <p className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wide">Affecter a un projet</p>
                  <div className="flex flex-col gap-2 mb-4">
                    {PROJECTS.map((project) => (
                      <button key={project.value} onClick={() => setSelectedProject(project.value)} className={`flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all ${selectedProject === project.value ? "border-primary-600 bg-primary-50" : "border-neutral-200 hover:border-neutral-300"}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedProject === project.value ? "border-primary-600 bg-primary-600" : "border-neutral-300"}`}>
                          {selectedProject === project.value && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                        <span className={`text-sm font-medium ${selectedProject === project.value ? "text-primary-700" : "text-neutral-600"}`}>{project.label}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => finalAmount > 0 && setStep(2)}
                    disabled={finalAmount <= 0}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-lg transition-all hover:shadow-lg mb-2"
                  >
                    Continuer avec {finalAmount > 0 ? finalAmount + "€" : "..."}{donationType === "mensuel" ? "/mois" : ""}
                  </button>

                  <ImpactSlider />
                </div>
              )}

              {step === 2 && (
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 md:p-8">
                  <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-6">Vos informations</h2>
                  <div className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Prenom</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input type="text" placeholder="Jean" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Nom</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                          <input type="text" placeholder="Dupont" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input type="email" placeholder="jean.dupont@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500" />
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">Votre recu fiscal sera envoye a cette adresse</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Message (optionnel)</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
                        <textarea placeholder="Laissez un message..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={3} className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 resize-none" />
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
                    <button onClick={() => setStep(1)} className="flex-1 py-4 rounded-2xl border-2 border-neutral-200 text-neutral-600 font-semibold">Retour</button>
                    <button
                      onClick={handleStep2Continue}
                      disabled={!formData.firstName || !formData.email}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all"
                    >
                      Choisir le paiement
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && paymentMethod === "mobile_money" && (
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-neutral-900 text-xl">Paiement Mobile Money</h2>
                      <p className="text-neutral-500 text-sm">Montant : <span className="font-bold text-primary-600">{finalAmount}€</span></p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-2">Operateur</label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          { value: "mtn", label: "MTN", color: "bg-yellow-400 text-yellow-900" },
                          { value: "orange", label: "Orange", color: "bg-orange-500 text-white" },
                          { value: "moov", label: "Moov", color: "bg-blue-600 text-white" },
                          { value: "wave", label: "Wave", color: "bg-blue-400 text-white" },
                        ].map((op) => (
                          <button
                            key={op.value}
                            onClick={() => setMobileData({...mobileData, operator: op.value})}
                            className={`py-3 rounded-xl font-bold text-sm transition-all border-2 ${mobileData.operator === op.value ? "border-primary-600 ring-2 ring-primary-200" : "border-transparent"} ${op.color}`}
                          >
                            {op.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Numero de telephone</label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                          type="tel"
                          placeholder="+228 XX XX XX XX"
                          value={mobileData.phone}
                          onChange={(e) => setMobileData({...mobileData, phone: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500"
                        />
                      </div>
                      <p className="text-xs text-neutral-400 mt-1">Vous recevrez une notification sur ce numero</p>
                    </div>

                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
                      <p className="text-sm text-orange-800 font-medium mb-1">Comment ca fonctionne :</p>
                      <ol className="text-xs text-orange-700 space-y-1">
                        <li>1. Cliquez sur "Confirmer le don"</li>
                        <li>2. Vous recevrez une notification sur votre telephone</li>
                        <li>3. Validez le paiement avec votre code secret</li>
                        <li>4. Le don sera confirme automatiquement</li>
                      </ol>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button onClick={() => { setShowPaymentModal(true); setStep(2); }} className="flex-1 py-4 rounded-2xl border-2 border-neutral-200 text-neutral-600 font-semibold">Retour</button>
                    <button
                      onClick={handleSubmit}
                      disabled={!mobileData.phone}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
                    >
                      <Smartphone className="w-5 h-5" />
                      Confirmer {finalAmount}€
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && paymentMethod === "card" && (
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-neutral-900 text-xl">Paiement par carte</h2>
                      <p className="text-neutral-500 text-sm">Montant : <span className="font-bold text-primary-600">{finalAmount}€</span></p>
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-xl p-5 mb-6 space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-neutral-500">Donateur</span><span className="font-semibold">{anonymous ? "Anonyme" : `${formData.firstName} ${formData.lastName}`}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500">Montant</span><span className="font-bold text-primary-600 text-lg">{finalAmount}€{donationType === "mensuel" ? "/mois" : ""}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500">Type</span><span className="font-semibold">{donationType === "mensuel" ? "Don mensuel" : "Don unique"}</span></div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Numero de carte</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input type="text" placeholder="1234 5678 9012 3456" className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" maxLength={19} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Date d expiration</label>
                        <input type="text" placeholder="MM/AA" className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" maxLength={5} />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Code de securite</label>
                        <input type="text" placeholder="CVV" className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm" maxLength={4} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Nom sur la carte</label>
                      <input type="text" placeholder="JEAN DUPONT" className="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm uppercase" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6 p-3 bg-neutral-50 rounded-xl">
                    <Shield className="w-4 h-4 text-secondary-600 flex-shrink-0" />
                    <span>Paiement securise par chiffrement SSL 256-bit. Vos donnees bancaires sont protegees.</span>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => { setShowPaymentModal(true); setStep(2); }} className="flex-1 py-4 rounded-2xl border-2 border-neutral-200 text-neutral-600 font-semibold">Retour</button>
                    <button onClick={handleSubmit} className="flex-1 bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                      <Heart className="w-5 h-5 fill-white" />Confirmer {finalAmount}€
                    </button>
                  </div>
                </div>
              )}
            </div>

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
                <div className="border-t border-white/20 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2"><span className="text-sm text-white/70">Votre don</span><span className="font-bold text-secondary-400 text-lg">{finalAmount > 0 ? finalAmount + "€" : "-"}{donationType === "mensuel" && finalAmount > 0 ? "/mois" : ""}</span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full w-[98%] bg-secondary-500 rounded-full" /></div>
                  <p className="text-xs text-white/50 mt-2 text-center">98% sur le terrain</p>
                </div>
                <div className="border-t border-white/20 pt-4">
                  <p className="text-xs text-white/50 mb-3 uppercase tracking-wide">Dons recents</p>
                  <div className="space-y-2">
                    {[{ name: "Marie D.", amount: 50, time: "2 min" }, { name: "Anonyme", amount: 100, time: "5 min" }, { name: "Pierre M.", amount: 25, time: "12 min" }].map((donor, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2"><div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center font-bold">{donor.name[0]}</div><span className="text-white/70">{donor.name}</span></div>
                        <div><span className="text-secondary-400 font-semibold">{donor.amount}€</span><span className="text-white/30 ml-1">il y a {donor.time}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { emoji: "🔒", title: "Paiement securise", desc: "Chiffrement SSL 256 bits. Donnees bancaires totalement protegees." },
              { emoji: "📋", title: "Recu fiscal", desc: "Recu fiscal envoye automatiquement par email apres chaque don." },
              { emoji: "🌍", title: "Impact garanti", desc: "98% de votre don utilise directement sur le terrain." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-heading font-bold text-neutral-900 mb-2 text-base">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}