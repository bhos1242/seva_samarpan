import Image from 'next/image'

export function VisualGallery() {
    return (
        <section className="py-6 md:py-14 bg-muted/30">
            <div className="container mx-auto px-4 text-center space-y-4 md:space-y-10">
                 <h2 className="text-xl md:text-4xl font-bold">Inside the Abhyasika</h2>
                 <div className="grid grid-cols-2 gap-2.5 md:gap-6 max-w-5xl mx-auto">
                    <div className="relative aspect-video rounded-xl md:rounded-3xl overflow-hidden shadow-md md:shadow-xl border md:border-4 border-card">
                        <Image src="/programs/samarpan/image.png" alt="Library shelf" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-video rounded-xl md:rounded-3xl overflow-hidden shadow-md md:shadow-xl border md:border-4 border-card">
                        <Image src="/programs/samarpan/image copy.png" alt="Students studying" fill className="object-cover" />
                    </div>
                 </div>
            </div>
        </section>
    )
}
