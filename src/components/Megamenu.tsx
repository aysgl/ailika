'use client'

import {useState} from 'react'
import Link from 'next/link'
import {ChevronDown, ArrowRight, Star, Sparkles} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {Card, CardContent} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'

interface MegaMenuProps {
    className?: string
}

export default function MegaMenu({className}: MegaMenuProps) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null)

    const menuData = {
        Aksesuarlar: {
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
                        {
                            name: 'Metal Uçlar',
                            href: '/shop?category=metal-uclar'
                        },
                        {
                            name: 'Elmas Uçlar',
                            href: '/shop?category=elmas-uclar',
                            badge: 'Premium'
                        },
                        {
                            name: 'Karbür Uçlar',
                            href: '/shop?category=karbur-uclar'
                        }
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
        },
        Ojeler: {
            categories: [
                {
                    title: 'Renk Kategorileri',
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
                        {
                            name: 'Nude Tonları',
                            href: '/shop?category=nude-ojeler'
                        },
                        {
                            name: 'Koyu Renkler',
                            href: '/shop?category=koyu-ojeler'
                        }
                    ]
                },
                {
                    title: 'Özel Formüller',
                    items: [
                        {
                            name: 'Gel Ojeler',
                            href: '/shop?category=gel-ojeler',
                            badge: 'Popüler'
                        },
                        {
                            name: 'Matte Ojeler',
                            href: '/shop?category=matte-ojeler'
                        },
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
                    title: 'Markalar',
                    items: [
                        {
                            name: 'Premium Collection',
                            href: '/shop?brand=premium'
                        },
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
                    },
                    {
                        name: 'Metallic Series',
                        price: '₺99',
                        image: '/placeholder.svg?height=100&width=100&text=Metal',
                        href: '/collections/metallic'
                    }
                ]
            },
            promotion: {
                title: 'Yeni Müşteri',
                description: 'İlk alışverişinizde %15 indirim',
                cta: 'Hemen Al',
                href: '/new-customer-offer'
            }
        },
        Bakım: {
            categories: [
                {
                    title: 'Tırnak Bakımı',
                    items: [
                        {
                            name: 'Cuticle Oil',
                            href: '/shop?category=cuticle-oil'
                        },
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
                    title: 'El Bakımı',
                    items: [
                        {
                            name: 'El Kremleri',
                            href: '/shop?category=el-kremleri'
                        },
                        {
                            name: 'Peeling Ürünleri',
                            href: '/shop?category=peeling'
                        },
                        {
                            name: 'Maske Ürünleri',
                            href: '/shop?category=maskeler'
                        },
                        {
                            name: 'Serum Ürünleri',
                            href: '/shop?category=serumlar',
                            badge: 'Yeni'
                        }
                    ]
                }
            ],
            featured: {
                title: 'Bakım Setleri',
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
                title: 'Bakım Paketi',
                description: '3 al 2 öde fırsatı',
                cta: 'Fırsatı Yakala',
                href: '/campaigns/care-3-for-2'
            }
        }
    }

    return (
        <nav className={`relative ${className}`}>
            <div className="flex items-center space-x-8">
                {Object.entries(menuData).map(([menuKey, menuContent]) => (
                    <div
                        key={menuKey}
                        className="relative"
                        onMouseEnter={() => setActiveMenu(menuKey)}
                        onMouseLeave={() => setActiveMenu(null)}>
                        <Button
                            variant="ghost"
                            className="inline-flex items-center gap-1 text-foreground hover:text-foreground font-medium px-3 py-2">
                            {menuKey} <ChevronDown className="w-4 h-4" />
                        </Button>

                        {/* Megamenu Dropdown */}
                        {activeMenu === menuKey && (
                            <div className="absolute top-full left-0 w-screen max-w-6xl bg-white border border-foreground rounded-lg shadow-2xl z-50 p-8 mt-2">
                                <div className="grid grid-cols-12 gap-8">
                                    {/* Categories - 8 columns */}
                                    <div className="col-span-8">
                                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                                            {menuContent.categories.map(
                                                (category, index) => (
                                                    <div
                                                        key={index}
                                                        className="space-y-4">
                                                        <h3 className="font-bold text-lg text-foreground border-b border-foreground pb-2">
                                                            {category.title}
                                                        </h3>
                                                        <ul className="space-y-3">
                                                            {category.items.map(
                                                                (
                                                                    item,
                                                                    itemIndex
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            itemIndex
                                                                        }>
                                                                        <Link
                                                                            href={
                                                                                item.href
                                                                            }
                                                                            className="flex items-center justify-between group hover:text-pink-600 transition-colors">
                                                                            <span className="text-foreground group-hover:text-pink-600">
                                                                                {
                                                                                    item.name
                                                                                }
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
                                                                                    {
                                                                                        item.badge
                                                                                    }
                                                                                </Badge>
                                                                            )}
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Featured & Promotion - 4 columns */}
                                    <div className="col-span-4 space-y-6">
                                        {/* Featured Products */}
                                        <Card className="bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                                            <CardContent className="p-6">
                                                <h3 className="font-bold text-lg text-foreground mb-4 flex items-center">
                                                    <Star className="w-5 h-5 text-pink-500 mr-2" />
                                                    {menuContent.featured.title}
                                                </h3>
                                                <div className="space-y-4">
                                                    {menuContent.featured.items.map(
                                                        (item, index) => (
                                                            <Link
                                                                key={index}
                                                                href={item.href}
                                                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors group">
                                                                <img
                                                                    src={
                                                                        item.image ||
                                                                        '/placeholder.svg'
                                                                    }
                                                                    alt={
                                                                        item.name
                                                                    }
                                                                    className="w-12 h-12 rounded-lg object-cover"
                                                                />
                                                                <div className="flex-1">
                                                                    <div className="font-medium text-foreground group-hover:text-pink-600">
                                                                        {
                                                                            item.name
                                                                        }
                                                                    </div>
                                                                    <div className="text-pink-600 font-bold">
                                                                        {
                                                                            item.price
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <ArrowRight className="w-4 h-4 text-foreground group-hover:text-pink-600" />
                                                            </Link>
                                                        )
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        {/* Promotion */}
                                        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                                            <CardContent className="p-6">
                                                <h3 className="font-bold text-lg text-foreground mb-2 flex items-center">
                                                    <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
                                                    {
                                                        menuContent.promotion
                                                            .title
                                                    }
                                                </h3>
                                                <p className="text-foreground mb-4">
                                                    {
                                                        menuContent.promotion
                                                            .description
                                                    }
                                                </p>
                                                <Button
                                                    asChild
                                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                                                    <Link
                                                        href={
                                                            menuContent
                                                                .promotion.href
                                                        }>
                                                        {
                                                            menuContent
                                                                .promotion.cta
                                                        }
                                                        <ArrowRight className="w-4 h-4 ml-2" />
                                                    </Link>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </nav>
    )
}
