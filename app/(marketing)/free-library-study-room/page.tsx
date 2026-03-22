import { Metadata } from 'next'
import { StudyRoomHero } from './_components/study-room-hero'
import { ImpactStats } from './_components/impact-stats'
import { CoreFeatures } from './_components/core-features'
import { VisualGallery } from './_components/visual-gallery'
import { VisitSupportSection } from './_components/visit-support-section'

export const metadata: Metadata = {
    title: 'Free Library & Study Room in Pune – Seva Samarpan Abhyasika',
    description: 'Open daily with 1,500+ books, our free library and study room in Pune gives underprivileged students a quiet place to learn. Visit or support us.',
    keywords: ["free library Pune", "free study room Pune", "Seva Samarpan Abhyasika", "student library NGO", "education support Pune"],
    openGraph: {
        title: 'Free Library & Study Room in Pune – Seva Samarpan',
        description: '1,500+ books and a quiet study space open daily for students in Pune. Visit or donate.',
        url: '/free-library-study-room',
        images: [{ url: "/programs/samarpan.png", width: 1200, height: 630, alt: 'Seva Samarpan Free Library & Study Room' }],
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
