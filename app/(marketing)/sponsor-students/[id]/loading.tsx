import { Skeleton } from "@/components/ui/skeleton";

export default function StudentDetailLoading() {
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-12">
      {/* Context Header */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-8 md:py-10 max-w-5xl">
          {/* Back link */}
          <Skeleton className="h-4 w-32 rounded-md mb-6" />

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
            {/* Avatar */}
            <Skeleton className="w-28 h-28 md:w-40 md:h-40 rounded-2xl md:rounded-3xl shrink-0" />

            {/* Text area */}
            <div className="space-y-4 flex-1 pt-2 w-full text-center md:text-left">
              {/* Badge + location */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-4 w-28 rounded-md" />
              </div>

              {/* Name */}
              <Skeleton className="h-9 md:h-14 w-3/4 mx-auto md:mx-0 rounded-lg" />

              {/* Stats row */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 pt-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-3 w-16 rounded-sm" />
                    <Skeleton className="h-4 w-12 rounded-sm" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-8 md:gap-12">
          {/* Content Section */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">
            {/* Tab bar */}
            <div className="flex gap-8 border-b border-border/40 pb-3">
              <Skeleton className="h-5 w-24 rounded-md" />
              <Skeleton className="h-5 w-28 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
            </div>

            {/* Story content lines */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-4/6 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-3/4 rounded-md" />
            </div>

            {/* Share card */}
            <div className="p-6 md:p-8 rounded-2xl bg-muted/30 border border-border/40 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-48 rounded-md" />
                <Skeleton className="h-4 w-64 rounded-md" />
              </div>
              <div className="flex gap-2 shrink-0">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="space-y-6">
              <div className="border border-border/50 shadow-lg bg-card rounded-2xl overflow-hidden">
                <div className="h-1 bg-primary/80" />
                <div className="p-6 md:p-8 space-y-6">
                  {/* Funded / Goal */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <Skeleton className="h-3 w-14 rounded-sm" />
                        <Skeleton className="h-8 w-28 rounded-md" />
                      </div>
                      <div className="space-y-1 text-right">
                        <Skeleton className="h-3 w-10 rounded-sm ml-auto" />
                        <Skeleton className="h-5 w-20 rounded-md ml-auto" />
                      </div>
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-24 rounded-md" />
                      <Skeleton className="h-5 w-12 rounded-md" />
                    </div>
                  </div>

                  {/* Donation amounts */}
                  <Skeleton className="h-5 w-32 mx-auto rounded-md" />
                  <div className="grid grid-cols-3 gap-2">
                    <Skeleton className="h-11 rounded-lg" />
                    <Skeleton className="h-11 rounded-lg" />
                    <Skeleton className="h-11 rounded-lg" />
                  </div>
                  <Skeleton className="h-11 w-full rounded-lg" />

                  {/* Form fields */}
                  <div className="space-y-3.5 pt-4 border-t border-border/40">
                    <div className="space-y-1.5">
                      <Skeleton className="h-3 w-24 rounded-sm" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                    <div className="space-y-1.5">
                      <Skeleton className="h-3 w-28 rounded-sm" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                    <div className="space-y-1.5">
                      <Skeleton className="h-3 w-16 rounded-sm" />
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                  </div>

                  {/* CTA button */}
                  <Skeleton className="h-12 md:h-14 w-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
