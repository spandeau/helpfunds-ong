import HeroSection from "@/components/sections/HeroSection";
import ActionsSection from "@/components/sections/ActionsSection";
import ImpactMap from "@/components/sections/ImpactMap";
import DonationCTASection from "@/components/sections/DonationCTASection";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ActionsSection />

      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Des resultats concrets sur le terrain
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl text-center shadow">
              <div className="text-4xl font-bold">50 000+</div>
              <p>Beneficiaires aides</p>
            </div>
            <div className="bg-white p-8 rounded-3xl text-center shadow">
              <div className="text-4xl font-bold">120+</div>
              <p>Projets realises</p>
            </div>
            <div className="bg-white p-8 rounded-3xl text-center shadow">
              <div className="text-4xl font-bold">18</div>
              <p>Pays touches</p>
            </div>
            <div className="bg-white p-8 rounded-3xl text-center shadow">
              <div className="text-4xl font-bold">10+</div>
              <p>Annees d impact</p>
            </div>
          </div>
        </div>
      </section>

      <ImpactMap />

      <DonationCTASection />
    </main>
  );
}