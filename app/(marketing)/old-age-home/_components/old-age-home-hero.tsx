import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export function OldAgeHomeHero() {
    return (
        <section className="relative h-[35vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
            <Image
                src="/old-age/image.png"
                alt="Seva Samarpan Old Age Home"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background" />

            <div className="container mx-auto px-4 relative z-10 text-white text-center space-y-2.5 md:space-y-5">
                <Badge className="bg-primary hover:bg-primary/90 text-white border-none px-2.5 py-0.5 md:px-4 md:py-1.5 text-[10px] md:text-sm rounded-full shadow-lg">
                    Our Main Project
                </Badge>
                <h1 className="text-2xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase">
                    Seva Samarpan <span className="text-primary">Old Age</span> Home
                </h1>
                <blockquote className="text-sm md:text-2xl font-medium italic opacity-90 max-w-2xl mx-auto leading-snug">
                    &quot;Even if there is no blood relation, there is definitely a bond of love!&quot;
                </blockquote>
            </div>
        </section>
    )
}
