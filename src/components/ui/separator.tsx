import * as React from 'react'
import {cn} from '@/lib/utils'

function Separator({
    className,
    orientation = 'horizontal',
    ...props
}: React.ComponentProps<'div'> & {orientation?: 'horizontal' | 'vertical'}) {
    return (
        <div
            role="separator"
            aria-orientation={orientation}
            className={cn(
                orientation === 'vertical' ? 'h-full w-px' : 'w-full h-px',
                'bg-border',
                className
            )}
            {...props}
        />
    )
}

export {Separator}
