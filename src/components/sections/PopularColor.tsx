'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TitleWave from '../TitleWave'

const colorCollections = [
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
    const [hoverColor, setHoverColor] = useState<string | null>(null)

    const handleSwatchClick = (index: number, color: string) => {
        const newColors = [...selectedColors]
        newColors[index] = color
        setSelectedColors(newColors)
    }

    return (
        <section className="container mx-auto xl:px-0 px-2 py-12">
            {/* Section altındaki container div */}
            <div
                className="transition-all rounded-3xl py-16 px-4"
                style={{
                    backgroundColor: hoverColor
                        ? `${hoverColor}` // hoverColor + %20 şeffaflık (hex’in sonuna 33 ekledik)
                        : 'rgba(255,255,255,0.3)', // default bg-white/30
                    transition: 'background-color 0.5s ease'
                }}>
                <TitleWave
                    title="Popüler Renkler!"
                    headingLevel={2}
                    bandClass="text-secondary"
                />

                <div className="flex flex-wrap justify-center mt-6">
                    {colorCollections.map((c, i) => (
                        <div
                            key={i}
                            className={`
        transition text-center rounded-2xl p-1 
        mt-0       /* mobilde margin-top 0 */
        ${
            i === 0 || i === 4
                ? 'lg:mt-[100px]'
                : i === 1 || i === 3
                ? 'lg:mt-[50px]'
                : 'lg:mt-0'
        }
    `}
                            onMouseEnter={() =>
                                setHoverColor(selectedColors[i])
                            }
                            onMouseLeave={() => setHoverColor(null)}>
                            {/* Tırnak divi */}
                            <div
                                className="lg:h-46 lg:w-40 h-38 w-30 rounded-b-[100%] rounded-t-2xl flex justify-center items-end mx-auto"
                                style={{
                                    backgroundColor: selectedColors[i],
                                    transition: 'background-color 0.3s ease'
                                }}>
                                <Image
                                    src={c.image}
                                    width={90}
                                    height={140}
                                    alt="nail"
                                    className="object-cover "
                                />
                            </div>
                            {c.swatches.map((color, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white relative p-2 rounded-md flex flex-col items-center justify-center text-center">
                                    {c.swatches.map((color, idx) => (
                                        <div
                                            key={idx}
                                            style={{backgroundColor: color}}
                                            className={`w-5 h-5 rounded-full transition my-2`}
                                            onClick={() =>
                                                handleSwatchClick(i, color)
                                            }
                                            onMouseEnter={() =>
                                                handleSwatchClick(i, color)
                                            }
                                        />
                                    ))}
                                    <Link
                                        href={c.href}
                                        className="text-sm font-bold">
                                        {c.title}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
