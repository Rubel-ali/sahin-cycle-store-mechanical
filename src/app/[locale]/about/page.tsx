import { HeroSection } from "@/components/about/HeroSection";
import { StorySection } from "@/components/about/StorySection";
import { OfferingsGrid } from "@/components/about/OfferingsGrid";
import { StatsCounter } from "@/components/about/StatsCounter";
import { WhyChooseUs } from "@/components/about/WhyChooseUs";
import { KidsSafetySection } from "@/components/about/KidsSafetySection";
import { MechanicsShowcase } from "@/components/about/MechanicsShowcase";
import { BookingCTA } from "@/components/about/BookingCTA";

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1 bg-white">
      <HeroSection />
      <StorySection />
      <OfferingsGrid />
      <StatsCounter />
      <WhyChooseUs />
      <KidsSafetySection />
      <MechanicsShowcase />
      <BookingCTA />
    </div>
  );
}
