import { Metadata } from 'next'
import { OldAgeHomeHero } from './_components/old-age-home-hero'
import { NewsSection } from './_components/news-section'
import { VisitUsSection } from './_components/visit-us-section'
import { MissionSection } from './_components/mission-section'
import { Gallery } from './_components/gallery'
import { ContactCTA } from './_components/contact-cta'

export const metadata: Metadata = {
    title: 'Old Age Home in Pune – Seva Samarpan Elder Care',
    description: 'Seva Samarpan runs an old age home in Pune with daily meals, medical support, and a caring community for elders. Visit us or support our work.',
    keywords: ["old age home Pune", "senior citizen home Pune", "elder care Pune", "old age home Maharashtra", "Seva Samarpan old age home"],
    openGraph: {
        title: 'Old Age Home in Pune – Seva Samarpan',
        description: 'A caring home for elders in Pune with meals, medical support, and community. Visit or donate.',
        url: '/old-age-home',
        images: [{ url: '/old-age/image.png', width: 1200, height: 630, alt: 'Seva Samarpan Old Age Home in Pune' }],
    }
}

export default function OldAgeHomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <OldAgeHomeHero />
            <NewsSection />
            <VisitUsSection />
            <MissionSection />
            <Gallery />
            <ContactCTA />
        </div>
    )
}
