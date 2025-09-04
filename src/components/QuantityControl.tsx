'use client'

import {Minus, Plus} from 'lucide-react'
import {Button} from '@/components/ui/button'

type QuantityControlProps = {
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
    size?: 'sm' | 'md' | 'lg'
    min?: number
    max?: number
    disabled?: boolean
}

export default function QuantityControl({
    quantity,
    onIncrease,
    onDecrease,
    size = 'md',
    min = 0,
    max = 999,
    disabled = false
}: QuantityControlProps) {
    const canDecrease = !disabled && quantity > min
    const canIncrease = !disabled && quantity < max

    // Size'a göre boyutları ayarla
    const getSizeClasses = () => {
        switch (size) {
            case 'sm':
                return {
                    container: 'gap-1 p-1',
                    button: 'w-5 h-5',
                    icon: 'w-3 h-3',
                    text: 'w-5 text-xs'
                }
            case 'lg':
                return {
                    container: 'gap-3 p-2',
                    button: 'w-8 h-8',
                    icon: 'w-5 h-5',
                    text: 'w-8 text-lg font-semibold'
                }
            default: // 'md'
                return {
                    container: 'gap-2 p-1',
                    button: 'w-7 h-7',
                    icon: 'w-4 h-4',
                    text: 'w-6 text-sm'
                }
        }
    }

    const sizeClasses = getSizeClasses()

    return (
        <div
            className={`flex items-center bg-primary/30 rounded-full ${
                sizeClasses.container
            } ${disabled ? 'opacity-50' : ''}`}>
            <Button
                variant="destructive"
                className={sizeClasses.button}
                size="icon"
                aria-label="Azalt"
                onClick={onDecrease}
                disabled={!canDecrease}>
                <Minus className={sizeClasses.icon} />
            </Button>
            <span className={`${sizeClasses.text} text-center`}>
                {quantity}
            </span>
            <Button
                variant="destructive"
                className={sizeClasses.button}
                size="icon"
                aria-label="Artır"
                onClick={onIncrease}
                disabled={!canIncrease}>
                <Plus className={sizeClasses.icon} />
            </Button>
        </div>
    )
}
