'use client'

import {useRouter} from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from './ui/dropdown-menu'
import {Home} from 'lucide-react'

export default function ThemeDropdown() {
    const router = useRouter()

    const changeTheme = (theme: string) => {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
        router.refresh()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Home className="w-5 h-5 me-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-[8rem]">
                <DropdownMenuItem onClick={() => changeTheme('ocean')}>
                    Ocean
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeTheme('pastel')}>
                    Pastel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeTheme('midnight')}>
                    Midnight
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
