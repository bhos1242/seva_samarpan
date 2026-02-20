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
  );
}
