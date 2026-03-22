import { MapPin } from 'lucide-react'

export function AboutHero() {
    return (
        <section className="relative overflow-hidden bg-background py-6 md:py-14">
            <div className="hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-2 md:space-y-3">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[10px] md:text-sm font-black mb-1 uppercase tracking-tight">
                        <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5" />
                        Pune, Maharashtra
                    </div>
                    <h1 className="text-2xl md:text-5xl font-black leading-tight tracking-tight">
                        About{' '}
                        <span className="text-primary italic">
                            Seva Samarpan
                        </span>
                    </h1>
                    <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto leading-snug font-bold">
                        Empowering students through education and caring for elders with dignity.
                    </p>
                </div>
            </div>
        </section>
    )
}
