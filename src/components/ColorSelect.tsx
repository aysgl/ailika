'use client'

import {useState} from 'react'
import {Check} from 'lucide-react'

export interface ColorOption {
    value: string
    label: string
    color: string
}

interface ColorSelect {
    colors: string[]
    selectedColor?: string | null
    onColorChange?: (color: string) => void
    size?: 'sm' | 'md' | 'lg'
    showLabel?: boolean // Renk etiketlerini göster/gizle
}

export default function ColorSelect({
    colors,
    selectedColor,
    onColorChange,
    size = 'md',
    showLabel = true
}: ColorSelect) {
    const [hoveredColor, setHoveredColor] = useState<string | null>(null)

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    }

    const checkSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    }

    // Tek renk varsa özel görünüm
    if (colors.length === 1) {
        const singleColor = colors[0]
        return (
            <div className="space-y-3">
                <div className="flex items-center">
                    <div
                        className={`${sizeClasses[size]} rounded-full border-2 border-primary ring-2 ring-primary/20 flex items-center justify-center`}
                        style={{
                            backgroundColor:
                                singleColor === 'transparent'
                                    ? '#fff'
                                    : singleColor,
                            backgroundImage:
                                singleColor === 'transparent'
                                    ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                                    : 'none',
                            backgroundSize:
                                singleColor === 'transparent'
                                    ? '8px 8px'
                                    : 'auto',
                            backgroundPosition:
                                singleColor === 'transparent'
                                    ? '0 0, 0 4px, 4px -4px, -4px 0px'
                                    : 'auto'
                        }}>
                        <Check
                            className={`${checkSizes[size]} text-white drop-shadow-sm`}
                            style={{
                                color:
                                    singleColor === '#FFFFFF' ||
                                    singleColor === '#FFF' ||
                                    singleColor === 'white'
                                        ? '#000'
                                        : '#fff'
                            }}
                        />
                    </div>
                    {showLabel && (
                        <div className="text-sm text-muted-foreground">
                            Bu ürün tek renktedir
                        </div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap">
                {colors.map((color, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onColorChange?.(color)}
                        onMouseEnter={() => setHoveredColor(color)}
                        onMouseLeave={() => setHoveredColor(null)}
                        className={`${
                            sizeClasses[size]
                        } rounded-lg transition-all duration-200 flex items-center justify-center relative ${
                            selectedColor === color
                                ? 'scale-90 ring-4 ring-primary shadow-xl'
                                : ''
                        }`}
                        style={{
                            backgroundColor:
                                color === 'transparent' ? '#fff' : color,

                            backgroundSize:
                                color === 'transparent' ? '8px 8px' : 'auto',
                            backgroundPosition:
                                color === 'transparent'
                                    ? '0 0, 0 4px, 4px -4px, -4px 0px'
                                    : 'auto'
                        }}
                        aria-label={`Renk ${index + 1}`}>
                        {selectedColor === color && (
                            <Check
                                className={`${checkSizes[size]} text-primary`}
                            />
                        )}

                        {/* Hover tooltip */}
                        {hoveredColor === color && (
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                                Renk {index + 1}
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {selectedColor && (
                <div className="text-sm text-muted-foreground">
                    Seçilen renk:{' '}
                    <span className="font-medium">
                        Renk {colors.indexOf(selectedColor) + 1}
                    </span>
                </div>
            )}
        </div>
    )
}
