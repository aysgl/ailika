'use client'

import {LanguageSwitcher} from './LanguageSwitcher'

interface TopHeaderProps {
    text: string
    className?: string
    speed?: number
}

export default function TopHeader({text, className = ''}: TopHeaderProps) {
    return (
        <div className="container mx-auto relative w-full flex items-center justify-center mt-1 -mb-1">
            <div
                className={`bg-gradient-to-r from-primary to-primary/70 text-white px-4 py-1 rounded-full uppercase text-xs font-medium ${className}`}>
                {text}
            </div>

            {/* Sağdaki language switcher */}
            <div className="absolute right-0 hidden lg:block">
                <LanguageSwitcher />
            </div>
        </div>
    )
}
