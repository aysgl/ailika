import type {Metadata} from 'next'
import {Outfit} from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {CartProvider} from '../context/CartContext'
import CartSidebar from '../components/CartSidebar'

const outfit = Outfit({
    variable: '--font-outfit-sans',
    display: 'swap',
    subsets: ['latin']
})

export const metadata: Metadata = {
    title: 'NAILART - Oje Mağazası',
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
                className={`${outfit.variable} antialiased bg-gradient-to-l to-blue-100/80 from-indigo-200/80`}>
                <CartProvider>
                    <Header />
                    <main className="container-full mx-auto">{children}</main>
                    <CartSidebar />
                    <Footer />
                </CartProvider>
            </body>
        </html>
    )
}
