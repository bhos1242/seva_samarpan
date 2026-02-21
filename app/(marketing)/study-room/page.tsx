import { Metadata } from 'next'
import { StudyRoomHero } from './_components/study-room-hero'
import { ImpactStats } from './_components/impact-stats'
import { CoreFeatures } from './_components/core-features'
import { VisualGallery } from './_components/visual-gallery'
import { VisitSupportSection } from './_components/visit-support-section'

export const metadata: Metadata = {
    title: 'Seva Samarpan Abhyasika | Free Study Room & Library in Pune',
    description: 'A dedicated study space providing over 1,500 books and modern resources for tribal and underprivileged students in Mulshi, Pune.',
    openGraph: {
        title: 'Seva Samarpan Abhyasika | Free Study Room & Library in Pune',
        description: 'Empowering students with a vast library and serene study space in Mulshi, Pune.',
        url: '/study-room',
        images: [{ url: '/programs/samarpan.png', width: 1200, height: 630, alt: 'Study Room' }],
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
