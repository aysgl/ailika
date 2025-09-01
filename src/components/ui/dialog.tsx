import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import {cn} from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal
const DialogClose = DialogPrimitive.Close

function DialogOverlay({className, ...props}: React.ComponentProps<'div'>) {
    return (
        <DialogPrimitive.Overlay
            className={cn(
                'fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                className
            )}
            {...props}
        />
    )
}

function DialogContent({className, ...props}: React.ComponentProps<'div'>) {
    return (
        <DialogPortal>
            <DialogOverlay />
            <DialogPrimitive.Content
                className={cn(
                    'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-popover p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-xl',
                    className
                )}
                {...props}
            />
        </DialogPortal>
    )
}

function DialogHeader({className, ...props}: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'flex flex-col space-y-1.5 text-center sm:text-left',
                className
            )}
            {...props}
        />
    )
}

function DialogTitle({className, ...props}: React.ComponentProps<'h2'>) {
    return (
        <DialogPrimitive.Title
            className={cn(
                'text-lg font-semibold leading-none tracking-tight',
                className
            )}
            {...props}
        />
    )
}

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose
}
