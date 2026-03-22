export function QuoteSection() {
  return (
    <section className="py-8 md:py-14 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <QuoteIcon className="absolute top-6 left-6 w-20 h-20 md:w-40 md:h-40" />
         <QuoteIcon className="absolute bottom-6 right-6 w-20 h-20 md:w-40 md:h-40 rotate-180" />
      </div>
      <div className="w-full max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-6">
          <blockquote className="text-lg md:text-3xl lg:text-4xl font-medium leading-snug">
            &quot;Education is the most powerful weapon which you can use to change the world.&quot;
          </blockquote>
          <p className="text-sm md:text-lg opacity-80 font-semibold tracking-wider">— SAMARPAN TEAM</p>
        </div>
      </div>
    </section>
  );
}

function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-1 4.4" />
      <path d="M13 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-1 4.4" />
    </svg>
  );
}
