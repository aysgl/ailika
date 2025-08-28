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
    searchParams: {category?: string; brand?: string}
}) {
    const products = (await api.listProducts()) as Product[]
    const category = searchParams?.category
    const brand = searchParams?.brand
    const bc = getShopBreadcrumb({category, brand})
    const crumbs = bc
        ? [
              {label: 'Anasayfa', href: '/'},
              {label: 'Mağaza', href: '/shop'},
              ...bc.map(l => ({label: l}))
          ]
        : [{label: 'Anasayfa', href: '/'}, {label: 'Mağaza'}]
    return (
        <div className="container mx-auto">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave
                        title={bc ? bc[bc.length - 1] : 'Mağaza'}
                        bandClass="text-secondary"
                    />
                    <Breadcrumbs items={crumbs} />
                </div>
            </div>
            <ProductGrid products={products} cols={4} />
        </div>
    )
}
