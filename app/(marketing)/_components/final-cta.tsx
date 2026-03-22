import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-6 md:py-14 bg-secondary/5 dark:bg-secondary/10">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-3xl mx-auto p-6 md:p-12 text-center border-none shadow-xl shadow-secondary/10 relative overflow-hidden group bg-white dark:bg-zinc-950 rounded-2xl md:rounded-[2rem]">
          <div className="absolute inset-0 bg-linear-to-br from-secondary/5 to-transparent -z-10" />
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4 leading-tight">
            Want to <span className="text-primary">contribute?</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-5 md:mb-8 max-w-xl mx-auto">
            Your donation directly supports students and elders in Pune. Every rupee helps.
          </p>
          <div className="flex flex-col sm:flex-row gap-2.5 md:gap-4 justify-center">
            <Button size="default" variant="secondary" className="rounded-xl h-10 md:h-12 px-6 md:px-8 font-semibold shadow-md text-sm md:text-base group" asChild>
              <Link href="/sponsor-students">Donate now <ArrowRight className="ml-1.5 h-3.5 w-3.5 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" /></Link>
            </Button>
            <Button size="default" variant="outline" className="rounded-xl h-10 md:h-12 px-6 md:px-8 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold text-sm md:text-base" asChild>
              <Link href="/about">About us</Link>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}
