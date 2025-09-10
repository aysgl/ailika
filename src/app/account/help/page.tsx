'use client'

import AccountLayout from '@/components/AccountLayout'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import {useFAQs} from '../../../hooks/useAPI'

export default function HelpPage() {
    const {data: faqs = [], isLoading, error} = useFAQs()

    return (
        <AccountLayout
            title="Yardım Merkezi"
            breadcrumb={[
                {label: 'Anasayfa', href: '/'},
                {label: 'Hesabım', href: '/account'},
                {label: 'Yardım'}
            ]}>
            {isLoading ? (
                <div className="space-y-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="animate-pulse">
                            <div className="h-12 bg-gray-200 rounded-lg mb-2"></div>
                            <div className="h-20 bg-gray-100 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            ) : error || faqs.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    <p>Şu anda SSS bilgileri yüklenemiyor.</p>
                    <p className="text-sm">Lütfen daha sonra tekrar deneyin.</p>
                </div>
            ) : (
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map(faq => (
                        <AccordionItem key={faq.id} value={faq.id}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-3 text-sm leading-6 text-muted-foreground">
                                    <p>{faq.answer}</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            )}
        </AccountLayout>
    )
}
