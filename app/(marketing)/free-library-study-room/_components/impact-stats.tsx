export function ImpactStats() {
    return (
        <section className="py-4 md:py-10 border-b bg-muted/20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-4 gap-2 md:gap-8 max-w-5xl mx-auto">
                    {[
                        { label: 'Books', value: '1,500+' },
                        { label: 'Students/Mo', value: '100+' },
                        { label: 'Study Hrs/Day', value: '12' },
                        { label: 'Successes', value: '50+' }
                    ].map((stat, i) => (
                         <div key={i} className="text-center">
                            <p className="text-xl md:text-4xl font-black text-primary">{stat.value}</p>
                            <p className="text-[9px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground mt-0.5 md:mt-2">{stat.label}</p>
                         </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
