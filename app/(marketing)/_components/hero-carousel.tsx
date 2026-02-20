'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const programs = [
    {
        id: 7,
        title: 'Samarpan Abhyasika',
        description: 'Free Library and study room for tribal and underprivileged students, providing a quiet and resourceful environment for learning.',
        image: '/programs/samarpan.png',
        link: '/programs/abhyasika',
        color: 'bg-primary',
    },
    {
        id: 8,
        title: 'Samarpan Old Age Home',
        description: 'Dignified care and a loving community for elders in Mulshi, providing medical support, nutritious food, and a place to call home.',
        image: '/old-age/image.png',
        link: '/programs/old-age-home',
        color: 'bg-orange-600',
    },
    {
        id: 9,
        title: 'Compassionate Care',
        description: 'At Samarpan, we believe in giving our elders the respect and quality of life they deserve through holistic support and community engagement.',
        image: '/old-age/news-1.png',
        link: '/programs/old-age-home',
        color: 'bg-primary',
    },
    {
        id: 2,
        title: 'Vidya Adhar',
        description: 'Direct educational support and sponsorship for students to bridge the gap in opportunities.',
        image: '/programs/vidya_adhar.png',
        link: '/programs/vidya-adhar',
        color: 'bg-green-600',
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
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center min-h-[500px] md:min-h-[600px]">
                {/* Text Content */}
                <div className="relative z-10 order-2 md:order-1 flex flex-col justify-center space-y-6">
                    <div key={currentIndex} className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
                        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold w-fit border border-primary/20 shadow-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                            </span>
                            <span className="uppercase tracking-wider text-xs">Featured Program</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            {programs[currentIndex].title}
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                            {programs[currentIndex].description}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <Button size="lg" className="rounded-full h-14 px-8 font-bold shadow-lg shadow-primary/30 hover:shadow-xl transition-all duration-300" asChild>
                                <Link href={programs[currentIndex].link}>
                                    Learn More <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full h-14 px-8 font-bold border-2 hover:bg-muted/50 transition-all duration-300" asChild>
                                <Link href="/donate">
                                    Support Us
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Indicators */}
                    <div className="flex items-center space-x-3 mt-8">
                        {programs.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-300 rounded-full ${index === currentIndex
                                    ? 'w-8 h-2 bg-primary'
                                    : 'w-2 h-2 bg-muted hover:bg-primary/30'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Image Content */}
                <div className="relative order-1 md:order-2 flex items-center justify-center">
                    <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                        {/* Background blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl opacity-60 animate-pulse" />

                        <div key={`img-${currentIndex}`} className="relative w-full h-full animate-in fade-in zoom-in-95 duration-700">
                            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-card transform hover:scale-[1.02] transition-transform duration-500">
                                <Image
                                    src={programs[currentIndex].image}
                                    alt={programs[currentIndex].title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        </div>

                        {/* Navigation Buttons (Floating) */}
                        <div className="absolute -bottom-4 right-0 md:-right-4 flex space-x-2">
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={prevSlide}
                                className="rounded-full shadow-lg hover:scale-110 transition-all duration-200"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </Button>
                            <Button
                                variant="secondary"
                                size="icon"
                                onClick={nextSlide}
                                className="rounded-full shadow-lg hover:scale-110 transition-all duration-200"
                            >
                                <ChevronRight className="h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
