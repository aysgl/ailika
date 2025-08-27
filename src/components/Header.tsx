'use client'

import Link from 'next/link'
import {useCart} from '../context/CartContext'
import {usePathname} from 'next/navigation'
import {Button} from './ui/button'
import {Search, Menu} from 'lucide-react'
import {useEffect, useState} from 'react'
import Logo from './Logo'

export default function Header() {
    const {totalItems} = useCart()
    const pathname = usePathname()
    const isHome = pathname === '/'
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 0)
        onScroll()
        window.addEventListener('scroll', onScroll, {passive: true})
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <header
            className={
                isHome
                    ? 'container-full fixed top-0 left-0 right-0 text-foreground-900 z-40'
                    : 'container-full fixed top-0 left-0 right-0 text-foreground-900 z-40'
            }>
            <div
                className={
                    (isHome
                        ? 'container mx-auto my-1 px-4 flex items-center justify-between'
                        : 'container mx-auto my-1 px-4 flex items-center justify-between') +
                    (isScrolled
                        ? 'flex items-center justify-between bg-background/60 backdrop-blur-xl py-3 rounded-xl shadow-xl transition-all duration-300 ease-out'
                        : 'container mx-auto my-1 px-4 flex items-center justify-between py-6 transition-all duration-300 ease-out')
                }>
                <Link
                    href="/"
                    className={
                        isHome
                            ? 'text-3xl font-bold'
                            : 'text-xl font-semibold tracking-wide'
                    }>
                    <span className="text-primary">
                        <Logo className="h-10 w-auto" />
                    </span>
                </Link>
                {isHome ? (
                    <>
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-foreground font-medium">
                                Home
                            </Link>
                            <Link
                                href="/shop"
                                className="text-gray-700 hover:text-foreground">
                                Shop
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-foreground">
                                Category
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-foreground">
                                Our Story
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-foreground">
                                Contact
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-foreground">
                                Learn & Support
                            </Link>
                        </nav>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" size="icon">
                                <Search className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Menu className="w-5 h-5" />
                            </Button>
                            <Link
                                href="/cart"
                                className="text-sm hover:underline">
                                Sepet ({totalItems})
                            </Link>
                        </div>
                    </>
                ) : (
                    <nav className="flex items-center gap-6 text-sm">
                        <Link href="/shop" className="hover:underline">
                            Mağaza
                        </Link>
                        <Link href="/cart" className="hover:underline">
                            Sepet ({totalItems})
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    )
}
