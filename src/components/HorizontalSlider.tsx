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

    // Duplicate items for seamless loop with unique keys (only if canLoop)
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
        // Find index currently closest to center
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

    // snapping disabled/removed by request

    // Auto-advance every 2-3s ping-pong; pause on hover; center items
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
            // current centered index
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

    // Optional grid wrapping for consistent slide widths
    const slides = useMemo(() => {
        // If we can't loop (<3 items), force a 3-col grid to keep heights stable
        const gridForWrap = canLoop
            ? explicitGrid
            : explicitGrid || {base: 5, sm: 5, md: 5, lg: 5}

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

    // Compute container paddings so first/last slide peek half visible on edges
    const containerVars = useMemo(() => {
        const gridForWrap = canLoop
            ? explicitGrid
            : explicitGrid || {base: 5, sm: 5, md: 5, lg: 5}
        if (!gridForWrap) return undefined as undefined | React.CSSProperties
        const toPct = (n: number) => `${(100 / n).toFixed(6)}%`
        const mw = toPct(gridForWrap.base)
        const mwSm = gridForWrap.sm ? toPct(gridForWrap.sm) : mw
        const mwMd = gridForWrap.md ? toPct(gridForWrap.md) : mwSm
        const mwLg = gridForWrap.lg ? toPct(gridForWrap.lg) : mwMd
        return {
            ['--mw']: mw,
            ['--mw-sm']: mwSm,
            ['--mw-md']: mwMd,
            ['--mw-lg']: mwLg,
            ['--pad']: `calc(${mw} / 2)`,
            ['--pad-sm']: `calc(${mwSm} / 2)`,
            ['--pad-md']: `calc(${mwMd} / 2)`,
            ['--pad-lg']: `calc(${mwLg} / 2)`
        } as React.CSSProperties
    }, [explicitGrid, canLoop])

    return (
        <div className={`relative ${className || ''}`}>
            {baseItems.length > 1 && (
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
                onMouseEnter={() => (pausedRef.current = true)}
                onMouseLeave={() => (pausedRef.current = false)}
                style={containerVars}
                className={`relative z-10 flex gap-8 overflow-x-auto overflow-y-visible scroll-smooth pl-[var(--pad)] pr-[var(--pad)] sm:pl-[var(--pad-sm)] sm:pr-[var(--pad-sm)] md:pl-[var(--pad-md)] md:pr-[var(--pad-md)] lg:pl-[var(--pad-lg)] lg:pr-[var(--pad-lg)] py-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
                {slides}
            </div>
        </div>
    )
}
