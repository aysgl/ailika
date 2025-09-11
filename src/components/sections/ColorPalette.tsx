'use client'

import type React from 'react'

import {useEffect, useState, useRef} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {products, getProductBySlug} from '@/lib/products'
import TitleWave from '@/components/TitleWave'
import {Button} from '@/components/ui/button'
import {Shuffle, XIcon, Palette, Sparkles} from 'lucide-react'
import {Skeleton} from '@/components/ui/skeleton'
import {Card} from '@/components/ui/card'

type ColorEntry = {
    color: string
    slug: string
    name: string
    code?: string
    categories?: string[]
}

type PopoverPosition = {
    top: number
    left: number
    placement: 'top' | 'bottom' | 'left' | 'right'
}

function getContrastTextColor(hexOrRgb: string) {
    let r: number, g: number, b: number

    if (hexOrRgb.startsWith('rgb')) {
        ;[r, g, b] = hexOrRgb.match(/\d+/g)!.map(Number)
    } else if (hexOrRgb.startsWith('#')) {
        const hex = hexOrRgb.replace('#', '')
        r = Number.parseInt(hex.slice(0, 2), 16)
        g = Number.parseInt(hex.slice(2, 4), 16)
        b = Number.parseInt(hex.slice(4, 6), 16)
    } else {
        throw new Error('Desteklenmeyen renk formatı')
    }

    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 200 ? 'black' : 'white'
}

function isLightColor(color: string) {
    return getContrastTextColor(color) === 'black'
}

