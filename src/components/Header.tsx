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
import DropdownMegaMenu from './DropdownMegamenu'
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

    const aksesuarlarData = {
        categories: [
            {
                title: 'Şablonlar',
                href: '/aksesuarlar/sablonlar',
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
                href: '/aksesuarlar/torpuler',
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
                href: '/aksesuarlar/fircalar',
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
                href: '/aksesuarlar/freze-uclari',
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
                href: '/ojeler/kalici-oje-koleksiyonu',
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
                href: '/ojeler/jel-ojeler',
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
                href: '/ojeler/top-base-coat',
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
                href: '/cihazlar/freze-makineleri',
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
                href: '/cihazlar/uv-kurutucular',
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
                className={`container mx-auto my-1 px-0 flex items-center justify-between ${
                    isScrolled
                        ? 'bg-white/60 backdrop-blur-xl py-3 rounded-xl shadow-xl transition-all duration-300 ease-out'
                        : 'py-6 transition-all duration-300 ease-out'
                }`}>
                <Link
                    href="/"
                    className={'text-xl font-semibold tracking-wide ms-2'}>
                    <span className="text-primary">
                        <Logo className="h-10 w-auto" />
                    </span>
                </Link>
                <div className="hidden lg:flex items-center space-x-0">
                    <ThemeDropdown />

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
                            href="/sets">
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
                        className="lg:hidden "
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
                                    className={
                                        'text-xl font-semibold tracking-wide'
                                    }>
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
                                    <AccordionItem value="ojeler">
                                        <AccordionTrigger>
                                            Ojeler
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-3">
                                                {ojelerData.categories.map(
                                                    cat => (
                                                        <div key={cat.title}>
                                                            <h5 className="text-sm font-semibold mb-1">
                                                                {cat.title}
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
                                    <AccordionItem value="aksesuarlar">
                                        <AccordionTrigger>
                                            Aksesuarlar
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-3">
                                                {aksesuarlarData.categories.map(
                                                    cat => (
                                                        <div key={cat.title}>
                                                            <h5 className="text-sm font-semibold mb-1">
                                                                {cat.title}
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
                                    <AccordionItem value="cihazlar">
                                        <AccordionTrigger>
                                            Cihazlar
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-3">
                                                {cihazlarData.categories.map(
                                                    cat => (
                                                        <div key={cat.title}>
                                                            <h5 className="text-sm font-semibold mb-1">
                                                                {cat.title}
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
                                </Accordion>
                            </SidebarGroup>
                            <SidebarGroup className="pt-0">
                                <div className="grid grid-cols-1 gap-1">
                                    <SheetClose asChild>
                                        <Link
                                            href="/shop?category=Sol%C3%BCsyonlar"
                                            className="py-2 font-medium hover:underline">
                                            Solüsyonlar
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href="/sets"
                                            className="py-2 font-medium hover:underline">
                                            Setler
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href="/about"
                                            className="py-2 font-medium hover:underline">
                                            Hikayemiz
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href="/contact"
                                            className="py-2 font-medium hover:underline">
                                            İletişim
                                        </Link>
                                    </SheetClose>
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
