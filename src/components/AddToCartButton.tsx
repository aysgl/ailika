'use client'

import {useCart} from '@/context/CartContext'
import {Button} from './ui/button'

type AddToCartButtonProps = {
    productId: string
    quantity?: number
    size?: 'sm' | 'default' | 'lg'
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link'
    className?: string
}

export default function AddToCartButton({
    productId,
    quantity = 1,
    size = 'default',
    variant = 'outline',
    className = ''
}: AddToCartButtonProps) {
    const {addToCart, removeFromCart, items, openCart} = useCart()
    const cartItem = items.find(item => item.productId === productId)
    const inCart = !!cartItem

    const handleClick = () => {
        if (inCart) {
            removeFromCart(productId)
        } else {
            addToCart(productId, quantity)
            openCart()
        }
    }

    return (
        <Button
            variant={inCart ? 'destructive' : variant}
            size={size}
            onClick={handleClick}
            className={className}
            aria-label={inCart ? 'Sepetten çıkar' : 'Sepete ekle'}>
            {inCart
                ? 'Sepetten Çıkar'
                : quantity > 1
                ? `${quantity} Adet Sepete Ekle`
                : 'Sepete Ekle'}
        </Button>
    )
}
