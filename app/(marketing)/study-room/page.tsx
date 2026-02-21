import { Metadata } from 'next'
import { StudyRoomHero } from './_components/study-room-hero'
import { ImpactStats } from './_components/impact-stats'
import { CoreFeatures } from './_components/core-features'
import { VisualGallery } from './_components/visual-gallery'
import { VisitSupportSection } from './_components/visit-support-section'

export const metadata: Metadata = {
    title: 'Free Study Room in Pune | NGO Helping Students | Seva Samarpan',
    description: 'Seva Samarpan is a leading NGO helping students with a free study room and library in Pune (Mulshi). Supporting underprivileged education through modern resources.',
    keywords: ["free study room in Pune", "NGO helping student", "student sponsorship NGO", "library for underprivileged", "Seva Samarpan Abhyasika"],
    openGraph: {
        title: 'Seva Samarpan | Free Study Room & NGO Helping Students',
        description: 'Empowering students with a vast library and serene study space in Mulshi, Pune.',
        url: '/study-room',
        images: [{ url: "/programs/samarpan.png", width: 1200, height: 630, alt: 'Study Room' }],
    }
}

export default function StudyRoomPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <StudyRoomHero />
            <ImpactStats />
            <CoreFeatures />
            <VisualGallery />
            <VisitSupportSection />
        </div>
    )
}
