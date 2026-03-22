import { MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Navigation } from 'lucide-react'

export function VisitUsSection() {
    return (
        <section className="py-6 md:py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="bg-zinc-950 text-white rounded-xl md:rounded-[3rem] overflow-hidden shadow-xl md:shadow-2xl">
                    <div className="grid md:grid-cols-2">
                        <div className="p-5 md:p-12 lg:p-16 space-y-4 md:space-y-6 flex flex-col justify-center">
                            <div className="space-y-1.5 md:space-y-3">
                                <h2 className="text-xl md:text-4xl font-bold">Come visit us</h2>
                                <p className="text-zinc-400 text-sm md:text-base leading-snug">You're welcome to visit and spend time with the elders anytime.</p>
                            </div>

                            <div className="space-y-3 md:space-y-5">
                                <div className="flex gap-3 items-start">
                                    <div className="w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-primary flex items-center justify-center shrink-0">
                                        <MapPin className="h-4 w-4 md:h-5 md:w-5 text-white" />
                                    </div>
                                    <div className="space-y-0.5 md:space-y-1.5">
                                        <p className="text-zinc-500 font-medium text-[9px] md:text-xs">Our Address</p>
                                        <p className="text-xs md:text-lg font-bold leading-tight">
                                            Plot No. 32, Near Om Sai Varad Vishwa, Maan-Hinjewadi Road, Pune - 411057
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-3 items-center">
                                    <div className="w-8 h-8 md:w-11 md:h-11 rounded-lg md:rounded-xl bg-zinc-800 flex items-center justify-center shrink-0">
                                        <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-zinc-500 font-medium text-[9px] md:text-xs mb-0.5">Visiting Hours</p>
                                        <p className="font-bold text-xs md:text-base">10:00 AM - 6:00 PM Daily</p>
                                    </div>
                                </div>
                            </div>

                            <Button size="default" className="rounded-xl h-10 md:h-13 w-fit px-5 md:px-8 font-bold gap-1.5 text-xs md:text-base" asChild>
                                <Link href="https://share.google/OGT6tS2kNRrCbFksW" target="_blank">
                                    <Navigation className="h-3.5 w-3.5 md:h-5 md:w-5" /> Get Directions
                                </Link>
                            </Button>
                        </div>
                        <div className="relative h-48 md:h-auto min-h-[200px] md:min-h-[400px]">
                            <Image
                                src="/old-age/news-3.png"
                                alt="Facility View"
                                fill
                                className="object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                            />
                            <div className="absolute inset-0 bg-linear-to-t md:bg-linear-to-r from-zinc-950 via-zinc-950/40 md:via-zinc-950/20 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
