import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AboutCTA() {
    return (
        <section className="py-8 md:py-14 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center space-y-3 md:space-y-6">
                <h2 className="text-xl md:text-4xl font-black tracking-tight">Want to be part of our story?</h2>
                <p className="text-xs md:text-base opacity-90 max-w-xl mx-auto font-medium">
                    Your support can transform lives. Every contribution makes a lasting impact.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5 md:gap-4 justify-center">
                    <Button size="default" variant="secondary" className="rounded-xl h-10 md:h-12 px-6 md:px-8 font-bold shadow-lg text-xs md:text-base" asChild>
                        <Link href="/donate">Donate Now</Link>
                    </Button>
                    <Button size="default" variant="outline" className="rounded-xl h-10 md:h-12 px-6 md:px-8 border-2 border-white text-white hover:bg-white hover:text-primary font-bold text-xs md:text-base" asChild>
                        <Link href="/contact">Volunteer</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
