import type {Product} from '../types/product'
import ProductCard from './ProductCard'

function clampCols(n: number) {
    return Math.min(6, Math.max(1, n))
}

export default function ProductGrid({
    products,
    cols = 3
}: {
    products: Product[]
    cols?: number
}) {
    const c = clampCols(cols)
    // Build a responsive grid up to max 6
    // Base 1 col, then progressively increase up to c
    const classMap: Record<number, string> = {
        1: 'grid-cols-2',
        2: 'grid-cols-2',
        3: 'grid-cols-2 md:grid-cols-3',
        4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'
    }
    const gridClasses = classMap[c]

    return (
        <div className={`grid ${gridClasses} gap-6`}>
            {products.map((p, i) => (
                <ProductCard key={`${p.id}-${i}`} product={p} />
            ))}
        </div>
    )
}
