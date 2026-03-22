import { Users, BookOpen, TrendingUp, Award } from "lucide-react";

const impactStats = [
  { label: 'People Helped', value: '500+', icon: Users },
  { label: 'Books Available', value: '1,500+', icon: BookOpen },
  { label: 'Students Daily', value: '150+', icon: TrendingUp },
  { label: 'Elders Cared For', value: '25+', icon: Award },
];

export function ImpactStats() {
  return (
    <section className="py-4 md:py-8 border-y bg-muted/30">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5">
          {impactStats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center gap-1 p-3 md:p-5 rounded-2xl md:rounded-3xl bg-white/50 dark:bg-zinc-950/50 shadow-sm border border-black/5 transition-all group"
            >
              <div className="p-2 md:p-3 rounded-full bg-primary/10 text-primary">
                <stat.icon className="h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div className="text-2xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
