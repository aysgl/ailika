import Image from 'next/image'
import {api} from '../../../lib/api'
import type {Product} from '../../../types/product'
import AddToCartButton from '../../../components/AddToCartButton'
import {formatCents} from '../../../context/CartContext'

type Props = {params: {slug: string}}

export async function generateMetadata({params}: Props) {
    try {
        const product: Product = await api.getProduct(params.slug)
        return {title: `${product.name} | NAILART`}
    } catch {
        return {title: 'Ürün | NAILART'}
    }
}

export default async function ProductPage({params}: Props) {
    let product: Product
    try {
        product = await api.getProduct(params.slug)
    } catch {
        return <div className="py-12">Ürün bulunamadı.</div>
    }

    return (
        <div className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-square bg-white border border-foreground/10 rounded-lg overflow-hidden">
                <Image
                    src={product.image || '/next.svg'}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                />
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-semibold">{product.name}</h1>
                <div className="text-xl font-bold">
                    {formatCents(product.price)}
                </div>
                <p className="text-foreground/70">{product.description}</p>
                {product.colors && product.colors.length > 0 && (
                    <div className="flex items-center gap-2 pt-2">
                        {product.colors.map(c => (
                            <span
                                key={c}
                                className="inline-block w-5 h-5 rounded-full border"
                                style={{backgroundColor: c}}
                            />
                        ))}
                    </div>
                )}
                <div className="pt-4">
                    <AddToCartButton productId={product.id} />
                </div>
            </div>
        </div>
    )
}
