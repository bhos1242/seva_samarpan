import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function LifeAtSamarpan() {
  return (
    <section className="py-6 md:py-10 bg-background overflow-hidden" id="life-at-samarpan">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-3 mb-5 md:mb-10">
          <div>
            <h2 className="text-2xl md:text-5xl font-black tracking-tight mb-1.5 md:mb-4 leading-tight">
              Life at <span className="text-primary italic">Seva Samarpan</span>
            </h2>
            <p className="text-xs md:text-lg text-muted-foreground">
              Glimpses of daily life and community at our Old Age Home in Pune.
            </p>
          </div>
          <Link href="/about" className="text-primary font-bold flex items-center gap-1.5 hover:underline underline-offset-4 text-xs md:text-base shrink-0">
            Our Story <ArrowRight className="h-3.5 w-3.5 md:h-5 md:w-5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-5">
          <div className="col-span-2 row-span-2 relative aspect-4/3 md:aspect-auto rounded-xl md:rounded-[2rem] overflow-hidden group shadow-lg md:shadow-2xl">
             <Image
              src="/old-age/image.png"
              alt="Seva Samarpan Old Age Home"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6 text-white">
               <p className="text-[9px] md:text-sm font-bold uppercase tracking-widest opacity-80 mb-0.5">Our Sanctuary</p>
               <h3 className="text-sm md:text-xl font-bold">Seva Samarpan Old Age Home</h3>
            </div>
          </div>

          <div className="relative aspect-square rounded-xl md:rounded-[2rem] overflow-hidden group shadow-md md:shadow-xl">
            <Image
              src="/old-age/news-1.png"
              alt="Community Life"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white">
               <h4 className="text-xs md:text-sm font-bold">Community Living</h4>
            </div>
          </div>

          <div className="relative aspect-square rounded-xl md:rounded-[2rem] overflow-hidden group shadow-md md:shadow-xl">
            <Image
              src="/old-age/news-2.png"
              alt="Daily Activities"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white">
               <h4 className="text-xs md:text-sm font-bold">Holistic Care</h4>
            </div>
          </div>

          <div className="col-span-2 relative aspect-video rounded-xl md:rounded-[2rem] overflow-hidden group shadow-md md:shadow-xl">
            <Image
              src="/old-age/news-3.png"
              alt="Health & Well-being"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 text-white">
               <h4 className="text-xs md:text-sm font-bold">Safe & Dignified Environment</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
