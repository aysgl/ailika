'use client'

import {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TitleWave from '../TitleWave'

type ColorCollection = {
    title: string
    href: string
    image: string
    swatches: string[]
}

const colorCollections: ColorCollection[] = [
    {
        title: 'Gül Pembesi #001',
        href: '/product/ailika-premium-kalici-oje-15ml',
        image: '/nail/nail-naturel.png',
        swatches: ['#F6BCA7']
    },
    {
        title: 'Fıstık Yeşili #024',
        href: '/product/ailika-premium-kalici-oje-15ml',
        image: '/nail/nail-pastel.png',
        swatches: ['#b5ead7']
    },
    {
        title: 'Mercan Çiçeği #123',
        href: '/product/ailika-premium-kalici-oje-15ml',
        image: '/nail/nail-neon.png',
        swatches: ['#ff4d6d']
    },
    {
        title: 'Gece Mavisi #007',
        href: '/product/ailika-premium-kalici-oje-15ml',
        image: '/nail/nail-simli.png',
        swatches: ['#0121C4']
    },
    {
        title: 'Shadow #000',
        href: '/product/ailika-premium-kalici-oje-15ml',
        image: '/nail/nail-dramatik.png',
        swatches: ['#8A6FEA']
    }
]

export default function PopularColor() {
    const [selectedColors, setSelectedColors] = useState(
        colorCollections.map(c => c.swatches[0])
    )
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000)
        return () => clearTimeout(timer)
    }, [])

    const handleSwatchClick = (index: number, color: string) => {
        const newColors = [...selectedColors]
        newColors[index] = color
        setSelectedColors(newColors)
    }

    // Skeleton için tip
    const displayCollections: (ColorCollection | null)[] = isLoading
        ? Array.from({length: 5}, () => null)
        : colorCollections

    return (
        <section className="container mx-auto xl:px-0 px-2 py-12">
            <div
                className="transition-all rounded-3xl py-16 px-4"
                style={{
                    backgroundColor:
                        hoverIndex !== null
                            ? selectedColors[hoverIndex]
                            : 'rgba(255,255,255,0.3)',
                    transition: 'background-color 0.5s ease'
                }}>
                <TitleWave
                    title="Popüler Renkler!"
                    headingLevel={2}
                    bandClass="text-secondary"
                />

                <div className="flex flex-wrap justify-center mt-6 gap-4">
                    {displayCollections.map((c, i) => (
                        <div
                            key={i}
                            className={`
                                transition text-center rounded-2xl p-1 
                                ${
                                    i === 0 || i === 4
                                        ? 'lg:mt-[100px]'
                                        : i === 1 || i === 3
                                        ? 'lg:mt-[50px]'
                                        : 'lg:mt-0'
                                }
                            `}
                            onMouseEnter={() => !isLoading && setHoverIndex(i)}
                            onMouseLeave={() =>
                                !isLoading && setHoverIndex(null)
                            }>
                            {c === null ? (
                                // Skeleton
                                <div className="animate-pulse space-y-2">
                                    <div className="lg:h-46 lg:w-40 h-38 w-30 bg-white/40 rounded-b-[100%] rounded-t-2xl mx-auto" />
                                    <div className="bg-white/40 h-12 w-32 mx-auto rounded-md" />
                                    <div className="flex justify-center gap-2 mt-2">
                                        <div className="w-5 h-5 bg-gray-200 rounded-full" />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div
                                        className="lg:h-46 lg:w-40 h-38 w-30 rounded-b-[100%] rounded-t-2xl flex justify-center items-end mx-auto"
                                        style={{
                                            backgroundColor:
                                                hoverIndex === i
                                                    ? selectedColors[i]
                                                    : selectedColors[i],
                                            transition:
                                                'background-color 0.3s ease'
                                        }}>
                                        <Image
                                            src={c.image}
                                            width={90}
                                            height={140}
                                            alt="nail"
                                            className="object-cover"
                                        />
                                    </div>

                                    <div className="bg-white p-2 rounded-md flex flex-col items-center justify-center text-center mt-2">
                                        <div className="flex items-center gap-1 my-2">
                                            {c.swatches.map((color, idx) => (
                                                <div
                                                    key={idx}
                                                    style={{
                                                        backgroundColor: color
                                                    }}
                                                    className="w-5 h-5 rounded-full transition cursor-pointer"
                                                    onClick={() =>
                                                        handleSwatchClick(
                                                            i,
                                                            color
                                                        )
                                                    }
                                                    onMouseEnter={() =>
                                                        handleSwatchClick(
                                                            i,
                                                            color
                                                        )
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <Link
                                            href={c.href}
                                            className="text-sm font-bold">
                                            {c.title}
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
