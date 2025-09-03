'use client'

import Link from 'next/link'
import {useCart} from '../context/CartContext'
import {Button} from './ui/button'
import {
    Search,
    Menu,
    ShoppingBag,
    X,
    Smile,
    Heart,
    Star,
    Gift,
    User,
    LogOut
} from 'lucide-react'
import {Sheet, SheetContent, SheetClose} from '@/components/ui/sheet'
import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarGroup
} from '@/components/ui/sidebar'
import {useEffect, useState} from 'react'
import Logo from './Logo'
import MegaMenu from './Megamenu'
import SearchModal from './SearchModal'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent
} from '@/components/ui/accordion'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import {useFavorites} from '@/context/FavoritesContext'
import {useAuth} from '@/context/AuthContext'
import Image from 'next/image'
import ThemeDropdown from './ThemeDropdown'
import {mainNavigationItems, additionalNavigationItems} from '@/lib/navigation'

export default function Header() {
    const {totalItems} = useCart()
    const {count: favoritesCount} = useFavorites()
    const {isAuthenticated, user, logout} = useAuth()
    const [isScrolled, setIsScrolled] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 0)
        onScroll()
        window.addEventListener('scroll', onScroll, {passive: true})
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header className="container-full fixed top-0 left-0 right-0 text-foreground-900 z-40">
            <div
                className={`container mx-auto my-1 px-0 flex items-center justify-between ${
                    isScrolled
                        ? 'bg-white/60 backdrop-blur-xl py-3 rounded-xl shadow-xl transition-all duration-300 ease-out'
                        : 'py-6 transition-all duration-300 ease-out'
                }`}>
                <Link
                    href="/"
                    className="text-xl font-semibold tracking-wide ps-2">
                    <span className="text-primary">
                        <Logo className="h-10 w-auto" />
                    </span>
                </Link>

                <div className="hidden lg:flex items-center space-x-0">
                    <ThemeDropdown />

                    {/* Dynamic mega menu items */}
                    {mainNavigationItems.map(item => (
                        <MegaMenu
                            key={item.key}
                            title={item.label}
                            menuData={item.data}
                        />
                    ))}

                    {/* Additional navigation items */}
                    {additionalNavigationItems.map(item => (
                        <Button
                            key={item.href}
                            asChild
                            variant="ghost"
                            className="hover:bg-primary/10 font-medium">
                            <Link href={item.href}>{item.label}</Link>
                        </Button>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSearchOpen(true)}
                        className="hidden lg:inline-flex">
                        <Search className="w-5 h-5" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden lg:inline-flex"
                                aria-label="Hesap">
                                <Smile className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="min-w-[12rem]">
                            {isAuthenticated ? (
                                <>
                                    <div className="p-2 text-xs flex items-center gap-2 border-b border-foreground/10 mb-2 h-12">
                                        {user?.image ? (
                                            <Image
                                                src={user.image}
                                                alt={user?.name || ''}
                                                width={24}
                                                height={24}
                                                className="rounded-full w-8 h-8 ratio-1/1 object-cover"
                                            />
                                        ) : (
                                            <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                                                <Smile className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                        <div>
                                            <span className="font-bold">
                                                {user?.name}
                                            </span>
                                            <div className="text-foreground/60">
                                                {user?.email}
                                            </div>
                                        </div>
                                    </div>
                                    <DropdownMenuItem asChild>
                                        <Link href="/account/orders">
                                            <ShoppingBag className="w-4 h-4 me-2" />{' '}
                                            Tüm Siparişlerim
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/account/reviews">
                                            <Star className="w-4 h-4 me-2" />{' '}
                                            Değerlendirmelerim
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/account/coupons">
                                            <Gift className="w-4 h-4 me-2" />{' '}
                                            Kuponlarım
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/account/info">
                                            <User className="w-4 h-4 me-2" />{' '}
                                            Kullanıcı Bilgilerim
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={logout}>
                                        <LogOut className="w-4 h-4 me-2" />{' '}
                                        Çıkış Yap
                                    </DropdownMenuItem>
                                </>
                            ) : (
                                <>
                                    <DropdownMenuItem asChild>
                                        <Link href="/login">Giriş Yap</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/register">Kayıt Ol</Link>
                                    </DropdownMenuItem>
                                </>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="relative"
                        aria-label={`Favoriler (${favoritesCount})`}>
                        <Link href="/favorites">
                            <Heart className="w-5 h-5" />
                            {favoritesCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-2xl text-xs text-white flex items-center justify-center">
                                    {favoritesCount}
                                </span>
                            )}
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="relative"
                        aria-label={`Sepet (${totalItems})`}>
                        <Link href="/cart">
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-2xl text-xs text-white flex items-center justify-center">
                                {totalItems}
                            </span>
                        </Link>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        aria-label="Menüyü aç"
                        onClick={() => setMobileMenuOpen(true)}>
                        <Menu className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Sidebar */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent
                    side="left"
                    title="Menü"
                    className="w-full sm:w-[420px] h-[calc(100dvh-1rem)]">
                    <Sidebar className="h-full min-h-0">
                        <SidebarHeader>
                            <div className="flex items-center justify-between w-full">
                                <Link
                                    href="/"
                                    className="text-xl font-semibold tracking-wide">
                                    <span className="text-primary">
                                        <Logo className="h-10 w-auto" />
                                    </span>
                                </Link>
                                <SheetClose asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        aria-label="Kapat">
                                        <X className="w-5 h-5" />
                                    </Button>
                                </SheetClose>
                            </div>
                        </SidebarHeader>
                        <SidebarContent>
                            <SidebarGroup className="pb-0">
                                <Accordion type="single" collapsible>
                                    {mainNavigationItems.map(navItem => (
                                        <AccordionItem
                                            key={navItem.key}
                                            value={navItem.key}>
                                            <AccordionTrigger>
                                                {navItem.label}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <div className="space-y-3">
                                                    {navItem.data.categories.map(
                                                        cat => (
                                                            <div
                                                                key={cat.title}>
                                                                <h5 className="text-sm font-semibold mb-1">
                                                                    <SheetClose
                                                                        asChild>
                                                                        <Link
                                                                            href={
                                                                                cat.href
                                                                            }
                                                                            className="hover:underline">
                                                                            {
                                                                                cat.title
                                                                            }
                                                                        </Link>
                                                                    </SheetClose>
                                                                </h5>
                                                                <div className="grid grid-cols-1">
                                                                    {cat.items.map(
                                                                        item => (
                                                                            <SheetClose
                                                                                asChild
                                                                                key={
                                                                                    item.href
                                                                                }>
                                                                                <Link
                                                                                    href={
                                                                                        item.href
                                                                                    }
                                                                                    className="py-1.5 text-sm hover:underline">
                                                                                    {
                                                                                        item.name
                                                                                    }
                                                                                </Link>
                                                                            </SheetClose>
                                                                        )
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </SidebarGroup>
                            <SidebarGroup className="pt-0">
                                <div className="grid grid-cols-1 gap-1">
                                    {additionalNavigationItems.map(item => (
                                        <SheetClose asChild key={item.href}>
                                            <Link
                                                href={item.href}
                                                className="py-2 font-medium hover:underline">
                                                {item.label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                </div>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </SheetContent>
            </Sheet>
            <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
        </header>
    )
}
