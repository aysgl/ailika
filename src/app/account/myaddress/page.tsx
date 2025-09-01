'use client'

import AccountLayout from '@/components/AccountLayout'
import {Card, CardContent} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Textarea} from '@/components/ui/textarea'
import {Button} from '@/components/ui/button'
import {useEffect, useState} from 'react'
import EmptyState from '@/components/EmptyState'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from '@/components/ui/accordion'
import {MapPin, Plus} from 'lucide-react'

type Address = {
    id: string
    title: string
    fullName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
    country: string
}

const STORAGE_KEY = 'ailika_addresses_v1'

export default function MyAddressPage() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [editing, setEditing] = useState<Address | null>(null)
    const [showForm, setShowForm] = useState(false)

    useEffect(() => {
        try {
            // migrate old single address if exists
            const oldRaw = localStorage.getItem('ailika_address_v1')
            let initial: Address[] = []
            if (oldRaw) {
                const a = JSON.parse(oldRaw) as Partial<{
                    fullName: string
                    email: string
                    phone: string
                    address: string
                    city: string
                    postalCode: string
                    country: string
                }>
                initial = [
                    {
                        id: `ADDR-${Date.now()}`,
                        title: 'Adres',
                        fullName: a.fullName || '',
                        email: a.email || '',
                        phone: a.phone || '',
                        address: a.address || '',
                        city: a.city || '',
                        postalCode: a.postalCode || '',
                        country: a.country || 'Türkiye'
                    }
                ]
                localStorage.removeItem('ailika_address_v1')
                localStorage.setItem(STORAGE_KEY, JSON.stringify(initial))
            } else {
                const raw = localStorage.getItem(STORAGE_KEY)
                if (raw) initial = JSON.parse(raw) as Address[]
            }
            setAddresses(initial)
        } catch {}
    }, [])

    const onSave = (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const form = e.target as HTMLFormElement
            const fd = new FormData(form)
            const next: Address = {
                id: editing?.id || `ADDR-${Date.now()}`,
                title: (fd.get('title') as string) || 'Adres',
                fullName: (fd.get('fullName') as string) || '',
                email: (fd.get('email') as string) || '',
                phone: (fd.get('phone') as string) || '',
                address: (fd.get('address') as string) || '',
                city: (fd.get('city') as string) || '',
                postalCode: (fd.get('postalCode') as string) || '',
                country: (fd.get('country') as string) || 'Türkiye'
            }
            const updated = editing
                ? addresses.map(a => (a.id === editing.id ? next : a))
                : [next, ...addresses]
            setAddresses(updated)
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
            setEditing(null)
            setShowForm(false)
        } catch {}
    }

    const onDelete = (id: string) => {
        const updated = addresses.filter(a => a.id !== id)
        setAddresses(updated)
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        } catch {}
    }

    return (
        <AccountLayout
            title="Adreslerim"
            breadcrumb={[
                {label: 'Anasayfa', href: '/'},
                {label: 'Hesabım', href: '/account'},
                {label: 'Adreslerim'}
            ]}>
            {addresses.length === 0 && !showForm && (
                <div className="bg-white/40 p-12 rounded-lg">
                    <EmptyState
                        icon={<MapPin className="w-10 h-10 text-primary" />}
                        title="Adresiniz bulunamadı"
                        description="Siparişlerinizi tamamlamak için bir teslimat adresi ekleyin."
                        action={
                            <Button onClick={() => setShowForm(true)}>
                                Yeni Adres Ekle
                            </Button>
                        }
                    />
                </div>
            )}

            {addresses.length > 0 && !showForm && (
                <Card className="bg-transparent shadow-none pt-0">
                    <CardContent className="p-0">
                        <Accordion type="single" collapsible className="w-full">
                            {addresses.map(a => (
                                <AccordionItem value={a.id} key={a.id}>
                                    <AccordionTrigger>
                                        <div className="text-left">
                                            <div className="text-lg font-medium">
                                                {a.title}
                                            </div>
                                            <div className="font-normal text-sm">
                                                {a.fullName} • {a.address}
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="py-4">
                                            <table className="w-full text-sm">
                                                <tbody className="divide-y">
                                                    <tr>
                                                        <th className="text-left py-2 pr-4 font-medium w-40 whitespace-nowrap">
                                                            Ad Soyad
                                                        </th>
                                                        <td className="py-2">
                                                            {a.fullName}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-left py-2 pr-4 font-medium w-40 whitespace-nowrap">
                                                            E-posta
                                                        </th>
                                                        <td className="py-2">
                                                            {a.email}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-left py-2 pr-4 font-medium w-40 whitespace-nowrap">
                                                            Telefon
                                                        </th>
                                                        <td className="py-2">
                                                            {a.phone}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-left py-2 pr-4 font-medium w-40 whitespace-nowrap">
                                                            Adres
                                                        </th>
                                                        <td className="py-2">
                                                            {a.address}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-left py-2 pr-4 font-medium w-40 whitespace-nowrap">
                                                            Şehir
                                                        </th>
                                                        <td className="py-2">
                                                            {a.city}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-left py-2 pr-4 font-medium w-40 whitespace-nowrap">
                                                            Posta Kodu
                                                        </th>
                                                        <td className="py-2">
                                                            {a.postalCode}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-left py-2 pr-4 font-medium w-40 whitespace-nowrap">
                                                            Ülke
                                                        </th>
                                                        <td className="py-2">
                                                            {a.country}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="pt-3 flex gap-2">
                                            <Button
                                                size={'sm'}
                                                variant="outline"
                                                onClick={() => {
                                                    setEditing(a)
                                                    setShowForm(true)
                                                }}>
                                                Düzenle
                                            </Button>
                                            <Button
                                                size={'sm'}
                                                variant="destructive"
                                                onClick={() => onDelete(a.id)}>
                                                Sil
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </CardContent>
                    <button
                        type="button"
                        onClick={() => {
                            setEditing(null)
                            setShowForm(true)
                        }}
                        className="font-bold h-20 rounded-xl border-2 border-dashed border-primary/20 text-primary flex items-center justify-center hover:bg-primary/20 transition focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <Plus className="w-8 h-8 text-primary" />
                        Yeni Adres Ekle
                    </button>
                </Card>
            )}

            {showForm && (
                <Card>
                    <CardContent>
                        <form onSubmit={onSave} className="grid gap-4">
                            <Input
                                name="title"
                                placeholder="Adres Başlığı (Örn: Ev, İş)"
                                defaultValue={editing?.title || ''}
                                required
                            />
                            <Input
                                name="fullName"
                                placeholder="Ad Soyad"
                                defaultValue={editing?.fullName || ''}
                                required
                            />
                            <Input
                                type="email"
                                name="email"
                                placeholder="E-posta"
                                defaultValue={editing?.email || ''}
                                required
                            />
                            <Input
                                name="phone"
                                placeholder="Telefon"
                                defaultValue={editing?.phone || ''}
                                required
                            />
                            <Textarea
                                name="address"
                                placeholder="Adres"
                                defaultValue={editing?.address || ''}
                                required
                            />
                            <div className="grid md:grid-cols-3 gap-4">
                                <Input
                                    name="city"
                                    placeholder="Şehir"
                                    defaultValue={editing?.city || ''}
                                    required
                                />
                                <Input
                                    name="postalCode"
                                    placeholder="Posta Kodu"
                                    defaultValue={editing?.postalCode || ''}
                                    required
                                />
                                <Input
                                    name="country"
                                    placeholder="Ülke"
                                    defaultValue={editing?.country || 'Türkiye'}
                                    required
                                />
                            </div>
                            <div className="pt-2 flex items-center gap-2">
                                <Button type="submit">Kaydet</Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowForm(false)}>
                                    Vazgeç
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </AccountLayout>
    )
}
