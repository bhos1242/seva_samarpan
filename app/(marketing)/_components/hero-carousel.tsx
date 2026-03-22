'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const programs = [
    {
        id: 7,
        title: 'Seva Samarpan Abhyasika',
        description: 'A free library and study room with 1,500+ books for students in Pune. Open daily for focused learning in a quiet, well-equipped space.',
        image: '/programs/samarpan.png',
        link: '/free-library-study-room',
        color: 'bg-primary',
    },
    {
        id: 8,
        title: 'Seva Samarpan Old Age Home',
        description: 'A home for elders in Pune with daily meals, medical support, and a caring community. Because every elder deserves respect and comfort.',
        image: '/old-age/image.png',
        link: '/old-age-home',
        color: 'bg-orange-600',
    },
    {
        id: 9,
        title: 'Elder Care & Support',
        description: 'We look after our elders like family — from health check-ups and nutritious food to daily activities and companionship.',
        image: '/old-age/news-1.png',
        link: '/old-age-home',
        color: 'bg-primary',
    },
]

export const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % programs.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % programs.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + programs.length) % programs.length)
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-10">
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center min-h-[320px] md:min-h-[480px]">
                {/* Text Content */}
                <div className="relative z-10 order-2 md:order-1 flex flex-col justify-center">
                    <div key={currentIndex} className="space-y-3 md:space-y-5 animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="inline-flex items-center space-x-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-bold w-fit border border-primary/20">
                            <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-full w-full bg-primary"></span>
                            </span>
                            <span className="uppercase tracking-wider text-[9px] md:text-xs">Featured Program</span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            {programs[currentIndex].title}
                        </h1>

                        <p className="text-sm md:text-lg text-muted-foreground max-w-lg leading-snug font-medium line-clamp-3 md:line-clamp-none">
                            {programs[currentIndex].description}
                        </p>

                        <div className="flex gap-2.5 md:gap-4 pt-1 md:pt-3">
                            <Button size="default" variant="secondary" className="rounded-xl h-10 md:h-13 px-5 md:px-8 font-bold shadow-md shadow-secondary/10 text-xs md:text-base group" asChild>
                                <Link href={programs[currentIndex].link}>
                                    Learn More <ArrowRight className="ml-1.5 h-3.5 w-3.5 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="default" className="rounded-xl h-10 md:h-13 px-5 md:px-8 font-bold border-2 hover:bg-muted/50 text-xs md:text-base" asChild>
                                <Link href="/donate">Donate</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Indicators */}
                    <div className="flex items-center space-x-2 mt-4 md:mt-8">
                        {programs.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentIndex
                                    ? 'w-6 h-1.5 md:w-8 md:h-2 bg-primary'
                                    : 'w-1.5 h-1.5 md:w-2 md:h-2 bg-muted hover:bg-primary/30'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Image Content */}
                <div className="relative order-1 md:order-2 flex items-center justify-center">
                    <div className="relative w-full aspect-4/3 md:aspect-square max-w-[500px] mx-auto">
                        <div key={`img-${currentIndex}`} className="relative w-full h-full animate-in fade-in zoom-in-95 duration-700">
                            <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl border-2 md:border-4 border-card">
                                <Image
                                    src={programs[currentIndex].image}
                                    alt={programs[currentIndex].title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="absolute -bottom-3 right-2 md:-right-4 flex space-x-1.5">
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={prevSlide}
                                className="rounded-full shadow-md h-8 w-8 md:h-10 md:w-10"
                            >
                                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={nextSlide}
                                className="rounded-full shadow-md h-8 w-8 md:h-10 md:w-10"
                            >
                                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