export default function ColorPalette() {
    const [selectedKey, setSelectedKey] = useState<string | null>(null)
    const [entries, setEntries] = useState<ColorEntry[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [popoverPosition, setPopoverPosition] =
        useState<PopoverPosition | null>(null)
    const gridRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setTimeout(() => {
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
            const seen = new Set<string>()
            const unique: ColorEntry[] = []
            for (const e of list) {
                const key = e.color.trim().toLowerCase()
                if (seen.has(key)) continue
                seen.add(key)
                unique.push(e)
            }
            setEntries(unique)
            setIsLoading(false)
        }, 1000)
    }, [])

    const calculatePopoverPosition = (
        buttonElement: HTMLButtonElement
    ): PopoverPosition => {
        const buttonRect = buttonElement.getBoundingClientRect()
        const gridRect = gridRef.current?.getBoundingClientRect()
        const popoverWidth = 400
        const popoverHeight = 300
        const spacing = 16

        if (!gridRect) {
            return {
                top: buttonRect.bottom + spacing,
                left: buttonRect.left,
                placement: 'bottom'
            }
        }

        // Calculate available space in each direction
        const spaceTop = buttonRect.top - gridRect.top
        const spaceBottom = gridRect.bottom - buttonRect.bottom
        const spaceLeft = buttonRect.left - gridRect.left
        const spaceRight = gridRect.right - buttonRect.right

        let placement: PopoverPosition['placement'] = 'bottom'
        let top = buttonRect.bottom + spacing
        let left = buttonRect.left

        // Determine best placement based on available space
        if (spaceBottom >= popoverHeight + spacing) {
            placement = 'bottom'
            top = buttonRect.bottom + spacing
        } else if (spaceTop >= popoverHeight + spacing) {
            placement = 'top'
            top = buttonRect.top - popoverHeight - spacing
        } else if (spaceRight >= popoverWidth + spacing) {
            placement = 'right'
            top = buttonRect.top + (buttonRect.height - popoverHeight) / 2
            left = buttonRect.right + spacing
        } else if (spaceLeft >= popoverWidth + spacing) {
            placement = 'left'
            top = buttonRect.top + (buttonRect.height - popoverHeight) / 2
            left = buttonRect.left - popoverWidth - spacing
        }

        // Ensure popover stays within viewport bounds
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight

        if (left + popoverWidth > viewportWidth - 16) {
            left = viewportWidth - popoverWidth - 16
        }
        if (left < 16) {
            left = 16
        }
        if (top + popoverHeight > viewportHeight - 16) {
            top = viewportHeight - popoverHeight - 16
        }
        if (top < 16) {
            top = 16
        }

        return {top, left, placement}
    }

    const handleColorClick = (
        key: string,
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        const isSelected = key === selectedKey
        if (isSelected) {
            setSelectedKey(null)
            setPopoverPosition(null)
        } else {
            const position = calculatePopoverPosition(event.currentTarget)
            setSelectedKey(key)
            setPopoverPosition(position)
        }
    }

    const filteredEntries = entries

    const onSurprise = () => {
        if (filteredEntries.length === 0 || !gridRef.current) return

        const idx = Math.floor(Math.random() * filteredEntries.length)
        const pick = filteredEntries[idx]
        const key = `${pick.slug}-${pick.color}`

        // Griddeki ilk hücreyi referans alıp pozisyon hesapla
        const firstButton = gridRef.current.querySelector<HTMLButtonElement>(
            `button[aria-label="${pick.name} - ${pick.code || pick.color}"]`
        )

        if (firstButton) {
            const position = calculatePopoverPosition(firstButton)
            setPopoverPosition(position)
        }

        setSelectedKey(key)
    }

    const selected = selectedKey
        ? filteredEntries.find(e => `${e.slug}-${e.color}` === selectedKey) ||
          null
        : null
    const selectedProduct = selected
        ? getProductBySlug(selected.slug)
        : undefined

    return (
        <section className="min-h-screen bg-gradient-to-br from-background via-card/30 to-muted/20">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                        <Palette className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-primary">
                            Renk Koleksiyonu
                        </span>
                    </div>
                    <TitleWave
                        title="Öne Çıkan Renk Paletleri"
                        bandClass="text-primary"
                    />
                    <p className="text-muted-foreground text-lg mt-4 max-w-2xl mx-auto text-balance">
                        Ürünlerimizden özenle seçilmiş renk paletlerini keşfedin
                        ve projeleriniz için mükemmel rengi bulun.
                    </p>
                </div>

                <div className="relative">
                    {selected && popoverPosition && (
                        <div
                            className="fixed z-50 w-96 max-w-[calc(100vw-.5rem)]"
                            style={{
                                top: `${popoverPosition.top}px`,
                                left: `${popoverPosition.left}px`
                            }}>
                            <Card className="relative overflow-hidden shadow-2xl border-2 border-white bg-card/95 backdrop-blur-sm py-0">
                                <button
                                    className="absolute top-3 right-3 z-10 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 group"
                                    aria-label="Kapat"
                                    onClick={() => {
                                        setSelectedKey(null)
                                        setPopoverPosition(null)
                                    }}>
                                    <XIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                                </button>

                                <div className="relative h-24 w-full">
                                    <div
                                        className="absolute inset-0 bg-gradient-to-br"
                                        style={{
                                            background: `linear-gradient(135deg, ${selected.color} 0%, ${selected.color}dd 100%)`
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>

                                <div className="p-4">
                                    <div className="flex items-start gap-4">
                                        {selectedProduct?.image && (
                                            <div className="relative w-50 h-50 -mt-24 rounded-2xl overflow-hidden shadow-2xl">
                                                <Image
                                                    src={
                                                        selectedProduct.image ||
                                                        '/placeholder.svg'
                                                    }
                                                    alt={selected.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}

                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    <div
                                                        className="w-6 h-6 rounded-md border-2 border-border shadow-sm"
                                                        style={{
                                                            backgroundColor:
                                                                selected.color
                                                        }}
                                                    />
                                                    <span className="font-mono text-sm">
                                                        {selected.code ||
                                                            selected.color}
                                                    </span>
                                                </div>
                                                <div>
                                                    {selectedProduct?.categories &&
                                                        selectedProduct
                                                            .categories.length >
                                                            0 && (
                                                            <div className="">
                                                                {selectedProduct.categories
                                                                    .slice(0, 2)
                                                                    .map(
                                                                        (
                                                                            category,
                                                                            idx
                                                                        ) => (
                                                                            <span
                                                                                key={
                                                                                    idx
                                                                                }
                                                                                className="text-sm">
                                                                                {
                                                                                    category
                                                                                }
                                                                            </span>
                                                                        )
                                                                    )}
                                                            </div>
                                                        )}
                                                </div>
                                            </div>

                                            <Button
                                                asChild
                                                size="sm"
                                                className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                                <Link
                                                    href={`/product/${selected.slug}`}>
                                                    Ürün Detayları
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    <div
                        ref={gridRef}
                        className="grid gap-1 grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 mb-12">
                        {isLoading ? (
                            Array.from({length: 24}).map((_, i) => (
                                <Skeleton
                                    key={i}
                                    className="w-full aspect-square rounded-xl"
                                />
                            ))
                        ) : filteredEntries.length > 0 ? (
                            filteredEntries.map(e => {
                                const key = `${e.slug}-${e.color}`
                                const isSelected = key === selectedKey
                                return (
                                    <button
                                        key={key}
                                        aria-label={`${e.name} - ${
                                            e.code || e.color
                                        }`}
                                        className={`group relative w-full aspect-square rounded-xl transition-all duration-300 ease-out transform hover:shadow-xl hover:shadow-black/20 ${
                                            isSelected
                                                ? 'scale-95 ring-4 ring-primary shadow-xl shadow-black/20'
                                                : ''
                                        }`}
                                        style={{backgroundColor: e.color}}
                                        onClick={event =>
                                            handleColorClick(key, event)
                                        }>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <span className="text-white text-xs font-medium px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md">
                                                {e.code || e.color}
                                            </span>
                                        </div>
                                    </button>
                                )
                            })
                        ) : (
                            <div className="col-span-full text-center py-16">
                                <Palette className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground text-lg">
                                    Henüz renk paleti bulunamadı.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <Button
                            size="lg"
                            onClick={onSurprise}
                            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
                            disabled={filteredEntries.length === 0}>
                            <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                            Beni Şaşırt
                            <Shuffle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
