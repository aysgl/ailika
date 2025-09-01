import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '@/lib/utils'

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 [&_svg]:transition-transform outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                destructive:
                    'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
                outline:
                    'border bg-transparent border-primary text-primary hover:bg-primary/10 hover:text-primary shadow-xs dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
                secondary:
                    'bg-secondary text-white shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-white/40 hover:text-accent-foreground dark:hover:bg-accent/50',
                link: 'text-primary underline-offset-4'
            },
            size: {
                default: 'h-9 px-6 py-2 has-[>svg]:px-3',
                sm: 'h-8 gap-1.5 px-4 has-[>svg]:px-4 text-xs',
                lg: 'h-12 px-10 has-[>svg]:px-10',
                icon: 'size-9'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : 'button'

    return (
        <Comp
            data-slot="button"
            data-icon-shift={size !== 'icon' ? 'true' : 'false'}
            className={cn(
                buttonVariants({variant, size, className}),
                'data-[icon-shift=true]:hover:[&_svg]:translate-x-0.5'
            )}
            {...props}
        />
    )
}

export {Button, buttonVariants}
