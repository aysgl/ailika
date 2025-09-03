import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import {getShopBreadcrumb} from '@/lib/breadcrumbs'
import ProductGrid from '../../components/ProductGrid'
import {api} from '../../lib/api'
import type {Product} from '../../types/product'

export const metadata = {
    title: 'Mağaza | Ailika'
}

export default async function ShopPage({
    searchParams
}: {
    searchParams: Promise<{category?: string; brand?: string}>
}) {
    const products = (await api.listProducts()) as Product[]
    const params = await searchParams
    const category = params?.category?.trim()
    const brand = params?.brand?.trim()
    const normalized = (s: string) => s.toLocaleLowerCase('tr-TR')
    const trToAscii = (s: string) =>
        s
            .replace(/ç/g, 'c')
            .replace(/ğ/g, 'g')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ş/g, 's')
            .replace(/ü/g, 'u')
    const slugify = (s: string) =>
        trToAscii(normalized(s))
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '')
            .replace(/-{2,}/g, '-')
    const catSlug = category ? slugify(category) : undefined
    // Handle simple Turkish plural suffixes ("-lar/-ler") and specific "ojeler" -> "oje"
    const catSlugBase = catSlug
        ? catSlug.replace(/-?(lar|ler)$/i, '').replace(/-?ojeler$/i, '-oje')
        : undefined
    const filtered = products.filter(p => {
        const okCategory = category
            ? (p.categories || []).some(c => {
                  const cSlug = slugify(c)
                  return (
                      cSlug === (catSlug as string) ||
                      (!!catSlugBase && cSlug.includes(catSlugBase))
                  )
              }) ||
              (!!catSlugBase &&
                  (slugify(p.slug).includes(catSlugBase) ||
                      slugify(p.name).includes(catSlugBase)))
            : true
        const okBrand = brand
            ? normalized(p.code || '') === normalized(brand) ||
              normalized(p.name).includes(normalized(brand))
            : true
        return okCategory && okBrand
    })
    // Ensure at least one product appears for any category slug
    let display = filtered
    if ((category || '').length > 0 && display.length === 0) {
        const fallback = products.filter(p => {
            const inSlugOrName =
                !!catSlugBase &&
                (slugify(p.slug).includes(catSlugBase) ||
                    slugify(p.name).includes(catSlugBase))
            const anyOje = (p.categories || []).some(c =>
                slugify(c).includes('oje')
            )
            return inSlugOrName || anyOje
        })
        if (fallback.length > 0) {
            const key = catSlugBase || 'default'
            const hash = Array.from(key).reduce(
                (acc, ch) => acc + ch.charCodeAt(0),
                0
            )
            const idx = Math.abs(hash) % fallback.length
            display = [fallback[idx]]
        } else if (products.length > 0) {
            const key = catSlugBase || 'default'
            const hash = Array.from(key).reduce(
                (acc, ch) => acc + ch.charCodeAt(0),
                0
            )
            const idx = Math.abs(hash) % products.length
            display = [products[idx]]
        }
    }
    const bc = getShopBreadcrumb({category, brand})
    const crumbs = bc
        ? [{label: 'Anasayfa', href: '/'}, ...bc]
        : [{label: 'Anasayfa', href: '/'}, {label: 'Mağaza'}]
    return (
        <div className="container mx-auto pb-16">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave
                        title={bc ? bc[bc.length - 1].label : 'Mağaza'}
                        bandClass="text-secondary"
                    />
                    <Breadcrumbs items={crumbs} />
                </div>
            </div>
            <ProductGrid products={display} cols={4} />
        </div>
    )
}
