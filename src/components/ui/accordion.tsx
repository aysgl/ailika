import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import {cn} from '@/lib/utils'

const Accordion = AccordionPrimitive.Root
const AccordionItem = AccordionPrimitive.Item

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({className, children, ...props}, ref) => (
    <AccordionPrimitive.Header className="flex gap-4">
        <AccordionPrimitive.Trigger
            ref={ref}
            className={cn(
                'flex flex-1 items-center justify-between py-3 text-left text-base font-medium transition-all hover:text-primary bg-white p-4 rounded-xl mb-4',
                className
            )}
            {...props}>
            {children}
            <span className="ml-2">+</span>
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({className, children, ...props}, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className={cn(
            'p-4 bg-white/40 rounded-xl mb-4 -mt-3 overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
            className
        )}
        {...props}>
        <div className="pb-4 pt-0 text-foreground-700">{children}</div>
    </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {Accordion, AccordionItem, AccordionTrigger, AccordionContent}
