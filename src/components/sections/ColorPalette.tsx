'use client'

import {useMemo, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {products, getProductBySlug} from '@/lib/products'
import TitleWave from '@/components/TitleWave'
import {Button} from '@/components/ui/button'
import {Shuffle, XIcon} from 'lucide-react'

type ColorEntry = {
    color: string
    slug: string
    name: string
    code?: string
    categories?: string[]
}

export default function ColorPalette() {
    const [selectedKey, setSelectedKey] = useState<string | null>(null)

    const entries: ColorEntry[] = useMemo(() => {
        const list: ColorEntry[] = []
        for (const p of products) {
            if (!p.colors || p.colors.length === 0) continue
            for (const c of p.colors) {
                if (!c) continue
                list.push({
                    color: c,
                    slug: p.slug,
                    name: p.name,
                    code: p.code,
                    categories: p.categories
                })
            }
        }
        // Unique by color, keep first occurrence
        const seen = new Set<string>()
        const unique: ColorEntry[] = []
        for (const e of list) {
            const key = e.color.trim().toLowerCase()
            if (seen.has(key)) continue
            seen.add(key)
            unique.push(e)
        }
        return unique
    }, [])

    // Şu an kategori filtresi yok; tüm girişleri kullan
    const filteredEntries = entries

    const onSurprise = () => {
        if (filteredEntries.length === 0) return
        const idx = Math.floor(Math.random() * filteredEntries.length)
        const pick = filteredEntries[idx]
        setSelectedKey(`${pick.slug}-${pick.color}`)
    }

    const selected = selectedKey
        ? filteredEntries.find(e => `${e.slug}-${e.color}` === selectedKey) ||
          null
        : null
    const selectedProduct = selected
        ? getProductBySlug(selected.slug)
        : undefined

    if (entries.length === 0) return null

    return (
        <section className="container mx-auto py-16">
            <div className="mb-4">
                <TitleWave
                    title="Öne Çıkan Renk Paletleri"
                    bandClass="text-secondary"
                />
            </div>

            <div className="relative mt-6">
                {/* Preview overlay when selected - responsive */}
                {selected && (
                    <div className="absolute top-0 left-0 z-20 w-full h-1/2 sm:w-3/5 sm:inset-y-0 md:w-2/4 md:h-full rounded-2xl overflow-hidden">
                        <button
                            className="absolute top-3 right-4 z-10 text-white bg-black/40 rounded-full w-8 h-8 flex items-center justify-center"
                            aria-label="Close"
                            onClick={() => setSelectedKey(null)}>
                            <XIcon className="w-4 h-4" />
                        </button>
                        <div className="relative h-full w-full">
                            <div
                                className="absolute inset-0"
                                style={{backgroundColor: selected.color}}
                            />

                            <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex flex-col justify-start gap-3 sm:gap-6">
                                {selectedProduct?.image && (
                                    <div className="relative aspect-square w-1/4 sm:w-2/3 md:w-1/4">
                                        <Image
                                            src={selectedProduct.image}
                                            alt={selected.name}
                                            fill
                                            className="object-cover drop-shadow-xl rounded-2xl"
                                        />
                                    </div>
                                )}

                                <div className="text-white drop-shadow space-y-1 sm:space-y-2">
                                    <div className="text-lg sm:text-xl font-semibold line-clamp-2">
                                        {selected.name}
                                    </div>
                                    <div className="text-sm sm:text-xl">
                                        Renk Kodu: {selected.code}
                                    </div>
                                    {selectedProduct?.categories &&
                                        selectedProduct.categories.length >
                                            0 && (
                                            <div className="text-xs sm:text-sm line-clamp-1">
                                                Kategori:{' '}
                                                {selectedProduct.categories.join(
                                                    ', '
                                                )}
                                            </div>
                                        )}

                                    <div className="pt-1 sm:pt-2">
                                        <Button
                                            asChild
                                            size="sm"
                                            className="bg-white text-black hover:bg-white/90 rounded-full px-3 sm:px-5 text-xs sm:text-sm">
                                            <Link
                                                href={`/product/${selected.slug}`}>
                                                Detay
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* The palette grid - responsive */}
                <div
                    className={`grid gap-1 
                        grid-cols-4 sm:grid-cols-6 md:grid-cols-10 lg:grid-cols-12
                    `}>
                    {filteredEntries.map(e => {
                        const key = `${e.slug}-${e.color}`
                        const isSelected = key === selectedKey
                        return (
                            <button
                                key={key}
                                aria-label={e.name}
                                className={`relative w-full aspect-square rounded-lg sm:rounded-2xl transition-all duration-200 p-0 m-0 ${
                                    isSelected
                                        ? 'scale-95 ring-2 sm:ring-4 ring-primary shadow-lg'
                                        : 'hover:shadow-md'
                                }`}
                                style={{backgroundColor: e.color}}
                                onClick={() =>
                                    setSelectedKey(isSelected ? null : key)
                                }>
                                <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm opacity-0 hover:opacity-100 transition text-foreground/70 whitespace-nowrap">
                                    {e.code || e.color}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>
            {/* Surprise button */}

            <div className="flex justify-center items-center mt-4">
                <Button size={'lg'} variant="ghost" onClick={onSurprise}>
                    Beni Şaşırt
                    <Shuffle className="w-4 h-4" />
                </Button>
            </div>
        </section>
    )
}
