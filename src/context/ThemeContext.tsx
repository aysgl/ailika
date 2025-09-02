'use client'

import {useEffect, useState} from 'react'

export default function ThemeWrapper({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState<'midnight' | 'ocean' | 'pastel'>()

    useEffect(() => {
        const saved = localStorage.getItem('theme') as typeof theme
        const themeToApply = saved || 'ocean'
        setTheme(themeToApply)

        document.documentElement.setAttribute('data-theme', themeToApply)
    }, [])

    if (!theme) return <>{children}</>

    return <>{children}</>
}
