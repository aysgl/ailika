'use client'

import {
    useEffect,
    useMemo,
    useRef,
    isValidElement,
    cloneElement,
    type ReactElement
} from 'react'
import {Button} from '@/components/ui/button'
import {ArrowLeft, ArrowRight} from 'lucide-react'

type GridSpec = {
    base: number
    sm?: number
    md?: number
    lg?: number
}

type CSSVars = React.CSSProperties & {
    ['--mw']?: string
    ['--mw-sm']?: string
    ['--mw-md']?: string
    ['--mw-lg']?: string
}

type HorizontalSliderProps = {
    children: React.ReactNode
    className?: string
    grid?: GridSpec
    cols?: number
    pad?: boolean
}

export default function HorizontalSlider({
    children,
    className,
    grid,
    cols,
    pad = false
}: HorizontalSliderProps) {
    const listRef = useRef<HTMLDivElement>(null)

    const baseItems = useMemo(() => {
        return (Array.isArray(children) ? children : [children]).flat()
    }, [children])

    const canLoop = baseItems.length >= 3

    const explicitGrid = useMemo(
        () =>
            grid ||
            (typeof cols === 'number'
                ? {base: cols, sm: cols, md: cols, lg: cols}
                : undefined),
        [grid, cols]
    )

    // Optionally pad to the desired grid columns when not looping
    const itemsForRender = useMemo(() => {
        if (canLoop || !pad) return baseItems
        const desiredCols =
            explicitGrid?.lg ||
            explicitGrid?.md ||
            explicitGrid?.sm ||
            explicitGrid?.base ||
            3
        if (!desiredCols || baseItems.length >= desiredCols) return baseItems
        const padCount = desiredCols - baseItems.length
        const pads = Array.from({length: padCount}, (_, i) => (
            <div
                key={`pad-${i}`}
                aria-hidden
                className="invisible select-none"
            />
        ))
        return [...baseItems, ...pads]
    }, [baseItems, canLoop, pad, explicitGrid])

    // Duplicate items for seamless loop with unique keys (only if canLoop)
    const rendered = useMemo(() => {
        if (!canLoop) return itemsForRender
        const sections = [0, 1, 2]
        return sections.flatMap(section =>
            baseItems.map((child, i) => {
                if (isValidElement(child)) {
                    const baseKey =
                        child.key != null ? String(child.key) : `idx-${i}`
                    return cloneElement(child as ReactElement, {
                        key: `loop-${section}-${baseKey}`
                    })
                }
                return <span key={`loop-${section}-text-${i}`}>{child}</span>
            })
        )
    }, [baseItems, itemsForRender, canLoop])

    useEffect(() => {
        if (!canLoop) return
        const el = listRef.current
        if (!el) return
        const section = el.scrollWidth / 3
        el.scrollLeft = section
        const onScroll = () => {
            const s = el.scrollWidth / 3
            if (el.scrollLeft <= 1) {
                el.scrollLeft += s
            } else if (el.scrollLeft >= s * 2 - 1) {
                el.scrollLeft -= s
            }
        }
        el.addEventListener('scroll', onScroll, {passive: true})
        return () => el.removeEventListener('scroll', onScroll)
    }, [baseItems, canLoop])

    const scrollByDir = (dir: number) => {
        const el = listRef.current
        if (!el) return
        const delta = Math.round(el.clientWidth * 0.8) * dir
        el.scrollBy({left: delta, behavior: 'smooth'})
    }

    const prevAriaLabel = 'Önceki'
    const nextAriaLabel = 'Sonraki'

    // snapping disabled/removed by request

    // Optional grid wrapping for consistent slide widths
    const slides = useMemo(() => {
        // If we can't loop (<3 items), force a 3-col grid to keep heights stable
        const gridForWrap = canLoop
            ? explicitGrid
            : explicitGrid || {base: 3, sm: 3, md: 3, lg: 3}

        if (!gridForWrap) return rendered
        const toPct = (n: number) => `${(100 / n).toFixed(6)}%`
        const mw = toPct(gridForWrap.base)
        const mwSm = gridForWrap.sm ? toPct(gridForWrap.sm) : mw
        const mwMd = gridForWrap.md ? toPct(gridForWrap.md) : mwSm
        const mwLg = gridForWrap.lg ? toPct(gridForWrap.lg) : mwMd
        return rendered.map((child, i) => (
            <div
                key={(isValidElement(child) && child.key) || `grid-${i}`}
                className="snap-center min-w-[var(--mw)] sm:min-w-[var(--mw-sm)] md:min-w-[var(--mw-md)] lg:min-w-[var(--mw-lg)]"
                style={
                    {
                        '--mw': mw,
                        '--mw-sm': mwSm,
                        '--mw-md': mwMd,
                        '--mw-lg': mwLg
                    } as CSSVars
                }>
                {child}
            </div>
        ))
    }, [explicitGrid, rendered, canLoop])

    return (
        <div className={`relative ${className || ''}`}>
            {canLoop && (
                <div className="pointer-events-none absolute inset-y-0 left-2 right-2 z-20 container mx-auto">
                    <div className="hidden md:flex w-full h-full items-center justify-between">
                        <Button
                            variant="destructive"
                            size="icon"
                            className="w-12 h-12 rounded-full pointer-events-auto z-[60]"
                            onClick={() => scrollByDir(-1)}
                            aria-label={prevAriaLabel}>
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="w-12 h-12 rounded-full pointer-events-auto z-[60]"
                            onClick={() => scrollByDir(1)}
                            aria-label={nextAriaLabel}>
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}

            <div
                ref={listRef}
                className={`relative z-10 flex gap-8 overflow-x-auto overflow-y-visible scroll-smooth px-[10%] md:px-[16.666%] lg:px-[12.5%] py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
                {slides}
            </div>
        </div>
    )
}
