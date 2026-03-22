import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export function StudyRoomHero() {
    return (
        <section className="relative h-[35vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
            <Image
                src="/programs/samarpan.png"
                alt="Seva Samarpan Abhyasika"
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-background" />

            <div className="container mx-auto px-4 relative z-10 text-white text-center space-y-2.5 md:space-y-5">
                <Badge className="bg-primary hover:bg-primary/90 text-white border-none px-2.5 py-0.5 md:px-4 md:py-1.5 text-[10px] md:text-sm rounded-full shadow-lg">
                    Knowledge is Power
                </Badge>
                <h1 className="text-2xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase">
                    Seva Samarpan <span className="text-primary italic">Abhyasika</span>
                </h1>
                <p className="text-sm md:text-xl opacity-90 max-w-xl mx-auto font-medium leading-snug">
                    Empowering students through a world-class free library and study sanctuary.
                </p>
                <div className="pt-2 md:pt-4">
                    <a
                        href="https://samarpan.abhyasika.online"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-10 md:h-13 items-center justify-center rounded-xl md:rounded-2xl bg-primary px-5 md:px-10 text-xs md:text-base font-black uppercase tracking-wider text-white shadow-lg shadow-primary/30 transition-all hover:bg-primary/90"
                    >
                        Visit Library Portal
                    </a>
                </div>
            </div>
        </section>
    )
}
