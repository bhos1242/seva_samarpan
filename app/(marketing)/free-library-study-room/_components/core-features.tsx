import { Library, Sparkles, School } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CoreFeatures() {
    return (
        <section className="py-6 md:py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-5 md:mb-12 space-y-2 md:space-y-3">
                    <h2 className="text-xl md:text-4xl font-bold">What our library offers</h2>
                    <p className="text-sm md:text-base text-muted-foreground leading-snug">
                        Everything students need to study and prepare — all for free.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto">
                    {[
                        {
                            icon: Library,
                            title: 'Vast Collection',
                            desc: 'Over 1,500 books covering academics, competitive exams, and general knowledge.'
                        },
                        {
                            icon: Sparkles,
                            title: 'Quiet Study Space',
                            desc: 'A peaceful environment designed specifically for focused learning.'
                        },
                        {
                            icon: School,
                            title: 'Digital Access',
                            desc: 'Internet-enabled learning stations and e-resources for all.'
                        }
                    ].map((feature, i) => (
                        <Card key={i} className="border-none shadow-md md:shadow-lg bg-card rounded-xl md:rounded-2xl overflow-hidden">
                            <CardHeader className="p-4 md:p-8 pb-2 md:pb-4">
                                <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-2xl bg-primary/10 flex items-center justify-center mb-2.5 md:mb-5">
                                    <feature.icon className="h-5 w-5 md:h-7 md:w-7 text-primary" />
                                </div>
                                <CardTitle className="text-base md:text-xl font-bold">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="px-4 md:px-8 pb-4 md:pb-8 pt-0">
                                <p className="text-muted-foreground text-xs md:text-sm leading-snug font-medium">
                                    {feature.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
