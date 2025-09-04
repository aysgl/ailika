'use client'

interface ScrollingTextProps {
    text: string
    className?: string
    speed?: number
}

export default function ScrollingText({
    text,
    className = '',
    speed = 30
}: ScrollingTextProps) {
    return (
        <div
            className={`overflow-hidden whitespace-nowrap flex justify-center mt-1 -mb-1 ${className}`}>
            <div
                className="inline-block animate-scroll bg-gradient-to-r from-primary to-primary/70 text-white px-4 py-1 rounded-full tracking-widest uppercase"
                style={{
                    animationDuration: `${speed}s`,
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite'
                }}>
                {text}
            </div>
        </div>
    )
}
