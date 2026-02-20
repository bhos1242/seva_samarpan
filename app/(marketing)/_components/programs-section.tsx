import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, HomeIcon, Heart, ArrowRight } from "lucide-react";

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

export function ProgramsSection() {
  return (
    <section className="py-8 md:py-12 bg-background">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Do</h2>
          <p className="text-lg text-muted-foreground">
            Samarpan is dedicated to transforming lives through education and compassionate care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => {
            // Apply different branding colors based on the data 'color' field
            const badgeBg = program.color === 'primary' ? 'bg-primary/10' : program.color === 'secondary' ? 'bg-secondary/10' : 'bg-accent/10';
            const iconText = program.color === 'primary' ? 'text-primary' : program.color === 'secondary' ? 'text-secondary' : 'text-accent';
            const shadowClass = program.color === 'primary' ? 'shadow-primary/20' : program.color === 'secondary' ? 'shadow-secondary/20' : 'shadow-accent/20';
            
            return (
              <Link key={index} href={program.link} className="block group">
                <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border-none ring-1 ring-border/30 bg-white/60 dark:bg-zinc-950/60 flex flex-col">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl ${badgeBg} flex items-center justify-center mb-4 transition-transform group-hover:scale-110 shadow-sm ${shadowClass}`}>
                      <program.icon className={`h-7 w-7 ${iconText}`} />
                    </div>
                    <CardTitle className="text-2xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {program.description}
                    </p>
                    <div className={`flex items-center font-bold group-hover:translate-x-1 transition-transform ${iconText}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
          )})}
        </div>
      </div>
    </section>
  );
}
