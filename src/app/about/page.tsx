import Breadcrumbs from '@/components/Breadcrumbs'
import TitleWave from '@/components/TitleWave'
import {Card, CardContent} from '@/components/ui/card'
import {Award, Heart, Sparkles, Star, Users} from 'lucide-react'
import InstagramGallery from '@/components/InstagramGallery'
import Image from 'next/image'

export const dynamic = 'force-static'

export default function AboutPage() {
    return (
        <div className="container mx-auto xl:px-0 px-2 pb-12">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave title={'Hikayemiz'} bandClass="text-secondary" />
                    <Breadcrumbs
                        items={[
                            {label: 'Anasayfa', href: '/'},
                            {label: 'Hikayemiz'}
                        ]}
                    />
                </div>
            </div>
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-5xl font-bold  leading-tight">
                            Güzelliğin
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/60 to-primary">
                                {' '}
                                Sanatsal{' '}
                            </span>
                            Yolculuğu
                        </h2>
                        <p className="text-xl  leading-relaxed">
                            2015 yılından bu yana, her tırnağı bir sanat eserine
                            dönüştürme tutkusuyla yola çıktık. Bugün binlerce
                            kadının güzellik yolculuğunda yanındayız.
                        </p>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-secondary">
                                50K+
                            </div>
                            <div className="text-sm ">Mutlu Müşteri</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-secondary">
                                8
                            </div>
                            <div className="text-sm ">Yıllık Deneyim</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-secondary">
                                1000+
                            </div>
                            <div className="text-sm ">Ürün Çeşidi</div>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-square bg-white/40 rounded-3xl overflow-hidden p-2">
                        <InstagramGallery limit={9} />
                    </div>
                    <div className="absolute -bottom-12 -left-12 bg-white p-6 rounded-2xl shadow-xl">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                <Heart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="font-bold ">
                                    Tutkuyla Başladık
                                </div>
                                <div className="text-sm ">
                                    2015&rsquo;ten bu yana
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Timeline */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold  mb-4">Yolculuğumuz</h2>
                <p className="text-xl  max-w-2xl mx-auto">
                    Küçük bir atölyeden bugünkü konumumuza kadar geçen süreçte
                    yaşadığımız önemli anlar
                </p>
            </div>

            <div className="relative mb-24">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary"></div>

                {/* Timeline Items */}
                <div className="space-y-12">
                    {[
                        {
                            year: '2015',
                            title: 'Başlangıç',
                            description:
                                'Nail art tutkusuyla küçük bir atölyede yola çıktık. İlk ürünlerimizi el emeği göz nuru hazırladık.',
                            icon: <Sparkles className="w-6 h-6" />,
                            side: 'left'
                        },
                        {
                            year: '2017',
                            title: 'İlk Mağaza',
                            description:
                                'Artan talep üzerine ilk fiziksel mağazamızı açtık. Müşterilerimizle yüz yüze buluşmanın heyecanını yaşadık.',
                            icon: <Users className="w-6 h-6" />,
                            side: 'right'
                        },
                        {
                            year: '2019',
                            title: 'Online Platform',
                            description:
                                "Dijital dönüşümle birlikte online platformumuzu kurduk. Türkiye'nin her yerine ulaşmaya başladık.",
                            icon: <Star className="w-6 h-6" />,
                            side: 'left'
                        },
                        {
                            year: '2021',
                            title: 'Uluslararası Genişleme',
                            description:
                                'Kaliteli ürünlerimizle sınırları aştık. Avrupa pazarına adım attık.',
                            icon: <Award className="w-6 h-6" />,
                            side: 'right'
                        },
                        {
                            year: '2023',
                            title: 'Sürdürülebilirlik',
                            description:
                                'Çevre dostu ürünler geliştirerek sürdürülebilir güzellik anlayışını benimседik.',
                            icon: <Heart className="w-6 h-6" />,
                            side: 'left'
                        }
                    ].map((item, index) => (
                        <div key={index} className="relative flex items-center">
                            {/* Timeline Dot */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 bg-primary rounded-full w-12 h-12 flex items-center justify-center text-white shadow-lg z-10">
                                {item.icon}
                            </div>

                            {/* Content */}
                            <div
                                className={`w-1/2 ${
                                    item.side === 'left'
                                        ? 'pr-12 text-right'
                                        : 'pl-12 ml-auto'
                                }`}>
                                <Card className="bg-white/10 border border-primary/10 transition-all duration-300 transform hover:-translate-y-2 shadow-none">
                                    <CardContent className="p-6">
                                        <div
                                            className={`flex items-center space-x-3 mb-4 ${
                                                item.side === 'left'
                                                    ? 'justify-end'
                                                    : ''
                                            }`}>
                                            <div>
                                                <div className="text-2xl font-bold text-secondary">
                                                    {item.year}
                                                </div>
                                                <div className="text-lg font-semibold">
                                                    {item.title}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="">{item.description}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Values Section */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold  mb-4">Değerlerimiz</h2>
                <p className="text-xl max-w-2xl mx-auto">
                    Bizi biz yapan ve her adımımızda rehber olan temel
                    değerlerimiz
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24">
                {[
                    {
                        icon: <Heart className="w-8 h-8" />,
                        title: 'Tutku',
                        description:
                            'Her ürünümüzü nail art sevgisiyle tasarlıyor ve üretiyoruz.',
                        color: 'from-pink-500 to-rose-500'
                    },
                    {
                        icon: <Star className="w-8 h-8" />,
                        title: 'Kalite',
                        description:
                            'En yüksek standartlarda ürünler sunarak güveninizi kazanıyoruz.',
                        color: 'from-purple-500 to-indigo-500'
                    },
                    {
                        icon: <Users className="w-8 h-8" />,
                        title: 'Müşteri Odaklılık',
                        description:
                            'Müşteri memnuniyeti bizim için her şeyden önce gelir.',
                        color: 'from-rose-500 to-pink-500'
                    },
                    {
                        icon: <Sparkles className="w-8 h-8" />,
                        title: 'İnovasyon',
                        description:
                            'Sürekli yenilik yaparak trend belirleyen ürünler geliştiriyoruz.',
                        color: 'from-indigo-500 to-purple-500'
                    }
                ].map((value, index) => (
                    <Card
                        key={index}
                        className="bg-white shadow-xl hover:shadow-none transition-all duration-300 transform hover:-translate-y-2">
                        <CardContent className="p-8 text-center">
                            <div
                                className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center text-white mx-auto mb-6`}>
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">
                                {value.title}
                            </h3>
                            <p className="">{value.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Team Section */}

            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold  mb-4">Ekibimiz</h2>
                <p className="text-xl  max-w-2xl mx-auto">
                    Nail art dünyasında uzman olan ve tutkuyla çalışan
                    ekibimizle tanışın
                </p>
            </div>

            {(() => {
                const team = [
                    {
                        name: 'Ayşe Demir',
                        role: 'Kurucu & CEO',
                        image: '/images/hero-slider/profile1.jpg',
                        description:
                            '15 yıllık nail art deneyimi ile sektörün öncü isimlerinden.'
                    },
                    {
                        name: 'Elif Kaya',
                        role: 'Baş Tasarımcı',
                        image: '/images/hero-slider/profile2.jpg',
                        description:
                            'Yaratıcı tasarımları ile nail art trendlerini belirleyen sanatçı.'
                    },
                    {
                        name: 'Zeynep Özkan',
                        role: 'Ürün Geliştirme',
                        image: '/images/hero-slider/profile3.jpg',
                        description:
                            'İnovatif formüller geliştiren kimya mühendisi ve güzellik uzmanı.'
                    },
                    {
                        name: 'Ayşe Demir',
                        role: 'Kurucu & CEO',
                        image: '/images/hero-slider/profile1.jpg',
                        description:
                            '15 yıllık nail art deneyimi ile sektörün öncü isimlerinden.'
                    },
                    {
                        name: 'Elif Kaya',
                        role: 'Baş Tasarımcı',
                        image: '/images/hero-slider/profile2.jpg',
                        description:
                            'Yaratıcı tasarımları ile nail art trendlerini belirleyen sanatçı.'
                    },
                    {
                        name: 'Zeynep Özkan',
                        role: 'Ürün Geliştirme',
                        image: '/images/hero-slider/profile3.jpg',
                        description:
                            'İnovatif formüller geliştiren kimya mühendisi ve güzellik uzmanı.'
                    }
                ]
                const first = team[0]
                const rest = team.slice(1)
                return (
                    <>
                        {/* İlk üye tek sütun, geniş kart */}
                        <div className="mb-10">
                            <Card className="bg-transparent shadow-none">
                                <CardContent className="">
                                    <div className="text-center flex flex-col items-center justify-center">
                                        <Image
                                            width={180}
                                            height={180}
                                            src={first.image}
                                            alt={first.name}
                                            className="w-44 h-44 md:w-48 md:h-48 object-cover rounded-full"
                                        />
                                        <div className="md:col-span-2 p-6">
                                            <h3 className="text-2xl font-bold mb-2">
                                                {first.name}
                                            </h3>
                                            <div className="text-primary font-medium mb-3">
                                                {first.role}
                                            </div>
                                            <p className="text-sm md:text-base">
                                                {first.description}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Kalan üyeler altta yan yana */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {rest.map((member, index) => (
                                <Card
                                    key={index}
                                    className="bg-transparent transition-all duration-300 transform hover:-translate-y-2 shadow-none text-center">
                                    <CardContent className="p-0">
                                        <div className="overflow-hidden flex items-center justify-center">
                                            <Image
                                                width={100}
                                                height={100}
                                                src={member.image}
                                                alt={member.name}
                                                className="w-28 h-28 md:w-32 md:h-32 object-cover rounded-full"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-lg font-bold mb-2">
                                                {member.name}
                                            </h3>
                                            <div className="text-primary font-medium mb-3">
                                                {member.role}
                                            </div>
                                            <p className="text-sm">
                                                {member.description}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </>
                )
            })()}
        </div>
    )
}
