// import Link from 'next/link'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import TitleWave from '@/components/TitleWave'
import Breadcrumbs from '@/components/Breadcrumbs'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import {Clock, Mail, Map, Phone} from 'lucide-react'

export const dynamic = 'force-static'

export default function ContactPage() {
    return (
        <div className="container mx-auto">
            <div className="mb-8 space-y-2">
                <div className="flex flex-col items-center justify-center mx-auto gap-2 bg-white/40 p-12 rounded-lg">
                    <TitleWave title={'İletişim'} bandClass="text-secondary" />
                    <Breadcrumbs
                        items={[
                            {label: 'Anasayfa', href: '/'},
                            {label: 'İletişim'}
                        ]}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                {[
                    {
                        icon: <Map className="w-8 h-8" />,
                        title: 'Adresimiz',
                        description: 'Bağdat Caddesi No:123 Kadıköy, İstanbul',
                        href: 'https://www.google.com/maps?q=Ba%C4%9Fdat+Caddesi+No%3A123+Kad%C4%B1k%C3%B6y+%C4%B0stanbul&output=embed',
                        color: 'from-pink-500 to-rose-500'
                    },
                    {
                        icon: <Phone className="w-8 h-8" />,
                        title: 'Telefon',
                        description: '+90 (212) 555 0123 Pazartesi - Cuma',
                        href: 'tel:+902125550123',
                        color: 'from-purple-500 to-indigo-500'
                    },
                    {
                        icon: <Mail className="w-8 h-8" />,
                        title: 'E-posta',
                        description: 'info@nailbeauty.com, 7/24 Destek',
                        href: 'mailto:info@nailbeauty.com',
                        color: 'from-rose-500 to-pink-500'
                    },
                    {
                        icon: <Clock className="w-8 h-8" />,
                        title: 'Çalışma Saatleri',
                        description: '09:00 - 18:00 Hafta içi',
                        href: 'https://www.google.com/maps?q=Ba%C4%9Fdat+Caddesi+No%3A123+Kad%C4%B1k%C3%B6y+%C4%B0stanbul&output=embed',
                        color: 'from-indigo-500 to-purple-500'
                    }
                ].map((value, index) => (
                    <Card
                        key={index}
                        className="bg-transparent border border-primary/10 shadow-none transition-all duration-300 transform hover:-translate-y-2 py-0">
                        <CardContent className="p-8 text-center">
                            <div
                                className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center text-white mx-auto mb-6`}>
                                {value.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">
                                {value.title}
                            </h3>
                            <a href={value.href} className="">
                                {value.description}
                            </a>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="max-w-3xl gap-8 mx-auto">
                {/* Sağ kolon: Form */}
                <div>
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold mb-2">Bize Ulaşın</h3>
                        <p className="text-lg mx-auto">
                            İletişim formumuzdan bize ulaşabilirsiniz.
                        </p>
                    </div>
                    <Card className="bg-white shadow-none mt-4">
                        <CardContent>
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-1">
                                    <Input
                                        className="rounded-full"
                                        placeholder="Adınız"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-1">
                                    <Input
                                        className="rounded-full"
                                        type="email"
                                        placeholder="E-posta"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Input
                                        className="rounded-full"
                                        placeholder="Konu"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <Textarea
                                        className="rounded-lg"
                                        placeholder="Mesajınız"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-end">
                                    <Button type="submit">Gönder</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* FAQ */}
                    <div className="mt-16 w-full">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2">
                                Sıkça Sorulan Sorular
                            </h3>
                            <p className="text-lg mx-auto">
                                Sıkça sorulan soruların cevapları
                            </p>
                        </div>
                        <div className="mt-4 bg-white/40 rounded-xl p-4">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="q1">
                                    <AccordionTrigger>
                                        Kargo süresi ne kadar?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Siparişleriniz 1-3 iş günü içinde
                                        kargoya verilir. Resmi tatillerde
                                        gecikme olabilir.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="q2">
                                    <AccordionTrigger>
                                        İade koşulları nelerdir?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        Ürünü teslim aldıktan sonra 14 gün
                                        içinde kullanılmamış olması şartıyla
                                        iade edebilirsiniz.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="q3">
                                    <AccordionTrigger>
                                        Destek saatleri nedir?
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        E-posta desteği 7/24, telefon desteği
                                        hafta içi 09:00 - 18:00 arasıdır.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
