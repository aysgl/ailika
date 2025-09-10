'use client'

import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import AccountSidebar from '@/components/AccountSidebar'

export default function AccountLayout({
    title,
    breadcrumb,
    children
}: {
    title: string
    breadcrumb: {label: string; href?: string}[]
    children: React.ReactNode
}) {
    return (
        <div className="container mx-auto xl:px-0 px-2 pb-12">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave title={title} bandClass="text-secondary" />
                    <Breadcrumbs items={breadcrumb} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <aside className="md:col-span-4">
                    <AccountSidebar />
                </aside>
                <div className="md:col-span-8">{children}</div>
            </div>
        </div>
    )
}
