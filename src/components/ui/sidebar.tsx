import * as React from 'react'
import {cn} from '@/lib/utils'

type DivProps = React.HTMLAttributes<HTMLDivElement>

export function Sidebar({className, ...props}: DivProps) {
    return (
        <div
            className={cn(
                'flex h-full min-h-0 flex-col bg-white rounded-2xl',
                className
            )}
            {...props}
        />
    )
}

export function SidebarHeader({className, ...props}: DivProps) {
    return (
        <div
            className={cn(
                'px-4 py-3 border-primary border-dotted border-b-3 flex items-center',
                className
            )}
            {...props}
        />
    )
}

export function SidebarContent({className, ...props}: DivProps) {
    return (
        <div
            className={cn('flex-1 min-h-0 overflow-y-auto', className)}
            {...props}
        />
    )
}

export function SidebarFooter({className, ...props}: DivProps) {
    return <div className={cn('border-t', className)} {...props} />
}

export function SidebarGroup({className, ...props}: DivProps) {
    return <div className={cn('p-4', className)} {...props} />
}
