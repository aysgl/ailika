import type {Metadata} from 'next'
import {Outfit} from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {CartProvider} from '../context/CartContext'
import {FavoritesProvider} from '../context/FavoritesContext'
import {AuthProvider} from '../context/AuthContext'
import CartSidebar from '../components/CartSidebar'

const outfit = Outfit({
    variable: '--font-outfit-sans',
    display: 'swap',
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
        <html lang="tr" data-theme="ocean">
            <body className={`${outfit.variable} antialiased`}>
                <CartProvider>
                    <FavoritesProvider>
                        <AuthProvider>
                            <Header />
                            <main className="container-full mx-auto mt-24">
                                {children}
                            </main>
                            <CartSidebar />
                            <Footer />
                        </AuthProvider>
                    </FavoritesProvider>
                </CartProvider>
            </body>
        </html>
    )
}
