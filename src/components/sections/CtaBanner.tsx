'use client'

import {useState} from 'react'
import {Button} from '@/components/ui/button'
import TitleWave from '../TitleWave'
import {Input} from '../ui/input'
import {PartyPopper} from 'lucide-react'

export default function CtaBanner() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<
        'idle' | 'loading' | 'success' | 'error'
    >('idle')

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        setStatus('loading')
        try {
            await new Promise(res => setTimeout(res, 700))
            setStatus('success')
            setEmail('')
        } catch {
            setStatus('error')
        }
    }

    return (
        <section className="container mx-auto xl:px-0 px-2 py-12">
            <div
                className="relative rounded-3xl text-white p-10 flex items-center justify-center gap-10 lg:aspect-4/2 md:aspect-4/3 aspect-3/4 object-cover overflow-hidden"
                style={{
                    backgroundImage: "url('/party.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center'
                }}>
                {/* overlay */}
                <div className="absolute inset-0 bg-primary/80 contrast-200"></div>

                {/* içerik */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                    <PartyPopper size={80} strokeWidth={1} />
                    <TitleWave
                        title="Tırnak Partisine Davetlisiniz!"
                        headingLevel={3}
                        bandClass="text-secondary"
                    />
                    <p className="text-white/80 mt-1 text-lg mb-10 max-w-3xl text-center">
                        Özel fırsatlardan yararlanmak, en yeni ürünlere
                        herkesten önce erişmek ve sürpriz hediyeler kazanmak
                        için hemen kaydolun. Tırnak partimizde size özel
                        avantajlar sizi bekliyor!
                    </p>

                    <form onSubmit={onSubmit} className="min-w-[350px]">
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="E-posta adresiniz"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                aria-label="E-posta"
                                className="bg-white text-foreground pr-36 h-14 rounded-full"
                            />
                            <Button
                                variant={'secondary'}
                                type="submit"
                                disabled={status === 'loading'}
                                className="absolute right-1 top-1 bottom-1 h-12 rounded-full px-5">
                                {status === 'loading'
                                    ? 'Gönderiliyor…'
                                    : 'Abone Ol'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
