import { Metadata } from 'next'
import { AboutHero } from './_components/about-hero'
import { OurStory } from './_components/our-story'
import { MissionVision } from './_components/mission-vision'
import { Timeline } from './_components/timeline'
import { AboutCTA } from './_components/about-cta'

export const metadata: Metadata = {
    title: 'About Us – Our Story, Mission & Programs',
    description: 'Seva Samarpan started with a free library for students in Pune and grew to include an old age home. Learn about our journey, team, and what drives our work.',
    keywords: ["about Seva Samarpan", "Seva Samarpan story", "NGO Pune mission", "education NGO Pune", "elder care NGO Pune"],
    openGraph: {
        title: 'About Seva Samarpan – Our Story & Mission',
        description: 'From a free library to an old age home – learn about our journey in Pune.',
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
