import { Metadata } from 'next'
import { DonateForm } from './_components/donate-form'
import { DonationAnimation } from './_components/donation-animation'
import { Badge } from '@/components/ui/badge'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Donate – Support Education & Elder Care in Pune',
    description: 'Make a secure online donation to Seva Samarpan. Your contribution funds our free library for students and old age home for elders in Pune.',
    keywords: ["donate Seva Samarpan", "donate NGO Pune", "support education Pune", "donate elder care Pune", "online donation NGO"],
    openGraph: {
        title: 'Donate to Seva Samarpan',
        description: 'Fund our free library and old age home in Pune. Every contribution directly supports students and elders.',
        url: '/donate',
    }
}

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-background pb-8 pt-6 md:pt-14 relative overflow-hidden">
            <div className="hidden md:block absolute top-0 right-0 w-full h-[50vh] bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Header Section */}
                <div className="space-y-2 md:space-y-4 text-center mb-5 md:mb-8">
                    <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none px-2.5 py-0.5 md:px-4 md:py-1.5 text-[10px] md:text-sm rounded-full inline-flex mx-auto">
                         Donate
                    </Badge>

                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold relative z-20">
                        Support our <span className="text-primary inline-flex items-center gap-1.5 md:gap-2">work <Heart className="h-5 w-5 md:h-7 md:w-7 fill-current" /></span>
                    </h1>

                    <p className="text-muted-foreground text-sm md:text-base leading-snug max-w-xl mx-auto">
                        Your donation goes directly to our library and old age home in Pune.
                    </p>
                </div>

                {/* Content Section (Animation + Form) */}
                <div className="flex flex-col lg:flex-row gap-4 md:gap-8 lg:gap-12 items-center justify-center">
                    {/* Animation Side - hidden on small mobile */}
                    <div className="hidden sm:flex w-full lg:w-1/2 justify-center items-center">
                        <div className="w-full max-w-[220px] lg:max-w-sm xl:max-w-md">
                            <DonationAnimation />
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="w-full lg:w-1/2 max-w-xl">
                        <DonateForm />
                    </div>
                </div>
            </div>
        </div>
    )
}
