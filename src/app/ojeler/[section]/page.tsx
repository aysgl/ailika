import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import ProductGrid from '@/components/ProductGrid'
import {api} from '@/lib/api'
import type {Product} from '@/types/product'

interface PageProps {
    params: Promise<{section: string}>
}

function mapSectionToShopSlug(section: string): {
    label: string
    category?: string
} {
    const s = section.toLowerCase()
    if (s === 'kalici-oje-koleksiyonu') return {label: 'Kalıcı Oje Koleksiyonu'}
    if (s === 'jel-ojeler') return {label: 'Jel Ojeler', category: 'gel-ojeler'}
    if (s === 'top-base-coat') return {label: 'Top & Base Coat'}
    return {label: section}
}

export default async function SectionPage({params}: PageProps) {
    const resolvedParams = await params
    const {label, category} = mapSectionToShopSlug(resolvedParams.section)
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
        return okCategory
    })

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
    const crumbs = [
        {label: 'Anasayfa', href: '/'},
        {label: 'Ojeler', href: '/ojeler'},
        {label}
    ]
    return (
        <div className="container mx-auto lg:px-0 px-2 pb-12">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave title={label} bandClass="text-secondary" />
                    <Breadcrumbs items={crumbs} />
                </div>
            </div>
            <ProductGrid products={display} cols={4} />
        </div>
    )
}
