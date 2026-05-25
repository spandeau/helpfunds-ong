import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DonationForm from "@/components/sections/DonationForm";
import FAQSection from "@/components/sections/FAQSection";

export const metadata: Metadata = {
  title: "Faire un don — Help Funds",
  description: "Soutenez nos projets humanitaires.",
};

export default function DonPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
              98% des dons vont directement sur le terrain
            </div>
            <h1 className="font-heading font-bold text-white mb-4">
              Votre don change <span className="text-secondary-400">des vies</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Chaque contribution permet de financer des projets concrets en education, sante et developpement durable.
            </p>
          </div>
        </section>
        <DonationForm />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
