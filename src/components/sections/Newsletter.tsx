'use client'

import {useState} from 'react'
import TitleWave from '@/components/TitleWave'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import Link from 'next/link'
import {Instagram, Facebook, Twitter, Youtube} from 'lucide-react'

export default function Newsletter() {
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
        <section className="container-full px-0 mx-auto pt-16">
            <div className="flex flex-col items-center justify-center mx-auto gap-6 bg-gradient-to-r from-primary to-primary/80 py-24 text-white">
                <TitleWave
                    title="E-Bültenimize Abone Olun"
                    bandClass="text-secondary"
                />
                <p className="text-xl text-center max-w-prose">
                    Yeni koleksiyonlar, kampanyalar ve ilham verici içerikler
                    için sosyal medya kanallarımızı takip edin.
                </p>
                <div className="w-full max-w-xl">
                    {status === 'success' ? (
                        <div className="text-green-900 bg-white/80 rounded-full px-5 py-2 text-sm text-center">
                            Teşekkürler! Aboneliğiniz alındı.
                        </div>
                    ) : (
                        <form onSubmit={onSubmit} className="w-full">
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
                                    type="submit"
                                    disabled={status === 'loading'}
                                    className="absolute right-1 top-1 bottom-1 h-12 rounded-full px-5">
                                    {status === 'loading'
                                        ? 'Gönderiliyor…'
                                        : 'Abone Ol'}
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Button
                        size={'icon'}
                        asChild
                        variant="ghost"
                        className="bg-white/15 hover:bg-white/25 w-16 h-16">
                        <Link
                            href="https://instagram.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram">
                            <Instagram className="size-6" />
                        </Link>
                    </Button>
                    <Button
                        size={'icon'}
                        asChild
                        variant="ghost"
                        className="bg-white/15 hover:bg-white/25 w-16 h-16">
                        <Link
                            href="https://facebook.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook">
                            <Facebook className="size-6" />
                        </Link>
                    </Button>
                    <Button
                        size={'icon'}
                        asChild
                        variant="ghost"
                        className="bg-white/15 hover:bg-white/25 w-16 h-16">
                        <Link
                            href="https://twitter.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="X">
                            <Twitter className="size-6" />
                        </Link>
                    </Button>
                    <Button
                        size={'icon'}
                        asChild
                        variant="ghost"
                        className="bg-white/15 hover:bg-white/25 w-16 h-16">
                        <Link
                            href="https://youtube.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube">
                            <Youtube className="size-6" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
