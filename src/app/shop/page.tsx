import ProductGrid from '../../components/ProductGrid'
import {api} from '../../lib/api'
import type {Product} from '../../types/product'

export const metadata = {
    title: 'Mağaza | NAILART'
}

export default async function ShopPage() {
    const products = (await api.listProducts()) as Product[]
    return (
        <div className="py-8">
            <h1 className="text-2xl font-semibold mb-6">Mağaza</h1>
            <ProductGrid products={products} />
        </div>
    )
}
