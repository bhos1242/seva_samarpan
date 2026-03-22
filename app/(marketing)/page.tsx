import { HeroCarousel } from "./_components/hero-carousel";
import { ImpactStats } from "./_components/impact-stats";
import { ProgramsSection } from "./_components/programs-section";
import { LifeAtSamarpan } from "./_components/life-at-samarpan";
import { GallerySection } from "./_components/gallery-section";
import { QuoteSection } from "./_components/quote-section";
import { FAQSection } from "./_components/faq-section";
import { FinalCta } from "./_components/final-cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seva Samarpan – Free Library & Old Age Home NGO in Pune",
  description: "Seva Samarpan provides a free study room with 1,500+ books for students and runs an old age home for elders in Pune. Donate, volunteer, or visit us.",
  keywords: ["Seva Samarpan", "NGO Pune", "free library Pune", "free study room Pune", "old age home Pune", "donate NGO Pune", "education NGO Maharashtra", "elder care Pune"],
  openGraph: {
    title: "Seva Samarpan – Free Library & Old Age Home in Pune",
    description: "A free study room for students and a caring home for elders in Pune. Learn how you can support us.",
    url: "/",
    images: [{
      url: `/api/og?title=${encodeURIComponent("Seva Samarpan")}&description=${encodeURIComponent("Free library for students & old age home in Pune.")}`,
      width: 1200,
      height: 630,
      alt: "Seva Samarpan – NGO in Pune"
    }],
  }
};

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    '@id': 'https://sevasamarpan.org/#organization',
    name: 'Seva Samarpan',
    url: 'https://sevasamarpan.org',
    description: 'Seva Samarpan runs a free library for students and an old age home for elders in Pune, Maharashtra.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      addressCountry: 'IN'
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      "name": "Social Programs",
      "itemListElement": [
        {
          "@type": "Service",
          "name": "Free Library & Study Room",
          "description": "A free library and study space with 1,500+ books for underprivileged students in Pune.",
          "provider": { "@id": "https://sevasamarpan.org/#organization" }
        },
        {
          "@type": "Service",
          "name": "Seva Samarpan Old Age Home",
          "description": "A home for elders in Pune providing daily care, medical support, and community.",
          "provider": { "@id": "https://sevasamarpan.org/#organization" }
        },
        {
          "@type": "Service",
          "name": "Student Sponsorship Program",
          "description": "Sponsor the education of underprivileged students in Pune through direct financial support.",
          "provider": { "@id": "https://sevasamarpan.org/#organization" }
        }
      ]
    },
    sameAs: [
      'https://www.facebook.com/sevasamarpan',
      'https://www.instagram.com/sevasamarpan',
      'https://twitter.com/sevasamarpan'
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
        <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
        </div>
        <HeroCarousel />
      </section>

      {/* Extracted Sections */}
      <ImpactStats />
      <ProgramsSection />
      <LifeAtSamarpan />
      <GallerySection />
      <QuoteSection />
      <FAQSection />
      <FinalCta />
    </div>
  );
}

