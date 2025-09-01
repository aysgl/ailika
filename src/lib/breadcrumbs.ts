type ShopContext = {
    category?: string
    brand?: string
}

export type CrumbItem = {label: string; href: string}

// Map slugs to breadcrumb items with hrefs
const CATEGORY_BREADCRUMBS: Record<string, CrumbItem[]> = {
    // Ojeler → Kalıcı Oje Koleksiyonu
    'kirmizi-ojeler': [
        {label: 'Ojeler', href: '/ojeler'},
        {
            label: 'Kalıcı Oje Koleksiyonu',
            href: '/ojeler/kalici-oje-koleksiyonu'
        },
        {label: 'Kırmızı Ojeler', href: '/shop?category=kirmizi-ojeler'}
    ],
    'pembe-ojeler': [
        {label: 'Ojeler', href: '/ojeler'},
        {
            label: 'Kalıcı Oje Koleksiyonu',
            href: '/ojeler/kalici-oje-koleksiyonu'
        },
        {label: 'Pembe Ojeler', href: '/shop?category=pembe-ojeler'}
    ],
    'nude-ojeler': [
        {label: 'Ojeler', href: '/ojeler'},
        {
            label: 'Kalıcı Oje Koleksiyonu',
            href: '/ojeler/kalici-oje-koleksiyonu'
        },
        {label: 'Nude Ojeler', href: '/shop?category=nude-ojeler'}
    ],
    'koyu-ojeler': [
        {label: 'Ojeler', href: '/ojeler'},
        {
            label: 'Kalıcı Oje Koleksiyonu',
            href: '/ojeler/kalici-oje-koleksiyonu'
        },
        {label: 'Koyu Renkler', href: '/shop?category=koyu-ojeler'}
    ],
    // Ojeler → Jel Ojeler
    'gel-ojeler': [
        {label: 'Ojeler', href: '/ojeler'},
        {label: 'Jel Ojeler', href: '/ojeler/jel-ojeler'},
        {label: 'Gel Ojeler', href: '/shop?category=gel-ojeler'}
    ],
    'matte-ojeler': [
        {label: 'Ojeler', href: '/ojeler'},
        {label: 'Jel Ojeler', href: '/ojeler/jel-ojeler'},
        {label: 'Matte Ojeler', href: '/shop?category=matte-ojeler'}
    ],
    'glitter-ojeler': [
        {label: 'Ojeler', href: '/ojeler'},
        {label: 'Jel Ojeler', href: '/ojeler/jel-ojeler'},
        {label: 'Glitter Ojeler', href: '/shop?category=glitter-ojeler'}
    ],
    'chrome-ojeler': [
        {label: 'Ojeler', href: '/ojeler'},
        {label: 'Jel Ojeler', href: '/ojeler/jel-ojeler'},
        {label: 'Chrome Ojeler', href: '/shop?category=chrome-ojeler'}
    ],
    // Aksesuarlar
    'french-sablonlar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Şablonlar', href: '/aksesuarlar/sablonlar'},
        {label: 'French Şablonları', href: '/shop?category=french-sablonlar'}
    ],
    'nail-art-sablonlar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Şablonlar', href: '/aksesuarlar/sablonlar'},
        {
            label: 'Nail Art Şablonları',
            href: '/shop?category=nail-art-sablonlar'
        }
    ],
    'ombre-sablonlar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Şablonlar', href: '/aksesuarlar/sablonlar'},
        {label: 'Ombre Şablonları', href: '/shop?category=ombre-sablonlar'}
    ],
    'geometrik-sablonlar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Şablonlar', href: '/aksesuarlar/sablonlar'},
        {
            label: 'Geometrik Şablonlar',
            href: '/shop?category=geometrik-sablonlar'
        }
    ],
    'cam-torpuler': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Törpüler', href: '/aksesuarlar/torpuler'},
        {label: 'Cam Törpüler', href: '/shop?category=cam-torpuler'}
    ],
    'metal-torpuler': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Törpüler', href: '/aksesuarlar/torpuler'},
        {label: 'Metal Törpüler', href: '/shop?category=metal-torpuler'}
    ],
    'emery-torpuler': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Törpüler', href: '/aksesuarlar/torpuler'},
        {label: 'Emery Törpüler', href: '/shop?category=emery-torpuler'}
    ],
    'buffer-torpuler': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Törpüler', href: '/aksesuarlar/torpuler'},
        {label: 'Buffer Törpüler', href: '/shop?category=buffer-torpuler'}
    ],
    'nail-art-fircalar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Fırçalar', href: '/aksesuarlar/fircalar'},
        {label: 'Nail Art Fırçaları', href: '/shop?category=nail-art-fircalar'}
    ],
    'temizlik-fircalar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Fırçalar', href: '/aksesuarlar/fircalar'},
        {label: 'Temizlik Fırçaları', href: '/shop?category=temizlik-fircalar'}
    ],
    'detay-fircalar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Fırçalar', href: '/aksesuarlar/fircalar'},
        {label: 'Detay Fırçaları', href: '/shop?category=detay-fircalar'}
    ],
    'gradient-fircalar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Fırçalar', href: '/aksesuarlar/fircalar'},
        {label: 'Gradient Fırçaları', href: '/shop?category=gradient-fircalar'}
    ],
    'seramik-uclar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Freze Uçları', href: '/aksesuarlar/freze-uclari'},
        {label: 'Seramik Uçlar', href: '/shop?category=seramik-uclar'}
    ],
    'metal-uclar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Freze Uçları', href: '/aksesuarlar/freze-uclari'},
        {label: 'Metal Uçlar', href: '/shop?category=metal-uclar'}
    ],
    'elmas-uclar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Freze Uçları', href: '/aksesuarlar/freze-uclari'},
        {label: 'Elmas Uçlar', href: '/shop?category=elmas-uclar'}
    ],
    'karbur-uclar': [
        {label: 'Aksesuarlar', href: '/aksesuarlar'},
        {label: 'Freze Uçları', href: '/aksesuarlar/freze-uclari'},
        {label: 'Karbür Uçlar', href: '/shop?category=karbur-uclar'}
    ],
    // Cihazlar
    'cuticle-oil': [
        {label: 'Cihazlar', href: '/cihazlar'},
        {label: 'Freze Makineleri', href: '/cihazlar/freze-makineleri'},
        {label: 'Cuticle Oil', href: '/shop?category=cuticle-oil'}
    ],
    'nail-strengthener': [
        {label: 'Cihazlar', href: '/cihazlar'},
        {label: 'Freze Makineleri', href: '/cihazlar/freze-makineleri'},
        {label: 'Nail Strengthener', href: '/shop?category=nail-strengthener'}
    ],
    'base-coat': [
        {label: 'Cihazlar', href: '/cihazlar'},
        {label: 'Freze Makineleri', href: '/cihazlar/freze-makineleri'},
        {label: 'Base Coat', href: '/shop?category=base-coat'}
    ],
    'top-coat': [
        {label: 'Cihazlar', href: '/cihazlar'},
        {label: 'Freze Makineleri', href: '/cihazlar/freze-makineleri'},
        {label: 'Top Coat', href: '/shop?category=top-coat'}
    ],
    'el-kremleri': [
        {label: 'Cihazlar', href: '/cihazlar'},
        {label: 'UV Kurutucular', href: '/cihazlar/uv-kurutucular'},
        {label: 'El Kremleri', href: '/shop?category=el-kremleri'}
    ],
    peeling: [
        {label: 'Cihazlar', href: '/cihazlar'},
        {label: 'UV Kurutucular', href: '/cihazlar/uv-kurutucular'},
        {label: 'Peeling Ürünleri', href: '/shop?category=peeling'}
    ],
    maskeler: [
        {label: 'Cihazlar', href: '/cihazlar'},
        {label: 'UV Kurutucular', href: '/cihazlar/uv-kurutucular'},
        {label: 'Maske Ürünleri', href: '/shop?category=maskeler'}
    ],
    serumlar: [
        {label: 'Cihazlar', href: '/cihazlar'},
        {label: 'UV Kurutucular', href: '/cihazlar/uv-kurutucular'},
        {label: 'Serum Ürünleri', href: '/shop?category=serumlar'}
    ],
    // Diğer (örnek)
    solüsyonlar: [
        {label: 'Yardımcı Ürünler', href: '/shop?category=yardimci-urunler'},
        {label: 'Solüsyonlar', href: '/shop?category=Sol%C3%BCsyonlar'}
    ],
    'baslangic-setleri': [
        {label: 'Setler', href: '/sets'},
        {label: 'Başlangıç Setleri', href: '/shop?category=baslangic-setleri'}
    ]
}

