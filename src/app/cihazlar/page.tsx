import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryCard from '@/components/CategoryCard'

export const metadata = {
    title: 'Cihazlar | Ailika'
}

const sections = [
    {
        slug: 'freze-makineleri',
        title: 'Freze Makineleri',
        description: 'Profesyonel bakım ve şekillendirme',
        image: 'https://images.unsplash.com/photo-1620126513588-1b1b6dc3a5a1?q=80&w=1600&auto=format&fit=crop'
    },
    {
        slug: 'uv-kurutucular',
        title: 'UV Kurutucular',
        description: 'Hızlı ve verimli kurutma',
        image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1600&auto=format&fit=crop'
    }
]

export default function CihazlarLandingPage() {
    const crumbs = [{label: 'Anasayfa', href: '/'}, {label: 'Cihazlar'}]
    return (
        <div className="container mx-auto pb-16">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave title="Cihazlar" bandClass="text-secondary" />
                    <Breadcrumbs items={crumbs} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {sections.map(s => (
                    <CategoryCard
                        key={s.slug}
                        name={s.title}
                        image={s.image}
                        href={`/cihazlar/${s.slug}`}
                    />
                ))}
            </div>
        </div>
    )
}
