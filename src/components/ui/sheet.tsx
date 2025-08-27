import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {cn} from '@/lib/utils'

const Sheet = DialogPrimitive.Root
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close

const SheetPortal = DialogPrimitive.Portal

const SheetOverlay = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({className, ...props}, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            'fixed inset-0 z-40 bg-red-600/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in',
            className
        )}
        {...props}
    />
))
SheetOverlay.displayName = DialogPrimitive.Overlay.displayName

type SheetContentProps = React.ComponentPropsWithoutRef<
    typeof DialogPrimitive.Content
> & {
    side?: 'right' | 'left' | 'top' | 'bottom'
}

const sideClasses: Record<NonNullable<SheetContentProps['side']>, string> = {
    right: 'right-0 inset-y-0 h-full w-full sm:w-[420px] md:w-[50%] translate-x-full data-[state=open]:translate-x-0',
    left: 'left-0 inset-y-0 h-full w-full sm:w-[420px] md:w-[50%] -translate-x-full data-[state=open]:translate-x-0',
    top: 'top-0 inset-x-0 w-full -translate-y-full data-[state=open]:translate-y-0',
    bottom: 'bottom-0 inset-x-0 w-full translate-y-full data-[state=open]:translate-y-0'
}

const SheetContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    SheetContentProps
>(({side = 'right', className, children, ...props}, ref) => (
    <SheetPortal>
        <SheetOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                'fixed z-50 bg-white shadow-xl transition-transform duration-300 m-2 rounded-2xl',
                sideClasses[side],
                className
            )}
            {...props}>
            {children}
        </DialogPrimitive.Content>
    </SheetPortal>
))
SheetContent.displayName = DialogPrimitive.Content.displayName

const SheetHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex items-center justify-between px-4 py-3 border-b',
            className
        )}
        {...props}
    />
)

const SheetTitle = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({className, ...props}, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn('text-lg font-semibold', className)}
        {...props}
    />
))
SheetTitle.displayName = DialogPrimitive.Title.displayName

export {
    Sheet,
    SheetPortal,
    SheetOverlay,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle
}
