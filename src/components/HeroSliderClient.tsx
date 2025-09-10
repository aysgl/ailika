'use client'

import {useEffect, useMemo, useState} from 'react'
import Image from 'next/image'
import {Button} from './ui/button'
import {ArrowLeft, ArrowRight} from 'lucide-react'
import type {HeroSlide} from '../types/hero'
import WavyTextBanner from './WavyTextBanner'

export default function HeroSliderClient({slides}: {slides: HeroSlide[]}) {
    const [index, setIndex] = useState(0)
    const count = slides.length

    useEffect(() => {
        if (count <= 1) return
        const id = setInterval(() => setIndex(i => (i + 1) % count), 6000)
        return () => clearInterval(id)
    }, [count])

    const current = useMemo(() => slides[index], [slides, index])

    return (
        <div className="container mx-auto min-h-[70vh] relative mb-16">
            <div className="bg-white/40 backdrop-blur-sm rounded-3xl relative overflow-hidden">
                <div className="px-20 relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center min-h-[70vh]">
                        <div className="space-y-6">
                            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mt-24">
                                {current.title}
                            </h1>
                            {current.description && (
                                <p className="text-foreground text-lg max-w-md">
                                    {current.description}
                                </p>
                            )}
                            {current.ctaHref && current.ctaLabel && (
                                <Button
                                    variant={'secondary'}
                                    size={'lg'}
                                    className="text-white rounded-full text-lg"
                                    asChild>
                                    <a href={current.ctaHref}>
                                        {current.ctaLabel}
                                        <ArrowRight className="ml-2 w-5 h-5" />
                                    </a>
                                </Button>
                            )}
                        </div>

                        <div className="flex justify-center relative mt-16">
                            <div className="relative">
                                {/* Image stage with crossfade/scale animation */}
                                <div className="relative w-90 h-90 bg-white/40 rounded-t-[26%] rounded-br-[26%] shadow-2xl  flex items-center justify-center">
                                    {slides.map((s, i) => (
                                        <div
                                            key={s.id}
                                            className={`absolute -mt-20 inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
                                                i === index
                                                    ? 'opacity-100 translate-y-0 scale-100'
                                                    : 'opacity-0 translate-y-2 scale-95'
                                            }`}>
                                            <Image
                                                src={s.image}
                                                alt={s.title}
                                                width={160}
                                                height={260}
                                                className="object-contain mb-10"
                                            />
                                            {count > 1 && (
                                                <div className="absolute bottom-4 left-4 flex-1">
                                                    <span className="text-sm text-foreground/80">
                                                        {index + 1}/{count}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Reviews pill (md and up) */}
                                <div className="hidden md:flex items-center space-x-4 mt-12 absolute bottom-16 -left-30 bg-white/40 backdrop-blur rounded-full p-4">
                                    <div className="flex -space-x-4">
                                        <div className="w-12 h-12 rounded-full  border-2 border-white overflow-hidden">
                                            <Image
                                                src="/images/hero-slider/profile1.jpg"
                                                alt="Badge"
                                                className="object-cover rounded-full w-full h-full"
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                        <div className="w-12 h-12 rounded-full border-2 border-white">
                                            <Image
                                                src="/images/hero-slider/profile2.jpg"
                                                alt="Badge"
                                                className="object-cover rounded-full w-full h-full"
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                        <div className="w-12 h-12 rounded-full border-2 border-white">
                                            <Image
                                                src="/images/hero-slider/profile3.jpg"
                                                alt="Badge"
                                                className="object-cover rounded-full w-full h-full"
                                                width={48}
                                                height={48}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-xl">
                                            5.2k+
                                        </div>
                                        <div className="text-xs text-foreground">
                                            from our clients
                                        </div>
                                    </div>
                                </div>

                                {current.badgeImage && (
                                    <div className="absolute top-2 right-2 w-20 h-20 rounded-full flex items-center justify-center bg-white/40 backdrop-blur-sm">
                                        <div className="text-center">
                                            <Image
                                                src={current.badgeImage}
                                                alt="Badge"
                                                width={100}
                                                height={100}
                                                className="object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {count > 1 && (
                        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 space-y-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-white/40 backdrop-blur-sm me-1"
                                onClick={() =>
                                    setIndex(i => (i - 1 + count) % count)
                                }>
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="rounded-full bg-white/40 backdrop-blur-sm"
                                onClick={() => setIndex(i => (i + 1) % count)}>
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </div>
                    )}
                </div>
                <div className="mt-8">
                    <WavyTextBanner
                        texts={[current.description || current.title]}
                        color="text-white"
                    />
                </div>
            </div>
        </div>
    )
}
