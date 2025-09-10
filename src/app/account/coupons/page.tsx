'use client'

import AccountLayout from '@/components/AccountLayout'
import EmptyState from '@/components/EmptyState'
import CouponCard from '@/components/CouponCard'
import {Tag} from 'lucide-react'
import {useEffect, useState} from 'react'
import LoginPage from '@/app/login/page'
import {useAuth} from '@/context/AuthContext'
import {Coupon} from '@/types/account'

export default function CouponsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([])
    const {isAuthenticated} = useAuth()

    useEffect(() => {
        try {
            const raw = localStorage.getItem('userCoupons')
            const saved = raw ? (JSON.parse(raw) as Coupon[]) : undefined
            const demo: Coupon[] = [
                {
                    id: 'C-NEW-10',
                    code: 'YENI10',
                    title: 'Yeni Üyelere %10',
                    description: 'Satın alınan ürünlerden %10 indirim',
                    discountType: 'percent',
                    discountValue: 10,
                    expiresAt: futureDaysIso(30)
                },
                {
                    id: 'C-FREE-SHIP',
                    code: 'KARGO0',
                    title: 'Kargo Bedava',
                    description: '₺250 ve üzeri alışverişlerde geçerli',
                    discountType: 'amount',
                    discountValue: 0,
                    minSpend: 25000,
                    expiresAt: futureDaysIso(7)
                },
                {
                    id: 'C-OLD-15',
                    code: 'ELVET15',
                    title: 'Seçili Ürünlerde %15',
                    description: 'Satın alınan ürünlerden %15 indirim',
                    discountType: 'percent',
                    discountValue: 15,
                    expiresAt: pastDaysIso(1)
                }
            ]
            const list = (saved && Array.isArray(saved) ? saved : demo).map(
                c => ({...c, status: resolveStatus(c)})
            )
            setCoupons(list)
        } catch {
            // ignore
        }
    }, [])

    if (!isAuthenticated) {
        return <LoginPage />
    }

    return (
        <AccountLayout
            title="Kuponlarım"
            breadcrumb={[
                {label: 'Anasayfa', href: '/'},
                {label: 'Hesabım', href: '/account'},
                {label: 'Kuponlarım'}
            ]}>
            {coupons.length === 0 ? (
                <div className="bg-white/40 p-12 rounded-lg">
                    <EmptyState
                        icon={<Tag className="w-10 h-10 text-primary" />}
                        title="Henüz kuponunuz yok"
                        description="Kuponlarınızı buradan görüntüleyebilirsiniz."
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {coupons.map(c => (
                        <CouponCard
                            key={c.id}
                            title={c.title}
                            code={c.code}
                            description={c.description}
                            discountType={c.discountType}
                            discountValue={c.discountValue}
                            expiresAt={c.expiresAt}
                            minSpend={c.minSpend}
                            status={c.status}
                        />
                    ))}
                </div>
            )}
        </AccountLayout>
    )
}

function resolveStatus(c: Coupon): Coupon['status'] {
    if (c.status === 'used') return 'used'
    if (c.expiresAt && new Date(c.expiresAt).getTime() < Date.now())
        return 'expired'
    return 'active'
}

function futureDaysIso(days: number) {
    const d = new Date()
    d.setDate(d.getDate() + days)
    return d.toISOString()
}

function pastDaysIso(days: number) {
    const d = new Date()
    d.setDate(d.getDate() - days)
    return d.toISOString()
}
