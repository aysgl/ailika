import type {Metadata} from 'next'
import {Outfit, Roboto_Slab} from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {CartProvider} from '../context/CartContext'
import {FavoritesProvider} from '../context/FavoritesContext'
import {AuthProvider} from '../context/AuthContext'
import CartSidebar from '../components/CartSidebar'
import TopHeader from '@/components/TopHeader'
import QueryProvider from '../providers/QueryProvider'

const outfit = Outfit({
    variable: '--font-outfit-sans',
    display: 'swap',
    subsets: ['latin']
})

const roboto_slab = Roboto_Slab({
    variable: '--font-roboto-slab',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'Ailika - Oje Mağazası',
    description: 'Şık ve kaliteli ojelerle online alışveriş.'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="tr">
            <body
                className={`${outfit.variable} ${roboto_slab.variable} antialiased`}>
                <QueryProvider>
                    <CartProvider>
                        <FavoritesProvider>
                            <AuthProvider>
                                <TopHeader text="$5 Gel Polish Sale Is Here! 25% off everything else!" />
                                <Header />
                                <main className="container-full mx-auto mt-18">
                                    {children}
                                </main>
                                <CartSidebar />
                                <Footer />
                            </AuthProvider>
                        </FavoritesProvider>
                    </CartProvider>
                </QueryProvider>
            </body>
        </html>
    )
}
