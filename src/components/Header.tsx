'use client'

import Link from 'next/link'
import {useCart} from '../context/CartContext'
import {Button} from './ui/button'
import {Search, Menu} from 'lucide-react'
import {useEffect, useState} from 'react'
import Logo from './Logo'
import DropdownMegaMenu from './DropdownMegamenu'

export default function Header() {
    const {totalItems} = useCart()
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 0)
        onScroll()
        window.addEventListener('scroll', onScroll, {passive: true})
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const aksesuarlarData = {
        categories: [
            {
                title: 'Şablonlar',
                items: [
                    {
                        name: 'French Şablonları',
                        href: '/shop?category=french-sablonlar',
                        badge: 'Popüler'
                    },
                    {
                        name: 'Nail Art Şablonları',
                        href: '/shop?category=nail-art-sablonlar'
                    },
                    {
                        name: 'Ombre Şablonları',
                        href: '/shop?category=ombre-sablonlar'
                    },
                    {
                        name: 'Geometrik Şablonlar',
                        href: '/shop?category=geometrik-sablonlar'
                    }
                ]
            },
            {
                title: 'Törpüler',
                items: [
                    {
                        name: 'Cam Törpüler',
                        href: '/shop?category=cam-torpuler',
                        badge: 'Yeni'
                    },
                    {
                        name: 'Metal Törpüler',
                        href: '/shop?category=metal-torpuler'
                    },
                    {
                        name: 'Emery Törpüler',
                        href: '/shop?category=emery-torpuler'
                    },
                    {
                        name: 'Buffer Törpüler',
                        href: '/shop?category=buffer-torpuler'
                    }
                ]
            },
            {
                title: 'Fırçalar',
                items: [
                    {
                        name: 'Nail Art Fırçaları',
                        href: '/shop?category=nail-art-fircalar'
                    },
                    {
                        name: 'Temizlik Fırçaları',
                        href: '/shop?category=temizlik-fircalar'
                    },
                    {
                        name: 'Detay Fırçaları',
                        href: '/shop?category=detay-fircalar'
                    },
                    {
                        name: 'Gradient Fırçaları',
                        href: '/shop?category=gradient-fircalar'
                    }
                ]
            },
            {
                title: 'Freze Uçları',
                items: [
                    {
                        name: 'Seramik Uçlar',
                        href: '/shop?category=seramik-uclar'
                    },
                    {name: 'Metal Uçlar', href: '/shop?category=metal-uclar'},
                    {
                        name: 'Elmas Uçlar',
                        href: '/shop?category=elmas-uclar',
                        badge: 'Premium'
                    },
                    {name: 'Karbür Uçlar', href: '/shop?category=karbur-uclar'}
                ]
            }
        ],
        featured: {
            title: 'Öne Çıkan Ürünler',
            items: [
                {
                    name: 'Professional Nail Kit',
                    price: '₺299',
                    image: '/placeholder.svg?height=100&width=100&text=Kit',
                    href: '/products/professional-nail-kit'
                },
                {
                    name: 'Premium Fırça Seti',
                    price: '₺149',
                    image: '/placeholder.svg?height=100&width=100&text=Brush',
                    href: '/products/premium-brush-set'
                }
            ]
        },
        promotion: {
            title: 'Özel Kampanya',
            description: 'Tüm aksesuarlarda %20 indirim',
            cta: 'Kampanyayı Gör',
            href: '/campaigns/accessories-20'
        }
    }

    const ojelerData = {
        categories: [
            {
                title: 'Kalıcı Oje Koleksiyonu',
                items: [
                    {
                        name: 'Kırmızı Tonları',
                        href: '/shop?category=kirmizi-ojeler',
                        badge: 'Trend'
                    },
                    {
                        name: 'Pembe Tonları',
                        href: '/shop?category=pembe-ojeler'
                    },
                    {name: 'Nude Tonları', href: '/shop?category=nude-ojeler'},
                    {name: 'Koyu Renkler', href: '/shop?category=koyu-ojeler'}
                ]
            },
            {
                title: 'Jel Ojeler',
                items: [
                    {
                        name: 'Gel Ojeler',
                        href: '/shop?category=gel-ojeler',
                        badge: 'Popüler'
                    },
                    {name: 'Matte Ojeler', href: '/shop?category=matte-ojeler'},
                    {
                        name: 'Glitter Ojeler',
                        href: '/shop?category=glitter-ojeler'
                    },
                    {
                        name: 'Chrome Ojeler',
                        href: '/shop?category=chrome-ojeler',
                        badge: 'Yeni'
                    }
                ]
            },
            {
                title: 'Top & Base Coat',
                items: [
                    {name: 'Premium Collection', href: '/shop?brand=premium'},
                    {
                        name: 'Professional Line',
                        href: '/shop?brand=professional'
                    },
                    {name: 'Eco-Friendly', href: '/shop?brand=eco'},
                    {
                        name: 'Limited Edition',
                        href: '/shop?brand=limited',
                        badge: 'Sınırlı'
                    }
                ]
            }
        ],
        featured: {
            title: 'Yeni Koleksiyon',
            items: [
                {
                    name: 'Spring Collection 2024',
                    price: '₺89',
                    image: '/placeholder.svg?height=100&width=100&text=Spring',
                    href: '/collections/spring-2024'
                }
            ]
        },
        promotion: {
            title: 'Yeni Müşteri',
            description: 'İlk alışverişinizde %15 indirim',
            cta: 'Hemen Al',
            href: '/new-customer-offer'
        }
    }

    const cihazlarData = {
        categories: [
            {
                title: 'Freze Makineleri',
                items: [
                    {name: 'Cuticle Oil', href: '/shop?category=cuticle-oil'},
                    {
                        name: 'Nail Strengthener',
                        href: '/shop?category=nail-strengthener',
                        badge: 'Etkili'
                    },
                    {name: 'Base Coat', href: '/shop?category=base-coat'},
                    {name: 'Top Coat', href: '/shop?category=top-coat'}
                ]
            },
            {
                title: 'UV Kurutucular',
                items: [
                    {name: 'El Kremleri', href: '/shop?category=el-kremleri'},
                    {name: 'Peeling Ürünleri', href: '/shop?category=peeling'},
                    {name: 'Maske Ürünleri', href: '/shop?category=maskeler'},
                    {
                        name: 'Serum Ürünleri',
                        href: '/shop?category=serumlar',
                        badge: 'Yeni'
                    }
                ]
            }
        ],
        featured: {
            title: 'Freze Makineleri',
            items: [
                {
                    name: 'Complete Care Kit',
                    price: '₺199',
                    image: '/placeholder.svg?height=100&width=100&text=Care',
                    href: '/products/complete-care-kit'
                }
            ]
        },
        promotion: {
            title: 'UV Kurutucular',
            description: '3 al 2 öde fırsatı',
            cta: 'Fırsatı Yakala',
            href: '/campaigns/care-3-for-2'
        }
    }

    return (
        <header
            className={
                'container-full fixed top-0 left-0 right-0 text-foreground-900 z-40'
            }>
            <div
                className={`container mx-auto my-1 px-4 flex items-center justify-between ${
                    isScrolled
                        ? 'bg-background/60 backdrop-blur-xl py-3 rounded-xl shadow-xl transition-all duration-300 ease-out'
                        : 'py-6 transition-all duration-300 ease-out'
                }`}>
                <Link
                    href="/"
                    className={'text-xl font-semibold tracking-wide'}>
                    <span className="text-primary">
                        <Logo className="h-10 w-auto" />
                    </span>
                </Link>
                <div className="flex items-center space-x-0">
                    <DropdownMegaMenu title="Ojeler" menuData={ojelerData} />
                    <DropdownMegaMenu
                        title="Aksesuarlar"
                        menuData={aksesuarlarData}
                    />
                    <DropdownMegaMenu
                        title="Cihazlar"
                        menuData={cihazlarData}
                    />

                    <Button
                        asChild
                        variant="ghost"
                        className="hover:bg-primary/10 font-medium">
                        <Link href="/shop?category=Sol%C3%BCsyonlar">
                            Solüsyonlar
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="ghost"
                        className="hover:bg-primary/10 font-medium">
                        <Link
                            className="text-foreground hover:text-foreground"
                            href="/shop?category=Ba%C5%9Flang%C4%B1%C3%A7%20Setleri">
                            Setler
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="ghost"
                        className="hover:bg-primary/10 font-medium">
                        <Link
                            href="/about"
                            className="text-foreground hover:text-foreground">
                            Hikayemiz
                        </Link>
                    </Button>

                    <Button
                        asChild
                        variant="ghost"
                        className="hover:bg-primary/10 font-medium">
                        <Link
                            href="/contact"
                            className="text-foreground hover:text-foreground">
                            İletişim
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon">
                        <Search className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Menu className="w-5 h-5" />
                    </Button>
                    <Link href="/cart" className="text-sm hover:underline">
                        Sepet ({totalItems})
                    </Link>
                </div>
            </div>
        </header>
    )
}
