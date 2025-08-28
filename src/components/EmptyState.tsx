import * as React from 'react'
import {cn} from '@/lib/utils'

type EmptyStateProps = {
    icon?: React.ReactNode
    title: React.ReactNode
    description?: React.ReactNode
    action?: React.ReactNode
    className?: string
}

export default function EmptyState({
    icon,
    title,
    description,
    action,
    className
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'w-full p-6 flex flex-col items-center justify-center text-center gap-2 text-foreground-600',
                className
            )}>
            {icon && <div className="text-foreground-500">{icon}</div>}
            <div className="font-semibold text-foreground">{title}</div>
            {description && (
                <p className="text-sm text-foreground-500 max-w-prose">
                    {description}
                </p>
            )}
            {action && <div className="mt-2">{action}</div>}
        </div>
    )
}
