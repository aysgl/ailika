'use client'

import Image from 'next/image'
import {Card, CardContent} from '@/components/ui/card'

type CategoryCardProps = {
    name: string
    image: string
    href?: string
}

export default function CategoryCard({name, image, href}: CategoryCardProps) {
    const content = (
        <Card className="group p-0 h-70 gap-8 rounded-t-[100%] rounded-b-4xl bg-white shadow-none overflow-hidden">
            <div className="relative h-full">
                <Image src={image} alt={name} fill className="object-cover" />
                <div className="absolute inset-0 bg-primary-900/20" />
                <CardContent className="absolute inset-0 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute w-32 h-32 rounded-full bg-white/85 transition-all duration-300 group-hover:w-40 group-hover:h-40" />
                        <span className="relative z-10 max-w-[70%] text-center text-sm font-medium leading-snug line-clamp-2">
                            {name}
                        </span>
                    </div>
                </CardContent>
            </div>
        </Card>
    )

    if (href) {
        return (
            <a href={href} className="block">
                {content}
            </a>
        )
    }

    return content
}
