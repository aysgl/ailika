type ShopContext = {
    category?: string
    brand?: string
}

// Map slugs to breadcrumb label arrays
const CATEGORY_BREADCRUMBS: Record<string, string[]> = {
    // Ojeler → Kalıcı Oje Koleksiyonu
    'kirmizi-ojeler': ['Ojeler', 'Kalıcı Oje Koleksiyonu', 'Kırmızı Ojeler'],
    'pembe-ojeler': ['Ojeler', 'Kalıcı Oje Koleksiyonu', 'Pembe Ojeler'],
    'nude-ojeler': ['Ojeler', 'Kalıcı Oje Koleksiyonu', 'Nude Ojeler'],
    'koyu-ojeler': ['Ojeler', 'Kalıcı Oje Koleksiyonu', 'Koyu Renkler'],
    // Ojeler → Jel Ojeler
    'gel-ojeler': ['Ojeler', 'Jel Ojeler', 'Gel Ojeler'],
    'matte-ojeler': ['Ojeler', 'Jel Ojeler', 'Matte Ojeler'],
    'glitter-ojeler': ['Ojeler', 'Jel Ojeler', 'Glitter Ojeler'],
    'chrome-ojeler': ['Ojeler', 'Jel Ojeler', 'Chrome Ojeler'],
    // Aksesuarlar
    'french-sablonlar': ['Aksesuarlar', 'Şablonlar', 'French Şablonları'],
    'nail-art-sablonlar': ['Aksesuarlar', 'Şablonlar', 'Nail Art Şablonları'],
    'ombre-sablonlar': ['Aksesuarlar', 'Şablonlar', 'Ombre Şablonları'],
    'geometrik-sablonlar': ['Aksesuarlar', 'Şablonlar', 'Geometrik Şablonlar'],
    'cam-torpuler': ['Aksesuarlar', 'Törpüler', 'Cam Törpüler'],
    'metal-torpuler': ['Aksesuarlar', 'Törpüler', 'Metal Törpüler'],
    'emery-torpuler': ['Aksesuarlar', 'Törpüler', 'Emery Törpüler'],
    'buffer-torpuler': ['Aksesuarlar', 'Törpüler', 'Buffer Törpüler'],
    'nail-art-fircalar': ['Aksesuarlar', 'Fırçalar', 'Nail Art Fırçaları'],
    'temizlik-fircalar': ['Aksesuarlar', 'Fırçalar', 'Temizlik Fırçaları'],
    'detay-fircalar': ['Aksesuarlar', 'Fırçalar', 'Detay Fırçaları'],
    'gradient-fircalar': ['Aksesuarlar', 'Fırçalar', 'Gradient Fırçaları'],
    'seramik-uclar': ['Aksesuarlar', 'Freze Uçları', 'Seramik Uçlar'],
    'metal-uclar': ['Aksesuarlar', 'Freze Uçları', 'Metal Uçlar'],
    'elmas-uclar': ['Aksesuarlar', 'Freze Uçları', 'Elmas Uçlar'],
    'karbur-uclar': ['Aksesuarlar', 'Freze Uçları', 'Karbür Uçlar'],
    // Cihazlar
    'cuticle-oil': ['Cihazlar', 'Freze Makineleri', 'Cuticle Oil'],
    'nail-strengthener': ['Cihazlar', 'Freze Makineleri', 'Nail Strengthener'],
    'base-coat': ['Cihazlar', 'Freze Makineleri', 'Base Coat'],
    'top-coat': ['Cihazlar', 'Freze Makineleri', 'Top Coat'],
    'el-kremleri': ['Cihazlar', 'UV Kurutucular', 'El Kremleri'],
    peeling: ['Cihazlar', 'UV Kurutucular', 'Peeling Ürünleri'],
    maskeler: ['Cihazlar', 'UV Kurutucular', 'Maske Ürünleri'],
    serumlar: ['Cihazlar', 'UV Kurutucular', 'Serum Ürünleri'],
    // Diğer
    solüsyonlar: ['Yardımcı Ürünler', 'Solüsyonlar'],
    'baslangic-setleri': ['Setler', 'Başlangıç Setleri']
}

const BRAND_BREADCRUMBS: Record<string, string[]> = {
    premium: ['Ojeler', 'Top & Base Coat', 'Premium Collection'],
    professional: ['Ojeler', 'Top & Base Coat', 'Professional Line'],
    eco: ['Ojeler', 'Top & Base Coat', 'Eco-Friendly'],
    limited: ['Ojeler', 'Top & Base Coat', 'Limited Edition']
}

export function getShopBreadcrumb(ctx: ShopContext): string[] | null {
    if (ctx.category) {
        const key = ctx.category.toLowerCase()
        if (CATEGORY_BREADCRUMBS[key]) return CATEGORY_BREADCRUMBS[key]
        // fallback: prettify slug
        const label = key
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
        return ['Mağaza', label]
    }
    if (ctx.brand) {
        const key = ctx.brand.toLowerCase()
        if (BRAND_BREADCRUMBS[key]) return BRAND_BREADCRUMBS[key]
        const label = key
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
        return ['Mağaza', label]
    }
    return null
}
