import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DonationForm from "@/components/sections/DonationForm";

export const metadata: Metadata = {
  title: "Faire un don — Help Funds",
  description: "Soutenez nos projets humanitaires. Chaque don compte et change des vies.",
};

export default function DonPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
              98% des dons vont directement sur le terrain
            </div>
            <h1 className="font-heading font-bold text-white mb-4">
              Votre don change
              <span className="text-secondary-400"> des vies</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Chaque contribution, petite ou grande, permet de financer
              des projets concrets en education, sante et developpement durable.
            </p>
          </div>
        </section>

        {/* Formulaire */}
        <DonationForm />

        {/* Confiance */}
        <section className="bg-neutral-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
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
      </main>
      <Footer />
    </>
  );
}