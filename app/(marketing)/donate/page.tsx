import { Metadata } from 'next'
import { DonateForm } from './_components/donate-form'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Donate | Seva Samarpan NGO',
    description: 'Support Seva Samarpan NGO with a secure donation. Your contribution helps empower underprivileged students and provide dignified care to elders in Pune.',
    openGraph: {
        title: 'Donate | Seva Samarpan',
        description: 'Your contribution empowers underprivileged students and provides dignified care to elders.',
        url: '/donate',
    }
}

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-background pb-20 pt-16 md:pt-24 relative overflow-hidden">
            {/* Background design */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
            <div className="absolute top-0 right-0 w-full h-[50vh] bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-xl mx-auto space-y-8 text-center mb-12">
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none px-4 py-1.5 text-sm rounded-full">
                         Make An Impact
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
                        Support Our <span className="text-primary flex items-center justify-center gap-3 mt-2">Mission <Heart className="h-8 w-8 fill-current" /></span>
                    </h1>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Your generous contribution directly aids in providing education for tribal children and a secure home for elders. 100% of your donation goes to our causes.
                    </p>
                </div>

                <div className="max-w-xl mx-auto">
                    <DonateForm />
                </div>
            </div>
        </div>
    )
}
