'use client'

import {useState, useEffect} from 'react'
import {X, Gift, Copy, Check} from 'lucide-react'
import {Button} from '@/components/ui/button'
import Image from 'next/image'

export function DiscountBanner() {
    const [isVisible, setIsVisible] = useState(false)
    const [copied, setCopied] = useState(false)

    const couponCode = 'GIFT50'

    useEffect(() => {
        const alreadyShown = localStorage.getItem('launchCampaignShown')
        if (!alreadyShown) {
            const timer = setTimeout(() => setIsVisible(true), 800)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        localStorage.setItem('launchCampaignShown', 'true')
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(couponCode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
    }

    if (!isVisible) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/50 backdrop-blur-md animate-in fade-in duration-500">
            <div className="relative w-full max-w-3xl mx-4 animate-in zoom-in-95 duration-700">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary shadow-2xl flex lg:flex-row flex-col">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-all">
                        <X className="h-5 w-5" />
                    </button>

                    {/* Left Image / Icon */}
                    <div className="flex-1 p-8 lg:p-12 text-white flex flex-col">
                        <div className="relative mb-6 flex items-center lg:justify-start justify-center">
                            <Gift className="h-16 w-16 text-secondary animate-bounce" />
                        </div>
                        <h2 className="text-4xl font-bold mb-2 text-center lg:text-left">
                            Açılışa Özel %50 İNDİRİM!
                        </h2>
                        <p className="text-white/80 text-lg text-center lg:text-left mb-6">
                            İlk alışverişinize özel kupon kodunu alın ve fırsatı
                            kaçırmayın!
                        </p>

                        {/* Kupon Kodu */}
                        <div className="flex flex-row gap-4 items-center justify-center">
                            <div className="px-6 py-2 rounded-lg border border-dashed border-white/70">
                                <span className="font-mono text-2xl font-bold tracking-wider">
                                    {couponCode}
                                </span>
                            </div>
                            <Button
                                size={'lg'}
                                variant={'secondary'}
                                onClick={handleCopy}
                                className="w-40 font-semibold px-6 py-3 rounded-lg shadow-lg flex gap-2">
                                {copied ? (
                                    <>
                                        <Check className="w-5 h-5 text-white" />{' '}
                                        Kopyalandı!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-5 h-5" /> Kopyala
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Right Decorative */}
                    <div className="hidden lg:flex w-90 h-full">
                        <Image
                            src="/images/instagram/1.png"
                            alt="Discount"
                            width={500}
                            height={500}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
