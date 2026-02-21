import { HeroCarousel } from "./_components/hero-carousel";
import { ImpactStats } from "./_components/impact-stats";
import { ProgramsSection } from "./_components/programs-section";
import { FeaturedStudents } from "./_components/featured-students";
import { LifeAtSamarpan } from "./_components/life-at-samarpan";
import { QuoteSection } from "./_components/quote-section";
import { FinalCta } from "./_components/final-cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seva Samarpan | Empowering Lives in Mulshi, Pune",
  description: "Join Seva Samarpan NGO in Pune. We empower tribal students through education and provide a dignified old age home for elders.",
  openGraph: {
    title: "Seva Samarpan | Driving Change in Mulshi, Pune",
    description: "Empowering tribal students with free study rooms and caring for elders. Support our NGO today.",
    url: "/",
    images: [{ url: "/programs/samarpan.png", width: 1200, height: 630, alt: "Seva Samarpan Study Room" }],
  }
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Seva Samarpan',
    url: 'https://sevasamarpan.org',
    description: 'Empowering lives through education and care in Mulshi, Pune.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mulshi, Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    },
    sameAs: [
      'https://www.facebook.com/', // Replace with actual links
      'https://www.instagram.com/',
      'https://twitter.com/'
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

