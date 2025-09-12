'use client'

import {cn} from '@/lib/utils'
import {Star, TrendingUp, Award} from 'lucide-react'

interface BestsellerBadgeProps {
    variant?: 'ghost' | 'primary' | 'secondary'
    className?: string
}

export function BestsellerBadge({
    variant = 'ghost',
    className
}: BestsellerBadgeProps) {
    const variants = {
        ghost: 'from-white via-white to-white',
        primary: 'from-primary via-primary to-primary',
        secondary: 'from-secondary via-secondary to-secondary'
    }

    const getIcon = () => {
        switch (variant) {
            case 'ghost':
                return <Award className="w-8 h-8" strokeWidth={1} />
            case 'primary':
                return <TrendingUp className="w-5 h-5" strokeWidth={1} />
            case 'secondary':
                return <Star className="w-5 h-5" strokeWidth={1} />
            default:
                return <Award className="w-5 h-5" strokeWidth={1} />
        }
    }

    return (
        <div className={cn('absolute -top-3 -right-3 z-10', className)}>
            <div className="relative w-26 h-26 rounded-full shadow-xl border-2 border-black/50 overflow-hidden">
                {/* Gradient arka plan */}
                <div
                    className={cn(
                        'absolute inset-0 rounded-full bg-gradient-to-br opacity-90',
                        variants[variant]
                    )}
                />

                {/* Dönen parlama efekti */}
                <div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-primary/10 animate-spin-slow"
                    style={{animationDuration: '6s'}}
                />

                {/* Daire yazısı */}
                <svg
                    className="absolute inset-0 w-full h-full animate-spin animate-spin-slow"
                    style={{animationDuration: '20s'}}
                    viewBox="0 0 80 80">
                    <defs>
                        <path
                            id="circlePath"
                            d="M 40,40 m -28,0 a 28,28 0 1,1 56,0 a 28,28 0 1,1 -56,0"
                        />
                    </defs>
                    <text
                        className="font-bold text-[8px] tracking-[2px]"
                        style={{fontFamily: 'system-ui'}}>
                        <textPath href="#circlePath" startOffset="0%">
                            ★ BESTSELLER ★ BESTSELLER ★ BESTSELLER
                        </textPath>
                    </text>
                </svg>

                {/* İçteki ikon */}
                <div className="absolute inset-0 flex items-center justify-center border-2 border-black/50 m-6 rounded-full">
                    {getIcon()}
                </div>
            </div>
        </div>
    )
}
