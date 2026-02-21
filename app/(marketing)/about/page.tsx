import { Metadata } from 'next'
import { AboutHero } from './_components/about-hero'
import { OurStory } from './_components/our-story'
import { MissionVision } from './_components/mission-vision'
import { Timeline } from './_components/timeline'
import { AboutCTA } from './_components/about-cta'

export const metadata: Metadata = {
    title: 'About Seva Samarpan | Empowering Lives Through Education & Care',
    description: 'Learn about Seva Samarpan NGO\'s mission to provide quality education and dignified care to underprivileged students and elders in Mulshi, Pune.',
    openGraph: {
        title: 'About Seva Samarpan | Empowering Lives',
        description: 'Learn about our mission to provide quality education and dignified care in Mulshi, Pune.',
        url: '/about',
    }
}

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <AboutHero />
            <OurStory />
            <MissionVision />
            <Timeline />
            <AboutCTA />
        </div>
    )
}
