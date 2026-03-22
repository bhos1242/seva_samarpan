"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/olg-age-home-images/old-age-01.jpeg", alt: "Daily activities at old age home" },
  { src: "/olg-age-home-images/old-age-02.jpeg", alt: "Community bonding" },
  { src: "/olg-age-home-images/old-age-03.jpeg", alt: "Care and support" },
  { src: "/olg-age-home-images/old-age-04.jpeg", alt: "Peaceful living" },
  { src: "/olg-age-home-images/old-age-05.jpeg", alt: "Elderly care" },
  { src: "/olg-age-home-images/old-age-06.jpeg", alt: "Medical checkup" },
  { src: "/olg-age-home-images/old-age-07.jpeg", alt: "Group activities" },
  { src: "/olg-age-home-images/old-age-08.jpeg", alt: "Smiling faces" },
  { src: "/olg-age-home-images/old-age-09.jpeg", alt: "Relaxation time" },
  { src: "/olg-age-home-images/old-age-10.jpeg", alt: "Meal time" },
  { src: "/olg-age-home-images/old-age-11.jpeg", alt: "Social interactions" },
  { src: "/olg-age-home-images/old-age-12.jpeg", alt: "Daily care routine" },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="py-6 md:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
            Life at <span className="text-primary">Seva Samarpan</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto">
            Photos from our old age home — everyday moments of care and community.
          </p>
        </div>

        <div className="columns-2 lg:columns-3 gap-2.5 md:gap-4 space-y-2.5 md:space-y-4">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl md:rounded-2xl overflow-hidden cursor-zoom-in group shadow-sm bg-background border"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white hover:text-primary transition-colors z-50 p-2"
            >
              <X size={40} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-50 p-2 md:p-4 bg-white/10 rounded-full"
            >
              <ChevronLeft size={32} />
            </button>

            <motion.div
              key={selectedImage}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
            >
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </motion.div>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-50 p-2 md:p-4 bg-white/10 rounded-full"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
