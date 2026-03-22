export function OurStory() {
    return (
        <section className="py-5 md:py-10 bg-background">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-5 md:gap-8 items-center">
                    <div className="flex-1 space-y-3 md:space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                        <h2 className="text-xl md:text-4xl font-bold text-foreground mb-2 md:mb-4">Our <span className="text-primary">story</span></h2>
                        <p>
                            Seva Samarpan started in 2025 with one goal — giving students from underserved communities a proper place to study. We set up a free library and study room in Pune with over 1,500 books.
                        </p>
                        <p>
                            In January 2026, we opened our old age home to give senior citizens a safe, comfortable place to live. Today, we continue to grow both programs with help from donors and volunteers.
                        </p>
                    </div>
                    <div className="flex-1 w-full aspect-video rounded-xl md:rounded-3xl bg-muted overflow-hidden relative shadow-lg md:shadow-2xl">
                         <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                             <span className="text-primary font-semibold text-xs">Our journey: 2025–26</span>
                         </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
