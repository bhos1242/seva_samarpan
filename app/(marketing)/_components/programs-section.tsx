import Link from "next/link";
import { BookOpen, HomeIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    title: 'Free Library & Study Room',
    description: 'A free library and study space for students, equipped with over 1,500 books and a quiet learning environment.',
    icon: BookOpen,
    link: '/free-library-study-room',
    color: 'primary',
  },
  {
    title: 'Seva Samarpan Old Age Home',
    description: 'A caring home in Pune for senior citizens with daily meals, medical support, and a warm community.',
    icon: HomeIcon,
    link: '/old-age-home',
    color: 'secondary',
  },
];

export function ProgramsSection() {
  return (
    <section className="pt-4 pb-6 md:pt-8 md:pb-14 bg-background relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-5 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 leading-tight">
            What we <span className="text-primary">do</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed px-2">
            We run two programs in Pune — a free library for students and a home for senior citizens.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {programs.map((program, index) => (
            <ProgramCard key={index} program={program} />
          ))}
        </div>

        {/* Mobile: Simple stacked cards (no carousel for just 2 items) */}
        <div className="md:hidden grid gap-3">
          {programs.map((program, index) => (
            <ProgramCard key={index} program={program} />
          ))}
        </div>

        {/* Section-wide CTA */}
        <div className="mt-6 md:mt-10 text-center">
          <Link href="/programs">
            <Button size="default" variant="secondary" className="h-10 md:h-13 px-6 md:px-10 rounded-xl md:rounded-2xl text-xs md:text-base font-bold shadow-md shadow-secondary/10 group">
              Explore All Programs
              <ArrowRight className="ml-1.5 h-3.5 w-3.5 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ program }: { program: typeof programs[0] }) {
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
    <Link href={program.link} className="block group h-full">
      <div className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-row md:flex-col rounded-xl md:rounded-[2rem] overflow-hidden group relative bg-white dark:bg-zinc-950 border border-black/5 dark:border-white/5">
        <div className="relative z-10 flex flex-row md:flex-col h-full flex-1">
          {/* Icon + Title row on mobile, stacked on desktop */}
          <div className="flex items-center md:items-start gap-3 p-4 md:p-8 md:pb-4 shrink-0">
            <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl ${badgeBg} flex items-center justify-center shrink-0 ${shadowClass}`}>
              <program.icon className={`h-5 w-5 md:h-7 md:w-7 ${iconText}`} />
            </div>
            <div className="md:mt-4">
              <h3 className="text-sm md:text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
                {program.title}
              </h3>
              <p className="text-[11px] md:hidden text-muted-foreground line-clamp-2 mt-0.5">{program.description}</p>
            </div>
          </div>

          <div className="hidden md:flex p-8 pt-0 flex-1 flex-col justify-between">
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-medium">
              {program.description}
            </p>
            <div className={`flex items-center text-sm font-semibold transition-all duration-300 group-hover:translate-x-2 ${iconText}`}>
              Learn more <ArrowRight className="ml-2 h-4 w-4 stroke-[2.5px]" />
            </div>
          </div>

          {/* Mobile arrow */}
          <div className={`md:hidden flex items-center pr-4 ${iconText}`}>
            <ArrowRight className="h-4 w-4 stroke-[2.5px]" />
          </div>
        </div>
      </div>
    </Link>
  );
}

