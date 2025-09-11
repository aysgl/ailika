'use client'

import {Palette} from 'lucide-react'
import {useId} from 'react'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export default function TitleWave({
    title,
    subtitle,
    description,
    headingLevel = 2,
    bandClass = 'text-foreground/20',
    titleClass = 'font-bold flex justify-center'
}: {
    title?: string
    subtitle?: string
    description?: string
    headingLevel?: HeadingLevel
    bandClass?: string
    titleClass?: string
}) {
    const id = useId()
    const path =
        'M0,80 Q100,20 200,80 Q300,140 400,80 Q500,20 600,80 Q700,140 800,80 Q900,20 1000,80 Q1100,140 1200,80 Q1300,20 1400,80 Q1500,140 1600,80'

    const headingText = title ?? ''

    const renderHeading = () => {
        if (!headingText) return null
        switch (headingLevel) {
            case 1:
                return (
                    <h1 className={`${titleClass} text-4xl`}>{headingText}</h1>
                )
            case 2:
                return (
                    <h2 className={`${titleClass} text-3xl`}>{headingText}</h2>
                )
            case 3:
                return (
                    <h3 className={`${titleClass} text-2xl`}>{headingText}</h3>
                )
            case 4:
                return (
                    <h4 className={`${titleClass} text-xl`}>{headingText}</h4>
                )
            case 5:
                return (
                    <h5 className={`${titleClass} text-lg`}>{headingText}</h5>
                )
            case 6:
                return (
                    <h6 className={`${titleClass} text-md`}>{headingText}</h6>
                )
            default:
                return (
                    <h2 className={`${titleClass} text-3xl`}>{headingText}</h2>
                )
        }
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {subtitle && (
                <div className="inline-flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 rounded-full mb-4">
                    <Palette className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-primary">
                        {subtitle}
                    </span>
                </div>
            )}
            {renderHeading()}

            <svg
                width="100%"
                height="100%"
                viewBox="0 0 1600 160"
                aria-hidden
                className="w-32 h-8 mx-auto">
                <defs>
                    <path id={id} d={path} />
                </defs>
                {/* Animated wave line */}
                <g>
                    <path
                        d={path}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="34"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={bandClass}>
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0; 80,0; 0,0; -80,0; 0,0"
                            dur="2s"
                            repeatCount="indefinite"
                        />
                    </path>
                </g>
            </svg>
            {description && (
                <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-balance">
                    {description}
                </p>
            )}
        </div>
    )
}
