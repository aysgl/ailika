'use client'

import AccountLayout from '@/components/AccountLayout'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import {useEffect, useState} from 'react'

export default function HelpPage() {
    const [faqs, setFaqs] = useState<FaqItem[]>([])

    useEffect(() => {
        let cancelled = false
        ;(async () => {
            try {
                const res = await fetch('/api/faq', {cache: 'no-store'})
                if (res.ok) {
                    const data = (await res.json()) as FaqItem[]
                    if (!cancelled) setFaqs(normalizeFaqs(data))
                    return
                }
            } catch {}
            if (!cancelled) setFaqs(fallbackFaqs)
        })()
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <AccountLayout
            title="Yardım Merkezi"
            breadcrumb={[
                {label: 'Anasayfa', href: '/'},
                {label: 'Hesabım', href: '/account'},
                {label: 'Yardım'}
            ]}>
            <Accordion type="single" collapsible className="w-full">
                {faqs.map(faq => (
                    <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-3 text-sm leading-6 text-muted-foreground">
                                {faq.answer && <p>{faq.answer}</p>}
                                {faq.bullets && faq.bullets.length > 0 && (
                                    <ul className="list-disc pl-5 space-y-1">
                                        {faq.bullets.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                )}
                                {faq.notes && faq.notes.length > 0 && (
                                    <>
                                        <p className="font-medium text-foreground">
                                            Not:
                                        </p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            {faq.notes.map((n, i) => (
                                                <li key={i}>{n}</li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </AccountLayout>
    )
}

type FaqItem = {
    id: string
    question: string
    answer?: string
    bullets?: string[]
    notes?: string[]
}

const fallbackFaqs: FaqItem[] = [
    {
        id: 'refund-time',
        question: 'Ücret iadem ne zaman yapılır?',
        answer: 'İptal ettiğiniz ürünün ücret iadesi bankanıza bağlı olarak değişkenlik gösterebilir. Bu süre yaklaşık 1 haftayı bulabilir. İade ettiğiniz ürünün ücret iade süreci aşağıdaki gibidir;',
        bullets: [
            'Ürün satıcıya ulaştıktan sonra en geç 48 saat içerisinde iade şartlarına uygunluğu kontrol edilir.',
            'Ürün iade şartlarına uygunsa, iadeniz onaylanır ve ücret iadeniz bankanıza bağlı olarak 2-10 iş günü içerisinde ödeme yapmış olduğunuz kartınıza yansır.',
            'Ürün iade şartlarına uygun değilse adresinize geri gönderilir.'
        ],
        notes: [
            'Bankanıza ücret iadesi yapıldığında üyelik e-posta adresinize bilgilendirme mesajı gönderilir. Tutarın kartınıza/hesabınıza yansıma süresi bankanıza bağlıdır.',
            'Banka kartına yapılan iadelerin hesabınıza yansıma süresi daha uzundur.',
            'Bankanızdan ücret iadesi kontrolü yapmak için “Hesabım” > “Siparişlerim“ adımından referans numaranızı görüntüleyebilirsiniz.',
            'Taksitli yapılan alışverişlerin ücreti bankaya tek seferde ödenir; ancak bankanız bu tutarı kredi kartınıza taksitli şekilde iade eder.'
        ]
    },
    {
        id: 'change-address',
        question:
            'Siparişimin teslimat adresini veya alıcı adını değiştirebilir miyim?',
        answer: 'Sipariş oluşturulduktan sonra adres/alıcı değişikliği kargo sürecine bağlıdır. Kargoya verilmemiş siparişler için canlı destekten yardım alabilirsiniz.'
    },
    {
        id: 'delivery-time',
        question: 'Siparişim ne zaman gelir?',
        answer: 'Ürünler genellikle 1-3 iş günü içinde kargoya verilir. Teslimat süresi bulunduğunuz ile göre 2-5 iş günü arasında değişebilir.'
    },
    {
        id: 'cancel-order',
        question: 'Siparişimi nasıl iptal edebilirim?',
        answer: '“Hesabım > Siparişlerim” sayfasından iptal talebi oluşturabilir veya destek ile iletişime geçebilirsiniz. Kargoya verilmiş siparişlerde iptal yerine iade süreci uygulanır.'
    },
    {
        id: 'campaign-cancel',
        question:
            'Kampanyadan yararlandığım bir siparişte iptal ya da iade yaparsam kampanya iptal olur mu?',
        answer: 'Kampanya koşullarını sağlamayan ürünlerin iptal/iadesi durumunda kampanya indirimi geri alınabilir. Kalan ürünlerin tutarı kampanya şartlarına göre güncellenir.'
    },
    {
        id: 'elite-benefits',
        question: 'Elite üyeliğin ayrıcalıkları nelerdir?',
        answer: 'Özel kampanyalar, öncelikli destek, seçili ürünlerde ekstra indirimler ve dönemsel sürpriz avantajlar.'
    },
    {
        id: 'pickup-point',
        question: 'Gel Al Noktası nedir?',
        answer: 'Siparişinizi adrese teslim yerine anlaşmalı teslimat noktalarından kendinizin alabileceği hizmettir.'
    },
    {
        id: 'contact-support',
        question:
            'Ürün veya siparişim ile ilgili taleplerimi/sorularımı nasıl iletebilirim?',
        answer: '“İletişim” sayfasından form doldurabilir veya canlı destek üzerinden bize ulaşabilirsiniz.'
    },
    {
        id: 'how-to-elite',
        question: 'Nasıl Elite olurum?',
        answer: 'Hesabım > Elite sayfasındaki yönlendirmeleri takip ederek başvuru yapabilirsiniz. Uygunluk kontrolünün ardından üyeliğiniz aktif edilir.'
    },
    {
        id: 'health-statement',
        question: 'Sağlık beyanı nedir?',
        answer: 'Ürünlerin kullanımında dikkat edilmesi gereken hususları ve alerjen uyarılarını içeren bilgilendirme metnidir. Ürün sayfalarından erişebilirsiniz.'
    }
]

function normalizeFaqs(items: FaqItem[]): FaqItem[] {
    return items
        .filter(i => !!i && !!i.id && !!i.question)
        .map(i => ({
            id: i.id,
            question: i.question,
            answer: i.answer,
            bullets: i.bullets || [],
            notes: i.notes || []
        }))
}
