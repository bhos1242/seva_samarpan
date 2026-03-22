import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, BookOpen } from 'lucide-react'

export function MissionVision() {
    return (
        <section className="py-5 md:py-12 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 max-w-5xl mx-auto">
                    <div className="flex gap-3 md:gap-4 p-4 md:p-6 rounded-xl md:rounded-3xl bg-white dark:bg-zinc-950 border border-black/5 dark:border-white/5 shadow-sm">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <Target className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                            <h3 className="text-base md:text-xl font-black uppercase tracking-tight">Mission</h3>
                            <p className="text-xs md:text-base text-muted-foreground font-bold leading-snug">
                                Empowering underprivileged children through education and providing compassionate care for elders in Pune.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 md:gap-4 p-4 md:p-6 rounded-xl md:rounded-3xl bg-white dark:bg-zinc-950 border border-black/5 dark:border-white/5 shadow-sm">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                        </div>
                        <div className="space-y-1 md:space-y-2">
                            <h3 className="text-base md:text-xl font-black uppercase tracking-tight">Vision</h3>
                            <p className="text-xs md:text-base text-muted-foreground font-bold leading-snug">
                                A community where every child excels and every elder lives with dignity and love.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
