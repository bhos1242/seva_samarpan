import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export function NewsSection() {
    return (
        <section className="py-6 md:py-14 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-5 md:mb-10">
                    <Badge variant="outline" className="mb-2 md:mb-4 border-primary/20 text-primary text-[10px] md:text-xs">Media Coverage</Badge>
                    <h2 className="text-xl md:text-4xl font-black uppercase tracking-tighter">In the News</h2>
                    <p className="text-muted-foreground mt-1.5 md:mt-3 text-xs md:text-base">Our efforts recognized by leading local publications.</p>
                </div>

                <div className="grid grid-cols-2 gap-2.5 md:gap-6 max-w-5xl mx-auto">
                    <div className="relative aspect-video rounded-xl md:rounded-3xl overflow-hidden shadow-md md:shadow-xl border md:border-4 border-card group">
                        <Image
                            src="/old-age/news-1.png"
                            alt="News report 1"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                    <div className="relative aspect-video rounded-xl md:rounded-3xl overflow-hidden shadow-md md:shadow-xl border md:border-4 border-card group">
                        <Image
                            src="/old-age/news-2.png"
                            alt="News report 2"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
