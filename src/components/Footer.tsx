import Link from 'next/link'
import Logo from './Logo'
import {
    Instagram,
    Facebook,
    Twitter,
    Youtube,
    Mail,
    Phone,
    MapPin
} from 'lucide-react'

export default function Footer() {
    const year = new Date().getFullYear()
    return (
        <footer className="w-full border-t border-foreground/10 bg-white/40">
            <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Brand */}
                <div className="md:col-span-4 space-y-4">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <span className="text-primary">
                            <Logo className="h-8 w-auto" />
                        </span>
                        <span className="sr-only">Ailika</span>
                    </Link>
                    <p className="text-sm text-foreground/70 max-w-prose">
                        Ailika ile şık ve kaliteli ojeler. Günlükten özel anlara
                        kadar; renginizi bulun.
                    </p>
                    <div className="flex items-center gap-3 text-foreground/70 text-sm">
                        <MapPin className="w-4 h-4" /> İstanbul, Türkiye
                    </div>
                    <div className="flex items-center gap-3 text-foreground/70 text-sm">
                        <Phone className="w-4 h-4" /> +90 555 000 00 00
                    </div>
                    <div className="flex items-center gap-3 text-foreground/70 text-sm">
                        <Mail className="w-4 h-4" /> destek@ailika.com
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                        <Link
                            href="https://instagram.com/"
                            target="_blank"
                            aria-label="Instagram"
                            className="rounded-full p-2 bg-white/70 hover:bg-white">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://facebook.com/"
                            target="_blank"
                            aria-label="Facebook"
                            className="rounded-full p-2 bg-white/70 hover:bg-white">
                            <Facebook className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://twitter.com/"
                            target="_blank"
                            aria-label="X"
                            className="rounded-full p-2 bg-white/70 hover:bg-white">
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link
                            href="https://youtube.com/"
                            target="_blank"
                            aria-label="YouTube"
                            className="rounded-full p-2 bg-white/70 hover:bg-white">
                            <Youtube className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Shop */}
                <div className="md:col-span-2">
                    <div className="text-sm font-semibold mb-3">Mağaza</div>
                    <ul className="grid gap-2 text-sm text-foreground/70">
                        <li>
                            <Link href="/shop" className="hover:underline">
                                Tüm Ürünler
                            </Link>
                        </li>
                        <li>
                            <Link href="/sets" className="hover:underline">
                                Başlangıç Setleri
                            </Link>
                        </li>
                        <li>
                            <Link href="/favorites" className="hover:underline">
                                Favoriler
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/categories"
                                className="hover:underline">
                                Kategoriler
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Kurumsal */}
                <div className="md:col-span-3">
                    <div className="text-sm font-semibold mb-3">Kurumsal</div>
                    <ul className="grid gap-2 text-sm text-foreground/70">
                        <li>
                            <Link href="/about" className="hover:underline">
                                Hikayemiz
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">
                                İletişim
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy" className="hover:underline">
                                Gizlilik Politikası
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/data-deletion"
                                className="hover:underline">
                                Veri Silme
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Yardım */}
                <div className="md:col-span-3">
                    <div className="text-sm font-semibold mb-3">Yardım</div>
                    <ul className="grid gap-2 text-sm text-foreground/70">
                        <li>
                            <Link href="/account" className="hover:underline">
                                Hesabım
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/account/orders"
                                className="hover:underline">
                                Siparişlerim
                            </Link>
                        </li>
                        <li>
                            <Link href="/cart" className="hover:underline">
                                Sepet
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">
                                S.S.S & Destek
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-foreground/10">
                <div className="container mx-auto px-4 py-6 text-xs text-foreground/60 flex flex-col md:flex-row items-center justify-between gap-2">
                    <p>© {year} Ailika. Tüm hakları saklıdır.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/privacy" className="hover:underline">
                            Gizlilik
                        </Link>
                        <Link href="/about" className="hover:underline">
                            Hakkımızda
                        </Link>
                        <Link href="/contact" className="hover:underline">
                            İletişim
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
