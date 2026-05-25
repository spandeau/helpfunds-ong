"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Heart, User, Mail, MessageSquare, CreditCard, Repeat, Gift, Check, ChevronLeft, ChevronRight, Shield } from "lucide-react";

const AMOUNTS = [10, 25, 50, 100, 250, 500];

const PROJECTS = [
  { value: "general", label: "Ou le besoin est le plus urgent" },
  { value: "education", label: "Education - Ecoles et formation" },
  { value: "eau", label: "Eau potable - Forages et puits" },
  { value: "sante", label: "Sante - Centres medicaux" },
  { value: "logement", label: "Logement - Reconstruction" },
];

const PAYMENT_METHODS = [
  { name: "Visa", bg: "#1A1F71", text: "white", label: "VISA" },
  { name: "Mastercard", bg: "#EB001B", text: "white", label: "MC" },
  { name: "Apple Pay", bg: "#000000", text: "white", label: "Apple Pay" },
  { name: "Google Pay", bg: "#ffffff", text: "#000000", label: "G Pay" },
  { name: "American Express", bg: "#2E77BC", text: "white", label: "AMEX" },
  { name: "PayPal", bg: "#003087", text: "white", label: "PayPal" },
  { name: "Stripe", bg: "#635BFF", text: "white", label: "Stripe" },
];

