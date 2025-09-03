'use client'

import {Minus, Plus} from 'lucide-react'
import {Button} from '@/components/ui/button'

type QuantityControlProps = {
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
    size?: 'sm' | 'md'
}

export default function QuantityControl({
    quantity,
    onIncrease,
    onDecrease,
    size = 'md'
}: QuantityControlProps) {
    const isSmall = size === 'sm'

    return (
        <div
            className={`flex items-center gap-2 bg-primary/30 p-1 rounded-2xl ${
                isSmall ? 'scale-90' : ''
            }`}>
            <Button
                variant="destructive"
                className="w-6 h-6"
                size="icon"
                aria-label="Azalt"
                onClick={onDecrease}>
                <Minus className="w-4 h-4" />
            </Button>
            <span className="w-6 text-center">{quantity}</span>
            <Button
                variant="destructive"
                className="w-6 h-6"
                size="icon"
                aria-label="Artır"
                onClick={onIncrease}>
                <Plus className="w-4 h-4" />
            </Button>
        </div>
    )
}
