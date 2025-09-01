'use client'

import Image from 'next/image'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Minus, Plus, Trash} from 'lucide-react'
// no sheet-specific imports to keep this reusable outside dialogs

type Props = {
    slug: string
    name: string
    code?: string
    image?: string
    priceCents: number
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
    onRemove: () => void
    formatCents: (cents: number) => string
    onNavigate?: () => void
}

export default function CartItemRow({
    slug,
    name,
    code,
    image,
    priceCents,
    quantity,
    onIncrease,
    onDecrease,
    onRemove,
    formatCents,
    onNavigate
}: Props) {
    return (
        <div className="flex gap-12 items-center justify-between p-4">
            <div className="flex items-center gap-2 w-1/2">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onRemove}
                    className="text-primary hover:text-foreground-900">
                    <Trash className="w-4 h-4" />
                </Button>
                <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl bg-foreground-100 shadow-xl aspect-[1/1]">
                    <Image
                        src={image || '/next.svg'}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <Link
                        href={`/product/${slug}`}
                        onClick={onNavigate}
                        className="font-medium hover:underline">
                        {name}
                    </Link>
                    {code && (
                        <p className="text-sm text-foreground-500">
                            Code: {code}
                        </p>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-2 bg-blue-100 p-1 rounded-xl">
                <Button
                    variant="outline"
                    className="w-6 h-6"
                    size="icon"
                    aria-label={`Azalt: ${name}`}
                    onClick={onDecrease}>
                    <Minus className="w-4 h-4" />
                </Button>
                <span className="w-6 text-center">{quantity}</span>
                <Button
                    variant="outline"
                    className="w-6 h-6"
                    size="icon"
                    aria-label={`Artır: ${name}`}
                    onClick={onIncrease}>
                    <Plus className="w-4 h-4" />
                </Button>
            </div>
            <div className="min-w-20 text-end">
                <span className="text-xl font-semibold">
                    {formatCents(priceCents * quantity)}
                </span>
            </div>
        </div>
    )
}
