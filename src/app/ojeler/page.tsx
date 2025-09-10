import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import CategoryCard from '@/components/CategoryCard'

export const metadata = {
    title: 'Ojeler | Ailika'
}

const sections = [
    {
        slug: 'kalici-oje-koleksiyonu',
        title: 'Kalıcı Oje Koleksiyonu',
        description: 'Kırmızı, pembe, nude ve daha fazlası',
        image: 'https://www.dndgel.com/cdn/shop/collections/DIVA-COQUETTE-PROD_ef60f23a-8e20-4860-98e2-a0332dd60578.jpg?v=1741820965&width=1500'
    },
    {
        slug: 'jel-ojeler',
        title: 'Jel Ojeler',
        description: 'Matte, glitter, chrome stiller',
        image: 'https://www.dndgel.com/cdn/shop/collections/gel_art_liner.jpg?v=1717006411&width=1500'
    },
    {
        slug: 'top-base-coat',
        title: 'Top & Base Coat',
        description: 'Dayanıklılık ve parlaklık',
        image: 'https://www.dndgel.com/cdn/shop/collections/2023-Sheer-Collection-Color-Chart-copy.jpg?v=1712682727&width=1500'
    }
]

export default function OjelerLandingPage() {
    const crumbs = [{label: 'Anasayfa', href: '/'}, {label: 'Ojeler'}]
    return (
        <div className="container mx-auto lg:px-0 px-2 pb-12">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave title="Ojeler" bandClass="text-secondary" />
                    <Breadcrumbs items={crumbs} />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {sections.map(s => (
                    <CategoryCard
                        key={s.slug}
                        name={s.title}
                        image={s.image}
                        href={`/ojeler/${s.slug}`}
                    />
                ))}
            </div>
        </div>
    )
}
