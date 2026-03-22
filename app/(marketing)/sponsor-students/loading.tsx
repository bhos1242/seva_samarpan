import { Skeleton } from "@/components/ui/skeleton";

export default function SponsorStudentsLoading() {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header Section */}
      <section className="relative py-8 md:py-16 bg-muted/20 border-b">
        <div className="max-w-8xl mx-auto px-4 relative text-center space-y-3">
          <Skeleton className="h-8 md:h-12 w-64 md:w-96 mx-auto rounded-lg" />
          <Skeleton className="h-4 md:h-5 w-80 md:w-[28rem] mx-auto rounded-md" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 -mt-5 relative z-10 w-full">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-card p-2 md:p-3 rounded-2xl shadow-xl border border-border/40 mb-6 md:mb-10">
          <Skeleton className="h-9 md:h-11 w-full md:max-w-md rounded-xl" />
          <Skeleton className="h-9 md:h-11 w-full md:w-[160px] rounded-xl" />
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border/40 bg-card overflow-hidden"
            >
              <Skeleton className="aspect-square w-full rounded-none" />
              <div className="p-3 md:p-4 space-y-2">
                <Skeleton className="h-4 md:h-5 w-3/4 rounded-md" />
                <Skeleton className="h-3 md:h-4 w-1/2 rounded-md" />
                <Skeleton className="h-3 w-2/3 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
