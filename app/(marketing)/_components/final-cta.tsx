import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function FinalCta() {
  return (
    <section className="py-12 md:py-24 bg-secondary/5 dark:bg-secondary/10">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-4xl mx-auto p-12 text-center border-none shadow-xl shadow-secondary/10 relative overflow-hidden group bg-white dark:bg-zinc-950">
          <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent -z-10 group-hover:scale-110 transition-transform duration-700" />
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Your support can change lives. Whether through student sponsorship or donations to our programs, every contribution counts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-10 border-2 border-accent bg-accent hover:bg-transparent hover:text-accent font-bold" asChild>
              <Link href="/donate">Sponsor a Student</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-10 text-secondary border-2 border-secondary hover:bg-secondary hover:text-white font-bold" asChild>
              <Link href="/about">Our Mission</Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
