'use client'

import {useEffect, useRef, useState} from 'react'
import AccountLayout from '@/components/AccountLayout'
import EmptyState from '@/components/EmptyState'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Trash2, Plus} from 'lucide-react'
import {Courier_Prime} from 'next/font/google'
import LoginPage from '@/app/login/page'
import {useAuth} from '@/context/AuthContext'
import {SavedCard} from '@/types/account'

const cardMono = Courier_Prime({subsets: ['latin'], weight: ['400', '700']})

const STORAGE_KEY = 'ailika_cards_v1'

export default function SavedCardsPage() {
    const {isAuthenticated} = useAuth()
    const [cards, setCards] = useState<SavedCard[]>([])
    const [showForm, setShowForm] = useState(false)
    const [holderNameInput, setHolderNameInput] = useState('')
    const [cardNumberInput, setCardNumberInput] = useState('')
    const [expiryInput, setExpiryInput] = useState('')
    const [cvcInput, setCvcInput] = useState('')
    const formRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (raw) setCards(JSON.parse(raw) as SavedCard[])
        } catch {}
    }, [])

    useEffect(() => {
        if (showForm) {
            formRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [showForm])

    if (!isAuthenticated) {
        return <LoginPage />
    }

    const onAdd = (e: React.FormEvent) => {
        e.preventDefault()
        const holderName = holderNameInput.trim()
        const cardNumber = cardNumberInput.replace(/\s+/g, '')
        const [expMonth, expYear] = parseExpiry(expiryInput)

        if (
            !holderName ||
            cardNumber.length < 12 ||
            !expMonth ||
            !expYear ||
            !isValidMonth(expMonth) ||
            !isExpiryNotPast(expMonth, expYear) ||
            cvcInput.replace(/\D/g, '').length < 3
        )
            return

        const last4 = cardNumber.slice(-4)
        const brand = detectBrand(cardNumber)
        const next: SavedCard = {
            id: `CARD-${Date.now()}`,
            holderName,
            last4,
            brand,
            expMonth,
            expYear
        }
        const updated = [next, ...cards]
        setCards(updated)
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        } catch {}
        setHolderNameInput('')
        setCardNumberInput('')
        setExpiryInput('')
        setCvcInput('')
        setShowForm(false)
    }

    const onDelete = (id: string) => {
        const updated = cards.filter(c => c.id !== id)
        setCards(updated)
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        } catch {}
    }

    return (
        <AccountLayout
            title="Kayıtlı Kartlarım"
            breadcrumb={[
                {label: 'Anasayfa', href: '/'},
                {label: 'Hesabım', href: '/account'},
                {label: 'Kayıtlı Kartlarım'}
            ]}>
            {cards.length === 0 && (
                <div className="bg-white/40 p-12 rounded-lg mb-4">
                    <EmptyState
                        title="Kayıtlı kartınız yok"
                        description="Güvenli ödeme için kartınızı ekleyin."
                        action={
                            <Button onClick={() => setShowForm(true)}>
                                <Plus /> Yeni Kart Ekle
                            </Button>
                        }
                    />
                </div>
            )}
            {showForm && (
                <div
                    ref={formRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch bg-white/40 p-4 rounded-2xl mb-4">
                    <div className="bg-white rounded-xl p-4 h-full">
                        <form
                            id="add-card-form"
                            onSubmit={onAdd}
                            className="grid gap-4">
                            <div className="grid gap-2">
                                <label className="text-sm" htmlFor="holderName">
                                    Kart Üzerindeki İsim
                                </label>
                                <Input
                                    id="holderName"
                                    name="holderName"
                                    value={holderNameInput}
                                    onChange={e =>
                                        setHolderNameInput(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm" htmlFor="cardNumber">
                                    Kart Numarası
                                </label>
                                <Input
                                    id="cardNumber"
                                    name="cardNumber"
                                    inputMode="numeric"
                                    pattern="[0-9\s]{12,19}"
                                    placeholder="•••• •••• •••• ••••"
                                    value={formatCardNumber(cardNumberInput)}
                                    onChange={e => {
                                        const digits = e.target.value
                                            .replace(/\D/g, '')
                                            .slice(0, 19)
                                        setCardNumberInput(digits)
                                    }}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <label className="text-sm" htmlFor="expiry">
                                        Son Kullanma (MM/YY)
                                    </label>
                                    <Input
                                        id="expiry"
                                        name="expiry"
                                        placeholder="MM/YY"
                                        value={expiryInput}
                                        onChange={e =>
                                            setExpiryInput(
                                                formatExpiry(e.target.value)
                                            )
                                        }
                                        maxLength={5}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <label className="text-sm" htmlFor="cvc">
                                        CVC
                                    </label>
                                    <Input
                                        id="cvc"
                                        name="cvc"
                                        placeholder="CVC"
                                        inputMode="numeric"
                                        maxLength={4}
                                        value={cvcInput}
                                        onChange={e =>
                                            setCvcInput(
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ''
                                                )
                                            )
                                        }
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    <CardPreview
                        number={
                            formatCardNumber(cardNumberInput) ||
                            '•••• •••• •••• ••••'
                        }
                        name={(holderNameInput || 'AD SOYAD').toUpperCase()}
                        exp={expiryInput || 'MM/YY'}
                        brand={detectBrand(cardNumberInput) || ''}
                    />
                    <div className="flex justify-end gap-2 mb-4">
                        <Button type="submit" form="add-card-form">
                            Kaydet
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowForm(false)}>
                            Vazgeç
                        </Button>
                    </div>
                </div>
            )}
            {cards.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2">
                    <button
                        type="button"
                        onClick={() => setShowForm(true)}
                        className="h-44 rounded-xl border-2 border-dashed border-primary/20 flex items-center justify-center hover:bg-primary/20 transition focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <Plus className="w-8 h-8 text-primary" />
                    </button>
                    {cards.map(card => (
                        <div key={card.id} className="relative h-44">
                            <CardPreview
                                number={mask(card.last4)}
                                name={card.holderName.toUpperCase()}
                                exp={`${card.expMonth}/${card.expYear}`}
                                brand={card.brand || ''}
                                compact
                            />
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 bg-secondary"
                                aria-label="Sil"
                                onClick={() => onDelete(card.id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </AccountLayout>
    )
}

function mask(last4: string) {
    return `•••• •••• •••• ${last4}`
}

function detectBrand(num: string): string | undefined {
    if (/^4/.test(num)) return 'Visa'
    if (/^5[1-5]/.test(num)) return 'Mastercard'
    if (/^3[47]/.test(num)) return 'AMEX'
    if (/^6(?:011|5)/.test(num)) return 'Discover'
    return undefined
}

function formatCardNumber(num: string) {
    return num
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
}

function CardPreview({
    number,
    name,
    exp,
    brand,
    compact
}: {
    number: string
    name: string
    exp: string
    brand: string
    compact?: boolean
}) {
    return (
        <div
            className={`relative h-full flex flex-col justify-between rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground p-5 shadow-lg border ${cardMono.className}`}>
            <div className="flex items-center w-full gap-2 opacity-90 mb-4">
                <div
                    className={`font-semibold ${
                        compact ? 'text-[10px]' : 'text-xs'
                    }`}>
                    {brand || 'CARD'}
                </div>
                <BrandLogo brand={brand} />
            </div>
            <div
                className={`tracking-widest tabular-nums ${
                    compact ? 'text-lg mb-2' : 'text-xl mb-4'
                } whitespace-nowrap overflow-hidden text-ellipsis`}>
                {number}
            </div>
            <div className="flex justify-between text-xs">
                <div className="min-w-0">
                    <div className="opacity-80">AD SOYAD</div>
                    <div
                        className={`${
                            compact ? 'text-xs' : 'text-sm'
                        } font-medium truncate max-w-[10rem] md:max-w-[12rem]`}>
                        {name}
                    </div>
                </div>
                <div>
                    <div className="opacity-80">SON KULL.</div>
                    <div
                        className={`${
                            compact ? 'text-xs' : 'text-sm'
                        } font-medium whitespace-nowrap`}>
                        {exp}
                    </div>
                </div>
            </div>
        </div>
    )
}

function BrandLogo({brand}: {brand: string}) {
    const common = 'h-16 ml-auto block'
    if (brand === 'Visa')
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="78px"
                height="26px"
                viewBox="0 -140 780 780"
                version="1.1"
                className={common}>
                <path
                    d="M40,0h700c22.092,0,40,17.909,40,40v420c0,22.092-17.908,40-40,40H40c-22.091,0-40-17.908-40-40V40   C0,17.909,17.909,0,40,0z"
                    fill="#0E4595"
                />
                <path
                    d="m293.2 348.73l33.361-195.76h53.36l-33.385 195.76h-53.336zm246.11-191.54c-10.57-3.966-27.137-8.222-47.822-8.222-52.725 0-89.865 26.55-90.18 64.603-0.299 28.13 26.514 43.822 46.752 53.186 20.771 9.595 27.752 15.714 27.654 24.283-0.131 13.121-16.586 19.116-31.922 19.116-21.357 0-32.703-2.967-50.227-10.276l-6.876-3.11-7.489 43.823c12.463 5.464 35.51 10.198 59.438 10.443 56.09 0 92.5-26.246 92.916-66.882 0.199-22.269-14.016-39.216-44.801-53.188-18.65-9.055-30.072-15.099-29.951-24.268 0-8.137 9.668-16.839 30.557-16.839 17.449-0.27 30.09 3.535 39.938 7.5l4.781 2.26 7.232-42.429m137.31-4.223h-41.232c-12.773 0-22.332 3.487-27.941 16.234l-79.244 179.4h56.031s9.16-24.123 11.232-29.418c6.125 0 60.555 0.084 68.338 0.084 1.596 6.853 6.49 29.334 6.49 29.334h49.514l-43.188-195.64zm-65.418 126.41c4.412-11.279 21.26-54.723 21.26-54.723-0.316 0.522 4.379-11.334 7.074-18.684l3.605 16.879s10.219 46.729 12.354 56.528h-44.293zm-363.3-126.41l-52.24 133.5-5.567-27.13c-9.725-31.273-40.025-65.155-73.898-82.118l47.766 171.2 56.456-0.064 84.004-195.39h-56.521"
                    fill="#ffffff"
                />
                <path
                    d="m146.92 152.96h-86.041l-0.681 4.073c66.938 16.204 111.23 55.363 129.62 102.41l-18.71-89.96c-3.23-12.395-12.597-16.094-24.186-16.527"
                    fill="#F2AE14"
                />
            </svg>
        )
    if (brand === 'Mastercard')
        return (
            <svg
                viewBox="0 0 48 16"
                preserveAspectRatio="xMaxYMid meet"
                className={common}
                aria-hidden>
                <g transform="translate(14,0)">
                    <circle cx="20" cy="8" r="6" fill="#EB001B" />
                    <circle cx="28" cy="8" r="6" fill="#F79E1B" />
                    <path d="M24 2a6 6 0 000 12 6 6 0 000-12z" fill="#FF5F00" />
                </g>
            </svg>
        )
    if (brand === 'AMEX')
        return (
            <svg
                viewBox="0 0 48 16"
                preserveAspectRatio="xMaxYMid meet"
                className={common}
                aria-hidden>
                <rect
                    x="2"
                    y="2"
                    width="44"
                    height="12"
                    rx="2"
                    fill="#2E77BC"
                />
                <text
                    x="24"
                    y="11"
                    textAnchor="middle"
                    fill="white"
                    fontSize="8"
                    fontWeight="700">
                    AMEX
                </text>
            </svg>
        )
    if (brand === 'Discover')
        return (
            <svg
                viewBox="0 0 48 16"
                preserveAspectRatio="xMaxYMid meet"
                className={common}
                aria-hidden>
                <rect
                    x="2"
                    y="2"
                    width="44"
                    height="12"
                    rx="2"
                    fill="#F58220"
                />
                <text
                    x="24"
                    y="11"
                    textAnchor="middle"
                    fill="white"
                    fontSize="6"
                    fontWeight="700">
                    DISCOVER
                </text>
            </svg>
        )
    return <div className={common}></div>
}

function parseExpiry(exp: string): [string, string] {
    const cleaned = exp.replace(/[^0-9]/g, '').slice(0, 4)
    const mm = cleaned.slice(0, 2)
    const yy = cleaned.slice(2, 4)
    return [mm, yy]
}

function isValidMonth(mm: string) {
    if (mm.length !== 2) return false
    const n = Number(mm)
    return n >= 1 && n <= 12
}

function formatExpiry(v: string) {
    const digits = v.replace(/[^0-9]/g, '').slice(0, 4)
    let mm = digits.slice(0, 2)
    let yy = digits.slice(2, 4)
    if (mm.length === 1) {
        if (Number(mm) > 1) mm = `0${mm}`
    } else if (mm.length === 2) {
        const monthNum = Number(mm)
        if (monthNum === 0) mm = '01'
        else if (monthNum > 12) mm = '12'
    }
    if (yy.length === 2) {
        const now = new Date()
        const currentYearYY = now.getFullYear() % 100
        const yearNum = Number(yy)
        if (yearNum < currentYearYY) {
            yy = String(currentYearYY).padStart(2, '0')
        }
    }
    return yy ? `${mm}/${yy}` : mm
}

function isExpiryNotPast(mm: string, yy: string) {
    if (!isValidMonth(mm) || yy.length !== 2) return false
    const now = new Date()
    const currentYearYY = now.getFullYear() % 100
    const currentMonth = now.getMonth() + 1
    const expYear = Number(yy)
    const expMonth = Number(mm)
    if (expYear > currentYearYY) return true
    if (expYear < currentYearYY) return false
    return expMonth >= currentMonth
}
