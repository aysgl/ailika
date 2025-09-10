'use client'

import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import {Card, CardContent} from '@/components/ui/card'
import Image from 'next/image'

import {products} from '@/lib/products'
import {Clock, Heart, ShieldHalf, Truck} from 'lucide-react'
import {Button} from '@/components/ui/button'
import QuantityControl from '@/components/QuantityControl'
import React, {useState, useMemo} from 'react'
import {useCart} from '@/context/CartContext'
import ColorSelect from '@/components/ColorSelect'
import {Separator} from '@radix-ui/react-dropdown-menu'

export default function SetsLandingPage() {
    const featured = products[0]
    const {addToCart, items, updateQuantity, removeFromCart} = useCart()
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

    // Cart'taki gerçek quantity'yi al, yoksa 1 olarak başla
    const cartItem = items.find(item => item.productId === featured.id)
    const quantity = cartItem?.quantity || 1

    // Renk seçimi state'i
    const [selectedColor, setSelectedColor] = useState<string | null>(null)

    // Featured ürünün renklerini kullan
    const productColors = useMemo(() => {
        return featured.colors && featured.colors.length > 0
            ? featured.colors
            : ['#FF6B6B'] // Fallback renk
    }, [featured.colors])

    // İlk rengi otomatik seç
    React.useEffect(() => {
        if (!selectedColor && productColors.length > 0) {
            setSelectedColor(productColors[0])
        }
    }, [selectedColor, productColors])
    const [showDetails, setShowDetails] = useState(false)

    return (
        <div className="container mx-auto lg:px-0 px-2 pb-12">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave
                        title="Başlangıç Setleri"
                        bandClass="text-secondary"
                    />
                    <Breadcrumbs
                        items={[
                            {label: 'Anasayfa', href: '/'},
                            {label: featured.name}
                        ]}
                    />
                </div>
            </div>

            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 space-y-4 mt-12">
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
                <div className="lg:col-span-8">
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

                                    <div className="pt-2 space-y-2">
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium">
                                                Renk Seçin
                                            </h4>
                                            <ColorSelect
                                                colors={productColors}
                                                selectedColor={selectedColor}
                                                onColorChange={setSelectedColor}
                                                size="md"
                                            />
                                        </div>
                                        <div className="w-full flex items-center justify-between gap-2">
                                            <QuantityControl
                                                quantity={quantity}
                                                onIncrease={() => {
                                                    if (cartItem) {
                                                        updateQuantity(
                                                            featured.id,
                                                            quantity + 1
                                                        )
                                                    } else {
                                                        addToCart(
                                                            featured.id,
                                                            2
                                                        )
                                                    }
                                                }}
                                                onDecrease={() => {
                                                    if (
                                                        cartItem &&
                                                        quantity > 1
                                                    ) {
                                                        updateQuantity(
                                                            featured.id,
                                                            quantity - 1
                                                        )
                                                    }
                                                }}
                                            />

                                            <Button
                                                variant={
                                                    cartItem
                                                        ? 'destructive'
                                                        : 'outline'
                                                }
                                                className="flex-1"
                                                disabled={
                                                    !selectedColor && !cartItem
                                                }
                                                onClick={() => {
                                                    if (
                                                        !selectedColor &&
                                                        !cartItem
                                                    ) {
                                                        return // Renk seçilmeden işlem yapma
                                                    }

                                                    if (cartItem) {
                                                        // Sepetten çıkar
                                                        removeFromCart(
                                                            featured.id
                                                        )
                                                    } else {
                                                        // Sepete ekle
                                                        addToCart(
                                                            featured.id,
                                                            quantity
                                                        )
                                                    }
                                                }}>
                                                {cartItem
                                                    ? 'Sepetten Çıkar'
                                                    : !selectedColor
                                                    ? 'Önce Renk Seçin'
                                                    : quantity > 1
                                                    ? `${quantity} Adet Sepete Ekle`
                                                    : 'Sepete Ekle'}
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="icon">
                                                <Heart className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="mt-4 bg-gray-50 rounded-lg">
                                        <div className="grid grid-cols-1 sm:grid-cols-3 divide-x divide-gray-150 text-xs text-muted-foreground">
                                            <div className="flex flex-col gap-2 p-3">
                                                <Truck className="text-secondary size-5" />
                                                1250₺ üzeri kargoya ücretsiz
                                            </div>
                                            <div className="flex flex-col gap-2 p-3">
                                                <Clock className="text-primary size-5" />
                                                14:00’a kadar siparişler kargoda
                                            </div>
                                            <div className="flex flex-col gap-2 p-3">
                                                <ShieldHalf className="text-lime-500 size-5" />
                                                256-bit SSL ile güvenli
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="sm:col-span-2 mt-4 text-center">
                                    <Separator />
                                    <Button
                                        variant={'link'}
                                        size={'sm'}
                                        onClick={() =>
                                            setShowDetails(!showDetails)
                                        }>
                                        {showDetails
                                            ? 'Daha Az Göster'
                                            : 'Devamını Oku...'}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        {showDetails && (
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
                                        <div className="font-semibold">
                                            Toplam
                                        </div>
                                        <div className="justify-self-end font-bold">
                                            ₺{(featured.price / 100).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        )}
                    </Card>
                </div>
            </section>
        </div>
    )
}
