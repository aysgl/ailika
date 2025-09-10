'use client'

import {LanguageSwitcher} from './LanguageSwitcher'

interface TopHeaderProps {
    text: string
    className?: string
    speed?: number
}

export default function TopHeader({text, className = ''}: TopHeaderProps) {
    return (
        <div className="relative w-full flex items-center mt-1 -mb-1">
            {/* Ortadaki kayan text */}
            <div className="absolute lg:left-1/2 left-2 transform lg:-translate-x-1/2">
                <div
                    className={`bg-gradient-to-r from-primary to-primary/70 text-white px-4 py-1 rounded-full uppercase text-xs font-medium ${className}`}>
                    {text}
                </div>
            </div>

            {/* Sağdaki language switcher */}
            <div className="ml-auto mr-4 lg:mr-14">
                <LanguageSwitcher />
            </div>
        </div>
    )
}