const BRAND_BREADCRUMBS: Record<string, CrumbItem[]> = {
    premium: [
        {label: 'Ojeler', href: '/ojeler'},
        {label: 'Top & Base Coat', href: '/ojeler/top-base-coat'},
        {label: 'Premium Collection', href: '/shop?brand=premium'}
    ],
    professional: [
        {label: 'Ojeler', href: '/ojeler'},
        {label: 'Top & Base Coat', href: '/ojeler/top-base-coat'},
        {label: 'Professional Line', href: '/shop?brand=professional'}
    ],
    eco: [
        {label: 'Ojeler', href: '/ojeler'},
        {label: 'Top & Base Coat', href: '/ojeler/top-base-coat'},
        {label: 'Eco-Friendly', href: '/shop?brand=eco'}
    ],
    limited: [
        {label: 'Ojeler', href: '/ojeler'},
        {label: 'Top & Base Coat', href: '/ojeler/top-base-coat'},
        {label: 'Limited Edition', href: '/shop?brand=limited'}
    ]
}

export function getShopBreadcrumb(ctx: ShopContext): CrumbItem[] | null {
    if (ctx.category) {
        const key = ctx.category.toLowerCase()
        if (CATEGORY_BREADCRUMBS[key]) return CATEGORY_BREADCRUMBS[key]
        // fallback: prettify slug
        const label = key
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
        return [{label, href: `/shop?category=${encodeURIComponent(key)}`}]
    }
    if (ctx.brand) {
        const key = ctx.brand.toLowerCase()
        if (BRAND_BREADCRUMBS[key]) return BRAND_BREADCRUMBS[key]
        const label = key
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
        return [{label, href: `/shop?brand=${encodeURIComponent(key)}`}]
    }
    return null
}
