import { Users, BookOpen, TrendingUp, Award } from "lucide-react";

const impactStats = [
  { label: 'Students Supported', value: '250+', icon: Users },
  { label: 'Books in Library', value: '1,500+', icon: BookOpen },
  { label: 'Success Rate', value: '95%', icon: TrendingUp },
  { label: 'Years of Service', value: '10+', icon: Award },
];

export function ImpactStats() {
  return (
    <section className="py-8 md:py-12 border-y bg-muted/30">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3 p-6 rounded-3xl bg-white/50 dark:bg-zinc-950/50 hover:bg-white dark:hover:bg-zinc-900 shadow-sm border border-black/5 hover:shadow-md transition-all group"
            >
              <div className="p-3.5 rounded-full bg-primary/10 text-primary transition-transform group-hover:scale-110">
                <stat.icon className="h-7 w-7" />
              </div>
              <div className="text-4xl md:text-5xl font-black tracking-tight text-primary drop-shadow-sm">{stat.value}</div>
              <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
