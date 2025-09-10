'use client'

import Link from 'next/link'
import AddToCartButton from '../../../components/AddToCartButton'
import {formatCentsServer} from '../../../lib/format'
import QuantityControl from '@/components/QuantityControl'
import {Button} from '@/components/ui/button'
import {
    CheckCircle,
    Clock,
    Heart,
    Palette,
    Plus,
    ShieldCheck,
    Truck
} from 'lucide-react'
import {formatCents, useCart} from '@/context/CartContext'
import ColorSelect from '@/components/ColorSelect'
import React, {useState, useEffect} from 'react'
import {useProduct} from '../../../hooks/useProducts'
import {useReviews, useCreateReview} from '../../../hooks/useReviews'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import ProductGallery from '@/components/ProductGallery'
import Image from 'next/image'
import FavoriteRating from '@/components/FavoriteRating'
import ReviewForm from '@/components/ReviewForm'
import RelatedProducts from '@/components/sections/RelatedProducts'
import {Badge} from '@/components/ui/badge'
import CouponCard from '@/components/CouponCard'

type Props = {params: Promise<{slug: string}>}

type ReviewUI = {
    id: string
    productName: string
    productImage?: string
    rating: number
    comment: string
    date: Date
}

export default function ProductPage({params}: Props) {
    const {addToCart, items, updateQuantity, removeFromCart} = useCart()
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [showReviewForm, setShowReviewForm] = useState(false)

    const resolvedParams = React.use(params)

    const {
        data: product,
        isLoading: productLoading,
        error: productError
    } = useProduct(resolvedParams.slug)

    const {data: reviewsData = [], isLoading: reviewsLoading} = useReviews()

    const createReviewMutation = useCreateReview()

    useEffect(() => {
        if (product?.colors && product.colors.length > 0 && !selectedColor) {
            setSelectedColor(product.colors[0])
        }
    }, [product, selectedColor])

    useEffect(() => {
        if (product) {
            document.title = `${product.name} | Ailika`
        } else if (productError) {
            document.title = 'Ürün | Ailika'
        }
    }, [product, productError])

    const reviews: ReviewUI[] = reviewsData.map(r => ({
        id: String(r.id),
        productName: String(r.productName || ''),
        productImage: String(r.productImage || ''),
        rating: Number(r.rating || 0),
        comment: String(r.comment || ''),
        date: new Date(r.date || Date.now())
    }))

    if (productLoading) {
        return (
            <div className="container mx-auto py-12">
                <div className="animate-pulse">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="aspect-square bg-white/40 rounded-xl"></div>
                        <div className="space-y-4">
                            <div className="h-8 bg-white/40 rounded"></div>
                            <div className="h-4 bg-white/40 rounded w-3/4"></div>
                            <div className="h-6 bg-white/40 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (productError || !product) {
        return (
            <div className="container mx-auto py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Ürün bulunamadı</h1>
                <p className="text-muted-foreground mb-6">
                    Aradığınız ürün mevcut değil veya kaldırılmış olabilir.
                </p>
                <Button asChild>
                    <Link href="/shop">Mağazaya Dön</Link>
                </Button>
            </div>
        )
    }

    // Cart'taki gerçek quantity'yi al, yoksa 1 olarak başla
    const cartItem = items.find(item => item.productId === product.id)
    const quantity = cartItem?.quantity || 1

    // Yeni review eklendiğinde mutation kullan
    const handleReviewSubmitted = async (newReview: {
        rating: number
        comment: string
        productName: string
        date: Date
    }) => {
        const userId = 'demo@user.com'

        createReviewMutation.mutate({
            productId: product.id,
            productName: newReview.productName,
            rating: newReview.rating,
            comment: newReview.comment,
            userId
        })
    }

    return (
        <>
            <div className="container mx-auto lg:px-0 px-2 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-6 gap-2">
                    <div className="">
                        <ProductGallery
                            media={product.media}
                            images={
                                product.gallery || [
                                    product.image || '/next.svg'
                                ]
                            }
                            productName={product.name}
                        />

                        <div className="lg:mt-4 mt-2">
                            <Card className="shadow-none">
                                <CardHeader>
                                    <CardTitle>
                                        Birlikte Al,{' '}
                                        <Badge variant="secondary" className="">
                                            10₺{' '}
                                        </Badge>{' '}
                                        Daha Az Öde!
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="grid grid-cols-9 items-center gap-2">
                                    <div className="col-span-4 flex flex-col lg:flex-row items-center gap-2 border rounded-xl p-2">
                                        <Image
                                            src={product.image || '/next.svg'}
                                            alt="Birlikte Al, 20 TL Daha Az Öde!"
                                            width={100}
                                            height={100}
                                            className="shadow-xl rounded-xl w-20 h-20"
                                        />
                                        <div>
                                            <div className="text-sm text-muted-foreground">
                                                {product.name}
                                            </div>
                                            <div className="text-xl">
                                                {formatCents(product.price)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 col-span-1">
                                        <Plus className="w-10 h-10 text-muted-foreground" />
                                    </div>
                                    <div className="col-span-4 flex flex-col lg:flex-row items-center gap-2 border rounded-xl p-2">
                                        <Image
                                            src={product.image || '/next.svg'}
                                            alt="Birlikte Al, 20 TL Daha Az Öde!"
                                            width={100}
                                            height={100}
                                            className="shadow-xl rounded-xl w-20 h-20"
                                        />
                                        <div>
                                            <div className="text-sm text-muted-foreground">
                                                {product.name}
                                            </div>
                                            <div className="text-xl">
                                                {formatCents(
                                                    product.price - 1000
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-6">
                                    <div className="flex items-end text-bold text-xl">
                                        <span className="hidden lg:block">
                                            Toplam Fiyat:
                                        </span>
                                        <div className="flex flex-col gap-0 ms-2">
                                            <span className="line-through text-sm text-muted-foreground">
                                                ₺25,98
                                            </span>{' '}
                                            ₺15,99
                                        </div>
                                    </div>
                                    <Button size={'lg'}>
                                        Birlikte Sepete Ekle
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>

                    {/* Açıklamalar ve Sepete Ekle */}
                    <div className="flex flex-col gap-6 bg-white/40 rounded-xl lg:p-8 p-4">
                        <div className="flex flex-col lg:flex-row gap-6">
                            <div className="md:w-4/5 w-full">
                                <h1 className="text-3xl font-semibold">
                                    {product.name}
                                </h1>
                            </div>
                            <div className="md:w-1/5 w-full">
                                <div className="text-4xl font-bold">
                                    {formatCentsServer(product.price)}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="text-foreground/70">
                                    {product.description}
                                </p>

                                <div className="flex items-center gap-6 my-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold">4.0</span>{' '}
                                        <FavoriteRating rating={4} />
                                    </div>
                                    <div>
                                        <span className="font-bold">27</span>{' '}
                                        değerlendirme
                                    </div>
                                </div>
                                <div className="inline-flex items-center gap-2 bg-primary/20 p-2 rounded-lg">
                                    <span className="text-xs">
                                        Kupon Fırsatı
                                    </span>
                                    <Button size={'xs'}>Kazan</Button>
                                </div>
                            </div>
                        </div>

                        {/* Renk seçimi - sadece renkli ürünler için göster */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="space-y-3">
                                <div>
                                    <h3 className="text-lg font-medium mb-3">
                                        Renk Seçin
                                    </h3>
                                    <ColorSelect
                                        colors={product.colors}
                                        selectedColor={selectedColor}
                                        onColorChange={setSelectedColor}
                                        size="md"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="w-full flex flex-col lg:flex-row items-start lg:items-center gap-2">
                            {/* QuantityControl + Sepete Ekle */}
                            <div className="flex flex-1 gap-2 w-full">
                                <QuantityControl
                                    size={'lg'}
                                    quantity={quantity}
                                    onIncrease={() => {
                                        if (cartItem)
                                            updateQuantity(
                                                product.id,
                                                quantity + 1
                                            )
                                        else addToCart(product.id, 2)
                                    }}
                                    onDecrease={() => {
                                        if (cartItem && quantity > 1)
                                            updateQuantity(
                                                product.id,
                                                quantity - 1
                                            )
                                    }}
                                />

                                <div className="flex-1">
                                    {product.colors &&
                                    product.colors.length > 0 ? (
                                        <Button
                                            size={'lg'}
                                            variant={
                                                cartItem
                                                    ? 'destructive'
                                                    : 'outline'
                                            }
                                            className="w-full"
                                            disabled={
                                                !selectedColor && !cartItem
                                            }
                                            onClick={() => {
                                                if (!selectedColor && !cartItem)
                                                    return
                                                if (cartItem)
                                                    removeFromCart(product.id)
                                                else
                                                    addToCart(
                                                        product.id,
                                                        quantity
                                                    )
                                            }}>
                                            {cartItem
                                                ? 'Sepetten Çıkar'
                                                : !selectedColor
                                                ? 'Önce Renk Seçin'
                                                : quantity > 1
                                                ? `${quantity} Adet Sepete Ekle`
                                                : 'Sepete Ekle'}
                                        </Button>
                                    ) : (
                                        <AddToCartButton
                                            productId={product.id}
                                            quantity={quantity}
                                            className="w-full"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Favoriler butonu */}
                            <Button
                                variant="secondary"
                                size={'lg'}
                                className="w-full lg:w-auto flex justify-center items-center gap-2">
                                <Heart className="w-4 h-4" />
                                <span>Favorilerime Ekle</span>
                            </Button>
                        </div>

                        <Card className="shadow-none border border-primary/20 bg-transparent py-0">
                            <div className="grid grid-cols-2 text-muted-foreground border-b border-primary/20 mb-4 p-4 gap-4">
                                <div className="flex flex-col gap-2 md:p-3 p-0 border-r border-primary/20">
                                    <Truck className="text-secondary size-5" />
                                    1250₺ üzeri kargoya ücretsiz
                                </div>
                                <div className="flex flex-col gap-2 md:p-3 p-0">
                                    <Clock className="text-primary size-5" />
                                    14:00’a kadar siparişler kargoda
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 pt-0">
                                {/* Security Icon */}
                                <div className="flex-shrink-0 h-full hidden lg:block">
                                    <div className="relative px-6 bg-primary/10 rounded-xl h-full flex items-center justify-center">
                                        <ShieldCheck className="w-16 h-16 text-primary" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-accent hidden lg:block" />
                                        <h3 className="text-lg font-semibold text-foreground">
                                            256bit SSL ile tamamen güvendesiniz!
                                        </h3>
                                    </div>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Verileriniz en yüksek seviye şifreleme
                                        teknolojisi ile korunmaktadır. Güvenli
                                        bağlantınız aktif ve tüm bilgileriniz
                                        şifrelenmiştir.
                                    </p>

                                    {/* Security Features */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                            256-bit Şifreleme
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                            SSL Sertifikalı
                                        </span>
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                            Güvenli Bağlantı
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Card className="bg-transparent p-0 shadow-none">
                            <CardHeader className="p-0 pb-4">
                                <CardTitle>Size Özel Kuponlar</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <CouponCard
                                        title={'deneme 1'}
                                        code={'200'}
                                        description={'hello'}
                                        discountType={'percent'}
                                        discountValue={10}
                                    />
                                    <CouponCard
                                        title={'deneme 2'}
                                        code={'200'}
                                        description={'hello'}
                                        discountType={'percent'}
                                        discountValue={10}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Ürünün Tüm Özellikleri</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Laudantium quisquam, illo
                                eaque ad officia aspernatur minima ut aliquam
                                maxime quibusdam esse dolor ea pariatur? Tempore
                                consequatur exercitationem repellat cum
                                perferendis.
                                <ul className="list-disc ms-10 mt-2">
                                    <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit.
                                    </li>
                                    <li>Quae est voluptate maiores dolorum?</li>
                                    <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit.
                                    </li>
                                    <li>Quae est voluptate maiores dolorum?</li>
                                    <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit.
                                    </li>
                                    <li>Quae est voluptate maiores dolorum?</li>
                                    <li>
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipisicing elit.
                                    </li>
                                    <li>Quae est voluptate maiores dolorum?</li>
                                </ul>
                            </CardContent>
                        </Card>

                        <div className="grid gap-3 mt-4">
                            <h3 className="font-semibold text-lg mb-2">
                                Müşteri Yorumları
                            </h3>
                            {reviewsLoading ? (
                                <div className="space-y-3">
                                    {[1, 2].map(i => (
                                        <div
                                            key={i}
                                            className="animate-pulse bg-white rounded-xl p-4 flex gap-3">
                                            <div className="w-12 h-12 bg-white/40 rounded-full"></div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 bg-white/40 rounded w-1/3"></div>
                                                <div className="h-3 bg-white/40 rounded w-full"></div>
                                                <div className="h-3 bg-white/40 rounded w-2/3"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : reviews.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    <p>Henüz yorum yapılmamış.</p>
                                    <p className="text-sm">
                                        İlk yorumu siz yapın!
                                    </p>
                                </div>
                            ) : (
                                reviews.map(r => (
                                    <div
                                        key={r.id}
                                        className="bg-white rounded-xl p-4 flex gap-3 items-start">
                                        {r.productImage ? (
                                            <Image
                                                src={r.productImage}
                                                alt={r.productName}
                                                width={48}
                                                height={48}
                                                className="w-12 h-12 rounded-full object-cover border"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Palette className="w-5 h-5 text-primary/60" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="font-medium line-clamp-1">
                                                    {r.productName}
                                                </div>
                                                <div className="text-xs text-foreground/60 whitespace-nowrap">
                                                    {r.date.toLocaleDateString(
                                                        'tr-TR'
                                                    )}
                                                </div>
                                            </div>
                                            <FavoriteRating rating={r.rating} />
                                            <div className="text-sm text-foreground/80 mt-1 whitespace-pre-line">
                                                {r.comment}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}

                            {!showReviewForm && (
                                <Button
                                    className="w-50 ml-auto"
                                    onClick={() => setShowReviewForm(true)}>
                                    Sende yorum yap!
                                </Button>
                            )}
                            {showReviewForm && (
                                <ReviewForm
                                    productId={product.id}
                                    productName={product.name}
                                    onReviewSubmitted={handleReviewSubmitted}
                                    onCancel={() => setShowReviewForm(false)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <RelatedProducts />
        </>
    )
}
