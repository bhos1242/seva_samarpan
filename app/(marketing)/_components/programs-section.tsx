import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, HomeIcon, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    title: 'Free Library & Study Room',
    description: 'A dedicated library and study space for tribal and underprivileged students, equipped with over 1,500 books and modern learning resources.',
    icon: BookOpen,
    link: '/free-library-study-room',
    color: 'primary',
  },
  {
    title: 'Seva Samarpan Old Age Home',
    description: 'A sanctuary in Mulshi providing dignified living, holistic care, and a supportive community for our elders.',
    icon: HomeIcon,
    link: '/old-age-home',
    color: 'secondary',
  },
  {
    title: 'Sponsorship for Needy Students',
    description: 'Direct financial and academic support for students, covering tuition, uniforms, and essential educational materials.',
    icon: Heart,
    link: '/sponsor-needy-students',
    color: 'accent',
  },
];

export function ProgramsSection() {
  return (
    <section className="py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4 md:mb-6">
            Our Core <span className="text-primary italic">Programs</span>
          </h2>
          <p className="text-base md:text-xl text-muted-foreground leading-relaxed">
            Seva Samarpan is dedicated to transforming lives through education, 
            compassionate care, and sustainable community development.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {programs.map((program, index) => {
            const badgeBg = program.color === 'primary' 
              ? 'bg-primary/10' 
              : program.color === 'secondary' 
                ? 'bg-secondary/10' 
                : 'bg-accent/10';
            const iconText = program.color === 'primary' 
              ? 'text-primary' 
              : program.color === 'secondary' 
                ? 'text-secondary' 
                : 'text-accent';
            const shadowClass = program.color === 'primary' 
              ? 'shadow-primary/20' 
              : program.color === 'secondary' 
                ? 'shadow-secondary/20' 
                : 'shadow-accent/20';
            
            return (
              <Link key={index} href={program.link} className="block group h-full">
                <Card className="h-full transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl border-none ring-1 ring-border/50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md flex flex-col rounded-3xl overflow-hidden group">
                  <CardHeader className="p-6 md:p-8 pb-3 md:pb-4">
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${badgeBg} flex items-center justify-center mb-5 md:mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm ${shadowClass}`}>
                      <program.icon className={`h-7 w-7 md:h-8 md:w-8 ${iconText}`} />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                      {program.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 pt-0 flex-1 flex flex-col justify-between">
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6 md:mb-8 font-medium">
                      {program.description}
                    </p>
                    <div className={`flex items-center text-sm md:text-base font-bold transition-all duration-300 group-hover:translate-x-2 ${iconText}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {/* Section-wide CTA linking to /programs */}
        <div className="mt-16 md:mt-24 text-center">
          <Link href="/programs">
            <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl text-base font-bold border-2 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 group">
              Explore All Programs
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

