'use client'

import {useEffect, useState} from 'react'

export default function ThemeLayout({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState<'midnight' | 'ocean' | 'pastel'>()

    useEffect(() => {
        const saved = localStorage.getItem('theme') as typeof theme
        setTheme(saved || 'ocean')
    }, [])

    if (!theme) return <>{children}</>

    return <div data-theme={theme}>{children}</div>
}
