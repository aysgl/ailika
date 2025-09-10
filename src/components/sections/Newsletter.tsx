'use client'

import TitleWave from '@/components/TitleWave'
import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {Instagram, Facebook, Twitter, Youtube} from 'lucide-react'

export default function Newsletter() {
    return (
        <section className="container mx-auto px-0 py-12">
            <div className="flex flex-col items-center justify-center mx-auto gap-6 rounded-3xl bg-gradient-to-r from-primary to-primary/80 py-24 text-white px-4">
                <TitleWave
                    title="Bizi Sosyal Medya'da Takip Edin"
                    bandClass="text-secondary"
                />
                <p className="text-xl text-center max-w-prose">
                    Yeni koleksiyonlar, kampanyalar ve ilham verici içerikler
                    için sosyal medya kanallarımızı takip edin.
                </p>

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
