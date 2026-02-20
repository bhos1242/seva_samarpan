import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Target, Heart, Users, Award, BookOpen, MapPin, Calendar, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Samarpan | Empowering Lives Through Education & Care',
    description: 'Learn about Samarpan NGO\'s mission to provide quality education and dignified care to underprivileged students and elders in Mulshi, Pune.',
}

const milestones = [
    { year: '2014', event: 'Samarpan NGO founded in Mulshi, Pune' },
    { year: '2015', event: 'Study room and library established with 500 books' },
    { year: '2017', event: 'Reached 100 students supported milestone' },
    { year: '2019', event: 'Samarpan Old Age Home opened' },
    { year: '2022', event: 'Library expanded to 1,500+ books' },
    { year: '2024', event: '250+ students supported, 95% success rate achieved' },
]

const values = [
    {
        icon: Heart,
        title: 'Compassion',
        description: 'We lead with empathy and care for every individual we serve.',
    },
    {
        icon: Target,
        title: 'Excellence',
        description: 'We strive for the highest standards in education and care.',
    },
    {
        icon: Users,
        title: 'Community',
        description: 'We build strong communities through collaboration and support.',
    },
    {
        icon: Award,
        title: 'Integrity',
        description: 'We maintain transparency and accountability in all our work.',
    },
]

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-background py-16 md:py-24">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" />
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                            <MapPin className="h-4 w-4" />
                            Mulshi, Pune, Maharashtra
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
                            About{' '}
                            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                Samarpan
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            Dedicated to transforming lives through quality education for underprivileged students
                            and compassionate care for elders since 2014.
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
                            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
                        </div>

                        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                            <p>
                                Samarpan was born from a simple belief: every child deserves access to quality education,
                                and every elder deserves dignity and care in their golden years. Founded in 2014 in the
                                serene hills of Mulshi, Pune, we started with a small study room and a dream to make a
                                difference.
                            </p>
                            <p>
                                Our journey began when we witnessed the struggles of tribal and underprivileged children
                                in rural Mulshi who had to travel long distances for education or lacked proper study
                                facilities. Many talented students were unable to continue their education due to financial
                                constraints and lack of resources.
                            </p>
                            <p>
                                Today, Samarpan stands as a beacon of hope, providing free study space, a comprehensive
                                library with over 1,500 books, and direct education sponsorship to students. We've also
                                extended our compassion to create a warm, dignified home for elders in our community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <Card className="border-none shadow-xl bg-card">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <Target className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Our Mission</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    To empower underprivileged and tribal students in Mulshi through quality education,
                                    resources, and mentorship, while providing dignified care and community for elders.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-xl bg-card">
                            <CardHeader>
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                    <BookOpen className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-2xl font-bold">Our Vision</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    To create a community where every child has access to quality education regardless
                                    of their background, and every elder lives with dignity, respect, and care.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-16 text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Journey</h2>
                            <p className="text-muted-foreground">Milestones that shaped our path</p>
                        </div>

                        <div className="relative space-y-8">
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2 hidden md:block" />
                            
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="flex-1 w-full">
                                        <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-card p-6">
                                            <div className="text-primary font-bold text-xl mb-2">{milestone.year}</div>
                                            <p className="text-muted-foreground font-medium">{milestone.event}</p>
                                        </Card>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-primary border-4 border-background z-10 hidden md:block" />
                                    <div className="flex-1 hidden md:block" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold">Want to be part of our story?</h2>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Your support can transform lives. Every contribution makes a lasting impact on someone's future.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="rounded-full px-10" asChild>
                            <Link href="/students">Sponsor a Student</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-10 border-white text-white hover:bg-white hover:text-primary" asChild>
                            <Link href="/donate">Donate Now</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
