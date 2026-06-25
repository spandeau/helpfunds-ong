"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Heart, Users, FileText, Globe } from "lucide-react";

interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
  active: boolean;
  category?: string;
}

const FALLBACK_FAQS: FAQ[] = [
  { id: 1, question: "Comment puis-je etre certain que mon don arrive bien sur le terrain ?", answer: "Help Funds publie chaque annee un rapport financier complet certifie par un auditeur independant. 98% de chaque don va directement financer nos projets humanitaires. Vous recevez egalement un rapport d impact personnalise vous montrant concretement l utilisation de votre contribution.", order: 1, active: true },
  { id: 2, question: "Mon don est-il deductible des impots ?", answer: "Oui. En tant qu association reconnue d interet general, vos dons ouvrent droit a une reduction d impot de 66% du montant verse dans la limite de 20% de votre revenu imposable. Un recu fiscal officiel vous est envoye automatiquement par email apres chaque don.", order: 2, active: true },
  { id: 3, question: "Puis-je affecter mon don a un projet specifique ?", answer: "Absolument. Lors de votre don vous pouvez choisir de soutenir un projet precis parmi nos programmes actifs. Vous pouvez egalement laisser Help Funds allouer votre don la ou le besoin est le plus urgent.", order: 3, active: true },
  { id: 4, question: "Comment fonctionne le don mensuel et puis-je l annuler ?", answer: "Le don mensuel est preleve automatiquement chaque mois. Vous pouvez modifier le montant ou annuler votre engagement a tout moment depuis votre espace donateur en ligne, sans frais ni justification.", order: 4, active: true },
  { id: 5, question: "Mes donnees personnelles et bancaires sont-elles protegees ?", answer: "Oui. Nous utilisons Stripe, leader mondial du paiement securise, avec un chiffrement SSL 256 bits. Vos coordonnees bancaires ne transitent jamais par nos serveurs.", order: 5, active: true },
  { id: 6, question: "Est-il possible de faire un don au nom d une entreprise ?", answer: "Oui. Help Funds propose des programmes de partenariat entreprise avec recu fiscal, rapport d impact dedie et visibilite sur nos supports. Contactez-nous pour etudier un partenariat.", order: 6, active: true },
  { id: 7, question: "Comment rejoindre Help Funds en tant que benevole ?", answer: "Nous recherchons regulierement des benevoles qualifies. Rendez-vous sur notre page Contact pour soumettre votre candidature. Nous revenons vers vous sous 72 heures.", order: 7, active: true },
  { id: 8, question: "Dans combien de pays Help Funds intervient-elle ?", answer: "Help Funds est active dans 12 pays d Afrique de l Ouest et d Afrique de l Est dont le Togo, le Senegal, le Mali, le Niger, le Ghana, le Benin, le Kenya et l Ethiopie.", order: 8, active: true },
];

const QUICK_LINKS = [
  { icon: Heart, label: "Faire un don", href: "/don", color: "bg-secondary-50 text-secondary-600 border-secondary-100" },
  { icon: Users, label: "Devenir benevole", href: "/contact", color: "bg-primary-50 text-primary-600 border-primary-100" },
  { icon: FileText, label: "Rapports annuels", href: "/rapports", color: "bg-neutral-50 text-neutral-600 border-neutral-200" },
  { icon: Globe, label: "Nos projets", href: "/projets", color: "bg-secondary-50 text-secondary-600 border-secondary-100" },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>(FALLBACK_FAQS);

  useEffect(() => {
    const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
    fetch(`${STRAPI_URL}/api/faqs?filters[active][$eq]=true&sort=order:asc&pagination[pageSize]=20`)
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data && data.data.length > 0) {
          setFaqs(data.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-widest mb-3">
            Questions frequentes
          </p>
          <h2 className="font-heading font-bold text-neutral-900 text-3xl md:text-4xl mb-4">
            Vous avez des questions ?
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Nous avons les reponses. Si vous ne trouvez pas ce que vous cherchez,
            notre equipe est disponible pour vous aider.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.id}
                className="border border-neutral-200 rounded-2xl overflow-hidden hover:border-primary-200 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-neutral-50 transition-colors"
                >
                  <span className="font-semibold text-neutral-900 pr-4 text-sm md:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? "rotate-180 text-primary-600" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5 bg-neutral-50 border-t border-neutral-100">
                    <p className="text-neutral-600 text-sm leading-relaxed pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}

            <div className="bg-primary-50 border border-primary-100 rounded-2xl p-6 mt-6">
              <p className="font-semibold text-primary-900 mb-1">
                Vous ne trouvez pas votre reponse ?
              </p>
              <p className="text-primary-700 text-sm mb-4">
                Notre equipe repond a toutes vos questions sous 24h.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition-all"
              >
                Nous contacter
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
              <h3 className="font-heading font-bold text-neutral-900 mb-4">Liens rapides</h3>
              <div className="space-y-3">
                {QUICK_LINKS.map(({ icon: Icon, label, href, color }) => (
                  <Link
                    key={label}
                    href={href}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${color} hover:opacity-80 transition-opacity`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-900 to-primary-950 rounded-2xl p-6 text-white">
              <h3 className="font-heading font-bold mb-4">Ils nous font confiance</h3>
              <div className="space-y-4">
                {[
                  { value: "50 000+", label: "beneficiaires aides" },
                  { value: "98%", label: "des dons sur le terrain" },
                  { value: "12", label: "pays d intervention" },
                  { value: "5 ans", label: "d experience" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">{stat.label}</span>
                    <span className="font-bold text-secondary-400">{stat.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <Link
                  href="/rapports"
                  className="text-sm text-white/60 hover:text-white transition-colors underline underline-offset-4"
                >
                  Voir nos rapports annuels
                </Link>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
              <h3 className="font-heading font-bold text-neutral-900 mb-2">Restez informe</h3>
              <p className="text-neutral-500 text-sm mb-4">
                Recevez nos actualites et rapports d impact directement dans votre boite mail.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2.5 rounded-xl border-2 border-neutral-200 focus:outline-none focus:border-primary-500 text-sm"
                />
                <button className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors">
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}