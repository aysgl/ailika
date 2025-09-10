'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {ChevronDown, Globe} from 'lucide-react'

interface Language {
    code: string
    name: string
    flag: string
}

const languages: Language[] = [
    {code: 'tr', name: 'Türkçe', flag: '🇹🇷'},
    {code: 'en', name: 'English', flag: '🇺🇸'},
    {code: 'de', name: 'Deutsch', flag: '🇩🇪'},
    {code: 'fr', name: 'Français', flag: '🇫🇷'},
    {code: 'es', name: 'Español', flag: '🇪🇸'}
]

export function LanguageSwitcher() {
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(
        languages[0]
    )

    const handleLanguageChange = (language: Language) => {
        setSelectedLanguage(language)
        // Burada dil değişikliği mantığını ekleyebilirsiniz
        // Örneğin: i18n kütüphanesi ile dil değiştirme
        console.log(`Language changed to: ${language.code}`)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="xs"
                    className="px-2 bg-card transition-colors"
                    aria-label="Dil seçimi">
                    <span className="uppercase ms-1">
                        {selectedLanguage.code}
                    </span>
                    <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="min-w-[120px] bg-popover border-border shadow-lg"
                sideOffset={8}
                style={{width: '90px'}}>
                {languages.map(language => (
                    <DropdownMenuItem
                        key={language.code}
                        onClick={() => handleLanguageChange(language)}
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors">
                        <span className="font-medium text-sm">
                            {language.name}
                        </span>
                        {selectedLanguage.code === language.code && (
                            <div className="ml-auto h-2 w-2 rounded-full bg-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
