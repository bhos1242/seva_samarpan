import { Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ContactCTA() {
    return (
        <section className="py-8 md:py-16 bg-muted/20">
            <div className="container mx-auto px-4 text-center max-w-3xl space-y-4 md:space-y-6">
                 <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary mx-auto flex items-center justify-center shadow-md shadow-primary/30">
                    <Phone className="h-6 w-6 md:h-8 md:w-8 text-white" />
                 </div>
                 <div className="space-y-1.5 md:space-y-3">
                    <h2 className="text-xl md:text-4xl font-black uppercase tracking-tighter">Get in Touch</h2>
                    <p className="text-xs md:text-base text-muted-foreground leading-snug font-medium max-w-md mx-auto">
                        For admissions, donations, or visits, reach out to us. Your support keeps this haven alive.
                    </p>
                 </div>
                 <div className="flex flex-col sm:flex-row gap-2.5 md:gap-4 justify-center items-center">
                    <Link href="tel:+919422262499" className="w-full sm:w-auto">
                         <Button size="default" className="w-full h-11 md:h-14 px-6 md:px-10 rounded-xl text-sm md:text-lg font-bold shadow-md shadow-primary/20">
                            <Phone className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5" /> +91 94222 62499
                         </Button>
                    </Link>
                    <Link href="/sponsor-students" className="w-full sm:w-auto">
                        <Button size="default" variant="outline" className="w-full h-11 md:h-14 px-6 md:px-10 rounded-xl text-sm md:text-lg font-bold border-2 hover:bg-primary hover:text-white">
                            Donate <ArrowRight className="ml-1.5 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
                        </Button>
                    </Link>
                 </div>
            </div>
        </section>
    )
}
