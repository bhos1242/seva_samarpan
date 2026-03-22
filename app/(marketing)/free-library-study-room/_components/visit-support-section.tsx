import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MapPin, Clock } from 'lucide-react'

export function VisitSupportSection() {
    return (
        <section className="py-6 md:py-16 bg-background">
            <div className="container mx-auto px-4">
                <Card className="max-w-5xl mx-auto rounded-xl md:rounded-[3rem] overflow-hidden bg-zinc-950 text-white border-none shadow-xl md:shadow-2xl relative">
                    <div className="grid md:grid-cols-2">
                         <div className="p-5 md:p-12 lg:p-16 space-y-3 md:space-y-6">
                            <h2 className="text-xl md:text-4xl font-black uppercase tracking-tighter">Support the Library</h2>
                            <p className="text-zinc-400 text-xs md:text-base leading-snug">
                                Your donation helps buy new books and maintain the facility for students.
                            </p>
                            <Button size="default" className="rounded-xl h-10 md:h-13 px-5 md:px-8 font-bold text-xs md:text-base" asChild>
                                <Link href="/donate">Donate Now</Link>
                            </Button>
                         </div>
                         <div className="p-5 md:p-12 lg:p-16 bg-zinc-900 flex flex-col justify-center space-y-4 md:space-y-6">
                             <h3 className="text-base md:text-2xl font-bold">Visit Us</h3>
                             <div className="space-y-3 md:space-y-5">
                                <div className="flex gap-2.5 md:gap-4 items-center">
                                    <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                                    <p className="text-zinc-300 text-xs md:text-base">Pune, Maharashtra, India</p>
                                </div>
                                <div className="flex gap-2.5 md:gap-4 items-center">
                                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary shrink-0" />
                                    <p className="text-zinc-300 text-xs md:text-base">Open Daily: 8:00 AM - 8:00 PM</p>
                                </div>
                             </div>
                             <div className="pt-4 md:pt-6 border-t border-zinc-800">
                                 <p className="text-zinc-500 font-bold uppercase tracking-widest text-[9px] md:text-xs mb-0.5 md:mb-2">Contact for Admission</p>
                                 <p className="text-lg md:text-2xl font-black">+91 94222 62499</p>
                             </div>
                         </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
