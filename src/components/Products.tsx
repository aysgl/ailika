import ProductGrid from './ProductGrid'
import {api} from '../lib/api'
import type {Product} from '../types/product'
import TitleWave from './TitleWave'

export default async function Products({
    title,
    limit,
    cols
}: {
    title?: string
    limit?: number
    cols?: number
}) {
    const products: Product[] = await api.listProducts()
    const data = typeof limit === 'number' ? products.slice(0, limit) : products

    return (
        <section className="py-8">
            {title && (
                <div className="mb-4">
                    <TitleWave
                        title={title}
                        bandClass="text-primary"
                        headingLevel={2}
                    />
                </div>
            )}
            <ProductGrid products={data} cols={cols} />
        </section>
    )
}
