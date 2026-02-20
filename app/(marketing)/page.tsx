import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, Users, Heart, TrendingUp, Award, ArrowRight, HomeIcon } from "lucide-react";
import { HeroCarousel } from "./_components/hero-carousel";
import { StudentCard } from "./_components/student-card";

const featuredStudents = [
  {
    id: '1',
    fullName: 'Priya Sharma',
    photoUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop',
    age: 16,
    standard: '11th',
    schoolOrCollege: 'Mulshi High School',
    location: 'Mulshi, Pune',
    category: 'TRIBAL',
    requiredAmount: 25000,
    collectedAmount: 12000,
  },
  {
    id: '2',
    fullName: 'Rahul Patil',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    age: 19,
    standard: 'B.Com 2nd Year',
    schoolOrCollege: 'Pune College',
    location: 'Mulshi, Pune',
    category: 'UNDERPRIVILEGED',
    requiredAmount: 40000,
    collectedAmount: 28000,
  },
  {
    id: '3',
    fullName: 'Anita Desai',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    age: 14,
    standard: '9th',
    schoolOrCollege: 'Government School',
    location: 'Mulshi, Pune',
    category: 'TRIBAL',
    requiredAmount: 18000,
    collectedAmount: 5000,
  },
];

const impactStats = [
  { label: 'Students Supported', value: '250+', icon: Users },
  { label: 'Books in Library', value: '1,500+', icon: BookOpen },
  { label: 'Success Rate', value: '95%', icon: TrendingUp },
  { label: 'Years of Service', value: '10+', icon: Award },
];

const programs = [
  {
    title: 'Samarpan Abhyasika',
    description: 'A dedicated library and study space for tribal and underprivileged students, equipped with over 1,500 books and modern learning resources.',
    icon: BookOpen,
    link: '/programs/abhyasika',
    color: 'primary',
  },
  {
    title: 'Samarpan Old Age Home',
    description: 'A sanctuary in Mulshi providing dignified living, holistic care, and a supportive community for our elders.',
    icon: HomeIcon,
    link: '/programs/old-age-home',
    color: 'secondary',
  },
  {
    title: 'Education Sponsorship',
    description: 'Direct financial and academic support for students, covering tuition, uniforms, and essential educational materials.',
    icon: Heart,
    link: '/students',
    color: 'muted',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
        </div>
        <HeroCarousel />
      </section>

      {/* Impact Stats */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2 group"
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Do</h2>
            <p className="text-lg text-muted-foreground">
              Samarpan is dedicated to transforming lives through education and compassionate care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Link key={index} href={program.link} className="block group">
                <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-none ring-1 ring-border/50">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                      <program.icon className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {program.description}
                    </p>
                    <div className="flex items-center text-primary font-semibold group-hover:underline transition-all underline-offset-4">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Students */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Support Our Students</h2>
            <p className="text-lg text-muted-foreground">
              Every contribution makes a direct difference in a student&apos;s educational journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" className="rounded-full px-8" asChild>
              <Link href="/students">
                View All Students <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      {/* Life at Samarpan Gallery */}
      <section className="py-20 bg-background overflow-hidden" id="life-at-samarpan">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Life at Samarpan</h2>
              <p className="text-lg text-muted-foreground">
                Glimpses of the daily life, happiness, and community at our Old Age Home in Mulshi.
              </p>
            </div>
            <Link href="/about" className="text-primary font-bold flex items-center gap-2 hover:underline underline-offset-4">
              View Our Story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 md:row-span-2 relative aspect-4/5 md:aspect-auto rounded-[2rem] overflow-hidden group shadow-2xl">
               <Image 
                src="/old-age/image.png" 
                alt="Samarpan Old Age Home" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-8 left-8 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                 <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Our Sanctuary</p>
                 <h3 className="text-2xl font-bold">Samarpan Old Age Home</h3>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-[2rem] overflow-hidden group shadow-xl">
              <Image 
                src="/old-age/news-1.png" 
                alt="Community Life" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                 <h4 className="font-bold">Community Living</h4>
              </div>
            </div>

            <div className="relative aspect-square rounded-[2rem] overflow-hidden group shadow-xl">
              <Image 
                src="/old-age/news-2.png" 
                alt="Daily Activities" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                 <h4 className="font-bold">Holistic Care</h4>
              </div>
            </div>

            <div className="md:col-span-2 relative aspect-video md:aspect-auto h-64 rounded-[2rem] overflow-hidden group shadow-xl">
              <Image 
                src="/old-age/news-3.png" 
                alt="Health & Well-being" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                 <h4 className="font-bold">Safe & Dignified Environment</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <QuoteIcon className="absolute top-10 left-10 w-40 h-40" />
           <QuoteIcon className="absolute bottom-10 right-10 w-40 h-40 rotate-180" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <blockquote className="text-3xl md:text-5xl font-medium leading-tight">
              &quot;Education is the most powerful weapon which you can use to change the world.&quot;
            </blockquote>
            <p className="text-xl opacity-80 font-semibold tracking-wider">— SAMARPAN TEAM</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center border-none shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent -z-10 group-hover:scale-110 transition-transform duration-700" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Your support can change lives. Whether through student sponsorship or donations to our programs, every contribution counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full px-10" asChild>
                <Link href="/donate">Sponsor a Student</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10" asChild>
                <Link href="/about">Our Mission</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-1 4.4" />
      <path d="M13 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-1 4.4" />
    </svg>
  );
}
