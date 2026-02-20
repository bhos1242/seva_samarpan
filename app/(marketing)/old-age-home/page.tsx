import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { 
  MapPin, 
  Phone, 
  Clock, 
  Heart, 
  Users, 
  Home as HomeIcon,
  ArrowRight,
  Navigation
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Samarpan Old Age Home | Dignified Care in Pune',
    description: 'A sanctuary providing dignified living, holistic care, and a supportive community for elders in Mulshi, Pune.',
}

export default function OldAgeHomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/old-age/image.png"
                    alt="Samarpan Old Age Home"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-background" />
                
                <div className="container mx-auto px-4 relative z-10 text-white text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <Badge className="bg-primary hover:bg-primary/90 text-white border-none px-4 py-1.5 text-sm mb-6 rounded-full shadow-xl shadow-primary/20">
                        Our Main Project
                    </Badge>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-4">
                        Samarpan <span className="text-primary">Old Age</span> Home
                    </h1>
                    <blockquote className="text-xl md:text-3xl font-medium italic opacity-90 max-w-3xl mx-auto leading-relaxed">
                        &quot;Even if there is no blood relation, there is definitely a bond of love!&quot;
                    </blockquote>
                </div>
            </section>

            {/* News & Recognition Section */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <Badge variant="outline" className="mb-4 border-primary/20 text-primary">Media Coverage</Badge>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">In the News</h2>
                        <p className="text-muted-foreground mt-4">Our efforts towards providing a dignified life for elders have been recognized by leading local publications.</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-card group">
                            <Image
                                src="/old-age/news-1.png"
                                alt="News report 1"
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                        </div>
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-card group">
                            <Image
                                src="/old-age/news-2.png"
                                alt="News report 2"
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Visit Us & Location */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="bg-zinc-950 text-white rounded-[3rem] overflow-hidden shadow-2xl">
                        <div className="grid md:grid-cols-2">
                            <div className="p-10 md:p-16 space-y-8 flex flex-col justify-center">
                                <div className="space-y-4">
                                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Visit the Home</h2>
                                    <p className="text-zinc-400 text-lg">We welcome visitors and donors who wish to spend time with our elders or see our facilities.</p>
                                </div>
                                
                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                                            <MapPin className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Our Address</p>
                                            <p className="text-xl font-bold leading-tight">
                                                Plot No. 32, Near Om Sai Varad Vishwa, Behind Joshi Vadewale, Maan-Hinjewadi Road, Pune - 411057
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 items-center">
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center shrink-0">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Visiting Hours</p>
                                            <p className="font-bold">10:00 AM - 6:00 PM Daily</p>
                                        </div>
                                    </div>
                                </div>

                                <Button size="lg" className="rounded-2xl h-14 w-fit px-8 font-bold gap-2" asChild>
                                    <Link href="https://share.google/OGT6tS2kNRrCbFksW" target="_blank">
                                        <Navigation className="h-5 w-5" /> Get Directions
                                    </Link>
                                </Button>
                            </div>
                            <div className="relative h-64 md:h-auto min-h-[400px]">
                                <Image
                                    src="/old-age/news-3.png"
                                    alt="Facility View"
                                    fill
                                    className="object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-linear-to-r from-zinc-950 via-zinc-950/20 to-transparent" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">A Sanctuary for Dignity</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Samarpan Old Age Home is a dedicated haven and recreation center for underprivileged and helpless elders. We believe that aging should be a journey of respect, comfort, and community.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {[
                                    { icon: Heart, title: 'Holistic Care', desc: 'Comprehensive medical support and physical well-being.' },
                                    { icon: Users, title: 'Vibrant Community', desc: 'A place to make friends, share stories, and live joyfully.' },
                                    { icon: HomeIcon, title: 'Home-like Environment', desc: 'Safe, secure, and dignified living spaces.' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 rounded-3xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                                            <item.icon className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative aspect-square">
                            <div className="absolute inset-0 bg-primary/10 rounded-[3rem] rotate-6" />
                            <div className="relative h-full w-full rounded-[3rem] overflow-hidden shadow-2xl border-4 border-card">
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

            {/* Contact CTA */}
            <section className="py-20">
                <div className="container mx-auto px-4 text-center max-w-3xl space-y-8">
                     <div className="w-20 h-20 rounded-3xl bg-primary mx-auto flex items-center justify-center shadow-xl shadow-primary/30">
                        <Phone className="h-10 w-10 text-white" />
                     </div>
                     <div className="space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Get in Touch</h2>
                        <p className="text-xl text-muted-foreground">
                            For admissions, donations, or visits, please feel free to reach out to us. Your support keeps this haven alive.
                        </p>
                     </div>
                     <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="tel:+917972475067">
                             <Button size="lg" className="h-16 px-10 rounded-2xl text-xl font-bold shadow-2xl shadow-primary/20">
                                <Phone className="mr-3 h-6 w-6" /> +91 79724 75067
                             </Button>
                        </Link>
                        <Link href="/donate">
                            <Button size="lg" variant="outline" className="h-16 px-10 rounded-2xl text-xl font-bold border-2">
                                Support Us <ArrowRight className="ml-3 h-6 w-6" />
                            </Button>
                        </Link>
                     </div>
                </div>
            </section>
        </div>
    )
}
