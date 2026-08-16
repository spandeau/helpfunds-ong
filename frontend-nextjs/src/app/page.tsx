import HeroSection from "@/components/sections/HeroSection";
import ActionsSection from "@/components/sections/ActionsSection";
import PresentationVideoSection from "@/components/sections/PresentationVideoSection";
import StatsSection from "@/components/sections/StatsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ActiveCampaignsSection from "@/components/sections/ActiveCampaignsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import PartnersSection from "@/components/sections/PartnersSection";
import ImpactMap from "@/components/sections/ImpactMap";
import DonationCTASection from "@/components/sections/DonationCTASection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ActionsSection />
      <PresentationVideoSection />
      <StatsSection />
      <ProjectsSection />
      <ActiveCampaignsSection />
      <TestimonialsSection />
      <PartnersSection />
      <FAQSection />
      <ImpactMap />
      <DonationCTASection />
    </main>
  );
}