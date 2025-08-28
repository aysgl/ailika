import CategoriesSection from '@/components/sections/Categories'

export const dynamic = 'force-static'

export default function CategoriesPage() {
    return (
        <main className="container mx-auto px-4 py-12">
            <CategoriesSection />
        </main>
    )
}
