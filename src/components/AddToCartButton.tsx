'use client'

import {useCart} from '../context/CartContext'
import {Button} from './ui/button'

export default function AddToCartButton({
    productId,
    label = 'Sepete Ekle'
}: {
    productId: string
    label?: string
}) {
    const {addToCart} = useCart()
    return <Button onClick={() => addToCart(productId, 1)}>{label}</Button>
}
