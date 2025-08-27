'use client'

import {Button} from '@/components/ui/button'
import {ArrowRight} from 'lucide-react'

type MoreButtonProps = {
    href: string
    children?: React.ReactNode
}

export default function MoreButton({href, children}: MoreButtonProps) {
    return (
        <div className="mt-6 flex justify-center">
            <Button asChild variant="link">
                <a href={href} className="inline-flex items-center gap-2">
                    {children || 'Daha fazla'}
                    <ArrowRight className="w-4 h-4" />
                </a>
            </Button>
        </div>
    )
}
