import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb'

type Crumb = {
    label: string
    href?: string
}

export default function Breadcrumbs({items}: {items: Crumb[]}) {
    if (!items || items.length === 0) return null
    return (
        <Breadcrumb className="flex items-center justify-center gap-2">
            <BreadcrumbList>
                {items.map((it, idx) => (
                    <BreadcrumbItem key={`${it.label}-${idx}`}>
                        {it.href ? (
                            <BreadcrumbLink asChild>
                                <Link href={it.href}>{it.label}</Link>
                            </BreadcrumbLink>
                        ) : (
                            <BreadcrumbPage>{it.label}</BreadcrumbPage>
                        )}
                        {idx < items.length - 1 && <BreadcrumbSeparator />}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
