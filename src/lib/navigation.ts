export interface MenuItem {
    name: string
    href: string
    badge?: string
}

export interface MenuCategory {
    title: string
    href: string
    items: MenuItem[]
}

export interface FeaturedItem {
    name: string
    price: string
    image: string
    href: string
}

export interface MenuData {
    categories: MenuCategory[]
    featured: {
        title: string
        items: FeaturedItem[]
    }
    promotion: {
        title: string
        description: string
        cta: string
        href: string
    }
}

export interface NavigationConfig {
    [key: string]: MenuData
}

// Centralized navigation configuration
export const navigationConfig: NavigationConfig = {
    ojeler: {
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
                title: 'Jel Ojeler',
                href: '/ojeler/jel-ojeler',
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
                title: 'Top & Base Coat',
                href: '/ojeler/top-base-coat',
                items: [
                    {
                        name: 'Premium Collection',
                        href: '/shop?brand=premium'
                    },
                    {
                        name: 'Professional Line',
                        href: '/shop?brand=professional'
                    },
                    {
                        name: 'Eco-Friendly',
                        href: '/shop?brand=eco'
                    },
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
    aksesuarlar: {
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
    cihazlar: {
        categories: [
            {
                title: 'Freze Makineleri',
                href: '/cihazlar/freze-makineleri',
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
                    {
                        name: 'Base Coat',
                        href: '/shop?category=base-coat'
                    },
                    {
                        name: 'Top Coat',
                        href: '/shop?category=top-coat'
                    }
                ]
            },
            {
                title: 'UV Kurutucular',
                href: '/cihazlar/uv-kurutucular',
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
}

// Navigation menu items for main navigation
export const mainNavigationItems = [
    {
        key: 'ojeler',
        label: 'Ojeler',
        data: navigationConfig.ojeler
    },
    {
        key: 'aksesuarlar',
        label: 'Aksesuarlar',
        data: navigationConfig.aksesuarlar
    },
    {
        key: 'cihazlar',
        label: 'Cihazlar',
        data: navigationConfig.cihazlar
    }
]

// Additional navigation items that don't have mega menus
export const additionalNavigationItems = [
    {
        label: 'Solüsyonlar',
        href: '/shop?category=Sol%C3%BCsyonlar'
    },
    {
        label: 'Setler',
        href: '/sets'
    },
    {
        label: 'Hikayemiz',
        href: '/about'
    },
    {
        label: 'İletişim',
        href: '/contact'
    }
]
