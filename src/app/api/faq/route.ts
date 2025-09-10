import {NextResponse} from 'next/server'
import type {FAQ} from '@/types'

// In-memory storage for demo (production'da database kullanın)
const faqs: FAQ[] = [
    {
        id: 'faq-1',
        question: 'Ücret iadem ne zaman yapılır?',
        answer: 'İade işlemleriniz, ürünün tarafımıza ulaştığı tarihten itibaren 3-5 iş günü içerisinde kredi kartınıza iade edilir. Banka işlem süreci nedeniyle hesabınıza yansıması 1-2 gün daha sürebilir.',
        category: 'payment',
        sortOrder: 1,
        isActive: true
    },
    {
        id: 'faq-2',
        question: 'Kargo ücreti ne kadar?',
        answer: "250₺ ve üzeri alışverişlerinizde kargo ücretsizdir. 250₺ altı alışverişlerde kargo ücreti 29.90₺'dir. Hızlı teslimat seçeneği için ek 15₺ ücret alınır.",
        category: 'shipping',
        sortOrder: 2,
        isActive: true
    },
    {
        id: 'faq-3',
        question: 'Siparişimi nasıl takip edebilirim?',
        answer: 'Siparişiniz kargoya verildikten sonra size SMS ve e-posta ile kargo takip numarası gönderilir. Bu numara ile kargo firmasının web sitesinden veya mobil uygulamasından siparişinizi takip edebilirsiniz.',
        category: 'shipping',
        sortOrder: 3,
        isActive: true
    },
    {
        id: 'faq-4',
        question: 'Ürün değişimi yapabilir miyim?',
        answer: 'Evet, satın aldığınız üründen memnun kalmadıysanız, ürünü teslim aldığınız tarihten itibaren 14 gün içerisinde değişim yapabilirsiniz. Ürünün orijinal ambalajında ve kullanılmamış olması gerekmektedir.',
        category: 'returns',
        sortOrder: 4,
        isActive: true
    },
    {
        id: 'faq-5',
        question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
        answer: 'Kredi kartı, banka kartı, havale/EFT ve kapıda ödeme seçeneklerini kabul ediyoruz. Kredi kartı ile 9 taksit imkanı sunuyoruz. Ayrıca dijital cüzdan seçenekleri de mevcuttur.',
        category: 'payment',
        sortOrder: 5,
        isActive: true
    },
    {
        id: 'faq-6',
        question: 'Ürünleriniz orijinal mi?',
        answer: 'Tüm ürünlerimiz %100 orijinal ve garantilidir. Yetkili distribütörlerden temin edilir ve kalite güvencesi ile satışa sunulur. Her ürün için orijinallik sertifikası mevcuttur.',
        category: 'product',
        sortOrder: 6,
        isActive: true
    },
    {
        id: 'faq-7',
        question: 'Sağlık beyanı nedir?',
        answer: 'Kozmetik ürünlerimiz için sağlık beyanı, ürünün güvenli kullanım şartlarını ve olası alerjik reaksiyonları belirtir. Hassas cilde sahip kişiler kullanım öncesi test yapmalıdır. Hamilelik döneminde doktor tavsiyesi alınmalıdır.',
        category: 'product',
        sortOrder: 7,
        isActive: true
    }
]

export async function GET() {
    try {
        // Sort by sortOrder
        const sortedFAQs = faqs
            .filter(faq => faq.isActive)
            .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))

        return NextResponse.json({
            success: true,
            data: sortedFAQs
        })
    } catch (error) {
        console.error('FAQ fetch error:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch FAQs'
            },
            {status: 500}
        )
    }
}
