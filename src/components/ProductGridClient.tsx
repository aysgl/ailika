'use client'

import {api} from '@/lib/api'
import {Product} from '@/types'
import {useEffect, useState} from 'react'
import ProductGrid from './ProductGrid'

interface Props {
    cols?: number
}

export default function ProductGridClient({cols = 4}: Props) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.listProducts()
            .then((ps: Product[]) => setProducts(ps))
            .finally(() => setLoading(false))
    }, [])

    if (loading) {
        const skeletonArray = Array.from({length: 8})
        return (
            <div className={`grid gap-4 grid-cols-2 md:grid-cols-${cols}`}>
                {skeletonArray.map((_, idx) => (
                    <div
                        key={idx}
                        className="aspect-square bg-white/40 rounded-xl animate-pulse"
                    />
                ))}
            </div>
        )
    }

    return <ProductGrid products={products} cols={cols} />
}
