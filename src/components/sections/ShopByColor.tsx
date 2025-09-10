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
        title: 'Doğal Tonlar',
        href: '/product/ailika-premium-kalici-oje-15ml',
        image: '/nail/nail-naturel.png',
        swatches: ['#f5e0d3', '#d9b8a6', '#c19782']
    },
    {
        title: 'Pastel Tonlar',
        href: '/product/ailika-premium-kalici-oje-15ml',
        image: '/nail/nail-pastel.png',
        swatches: ['#b5ead7', '#a5d8ff', '#ffd6e0']
    },
    {
        title: 'Neon Parıltısı',
        href: '/product/ailika-premium-kalici-oje-15ml',
        image: '/nail/nail-neon.png',
        swatches: ['#ff4d6d', '#39ff14', '#00f5ff']
    },
    {
        title: 'Simli Geceler',
        href: '/product/ailika-premium-kalici-oje-15ml',
        image: '/nail/nail-simli.png',
        swatches: ['#efc2c2', '#ffd700', '#1D4D62']
    },
    {
        title: 'Dramatik Tonlar',
        href: '/product/ailika-premium-kalici-oje-15ml',
        image: '/nail/nail-dramatik.png',
        swatches: ['#000000', '#3a0ca3', '#720026']
    }
]

export default function ShopByColor() {
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

    // Skeleton için tip belirledik
    const displayCollections: (ColorCollection | null)[] = isLoading
        ? Array.from({length: 5}, () => null)
        : colorCollections

    return (
        <section className="container mx-auto md:px-0 px-2 py-12">
            <TitleWave
                title="Renklere göre alışveriş yapın!"
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
                        onMouseLeave={() => !isLoading && setHoverIndex(null)}>
                        {c === null ? (
                            // Skeleton
                            <div className="animate-pulse space-y-2">
                                <div className="lg:h-46 lg:w-40 h-38 w-30 bg-gray-200 rounded-b-[100%] rounded-t-2xl mx-auto" />
                                <div className="bg-gray-200 h-12 w-32 mx-auto rounded-md" />
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
                                        transition: 'background-color 0.3s ease'
                                    }}>
                                    <Image
                                        src={c.image}
                                        width={90}
                                        height={140}
                                        alt="nail"
                                        className="object-cover"
                                    />
                                </div>

                                <div className="bg-white p-2 rounded-md flex flex-col items-center justify-center text-center">
                                    <div className="flex items-center gap-1 my-2">
                                        {c.swatches.map((color, idx) => (
                                            <button
                                                key={idx}
                                                style={{backgroundColor: color}}
                                                className={`w-5 h-5 rounded-full border transition ${
                                                    selectedColors[i] === color
                                                        ? 'border-2 border-primary'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    handleSwatchClick(i, color)
                                                }
                                                onMouseEnter={() =>
                                                    handleSwatchClick(i, color)
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
        </section>
    )
}
