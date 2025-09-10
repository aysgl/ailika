// src/components/HorizontalSlider.tsx
'use client'

import React, {
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
    xl?: number
}

type HorizontalSliderProps = {
    children: React.ReactNode
    className?: string
    grid?: GridSpec
    cols?: number
    pad?: boolean
    isLoading?: boolean // <-- eklendi
}

export default function HorizontalSlider({
    children,
    className,
    grid,
    cols,
    pad = false,
    isLoading = false
}: HorizontalSliderProps) {
    const listRef = useRef<HTMLDivElement>(null)
    const isAdjustingRef = useRef(false)
    const pausedRef = useRef(false)
    const autoDirRef = useRef<1 | -1>(1)

    const baseItems = useMemo(() => {
        return (Array.isArray(children) ? children : [children]).flat()
    }, [children])

    const canLoop = baseItems.length >= 5
    const loopEnabled = false

    const explicitGrid = useMemo(
        () =>
            grid ||
            (typeof cols === 'number'
                ? {
                      base: 1,
                      sm: 2,
                      md: 3,
                      lg: cols,
                      xl: cols
                  }
                : undefined),
        [grid, cols]
    )

    // pad logic
    const itemsForRender = useMemo(() => {
        if (canLoop || !pad) return baseItems
        const desiredCols =
            explicitGrid?.lg ||
            explicitGrid?.md ||
            explicitGrid?.sm ||
            explicitGrid?.base ||
            5
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

    // looping duplication (kept as original)
    const rendered = useMemo(() => {
        if (!canLoop || !loopEnabled) return itemsForRender
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
    }, [baseItems, itemsForRender, canLoop, loopEnabled])

    const baseCount = baseItems.length
    useEffect(() => {
        if (!canLoop || !loopEnabled) return
        const el = listRef.current
        if (!el) return
        const section = el.scrollWidth / 5
        el.scrollLeft = section
        const onScroll = () => {
            if (isAdjustingRef.current) return
            const s = el.scrollWidth / 5
            const left = el.scrollLeft
            const threshold = 2
            if (left <= threshold || left >= s * 2 - threshold) {
                isAdjustingRef.current = true
                const prevBehavior = el.style.scrollBehavior
                el.style.scrollBehavior = 'auto'
                el.scrollLeft = left <= threshold ? left + s : left - s
                requestAnimationFrame(() => {
                    el.style.scrollBehavior = prevBehavior
                    isAdjustingRef.current = false
                })
            }
        }
        el.addEventListener('scroll', onScroll, {passive: true})
        return () => el.removeEventListener('scroll', onScroll)
    }, [baseCount, canLoop, loopEnabled])

    const scrollByDir = (dir: number) => {
        const el = listRef.current
        if (!el) return
        const children = Array.from(el.children) as HTMLElement[]
        if (children.length === 0) return
        const center = el.scrollLeft + el.clientWidth / 2
        let currentIdx = 0
        let best = Number.POSITIVE_INFINITY
        children.forEach((node, idx) => {
            const nodeCenter = node.offsetLeft + node.clientWidth / 2
            const d = Math.abs(nodeCenter - center)
            if (d < best) {
                best = d
                currentIdx = idx
            }
        })
        const nextIdx = Math.max(
            0,
            Math.min(children.length - 1, currentIdx + dir)
        )
        const target = children[nextIdx]
        const targetLeft =
            target.offsetLeft + target.clientWidth / 2 - el.clientWidth / 2
        el.scrollTo({left: targetLeft, behavior: 'smooth'})
    }

    const prevAriaLabel = 'Önceki'
    const nextAriaLabel = 'Sonraki'

    useEffect(() => {
        const el = listRef.current
        if (!el) return
        autoDirRef.current = 1
        const id = window.setInterval(() => {
            if (pausedRef.current) return
            const children = Array.from(el.children) as HTMLElement[]
            if (children.length === 0) return
            const maxLeft = el.scrollWidth - el.clientWidth
            const left = el.scrollLeft
            if (left <= 1) autoDirRef.current = 1
            if (left >= maxLeft - 2) autoDirRef.current = -1
            const center = left + el.clientWidth / 2
            let currentIdx = 0
            let best = Number.POSITIVE_INFINITY
            children.forEach((node, idx) => {
                const nodeCenter = node.offsetLeft + node.clientWidth / 2
                const d = Math.abs(nodeCenter - center)
                if (d < best) {
                    best = d
                    currentIdx = idx
                }
            })
            const nextIdx = Math.max(
                0,
                Math.min(children.length - 1, currentIdx + autoDirRef.current)
            )
            const target = children[nextIdx]
            const targetLeft =
                target.offsetLeft + target.clientWidth / 2 - el.clientWidth / 2
            el.scrollTo({left: targetLeft, behavior: 'smooth'})
        }, 3000)
        return () => window.clearInterval(id)
    }, [baseCount])

    // slides creation (same as before)
    const slides = useMemo(() => {
        const gridForWrap = explicitGrid || {
            base: 5,
            sm: 5,
            md: 5,
            lg: 5,
            xl: 5
        }

        if (!gridForWrap) return rendered

        const lgClass =
            gridForWrap.lg === 4
                ? 'lg:min-w-[25%] lg:w-[25%] xl:min-w-[25%] xl:w-[25%]'
                : gridForWrap.lg === 5
                ? 'lg:min-w-[20%] lg:w-[20%] xl:min-w-[20%] xl:w-[20%]'
                : gridForWrap.lg === 6
                ? 'lg:min-w-[16.67%] lg:w-[16.67%] xl:min-w-[16.67%] xl:w-[16.67%]'
                : gridForWrap.lg === 7
                ? 'lg:min-w-[14.28%] lg:w-[14.28%] xl:min-w-[14.28%] xl:w-[14.28%]'
                : gridForWrap.lg === 8
                ? 'lg:min-w-[12.5%] lg:w-[12.5%] xl:min-w-[12.5%] xl:w-[12.5%]'
                : 'lg:min-w-[20%] lg:w-[20%] xl:min-w-[20%] xl:w-[20%]'

        const baseClass =
            `snap-center flex-shrink-0 h-full min-w-full w-full sm:min-w-[50%] sm:w-[50%] md:min-w-[33.33%] md:w-[33.33%] ` +
            lgClass

        return rendered.map((child, i) => (
            <div
                key={(isValidElement(child) && child.key) || `grid-${i}`}
                className={baseClass}>
                {child}
            </div>
        ))
    }, [explicitGrid, rendered])

    // container CSS variables (as before)
    const containerVars = useMemo(() => {
        const gridForWrap = explicitGrid || {
            base: 5,
            sm: 5,
            md: 5,
            lg: 5,
            xl: 5
        }
        if (!gridForWrap) return undefined as undefined | React.CSSProperties
        const toPct = (n: number) => `${(100 / n).toFixed(6)}%`
        const mw = toPct(gridForWrap.base)
        const mwSm = gridForWrap.sm ? toPct(gridForWrap.sm) : mw
        const mwMd = gridForWrap.md ? toPct(gridForWrap.md) : mwSm
        const mwLg = gridForWrap.lg ? toPct(gridForWrap.lg) : mwMd
        const mwXl = gridForWrap.xl ? toPct(gridForWrap.xl) : mwLg
        return {
            ['--mw']: mw,
            ['--mw-sm']: mwSm,
            ['--mw-md']: mwMd,
            ['--mw-lg']: mwLg,
            ['--mw-xl']: mwXl,
            ['--pad']: `calc(${mw} / 6)`,
            ['--pad-sm']: `calc(${mwSm} / 2)`,
            ['--pad-md']: `calc(${mwMd} / 2)`,
            ['--pad-lg']: `calc(${mwLg} / 2)`,
            ['--pad-xl']: `calc(${mwXl} / 2)`
        } as React.CSSProperties
    }, [explicitGrid])

    // --- SKELETON SLIDES (render when isLoading) ---
    const skeletonSlides = useMemo(() => {
        const gridForWrap = explicitGrid || {
            base: 5,
            sm: 5,
            md: 5,
            lg: 5,
            xl: 5
        }
        const lgClass =
            gridForWrap.lg === 4
                ? 'lg:min-w-[25%] lg:w-[25%] xl:min-w-[25%] xl:w-[25%]'
                : gridForWrap.lg === 5
                ? 'lg:min-w-[20%] lg:w-[20%] xl:min-w-[20%] xl:w-[20%]'
                : gridForWrap.lg === 6
                ? 'lg:min-w-[16.67%] lg:w-[16.67%] xl:min-w-[16.67%] xl:w-[16.67%]'
                : gridForWrap.lg === 7
                ? 'lg:min-w-[14.28%] lg:w-[14.28%] xl:min-w-[14.28%] xl:w-[14.28%]'
                : gridForWrap.lg === 8
                ? 'lg:min-w-[12.5%] lg:w-[12.5%] xl:min-w-[12.5%] xl:w-[12.5%]'
                : 'lg:min-w-[20%] lg:w-[20%] xl:min-w-[20%] xl:w-[20%]'

        const baseClass =
            `snap-center flex-shrink-0 h-full min-w-full w-full sm:min-w-[50%] sm:w-[50%] md:min-w-[33.33%] md:w-[33.33%] ` +
            lgClass

        const count = gridForWrap.lg || 5
        return Array.from({length: count}).map((_, i) => (
            <div key={`skeleton-${i}`} className={baseClass}>
                <div className="w-full h-48 rounded-lg bg-white/40/70 animate-pulse" />
            </div>
        ))
    }, [explicitGrid])

    return (
        <div className={`relative ${className || ''}`}>
            {baseItems.length > 1 && (
                <div className="pointer-events-none absolute inset-y-0 left-1 sm:left-2 right-1 sm:right-2 z-20 container mx-auto">
                    <div className="flex sm:hidden w-full h-full items-center justify-between px-2">
                        {/* Mobile nav */}
                        <Button
                            variant="destructive"
                            size="icon"
                            className="w-8 h-8 rounded-full pointer-events-auto z-[60] opacity-80"
                            onClick={() => scrollByDir(-1)}
                            aria-label={prevAriaLabel}>
                            <ArrowLeft className="w-3 h-3" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="w-8 h-8 rounded-full pointer-events-auto z-[60] opacity-80"
                            onClick={() => scrollByDir(1)}
                            aria-label={nextAriaLabel}>
                            <ArrowRight className="w-3 h-3" />
                        </Button>
                    </div>
                    <div className="hidden sm:flex w-full h-full items-center justify-between">
                        {/* Desktop nav */}
                        <Button
                            variant="destructive"
                            size="icon"
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full pointer-events-auto z-[60]"
                            onClick={() => scrollByDir(-1)}
                            aria-label={prevAriaLabel}>
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                        <Button
                            variant="destructive"
                            size="icon"
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full pointer-events-auto z-[60]"
                            onClick={() => scrollByDir(1)}
                            aria-label={nextAriaLabel}>
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </Button>
                    </div>
                </div>
            )}

            <div
                ref={listRef}
                onMouseEnter={() => (pausedRef.current = true)}
                onMouseLeave={() => (pausedRef.current = false)}
                style={containerVars}
                className={`relative z-10 flex items-stretch gap-3 sm:gap-4 md:gap-6 lg:gap-8 overflow-x-auto overflow-y-visible scroll-smooth pl-[var(--pad)] pr-[var(--pad)] sm:pl-[var(--pad-sm)] sm:pr-[var(--pad-sm)] md:pl-[var(--pad-md)] md:pr-[var(--pad-md)] lg:pl-[var(--pad-lg)] lg:pr-[var(--pad-lg)] xl:pl-[var(--pad-xl)] xl:pr-[var(--pad-xl)] py-4 sm:py-3 md:py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
                {isLoading ? skeletonSlides : slides}
            </div>
        </div>
    )
}
