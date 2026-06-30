import HeroSection from "@/components/sections/HeroSection";
import ActionsSection from "@/components/sections/ActionsSection";
import StatsSection from "@/components/sections/StatsSection";
import ImpactMap from "@/components/sections/ImpactMap";
import DonationCTASection from "@/components/sections/DonationCTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ActionsSection />
      <StatsSection />
      <ImpactMap />
      <DonationCTASection />
    </main>
  );
}