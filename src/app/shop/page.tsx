import {api} from '@/lib/api'
import {getShopBreadcrumb} from '@/lib/breadcrumbs'
import ShopPageClient from '@/components/sections/ShopPageClient'
import type {Product} from '@/types/product'

export const metadata = {
    title: 'Mağaza | Ailika'
}

export default async function ShopPage({
    searchParams
}: {
    searchParams: Promise<{category?: string; brand?: string}>
}) {
    // önce await et
    const params = await searchParams

    const category = params?.category?.trim()
    const brand = params?.brand?.trim()

    const products = (await api.listProducts()) as Product[]

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
    const catSlugBase = catSlug
        ? catSlug.replace(/-?(lar|ler)$/i, '').replace(/-?ojeler$/i, '-oje')
        : undefined

    // --- ilk filtreleme burada ---
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

    // Eğer hiç ürün yoksa fallback mantığını uygula
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

    const categories = Array.from(
        new Set(products.flatMap(p => p.categories || []))
    )
    const brands = Array.from(
        new Set(products.map(p => p.code).filter(Boolean))
    ) as string[]

    return (
        <ShopPageClient
            products={display}
            bc={bc ?? []}
            categories={categories}
            brands={brands || []}
        />
    )
}
