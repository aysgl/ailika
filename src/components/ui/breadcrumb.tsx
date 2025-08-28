import * as React from 'react'
import {cn} from '@/lib/utils'
import {Slot} from '@radix-ui/react-slot'

export function Breadcrumb({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    return (
        <nav
            aria-label="breadcrumb"
            className={cn('w-full', className)}
            {...props}
        />
    )
}

export function BreadcrumbList({
    className,
    ...props
}: React.OlHTMLAttributes<HTMLOListElement>) {
    return (
        <ol
            className={cn(
                'flex flex-wrap items-center gap-2 text-sm',
                className
            )}
            {...props}
        />
    )
}

export function BreadcrumbItem({
    className,
    ...props
}: React.LiHTMLAttributes<HTMLLIElement>) {
    return (
        <li
            className={cn('inline-flex items-center gap-2', className)}
            {...props}
        />
    )
}

export function BreadcrumbLink({
    className,
    asChild,
    ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & {asChild?: boolean}) {
    const Comp = (asChild ? Slot : 'a') as React.ElementType
    return (
        <Comp
            className={cn(
                'text-foreground-600 hover:text-foreground hover:underline',
                className
            )}
            {...props}
        />
    )
}

export function BreadcrumbPage({
    className,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
    return <span className={cn('text-foreground', className)} {...props} />
}

export function BreadcrumbSeparator({
    className,
    children = '/',
    ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
    return (
        <span
            className={cn('text-foreground-400', className)}
            aria-hidden
            {...props}>
            {children}
        </span>
    )
}
