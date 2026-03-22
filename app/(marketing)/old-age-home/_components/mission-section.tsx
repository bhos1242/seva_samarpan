import { Heart, Users, Home as HomeIcon } from 'lucide-react'
import Image from 'next/image'

export function MissionSection() {
    return (
        <section className="py-6 md:py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-5 md:gap-12 items-center max-w-6xl mx-auto">
                    <div className="space-y-4 md:space-y-6 order-2 md:order-1">
                        <div className="space-y-1.5 md:space-y-3">
                            <h2 className="text-xl md:text-4xl font-bold">A home, not just a shelter</h2>
                            <p className="text-sm md:text-base text-muted-foreground leading-snug">
                                Our old age home gives senior citizens a safe place to live with proper care, food, and companionship.
                            </p>
                        </div>

                        <div className="grid gap-2.5 md:gap-4">
                            {[
                                { icon: Heart, title: 'Health & medical care', desc: 'Regular check-ups and daily health support.' },
                                { icon: Users, title: 'Community & activities', desc: 'Daily activities, festivals, and time spent together.' },
                                { icon: HomeIcon, title: 'Comfortable living', desc: 'Clean rooms, nutritious meals, and a safe environment.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 p-2.5 md:p-4 rounded-xl md:rounded-2xl hover:bg-muted/50 transition-colors">
                                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                        <item.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm md:text-base mb-0.5">{item.title}</h3>
                                        <p className="text-xs md:text-sm text-muted-foreground leading-snug">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative aspect-4/3 md:aspect-square order-1 md:order-2 w-full max-w-xs md:max-w-none mx-auto">
                        <div className="hidden md:block absolute inset-0 bg-primary/10 rounded-[3rem] rotate-6 scale-95" />
                        <div className="relative h-full w-full rounded-xl md:rounded-[3rem] overflow-hidden shadow-lg md:shadow-2xl border-2 md:border-4 border-card">
                            <Image
                                src="/old-age/news-2.png"
                                alt="Elders sharing joy"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
