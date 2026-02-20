import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import { 
  BookOpen, 
  Users, 
  MapPin, 
  Heart, 
  GraduationCap, 
  Library,
  ArrowRight,
  Sparkles,
  School,
  Clock
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Samarpan Abhyasika | Free Study Room & Library in Pune',
    description: 'A dedicated study space providing over 1,500 books and modern resources for tribal and underprivileged students in Mulshi, Pune.',
}

export default function StudyRoomPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                <Image
                    src="/programs/samarpan.png"
                    alt="Samarpan Abhyasika"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-background" />
                
                <div className="container mx-auto px-4 relative z-10 text-white text-center space-y-6 animate-in fade-in zoom-in-95 duration-1000">
                    <Badge className="bg-primary hover:bg-primary/90 text-white border-none px-4 py-1.5 text-sm mb-6 rounded-full shadow-xl shadow-primary/20">
                        Knowledge is Power
                    </Badge>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase mb-4">
                        Samarpan <span className="text-primary italic">Abhyasika</span>
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto font-medium">
                        Empowering tribal and underprivileged students through access to a world-class library and quiet study sanctuary.
                    </p>
                </div>
            </section>

            {/* Impact Stats */}
            <section className="py-12 border-b bg-muted/20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: 'Books Available', value: '1,500+' },
                            { label: 'Students Monthly', value: '100+' },
                            { label: 'Study Hours', value: '12/day' },
                            { label: 'Success Stories', value: '50+' }
                        ].map((stat, i) => (
                             <div key={i} className="text-center group">
                                <p className="text-3xl md:text-5xl font-black text-primary transition-transform group-hover:scale-110">{stat.value}</p>
                                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mt-2">{stat.label}</p>
                             </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Features */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Everything a Student Needs</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            We provide a bridge between talent and opportunity by offering resources that were previously out of reach for rural students.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { 
                                icon: Library, 
                                title: 'Vast Collection', 
                                desc: 'Over 1,500 books covering academic syllabus, competitive exams, and general knowledge.' 
                            },
                            { 
                                icon: Sparkles, 
                                title: 'Quiet Sanctuary', 
                                desc: 'A peaceful environment away from home distractions, designed specifically for focused learning.' 
                            },
                            { 
                                icon: School, 
                                title: 'Digital Access', 
                                desc: 'Bridging the digital divide with internet-enabled learning stations and e-resources.' 
                            }
                        ].map((feature, i) => (
                            <Card key={i} className="border-none shadow-xl bg-card hover:-translate-y-2 transition-transform duration-500 rounded-[2.5rem] overflow-hidden">
                                <CardHeader className="p-8">
                                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
                                        <feature.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="px-8 pb-8">
                                    <p className="text-muted-foreground text-lg leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visual Gallery Preview */}
            <section className="py-20 bg-muted/30">
                <div className="container mx-auto px-4 text-center space-y-12">
                     <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Inside the Abhyasika</h2>
                     <div className="grid md:grid-cols-2 gap-8">
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-card">
                            <Image src="/programs/samarpan/image.png" alt="Library shelf" fill className="object-cover" />
                        </div>
                        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-card">
                            <Image src="/programs/samarpan/image copy.png" alt="Students studying" fill className="object-cover" />
                        </div>
                     </div>
                </div>
            </section>

            {/* Visit & Support */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-4">
                    <Card className="max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-zinc-950 text-white border-none shadow-2xl relative">
                        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
                        <div className="grid md:grid-cols-2">
                             <div className="p-12 md:p-20 space-y-8">
                                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Support the Study Room</h2>
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    Your donation helps us buy new books, maintain the facility, and provide scholarships to the dedicated students who use this space.
                                </p>
                                <div className="flex gap-4">
                                    <Button size="lg" className="rounded-2xl h-14 px-8 font-bold" asChild>
                                        <Link href="/donate">Donate Now</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 font-bold border-zinc-800 hover:bg-zinc-900" asChild>
                                        <Link href="/students">Sponsor a Student</Link>
                                    </Button>
                                </div>
                             </div>
                             <div className="p-12 md:p-20 bg-zinc-900 flex flex-col justify-center space-y-8">
                                 <h3 className="text-2xl font-bold">Visit Us</h3>
                                 <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <MapPin className="h-6 w-6 text-primary shrink-0" />
                                        <p className="text-zinc-300">Mulshi, Pune, Maharashtra, India</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Clock className="h-6 w-6 text-primary shrink-0" />
                                        <p className="text-zinc-300">Open Daily: 8:00 AM - 8:00 PM</p>
                                    </div>
                                 </div>
                                 <div className="pt-8 border-t border-zinc-800">
                                     <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-2">Contact for Admission</p>
                                     <p className="text-2xl font-black">+91 89835 41719</p>
                                 </div>
                             </div>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    )
}
