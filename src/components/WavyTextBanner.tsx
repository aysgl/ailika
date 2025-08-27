'use client'

import {useId} from 'react'

interface WavyTextBannerProps {
    text?: string
    texts?: string[]
    color?: string
}

export default function WavyTextBanner({
    text,
    texts,
    color = 'text-pink-600'
}: WavyTextBannerProps) {
    const dramaticPath =
        'M0,80 Q100,20 200,80 Q300,140 400,80 Q500,20 600,80 Q700,140 800,80 Q900,20 1000,80 Q1100,140 1200,80 Q1300,20 1400,80 Q1500,140 1600,80'

    const pathId = useId()

    const parts = (
        texts && texts.length ? texts : text ? [text] : []
    ) as string[]
    const content = parts.length ? parts.join(' • ') : ''
    const repeat = 12
    const repeated = content ? Array(repeat).fill(content).join(' • ') : ''

    return (
        <div className="relative h-20">
            <svg
                width="100%"
                height="120"
                viewBox="0 0 1600 160"
                className="absolute inset-0 -top-10">
                <defs>
                    <path id={pathId} d={dramaticPath} />
                </defs>
                {/* Static wave-shaped band behind the moving text */}
                <path
                    d={dramaticPath}
                    fill="none"
                    stroke="black"
                    strokeWidth="22"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    shapeRendering="geometricPrecision"
                />
                {/* Moving colored text on the band */}
                <text
                    className={`text-2xl font-bold ${color}`}
                    fill="currentColor">
                    <textPath href={`#${pathId}`} startOffset="0%">
                        <animate
                            attributeName="startOffset"
                            from="0%"
                            to="-100%"
                            dur="20s"
                            begin="0s"
                            repeatCount="indefinite"
                        />
                        {repeated}
                    </textPath>
                </text>
            </svg>
        </div>
    )
}
