import HeroSection from "@/components/landing/HeroSection";
import TrustedCompanies from "@/components/landing/TrustedCompanies";
import Features from "@/components/landing/Features";
import Reviews from "@/components/landing/Reviews";
import CallToAction from "@/components/landing/CallToAction";
import Pricing from "@/components/landing/Pricing";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-900">
      <HeroSection />
      <TrustedCompanies />
      <Features />
      <Reviews />
      <Pricing />
      <CallToAction />
    </main>
  );
}
