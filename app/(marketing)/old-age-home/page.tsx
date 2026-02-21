import { Metadata } from 'next'
import { OldAgeHomeHero } from './_components/old-age-home-hero'
import { NewsSection } from './_components/news-section'
import { VisitUsSection } from './_components/visit-us-section'
import { MissionSection } from './_components/mission-section'
import { ContactCTA } from './_components/contact-cta'

export const metadata: Metadata = {
    title: 'Seva Samarpan Old Age Home | Dignified Care in Pune',
    description: 'A sanctuary providing dignified living, holistic care, and a supportive community for elders in Mulshi, Pune.',
    openGraph: {
        title: 'Seva Samarpan Old Age Home in Pune',
        description: 'Providing comprehensive care, medical support, and a peaceful home for elders.',
        url: '/old-age-home',
        images: [{ url: '/old-age/image.png', width: 1200, height: 630, alt: 'Old Age Home' }],
    }
}

export default function OldAgeHomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <OldAgeHomeHero />
            <NewsSection />
            <VisitUsSection />
            <MissionSection />
            <ContactCTA />
        </div>
    )
}
