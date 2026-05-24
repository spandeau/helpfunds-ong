import HeroSection from "@/components/sections/HeroSection";
import ActionsSection from "@/components/sections/ActionsSection";
import ImpactMap from "@/components/sections/ImpactMap";

export default function Home() {
  return (
    <main>

      <HeroSection />

      <ActionsSection />

      <section className="py-24">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-16">
            Des résultats concrets sur le terrain
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            <div className="bg-white p-8 rounded-3xl text-center shadow">
              <div className="text-4xl font-bold">
                50 000+
              </div>
              <p>Bénéficiaires aidés</p>
            </div>

            <div className="bg-white p-8 rounded-3xl text-center shadow">
              <div className="text-4xl font-bold">
                120+
              </div>
              <p>Projets réalisés</p>
            </div>

            <div className="bg-white p-8 rounded-3xl text-center shadow">
              <div className="text-4xl font-bold">
                18
              </div>
              <p>Pays touchés</p>
            </div>

            <div className="bg-white p-8 rounded-3xl text-center shadow">
              <div className="text-4xl font-bold">
                10+
              </div>
              <p>Années d’impact</p>
            </div>

          </div>

        </div>

      </section>

      <ImpactMap />

    </main>
  );
}