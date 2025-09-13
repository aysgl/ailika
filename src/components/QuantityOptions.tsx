'use client'

import {Label} from '@/components/ui/label'
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group'
import {cn} from '@/lib/utils'

type QuantityOptionsProps = {
    value: number
    onChange: (value: number) => void
    className?: string
}

export function QuantityOptions({
    value,
    onChange,
    className
}: QuantityOptionsProps) {
    const options = [
        {value: 50, label: '50 Adet'},
        {value: 100, label: '100 Adet'},
        {value: 200, label: '200 Adet'},
        {value: 300, label: '300 Adet'}
    ]

    return (
        <RadioGroup
            value={String(value)}
            onValueChange={val => onChange(Number(val))}
            className={cn('grid grid-cols-6 gap-3 w-full', className)}>
            {options.map(option => {
                const isSelected = value === option.value

                return (
                    <div key={option.value} className="relative">
                        <RadioGroupItem
                            value={String(option.value)}
                            id={`quantity-${option.value}`}
                            className="peer sr-only"
                        />

                        <Label
                            htmlFor={`quantity-${option.value}`}
                            className={cn(
                                'flex h-12 items-center justify-center rounded-lg border-2 cursor-pointer transition-all select-none',
                                'text-sm font-medium',
                                isSelected
                                    ? 'border-primary bg-primary/10 text-primary shadow-sm'
                                    : 'border-muted-foreground/30 hover:border-primary/50 hover:bg-primary/20 hover:text-primary'
                            )}>
                            {option.label}
                        </Label>

                        {isSelected && (
                            <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground shadow-sm">
                                <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    aria-hidden="true">
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        )}
                    </div>
                )
            })}
        </RadioGroup>
    )
}
