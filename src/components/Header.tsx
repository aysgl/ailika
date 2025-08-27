'use client'

import Link from 'next/link'
import {useCart} from '../context/CartContext'
import {usePathname} from 'next/navigation'
import {Button} from './ui/button'
import {Search, Menu} from 'lucide-react'

export default function Header() {
    const {totalItems} = useCart()
    const pathname = usePathname()
    const isHome = pathname === '/'

    return (
        <header
            className={
                isHome
                    ? 'fixed top-0 left-0 right-0 bg-gradient-to-l to-rose-200 from-rose-100 text-gray-800 z-40'
                    : 'w-full border-b border-zinc/10 bg-gradient-to-l to-rose-200 from-rose-100 sticky top-0 z-40'
            }>
            <div
                className={
                    isHome
                        ? 'max-w-7xl mx-auto py-4 px-4 flex items-center justify-between'
                        : 'max-w-5xl mx-auto py-4 px-4 flex items-center justify-between'
                }>
                <Link
                    href="/"
                    className={
                        isHome
                            ? 'text-3xl font-bold'
                            : 'text-xl font-semibold tracking-wide'
                    }>
                    nailart
                </Link>
                {isHome ? (
                    <>
                        <nav className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/"
                                className="text-gray-700 hover:text-zinc font-medium">
                                Home
                            </Link>
                            <Link
                                href="/shop"
                                className="text-gray-700 hover:text-zinc">
                                Shop
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-zinc">
                                Category
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-zinc">
                                Our Story
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-zinc">
                                Contact
                            </Link>
                            <Link
                                href="#"
                                className="text-gray-700 hover:text-zinc">
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
