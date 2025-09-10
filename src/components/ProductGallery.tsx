'use client'

import {useState, useRef} from 'react'
import Image from 'next/image'
import {ChevronLeft, ChevronRight} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {cn} from '@/lib/utils'
import type {MediaItem} from '@/types/product'

interface ProductGalleryProps {
    images?: string[] // Backward compatibility
    media?: MediaItem[] // Yeni format
    productName: string
    className?: string
}

export default function ProductGallery({
    images,
    media,
    productName,
    className
}: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [isZoomed, setIsZoomed] = useState(false)
    const [zoomPosition, setZoomPosition] = useState({x: 0, y: 0})
    const imageRef = useRef<HTMLDivElement>(null)

    // Media items oluştur - yeni format varsa onu kullan, yoksa eski format
    const galleryMedia: MediaItem[] =
        media ||
        (images
            ? images.map(url => ({
                  type: 'image' as const,
                  url
              }))
            : [{type: 'image' as const, url: '/next.svg'}])

    const currentMedia = galleryMedia[selectedIndex]

    const goToPrevious = () => {
        setSelectedIndex(prev =>
            prev === 0 ? galleryMedia.length - 1 : prev - 1
        )
    }

    const goToNext = () => {
        setSelectedIndex(prev =>
            prev === galleryMedia.length - 1 ? 0 : prev + 1
        )
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return

        const rect = imageRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        setZoomPosition({x, y})
    }

    const handleMouseEnter = () => {
        setIsZoomed(true)
    }

    const handleMouseLeave = () => {
        setIsZoomed(false)
    }

    return (
        <div className={cn('space-y-4', className)}>
            {/* Main Image */}
            <div className="relative group bg-white rounded-xl">
                <div
                    ref={imageRef}
                    className={cn(
                        'relative aspect-square overflow-hidden rounded-xl',
                        currentMedia.type === 'image'
                            ? 'cursor-crosshair'
                            : 'cursor-default'
                    )}
                    onMouseMove={
                        currentMedia.type === 'image'
                            ? handleMouseMove
                            : undefined
                    }
                    onMouseEnter={
                        currentMedia.type === 'image'
                            ? handleMouseEnter
                            : undefined
                    }
                    onMouseLeave={
                        currentMedia.type === 'image'
                            ? handleMouseLeave
                            : undefined
                    }>
                    {/* Main Media */}
                    <div
                        className={cn(
                            'relative w-full h-full transition-transform duration-200',
                            isZoomed && currentMedia.type === 'image'
                                ? 'scale-150'
                                : 'scale-100'
                        )}
                        style={{
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                        }}>
                        {currentMedia.type === 'video' ? (
                            <video
                                src={currentMedia.url}
                                controls
                                className="w-full h-full object-contain rounded-xl"
                                poster={currentMedia.thumbnail}
                                preload="metadata">
                                Tarayıcınız video oynatmayı desteklemiyor.
                            </video>
                        ) : (
                            <Image
                                src={currentMedia.url}
                                alt={`${productName} - Media ${
                                    selectedIndex + 1
                                }`}
                                fill
                                className="object-contain p-1 overflow-hidden rounded-xl"
                                priority={selectedIndex === 0}
                            />
                        )}
                    </div>

                    {/* Navigation Arrows - Only show if multiple images */}

                    {/* Zoom Indicator - Only for images */}
                    {currentMedia.type === 'image' && (
                        <div
                            className={cn(
                                'absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full transition-opacity',
                                isZoomed ? 'opacity-100' : 'opacity-0'
                            )}>
                            🔍 Zoom Active
                        </div>
                    )}

                    {/* Media Type Indicator */}
                    {currentMedia.type === 'video' && (
                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                            🎥 Video
                        </div>
                    )}

                    {/* Media Counter */}
                    {galleryMedia.length > 1 && (
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                            {selectedIndex + 1} / {galleryMedia.length}
                        </div>
                    )}
                </div>
                {/* Navigation Arrows - Only show if multiple media items */}
                {galleryMedia.length > 1 && !isZoomed && (
                    <>
                        <Button
                            size="icon"
                            className="absolute left-6 bottom-3 -translate-y-1/2 transition-opacity z-50"
                            onClick={goToPrevious}
                            aria-label="Previous media">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            size="icon"
                            className="absolute right-6 bottom-3 -translate-y-1/2 transition-opacity z-10"
                            onClick={goToNext}
                            aria-label="Next media">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </>
                )}
                {/* Thumbnails - Only show if multiple media items */}
                {galleryMedia.length > 1 && (
                    <div className="flex justify-center gap-2 overflow-x-auto pb-2">
                        {galleryMedia.map((mediaItem, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedIndex(index)}
                                className={cn(
                                    'relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 border-white rounded-lg overflow-hidden transition-all',
                                    selectedIndex === index
                                        ? 'border-primary'
                                        : 'shadow-lg hover:border-primary/20'
                                )}
                                aria-label={`View ${mediaItem.type} ${
                                    index + 1
                                }`}>
                                {mediaItem.type === 'video' ? (
                                    <>
                                        <Image
                                            src={
                                                mediaItem.thumbnail ||
                                                mediaItem.url
                                            }
                                            alt={`${productName} - Video thumbnail ${
                                                index + 1
                                            }`}
                                            fill
                                            className="object-cover"
                                        />
                                        {/* Video Play Icon */}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                                                <div className="w-0 h-0 border-l-[6px] border-l-black border-y-[4px] border-y-transparent ml-1"></div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Image
                                        src={mediaItem.url}
                                        alt={`${productName} - Thumbnail ${
                                            index + 1
                                        }`}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
