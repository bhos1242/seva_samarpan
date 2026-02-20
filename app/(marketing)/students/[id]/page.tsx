'use client'

import { useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Users, Target, Award, MapPin, BookOpen, Heart, Share2, Facebook, Linkedin, Instagram } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Mock data to replicate student profile functionality in marketing route
const GET_STUDENT = (id: string) => ({
    id,
    fullName: 'Priya Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=800&fit=crop',
    age: 16,
    standard: '11th',
    schoolOrCollege: 'Mulshi High School',
    location: 'Mulshi, Pune',
    category: 'TRIBAL',
    story: "Priya is a bright student from a tribal community in Mulshi. Despite the lack of basic resources at home, she has consistently topped her class. She dreams of becoming a doctor to serve her community which currently lacks immediate medical access.\n\nHer family's main source of income is farming, which is barely enough to cover their daily needs. The cost of education, books, and transportation is a major hurdle in her path to higher education.",
    achievements: "• Ranked 1st in 10th standard in her school\n• State level athlete in long jump\n• School cultural leader",
    requiredAmount: 25000,
    collectedAmount: 12000,
    progressPercentage: 48,
    donorCount: 14,
})

export default function StudentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const student = GET_STUDENT(resolvedParams.id)
    const [donationAmount, setDonationAmount] = useState<number>(1000)
    const [customAmount, setCustomAmount] = useState<string>('')

    const formatINR = (amt: number) => 
        new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amt)

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Context Header */}
            <div className="bg-muted/30 border-b">
                <div className="container mx-auto px-4 py-8 md:py-12">
                    <Link href="/students" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors group">
                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Students
                    </Link>
                    
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                        <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0">
                            <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-6 -z-10 group-hover:rotate-12 transition-transform duration-500" />
                            <div className="w-full h-full rounded-3xl overflow-hidden border-4 border-card shadow-2xl">
                                <Image
                                    src={student.photoUrl}
                                    alt={student.fullName}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="space-y-4 flex-1 pt-4">
                            <div className="space-y-2">
                                <Badge className="rounded-full px-3 py-1 mb-2">{student.category}</Badge>
                                <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">{student.fullName}</h1>
                                <p className="text-xl text-muted-foreground font-medium flex items-center justify-center md:justify-start gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    {student.location}
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                                <div className="flex flex-col">
                                    <span className="text-xs opacity-60 mb-1">Standard</span>
                                    <span className="text-foreground">{student.standard}</span>
                                </div>
                                <Separator orientation="vertical" className="h-10 hidden sm:block" />
                                <div className="flex flex-col">
                                    <span className="text-xs opacity-60 mb-1">Age</span>
                                    <span className="text-foreground">{student.age} Years</span>
                                </div>
                                <Separator orientation="vertical" className="h-10 hidden sm:block" />
                                <div className="flex flex-col">
                                    <span className="text-xs opacity-60 mb-1">Impact</span>
                                    <span className="text-foreground">{student.donorCount} Supporters</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Content Section */}
                    <div className="lg:col-span-2 space-y-12">
                        <Tabs defaultValue="story" className="w-full">
                            <TabsList className="w-full justify-start bg-transparent border-b rounded-none h-auto p-0 gap-8">
                                <TabsTrigger value="story" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none px-0 py-4 text-lg font-bold">Story</TabsTrigger>
                                <TabsTrigger value="achievements" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none px-0 py-4 text-lg font-bold">Achievements</TabsTrigger>
                            </TabsList>
                            <TabsContent value="story" className="mt-8">
                                <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line font-medium">
                                    {student.story}
                                </div>
                            </TabsContent>
                            <TabsContent value="achievements" className="mt-8">
                                <div className="space-y-4">
                                    {student.achievements.split('\n').map((achievement, i) => (
                                        <Card key={i} className="p-4 border-none bg-muted/30 shadow-sm flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Award className="h-5 w-5 text-primary" />
                                            </div>
                                            <p className="font-bold pt-2">{achievement.replace('• ', '')}</p>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Share Card */}
                        <Card className="p-8 border-none bg-muted/50 rounded-3xl shadow-inner text-center md:text-left">
                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-2">
                                    <h3 className="text-2xl font-bold flex items-center justify-center md:justify-start gap-2">
                                        <Share2 className="h-6 w-6 text-primary" />
                                        Share Priya's Story
                                    </h3>
                                    <p className="text-muted-foreground">Help us reach more people by sharing this profile with your community.</p>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 hover:scale-110 transition-all"><Facebook /></Button>
                                    <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 hover:scale-110 transition-all"><Instagram /></Button>
                                    <Button variant="secondary" size="icon" className="rounded-full h-12 w-12 hover:scale-110 transition-all"><Linkedin /></Button>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Donation Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <Card className="border-none shadow-2xl bg-card rounded-3xl overflow-hidden ring-1 ring-border/50">
                                <div className="p-8 space-y-8">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                             <div className="space-y-1">
                                                 <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Funded</p>
                                                 <p className="text-3xl font-black">{formatINR(student.collectedAmount)}</p>
                                             </div>
                                             <div className="text-right space-y-1">
                                                 <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Goal</p>
                                                 <p className="text-xl font-bold">{formatINR(student.requiredAmount)}</p>
                                             </div>
                                        </div>
                                        <Progress value={student.progressPercentage} className="h-4 bg-muted" />
                                        <div className="flex justify-between text-sm font-bold tracking-tight">
                                            <span className="text-primary">{student.progressPercentage}% Complete</span>
                                            <span className="text-muted-foreground">{student.donorCount} Supporters</span>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="space-y-6">
                                        <h3 className="text-xl font-bold uppercase tracking-tight text-center">Support Priya</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[500, 1000, 2500].map(amt => (
                                                <Button 
                                                    key={amt} 
                                                    variant={donationAmount === amt && !customAmount ? 'default' : 'outline'}
                                                    className="h-12 rounded-xl font-bold"
                                                    onClick={() => {setDonationAmount(amt); setCustomAmount('')}}
                                                >
                                                    ₹{amt}
                                                </Button>
                                            ))}
                                        </div>
                                        <div className="space-y-4">
                                            <Input 
                                                placeholder="Custom amount (₹)" 
                                                className="h-12 border-none bg-muted/50 focus-visible:ring-primary rounded-xl font-bold"
                                                type="number"
                                                value={customAmount}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCustomAmount(e.target.value)}
                                            />
                                            <Button size="lg" className="w-full h-14 rounded-full text-lg font-black uppercase shadow-xl hover:scale-105 transition-all shadow-primary/20">
                                                <Heart className="mr-2 h-6 w-6 fill-current" />
                                                Donate Now
                                            </Button>
                                        </div>
                                        <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">Secure payment via Razorpay • 80G Tax Benefit</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 border-none bg-primary/5 rounded-3xl text-center space-y-4">
                                 <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <Target className="h-6 w-6 text-primary" />
                                 </div>
                                 <div className="space-y-1">
                                    <h4 className="font-bold uppercase tracking-tight">Direct Impact</h4>
                                    <p className="text-sm text-muted-foreground">100% of your donation goes directly to Priya's educational expenses.</p>
                                 </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
