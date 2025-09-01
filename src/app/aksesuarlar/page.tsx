import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryCard from '@/components/CategoryCard'

export const metadata = {
    title: 'Aksesuarlar | Ailika'
}

const sections = [
    {
        slug: 'sablonlar',
        title: 'Şablonlar',
        description: 'French, Nail Art, Ombre, Geometrik',
        image: 'https://images.unsplash.com/photo-1604654894619-67a5b10f5f37?q=80&w=1600&auto=format&fit=crop'
    },
    {
        slug: 'torpuler',
        title: 'Törpüler',
        description: 'Cam, Metal, Emery, Buffer',
        image: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1600&auto=format&fit=crop'
    },
    {
        slug: 'fircalar',
        title: 'Fırçalar',
        description: 'Nail Art, Temizlik, Detay, Gradient',
        image: 'https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?q=80&w=1600&auto=format&fit=crop'
    },
    {
        slug: 'freze-uclari',
        title: 'Freze Uçları',
        description: 'Seramik, Metal, Elmas, Karbür',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8d1c523b1?q=80&w=1600&auto=format&fit=crop'
    }
]

export default function AksesuarlarLandingPage() {
    const crumbs = [{label: 'Anasayfa', href: '/'}, {label: 'Aksesuarlar'}]

    return (
        <div className="container mx-auto pb-16">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave title="Aksesuarlar" bandClass="text-secondary" />
                    <Breadcrumbs items={crumbs} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {sections.map(s => (
                    <CategoryCard
                        key={s.slug}
                        name={s.title}
                        image={s.image}
                        href={`/aksesuarlar/${s.slug}`}
                    />
                ))}
            </div>
        </div>
    )
}
