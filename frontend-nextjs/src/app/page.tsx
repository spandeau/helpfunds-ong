import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import StatsSection from "@/components/sections/StatsSection";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="pt-32">

        <HeroSection />

        <StatsSection />

      </main>
    </>
  );
}