import Image from 'next/image'
import {getProductBySlug} from '@/lib/products'
import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {formatCentsServer} from '@/lib/format'
import AddToCartButton from '@/components/AddToCartButton'

type Props = {params: {slug: string}}

const setItems: {name: string; qty: string; priceText: string}[] = [
    {name: 'Ellisan (Renk Seçiniz)', qty: '1 Adet', priceText: '399,00 ₺'},
    {
        name: 'Uno Dehydrator (Bakteri Önleyici)',
        qty: '1 Adet',
        priceText: '125,00 ₺'
    },
    {name: 'Uno Rubber', qty: '1 Adet', priceText: '125,00 ₺'},
    {name: 'Uno Lux', qty: '1 Adet', priceText: '125,00 ₺'},
    {name: 'Uno Super Shine', qty: '1 Adet', priceText: '125,00 ₺'},
    {
        name: 'UV Fener (El Feneri Şeklinde)',
        qty: '1 Adet',
        priceText: '150,00 ₺'
    },
    {name: '(50 Adet) Gold İnce Şablon', qty: '1 Takım', priceText: '20,00 ₺'},
    {name: '(12 adet) Uygulama Fırçası', qty: '1 Takım', priceText: '80,00 ₺'},
    {name: 'Borthe Kağıt Törpü 100/180', qty: '1 Adet', priceText: '15,00 ₺'},
    {name: 'Borthe Dolgu Törpü 100/180', qty: '1 Adet', priceText: '25,00 ₺'},
    {
        name: 'Borthe Cleanser (Top Coat sonrası temizleme solüsyonu)',
        qty: '1 Adet',
        priceText: '125,00 ₺'
    },
    {
        name: 'Borthe Remover (Kalıcı Oje Çıkartıcı)',
        qty: '1 Adet',
        priceText: '125,00 ₺'
    },
    {name: 'Borthe Moistening Oil', qty: '1 Adet', priceText: '135,00 ₺'}
]

export async function generateMetadata({params}: Props) {
    const product = getProductBySlug(params.slug)
    return {title: product ? `${product.name} | Ailika` : 'Başlangıç Seti'}
}

export default function SetDetailPage({params}: Props) {
    const product = getProductBySlug(params.slug)
    if (!product) {
        return <div className="container mx-auto py-12">Set bulunamadı.</div>
    }

    return (
        <div className="container mx-auto pb-16">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave
                        title={product.name}
                        bandClass="text-secondary"
                    />
                    <Breadcrumbs
                        items={[
                            {label: 'Anasayfa', href: '/'},
                            {label: 'Başlangıç Setleri', href: '/sets'},
                            {label: product.name}
                        ]}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-6">
                    <div className="relative aspect-square bg-white border border-foreground/10 rounded-lg overflow-hidden">
                        <Image
                            src={product.image || '/next.svg'}
                            alt={product.name}
                            fill
                            className="object-contain p-8"
                        />
                    </div>
                </div>
                <div className="md:col-span-6 space-y-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2">
                                <span className="text-2xl">{product.name}</span>
                                <span className="text-xs px-2 py-1 rounded-full bg-secondary text-white">
                                    İndirim!
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-extrabold">
                                    {formatCentsServer(product.price)}
                                </span>
                                {product.oldPrice && (
                                    <span className="text-muted-foreground line-through">
                                        {formatCentsServer(product.oldPrice)}
                                    </span>
                                )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Bu set kampanyasız olarak{' '}
                                {formatCentsServer(
                                    product.oldPrice || product.price
                                )}{' '}
                                tutmaktadır.
                            </div>
                            <div className="pt-2">
                                <AddToCartButton productId={product.id} />
                            </div>
                            <div className="text-xs text-muted-foreground space-y-1">
                                <div>
                                    ÜCRETSİZ KARGO (1500₺ üzeri alışverişlerde)
                                </div>
                                <div>
                                    Anında iade seçeneği (hatalı/kusurlu
                                    ürünlerde)
                                </div>
                                <div>
                                    14:00’a kadar gelen siparişler aynı gün
                                    kargolanır
                                </div>
                                <div>256bit SSL ile tamamen güvendesiniz!</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Set İçeriği</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-[100px_1fr_auto] items-center text-sm font-medium text-foreground/80">
                                    <div>Adet/Takım</div>
                                    <div>Ürün Adı</div>
                                    <div className="justify-self-end">
                                        Fiyat
                                    </div>
                                </div>
                                {setItems.map((it, idx) => (
                                    <div
                                        key={idx}
                                        className="grid grid-cols-[100px_1fr_auto] items-center text-sm py-2 border-b border-foreground/10">
                                        <div className="text-foreground/70">
                                            {it.qty}
                                        </div>
                                        <div>{it.name}</div>
                                        <div className="justify-self-end font-medium">
                                            {it.priceText}
                                        </div>
                                    </div>
                                ))}
                                <div className="grid grid-cols-[100px_1fr_auto] items-center text-sm pt-2">
                                    <div className="text-foreground/70">
                                        13 Parça
                                    </div>
                                    <div className="font-semibold">Toplam</div>
                                    <div className="justify-self-end font-bold">
                                        {formatCentsServer(product.price)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-3">
                        <Button asChild variant="outline">
                            <Link href="/sets">Diğer Setler</Link>
                        </Button>
                        <Button asChild>
                            <Link href={`/product/${product.slug}`}>
                                Ürünü İncele
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