const IMPACT_SLIDES = [
  { id: 1, title: "Aide alimentaire", description: "Distribution de repas chauds et de kits alimentaires aux familles vulnerables dans les zones de crise.", image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&q=80", stat: "12 000 repas distribues par mois", badge: "Alimentation", color: "from-orange-950/90 via-orange-900/70 to-transparent" },
  { id: 2, title: "Acces aux soins", description: "Consultations medicales gratuites, vaccinations et suivi sanitaire pour les communautes isolees.", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80", stat: "1 200 patients soignes par mois", badge: "Sante", color: "from-blue-950/90 via-blue-900/70 to-transparent" },
  { id: 3, title: "Education des enfants", description: "Fournitures scolaires, construction d ecoles et formation pour les enfants defavorises.", image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&q=80", stat: "3 500 enfants scolarises", badge: "Education", color: "from-green-950/90 via-green-900/70 to-transparent" },
  { id: 4, title: "Projets communautaires", description: "Construction de puits et projets d agriculture durable pour renforcer les communautes.", image: "https://images.unsplash.com/photo-1541544537156-7627a7a4aa1c?w=1920&q=80", stat: "45 villages transformes", badge: "Communaute", color: "from-purple-950/90 via-purple-900/70 to-transparent" },
  { id: 5, title: "Aide aux familles", description: "Soutien psychologique et accompagnement social pour les familles en situation de detresse.", image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&q=80", stat: "800 familles accompagnees", badge: "Famille", color: "from-red-950/90 via-red-900/70 to-transparent" },
  { id: 6, title: "Eau potable", description: "Installation de points d eau potable dans les villages isoles pour garantir l acces a l eau.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80", stat: "2 500 personnes alimentees", badge: "Eau", color: "from-cyan-950/90 via-cyan-900/70 to-transparent" },
];

function ImpactSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const onSelect = useCallback(() => { if (!emblaApi) return; setSelectedIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);
  useEffect(() => { if (!emblaApi) return; onSelect(); emblaApi.on("select", onSelect); return () => { emblaApi.off("select", onSelect); }; }, [emblaApi, onSelect]);

  return (
    <div className="mt-8 mb-8 rounded-2xl overflow-hidden border border-neutral-100">
      <div className="bg-neutral-900 px-5 py-3 flex items-center justify-between">
        <div>
          <p className="text-white font-heading font-bold text-base">A quoi servent vos dons ?</p>
          <p className="text-white/50 text-xs">Decouvrez l impact concret de chaque contribution</p>
        </div>
        <div className="flex gap-1.5">
          {IMPACT_SLIDES.map((_, index) => (
            <button key={index} onClick={() => emblaApi?.scrollTo(index)} className={`transition-all duration-300 rounded-full ${index === selectedIndex ? "w-5 h-1.5 bg-secondary-400" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50"}`} />
          ))}
        </div>
      </div>
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {IMPACT_SLIDES.map((slide) => (
              <div key={slide.id} className="flex-none w-full relative h-64">
                <Image src={slide.image} alt={slide.title} fill className="object-cover" sizes="100vw" />
                <div className={"absolute inset-0 bg-gradient-to-r " + slide.color} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-bold px-3 py-1.5 rounded-full">{slide.badge}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5 inline-block mb-2">
                    <span className="text-yellow-300 font-bold text-xs">{slide.stat}</span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-lg mb-1">{slide.title}</h3>
                  <p className="text-white/75 text-xs leading-relaxed">{slide.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button onClick={scrollPrev} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={scrollNext} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function PaymentLogos() {
  return (
    <div className="mt-6 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Shield className="w-4 h-4 text-secondary-600" />
        <p className="text-sm font-semibold text-neutral-600">Moyens de paiement acceptes</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {PAYMENT_METHODS.map((method) => (
          <div
            key={method.name}
            className="px-3 py-1.5 rounded-lg text-xs font-bold border border-neutral-200 flex items-center gap-1.5"
            style={{ backgroundColor: method.bg, color: method.text }}
          >
            {method.label}
          </div>
        ))}
      </div>
      <p className="text-xs text-neutral-400 mt-2 flex items-center gap-1">
        <Shield className="w-3 h-3" />
        Paiements securises par chiffrement SSL 256-bit
      </p>
    </div>
  );
}

export default function DonationForm() {
  const [step, setStep] = useState(1);
  const [donationType, setDonationType] = useState("unique");
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedProject, setSelectedProject] = useState("general");
  const [anonymous, setAnonymous] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = customAmount ? Number(customAmount) : selectedAmount || 0;

  if (submitted) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-24 h-24 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-secondary-600" />
          </div>
          <h2 className="font-heading font-bold text-neutral-900 text-3xl mb-4">Merci {formData.firstName} !</h2>
          <p className="text-neutral-500 text-lg mb-8">Votre don de <span className="font-bold text-secondary-600">{finalAmount}€</span>{donationType === "mensuel" ? " par mois" : ""} a bien ete enregistre.</p>
          <a href="/" className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold px-8 py-4 rounded-2xl transition-all">Retour a l accueil</a>
        </div>
      </section>
    );
  }

  return (
    <div>
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 mb-12">
            {[{ num: 1, label: "Montant" }, { num: 2, label: "Informations" }, { num: 3, label: "Confirmation" }].map((s, index) => (
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
                  <div className="flex gap-3 mb-8">
                    <button onClick={() => setDonationType("unique")} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${donationType === "unique" ? "border-primary-600 bg-primary-50 text-primary-700" : "border-neutral-200 text-neutral-500"}`}>
                      <Gift className="w-4 h-4" />Don unique
                    </button>
                    <button onClick={() => setDonationType("mensuel")} className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all ${donationType === "mensuel" ? "border-primary-600 bg-primary-50 text-primary-700" : "border-neutral-200 text-neutral-500"}`}>
                      <Repeat className="w-4 h-4" />Don mensuel
                    </button>
                  </div>

                  <p className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wide">Montants suggeres</p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {AMOUNTS.map((amount) => (
                      <button key={amount} onClick={() => { setSelectedAmount(amount); setCustomAmount(""); }} className={`py-4 rounded-xl border-2 font-bold text-lg transition-all ${selectedAmount === amount && !customAmount ? "border-primary-600 bg-primary-600 text-white shadow-lg" : "border-neutral-200 text-neutral-700 hover:border-primary-300"}`}>
                        {amount}€
                      </button>
                    ))}
                  </div>

                  <p className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wide">Autre montant</p>
                  <div className="relative mb-6">
                    <input type="number" placeholder="Montant en euros" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0); }} className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-lg font-semibold" min="1" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-bold text-lg">€</span>
                  </div>

                  <PaymentLogos />

                  <p className="text-sm font-semibold text-neutral-500 mb-3 uppercase tracking-wide">Affecter a un projet</p>
                  <div className="flex flex-col gap-2 mb-6">
                    {PROJECTS.map((project) => (
                      <button key={project.value} onClick={() => setSelectedProject(project.value)} className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${selectedProject === project.value ? "border-primary-600 bg-primary-50" : "border-neutral-200 hover:border-neutral-300"}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selectedProject === project.value ? "border-primary-600 bg-primary-600" : "border-neutral-300"}`}>
                          {selectedProject === project.value && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className={`text-sm font-medium ${selectedProject === project.value ? "text-primary-700" : "text-neutral-600"}`}>{project.label}</span>
                      </button>
                    ))}
                  </div>

                  <ImpactSlider />

                  <button onClick={() => finalAmount > 0 && setStep(2)} disabled={finalAmount <= 0} className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl text-lg transition-all hover:shadow-lg">
                    Continuer avec {finalAmount > 0 ? finalAmount + "€" : "..."}{donationType === "mensuel" ? "/mois" : ""}
                  </button>
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
                    <button onClick={() => formData.firstName && formData.email && setStep(3)} disabled={!formData.firstName || !formData.email} className="flex-1 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all">Continuer</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-6 md:p-8">
                  <h2 className="font-heading font-bold text-neutral-900 text-2xl mb-6">Confirmation du don</h2>
                  <div className="bg-neutral-50 rounded-xl p-5 mb-6 space-y-3">
                    <div className="flex justify-between"><span className="text-neutral-500 text-sm">Type</span><span className="font-semibold text-neutral-900">{donationType === "mensuel" ? "Don mensuel" : "Don unique"}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500 text-sm">Montant</span><span className="font-bold text-primary-600 text-lg">{finalAmount}€{donationType === "mensuel" ? "/mois" : ""}</span></div>
                    <div className="border-t border-neutral-200 pt-3 flex justify-between"><span className="text-neutral-500 text-sm">Donateur</span><span className="font-semibold text-neutral-900">{anonymous ? "Anonyme" : formData.firstName + " " + formData.lastName}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500 text-sm">Email</span><span className="font-semibold text-neutral-900 text-sm">{formData.email}</span></div>
                  </div>
                  <div className="bg-primary-50 border border-primary-100 rounded-xl p-5 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <CreditCard className="w-5 h-5 text-primary-600" />
                      <span className="font-semibold text-primary-700">Paiement securise</span>
                      <span className="ml-auto text-xs bg-white text-primary-600 px-2 py-1 rounded-lg border border-primary-200 font-medium">SSL 256-bit</span>
                    </div>
                    <div className="space-y-3">
                      <input type="text" placeholder="Numero de carte" className="w-full px-4 py-3 rounded-xl border-2 border-primary-100 bg-white focus:outline-none focus:border-primary-400 text-sm" />
                      <div className="grid grid-cols-2 gap-3">
                        <input type="text" placeholder="MM/AA" className="w-full px-4 py-3 rounded-xl border-2 border-primary-100 bg-white focus:outline-none focus:border-primary-400 text-sm" />
                        <input type="text" placeholder="CVV" className="w-full px-4 py-3 rounded-xl border-2 border-primary-100 bg-white focus:outline-none focus:border-primary-400 text-sm" />
                      </div>
                    </div>
                  </div>
                  <PaymentLogos />
                  <div className="flex gap-4 mt-4">
                    <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-2xl border-2 border-neutral-200 text-neutral-600 font-semibold">Retour</button>
                    <button onClick={() => setSubmitted(true)} className="flex-1 bg-secondary-600 hover:bg-secondary-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
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
                    {[{ name: "Marie D.", amount: 50, time: "il y a 2 min" }, { name: "Anonyme", amount: 100, time: "il y a 5 min" }, { name: "Pierre M.", amount: 25, time: "il y a 12 min" }].map((donor, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2"><div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold">{donor.name[0]}</div><span className="text-white/70">{donor.name}</span></div>
                        <div><span className="text-secondary-400 font-semibold">{donor.amount}€</span><span className="text-white/30 ml-2">{donor.time}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            {[
              { emoji: "🔒", title: "Paiement securise", desc: "Vos donnees bancaires sont protegees par un chiffrement SSL 256 bits." },
              { emoji: "📋", title: "Recu fiscal", desc: "Un recu fiscal vous est envoye automatiquement par email apres votre don." },
              { emoji: "🌍", title: "Impact garanti", desc: "98% de votre don est utilise directement sur le terrain dans nos projets." },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-heading font-bold text-neutral-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
