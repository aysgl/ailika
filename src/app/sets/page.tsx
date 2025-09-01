'use client'

import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import {Card, CardContent} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'
import {products} from '@/lib/products'

export default function SetsLandingPage() {
    // Şimdilik tek ürün üzerinden bir landing render ediyoruz
    const featured = products[0]
    const setItems: {name: string; qty: string; priceText: string}[] = [
        {name: 'Renk (Renk Seçiniz)', qty: '1 Adet', priceText: '399,00 ₺'},
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
        {
            name: '(50 Adet) Gold İnce Şablon',
            qty: '1 Takım',
            priceText: '20,00 ₺'
        },
        {
            name: '(12 adet) Uygulama Fırçası',
            qty: '1 Takım',
            priceText: '80,00 ₺'
        },
        {
            name: 'Borthe Kağıt Törpü 100/180',
            qty: '1 Adet',
            priceText: '15,00 ₺'
        },
        {
            name: 'Borthe Dolgu Törpü 100/180',
            qty: '1 Adet',
            priceText: '20,00 ₺'
        },
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

    return (
        <div className="container mx-auto pb-16">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave
                        title="Başlangıç Setleri"
                        bandClass="text-secondary"
                    />
                    <Breadcrumbs
                        items={[
                            {label: 'Anasayfa', href: '/'},
                            {label: 'Başlangıç Setleri', href: '/sets'},
                            {label: featured.name}
                        ]}
                    />
                </div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-4 space-y-4 mt-20">
                    <h2 className="text-5xl font-bold leading-tight">
                        Evinizde Profesyonel
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/60 to-primary">
                            {' '}
                            Başlangıç{' '}
                        </span>
                    </h2>
                    <p className="text-xl  leading-relaxed">
                        Başlangıç setlerimizle ihtiyacınız olan her şey tek
                        pakette. İlk adımı kolaylaştırmak için seçili ürünleri
                        bir araya getirdik.
                    </p>

                    <ul className="grid gap-2 text-muted-foreground list-disc pl-5">
                        <li>Tek pakette ihtiyacınız olan ürünler</li>
                        <li>Uygun fiyat ve kolay seçim</li>
                        <li>Yeni başlayanlar için hızlı kurulum</li>
                    </ul>
                </div>
                <div className="md:col-span-8">
                    <Card>
                        <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white/60">
                                    {featured?.image ? (
                                        <Image
                                            src={featured.image as string}
                                            alt={featured.name}
                                            fill
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-sm text-muted-foreground">
                                            Görsel bulunamadı
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-card-foreground flex items-center gap-2">
                                        <span>{featured.name}</span>
                                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-white">
                                            İndirim!
                                        </span>
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {featured.description}
                                    </p>
                                    <div className="flex items-baseline gap-3">
                                        <span className="text-2xl font-bold">
                                            ₺{(featured.price / 100).toFixed(2)}
                                        </span>
                                        {featured.oldPrice && (
                                            <span className="text-muted-foreground line-through">
                                                ₺
                                                {(
                                                    featured.oldPrice / 100
                                                ).toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        Bu set kampanyasız olarak ₺
                                        {(
                                            (featured.oldPrice ||
                                                featured.price) / 100
                                        ).toFixed(2)}{' '}
                                        tutmaktadır.
                                    </div>

                                    <div className="grid gap-2 pt-2">
                                        <label
                                            className="text-sm"
                                            htmlFor="ellisanColor">
                                            Numaranızı Seçiniz
                                        </label>
                                        <select
                                            id="ellisanColor"
                                            defaultValue=""
                                            className="h-9 px-3 rounded-md border bg-white">
                                            <option value="" disabled>
                                                No selection
                                            </option>
                                            <option>000 (Rakı Beyazı)</option>
                                            <option>001</option>
                                            <option>002</option>
                                            <option>003</option>
                                            <option>004</option>
                                            <option>005</option>
                                            <option>006</option>
                                            <option>007</option>
                                            <option>009</option>
                                            <option>010</option>
                                            <option>011</option>
                                            <option>013</option>
                                            <option>014</option>
                                            <option>015</option>
                                            <option>016</option>
                                            <option>017</option>
                                            <option>018</option>
                                            <option>019</option>
                                            <option>
                                                Milky White (Kemik Beyazı)
                                            </option>
                                            <option>Transparent</option>
                                            <option>White</option>
                                        </select>
                                        <div className="flex items-center gap-2">
                                            <label
                                                className="text-sm"
                                                htmlFor="qty">
                                                Adet
                                            </label>
                                            <Input
                                                id="qty"
                                                type="number"
                                                min={1}
                                                defaultValue={1}
                                                className="w-20"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <AddToCartButton
                                            productId={featured.id}
                                        />
                                    </div>
                                    <div className="text-xs text-muted-foreground space-y-1 pt-1">
                                        <div>
                                            ÜCRETSİZ KARGO (1500₺ üzerindeki
                                            alışverişlerinizde)
                                        </div>
                                        <div>
                                            Anında iade seçeneği (hatalı ya da
                                            kusurlu ürünlerde)
                                        </div>
                                        <div>
                                            14:00’a kadar gelen siparişler aynı
                                            gün kargolanır
                                        </div>
                                        <div>
                                            256bit SSL ile tamamen güvendesiniz!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardContent className="border-t-3 border-primary border-dotted">
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
                                        ₺{(featured.price / 100).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    )
}
