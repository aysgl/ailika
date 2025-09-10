'use client'

import {useRef, useState} from 'react'
import Link from 'next/link'
import {ChevronDown, ArrowRight, Star, Sparkles} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {MenuData} from '@/lib/navigation'

interface MegaMenuProps {
    title: string
    menuData: MenuData
}

export default function MegaMenu({title, menuData}: MegaMenuProps) {
    const [isOpen, setIsOpen] = useState(false)
    const closeTimer = useRef<number | null>(null)

    const openMenu = () => {
        if (closeTimer.current) {
            window.clearTimeout(closeTimer.current)
            closeTimer.current = null
        }
        setIsOpen(true)
    }

    const scheduleClose = () => {
        if (closeTimer.current) window.clearTimeout(closeTimer.current)
        closeTimer.current = window.setTimeout(() => {
            setIsOpen(false)
            closeTimer.current = null
        }, 120)
    }

    return (
        <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}>
            {/* Dropdown Trigger */}
            <Button
                variant="ghost"
                className="hover:bg-primary/10 font-medium px-0 py-2">
                {title}{' '}
                <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </Button>

            {/* Megamenu Content */}
            {isOpen && (
                <div
                    className="absolute top-full left-0 w-[800px] bg-white rounded-lg shadow-2xl z-50 p-6 mt-1"
                    onMouseEnter={openMenu}
                    onMouseLeave={scheduleClose}>
                    <div className="grid grid-cols-12 gap-6">
                        {/* Categories - 8 columns */}
                        <div className="col-span-8">
                            <div className="grid grid-cols-2 gap-6">
                                {menuData.categories.map((category, index) => (
                                    <div key={index} className="space-y-4">
                                        <Link
                                            href={category.href}
                                            className="font-bold text-base text-muted-foreground">
                                            {category.title}
                                        </Link>
                                        <ul className="space-y-2">
                                            {category.items.map(
                                                (item, itemIndex) => (
                                                    <li key={itemIndex}>
                                                        <Link
                                                            href={item.href}
                                                            className="flex items-center justify-between group text-muted-foreground hover:text-secondary transition-colors py-1">
                                                            <span className="text-sm group-hover:text-secondary">
                                                                {item.name}
                                                            </span>
                                                            {item.badge && (
                                                                <Badge
                                                                    variant={
                                                                        item.badge ===
                                                                        'Yeni'
                                                                            ? 'default'
                                                                            : item.badge ===
                                                                              'Popüler'
                                                                            ? 'secondary'
                                                                            : item.badge ===
                                                                              'Premium'
                                                                            ? 'destructive'
                                                                            : 'outline'
                                                                    }
                                                                    className="text-xs">
                                                                    {item.badge}
                                                                </Badge>
                                                            )}
                                                        </Link>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Featured & Promotion - 4 columns */}
                        <div className="col-span-4 space-y-4">
                            {/* Featured Products */}
                            {menuData.featured && (
                                <Card className="bg-gradient-to-br from-secondary/20 to-secondary/50">
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-sm mb-3 flex items-center">
                                            <Star className="w-4 h-4 text-secondary mr-2" />
                                            {menuData.featured.title}
                                        </h3>
                                        <div className="space-y-3">
                                            {menuData.featured.items.map(
                                                (item, index) => (
                                                    <Link
                                                        key={index}
                                                        href={item.href}
                                                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/40 transition-colors group">
                                                        <div className="flex-1">
                                                            <div className="text-xs font-medium group-hover:text-secondary">
                                                                {item.name}
                                                            </div>
                                                            <div className="text-xs text-secondary font-bold">
                                                                {item.price}
                                                            </div>
                                                        </div>
                                                        <ArrowRight className="w-3 h-3 group-hover:text-secondary" />
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Promotion */}
                            {menuData.promotion && (
                                <Card className="bg-gradient-to-br from-primary/10 to-primary/20">
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-sm mb-2 flex items-center">
                                            <Sparkles className="w-4 h-4 text-secondary mr-2" />
                                            {menuData.promotion.title}
                                        </h3>
                                        <p className="text-xs mb-3">
                                            {menuData.promotion.description}
                                        </p>
                                        <Button
                                            asChild
                                            variant="secondary"
                                            size="sm">
                                            <Link
                                                href={menuData.promotion.href}>
                                                {menuData.promotion.cta}
                                                <ArrowRight className="w-3 h-3 ml-1" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
