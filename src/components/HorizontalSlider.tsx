'use client'

import {useRef} from 'react'
import {Button} from '@/components/ui/button'
import {ArrowLeft, ArrowRight} from 'lucide-react'

type HorizontalSliderProps = {
    children: React.ReactNode
    className?: string
    contentPaddingX?: string
    contentPaddingY?: string
    snap?: 'mandatory' | 'proximity' | 'none'
    showArrows?: boolean
    prevAriaLabel?: string
    nextAriaLabel?: string
}

export default function HorizontalSlider({
    children,
    className,
    contentPaddingX = 'px-[10%] md:px-[12.5%]',
    contentPaddingY = 'py-4',
    snap = 'mandatory',
    showArrows = true,
    prevAriaLabel = 'Önceki',
    nextAriaLabel = 'Sonraki'
}: HorizontalSliderProps) {
    const listRef = useRef<HTMLDivElement>(null)

    const scrollByDir = (dir: number) => {
        const el = listRef.current
        if (!el) return
        const delta = Math.round(el.clientWidth * 0.8) * dir
        el.scrollBy({left: delta, behavior: 'smooth'})
    }

    const snapClass =
        snap === 'mandatory'
            ? 'snap-x snap-mandatory'
            : snap === 'proximity'
            ? 'snap-x snap-proximity'
            : ''

    return (
        <div className={`relative ${className || ''}`}>
            {showArrows && (
                <>
                    <Button
                        variant="destructive"
                        size="icon"
                        className="w-12 h-12 hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full"
                        onClick={() => scrollByDir(-1)}
                        aria-label={prevAriaLabel}>
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="destructive"
                        size="icon"
                        className="w-12 h-12 hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full"
                        onClick={() => scrollByDir(1)}
                        aria-label={nextAriaLabel}>
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </>
            )}

            <div
                ref={listRef}
                className={`flex gap-8 overflow-x-auto overflow-y-visible scroll-smooth ${snapClass} ${contentPaddingX} ${contentPaddingY} [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
                {children}
            </div>
        </div>
    )
}
