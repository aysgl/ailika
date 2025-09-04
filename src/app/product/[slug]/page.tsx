'use client'

import Image from 'next/image'
import {api} from '../../../lib/api'
import type {Product} from '../../../types/product'
import AddToCartButton from '../../../components/AddToCartButton'
import {formatCentsServer} from '../../../lib/format'
import QuantityControl from '@/components/QuantityControl'
import {Button} from '@/components/ui/button'
import {CheckCircle, Clock, Heart, ShieldCheck, Truck} from 'lucide-react'
import {useCart} from '@/context/CartContext'
import ColorSelect from '@/components/ColorSelect'
import React, {useState, useEffect} from 'react'
import {Card} from '@/components/ui/card'
import TrendingProducts from '@/components/sections/TrendingProducts'

type Props = {params: Promise<{slug: string}>}

export default function ProductPage({params}: Props) {
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const {addToCart, items, updateQuantity, removeFromCart} = useCart()
    const [selectedColor, setSelectedColor] = useState<string | null>(null)

    // React.use() ile params'ı unwrap et
    const resolvedParams = React.use(params)

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await api.getProduct(resolvedParams.slug)
                setProduct(productData)

                // Ürünün gerçek renkleri varsa ilk rengi seç
                if (productData.colors && productData.colors.length > 0) {
                    const firstColor = productData.colors[0]
                    setSelectedColor(firstColor)
                }

                // Dinamik title güncelleme
                document.title = `${productData.name} | Ailika`
            } catch {
                setError(true)
                document.title = 'Ürün | Ailika'
            } finally {
                setLoading(false)
            }
        }

        fetchProduct()
    }, [resolvedParams.slug])

    if (loading) {
        return <div className="py-12">Yükleniyor...</div>
    }

    if (error || !product) {
        return <div className="py-12">Ürün bulunamadı.</div>
    }

    // Cart'taki gerçek quantity'yi al, yoksa 1 olarak başla
    const cartItem = items.find(item => item.productId === product.id)
    const quantity = cartItem?.quantity || 1

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-square bg-white rounded-xl overflow-hidden">
                    <Image
                        src={product.image || '/next.svg'}
                        alt={product.name}
                        fill
                        className="object-contain p-8"
                    />
                </div>
                <div className="flex flex-col gap-4 bg-white/40 rounded-xl p-8">
                    <h1 className="text-4xl font-semibold">{product.name}</h1>
                    <div className="text-6xl font-bold">
                        {formatCentsServer(product.price)}
                    </div>
                    <p className="text-foreground/70">{product.description}</p>

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
                                    size="lg"
                                />
                            </div>
                        </div>
                    )}
                    <div className="w-full flex items-center justify-between gap-2">
                        <QuantityControl
                            size={'lg'}
                            quantity={quantity}
                            onIncrease={() => {
                                if (cartItem) {
                                    updateQuantity(product.id, quantity + 1)
                                } else {
                                    addToCart(product.id, 2)
                                }
                            }}
                            onDecrease={() => {
                                if (cartItem && quantity > 1) {
                                    updateQuantity(product.id, quantity - 1)
                                }
                            }}
                        />
                        <div className="flex-1">
                            {/* Renk seçimi zorunlu kontrolü */}
                            {product.colors && product.colors.length > 0 ? (
                                <Button
                                    size={'lg'}
                                    variant={
                                        cartItem ? 'destructive' : 'outline'
                                    }
                                    className="w-full"
                                    disabled={!selectedColor && !cartItem}
                                    onClick={() => {
                                        if (!selectedColor && !cartItem) {
                                            return // Renk seçilmeden işlem yapma
                                        }

                                        if (cartItem) {
                                            // Sepetten çıkar
                                            removeFromCart(product.id)
                                        } else {
                                            // Sepete ekle
                                            addToCart(product.id, quantity)
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
                            ) : (
                                // Renksiz ürünler için normal AddToCartButton
                                <AddToCartButton
                                    productId={product.id}
                                    quantity={quantity}
                                    className="w-full"
                                />
                            )}
                        </div>
                        <Button variant="secondary" size={'lg'}>
                            <Heart className="w-4 h-4" /> Favorilerime Ekle
                        </Button>
                    </div>

                    <Card className="shadow-none border border-primary/20 bg-transparent py-0">
                        <div className="grid grid-cols-1 sm:grid-cols-2 text-muted-foreground border-b border-primary/20 mb-4 p-4 gap-4">
                            <div className="flex flex-col gap-2 p-3 border-r border-primary/20">
                                <Truck className="text-secondary size-5" />
                                1250₺ üzeri kargoya ücretsiz
                            </div>
                            <div className="flex flex-col gap-2 p-3">
                                <Clock className="text-primary size-5" />
                                14:00’a kadar siparişler kargoda
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4">
                            {/* Security Icon */}
                            <div className="flex-shrink-0 h-full">
                                <div className="relative px-6 bg-primary/10 rounded-xl h-full flex items-center justify-center">
                                    <ShieldCheck className="w-16 h-16 text-primary" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-accent" />
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
                </div>
            </div>
            <TrendingProducts />
        </div>
    )
}
