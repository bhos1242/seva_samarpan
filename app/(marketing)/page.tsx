import { HeroCarousel } from "./_components/hero-carousel";
import { ImpactStats } from "./_components/impact-stats";
import { ProgramsSection } from "./_components/programs-section";
import { FeaturedStudents } from "./_components/featured-students";
import { LifeAtSamarpan } from "./_components/life-at-samarpan";
import { QuoteSection } from "./_components/quote-section";
import { FinalCta } from "./_components/final-cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
        </div>
        <HeroCarousel />
      </section>

      {/* Extracted Sections */}
      <ImpactStats />
      <ProgramsSection />
      <FeaturedStudents />
      <LifeAtSamarpan />
      <QuoteSection />
      <FinalCta />
    </div>
  );
}

