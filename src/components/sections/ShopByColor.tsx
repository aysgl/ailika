'use client'

import {useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import TitleWave from '../TitleWave'

const colorCollections = [
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
    const [hoverColor, setHoverColor] = useState<string | null>(null)

    const handleSwatchClick = (index: number, color: string) => {
        const newColors = [...selectedColors]
        newColors[index] = color
        setSelectedColors(newColors)
    }

    return (
        <section className="container mx-auto xl:px-0 px-2 py-12">
            <TitleWave
                title="Renklere göre alışveriş yapın!"
                headingLevel={2}
                bandClass="text-secondary"
            />

            <div className="flex flex-wrap justify-center mt-6">
                {colorCollections.map((c, i) => (
                    <div
                        key={i}
                        className="transition text-center rounded-2xl p-1 mt-0 lg:mt-auto"
                        style={{
                            marginTop:
                                window.innerWidth < 768 // 1024px altı = mobil
                                    ? '0px'
                                    : i === 0 || i === 4
                                    ? '100px'
                                    : i === 1 || i === 3
                                    ? '50px'
                                    : '0px'
                        }}
                        onMouseEnter={() => setHoverColor(selectedColors[i])}
                        onMouseLeave={() => setHoverColor(null)}>
                        {/* Tırnak divi */}
                        <div
                            className="lg:h-46 lg:w-40 h-38 w-30 rounded-b-[100%] rounded-t-2xl flex justify-center items-end mx-auto"
                            style={{
                                backgroundColor:
                                    hoverColor ?? selectedColors[i],
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
                            <Link href={c.href} className="text-sm font-bold">
                                {c.title}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
