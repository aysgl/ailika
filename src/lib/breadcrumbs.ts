import {navigationConfig} from './navigation'

export interface CrumbItem {
    label: string
    href: string
}

export interface ShopContext {
    category?: string
    brand?: string
}

// Generate breadcrumbs dynamically from navigation config
function generateBreadcrumbsFromConfig(): Record<string, CrumbItem[]> {
    const breadcrumbs: Record<string, CrumbItem[]> = {}

    Object.entries(navigationConfig).forEach(([sectionKey, sectionData]) => {
        const sectionLabel =
            sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1)
        const sectionHref = `/${sectionKey}`

        sectionData.categories.forEach(category => {
            category.items.forEach(item => {
                // Extract category slug from href
                const urlParams = new URLSearchParams(
                    item.href.split('?')[1] || ''
                )
                const categorySlug =
                    urlParams.get('category') || urlParams.get('brand')

                if (categorySlug) {
                    const key = categorySlug.toLowerCase()
                    breadcrumbs[key] = [
                        {label: sectionLabel, href: sectionHref},
                        {label: category.title, href: category.href},
                        {label: item.name, href: item.href}
                    ]
                }
            })
        })
    })

    return breadcrumbs
}

// Static breadcrumbs for items not in navigation config
const staticBreadcrumbs: Record<string, CrumbItem[]> = {
    solüsyonlar: [
        {label: 'Yardımcı Ürünler', href: '/shop?category=yardimci-urunler'},
        {label: 'Solüsyonlar', href: '/shop?category=Sol%C3%BCsyonlar'}
    ],
    'baslangic-setleri': [
        {label: 'Setler', href: '/sets'},
        {label: 'Başlangıç Setleri', href: '/shop?category=baslangic-setleri'}
    ]
}

// Combine dynamic and static breadcrumbs
const allBreadcrumbs = {
    ...generateBreadcrumbsFromConfig(),
    ...staticBreadcrumbs
}

export function getShopBreadcrumb(ctx: ShopContext): CrumbItem[] | null {
    if (ctx.category) {
        const key = ctx.category.toLowerCase()
        if (allBreadcrumbs[key]) {
            return allBreadcrumbs[key]
        }

        // Fallback: prettify slug
        const label = key
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
        return [{label, href: `/shop?category=${encodeURIComponent(key)}`}]
    }

    if (ctx.brand) {
        const key = ctx.brand.toLowerCase()
        if (allBreadcrumbs[key]) {
            return allBreadcrumbs[key]
        }

        const label = key
            .replace(/-/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
        return [{label, href: `/shop?brand=${encodeURIComponent(key)}`}]
    }

    return null
}

// Helper function to get all categories for a section
export function getCategoriesForSection(sectionKey: string) {
    return navigationConfig[sectionKey]?.categories || []
}

// Helper function to get all items for a category
export function getItemsForCategory(sectionKey: string, categoryTitle: string) {
    const section = navigationConfig[sectionKey]
    if (!section) return []

    const category = section.categories.find(cat => cat.title === categoryTitle)
    return category?.items || []
}

// Helper function to search for an item across all sections
export function findItemByHref(href: string) {
    for (const [sectionKey, sectionData] of Object.entries(navigationConfig)) {
        for (const category of sectionData.categories) {
            const item = category.items.find(item => item.href === href)
            if (item) {
                return {
                    section: sectionKey,
                    category: category.title,
                    item
                }
            }
        }
    }
    return null
}
