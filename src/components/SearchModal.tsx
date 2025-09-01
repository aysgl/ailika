'use client'

import {useCallback, useEffect, useState} from 'react'
import {Input} from '@/components/ui/input'
import Link from 'next/link'
import {Sheet, SheetContent} from '@/components/ui/sheet'

type SearchItem = {
    id: string
    name: string
    slug: string
    image?: string
    price: number
}

type SearchModalProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function SearchModal({open, onOpenChange}: SearchModalProps) {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState<SearchItem[]>([])

    const doSearch = useCallback(async (q: string) => {
        const s = q.trim()
        if (!s) {
            setResults([])
            return
        }
        setLoading(true)
        try {
            const res = await fetch(
                `/api/search?q=${encodeURIComponent(s)}&size=8`
            )
            const data = await res.json()
            setResults(data.results ?? [])
        } catch {
            setResults([])
        } finally {
            setLoading(false)
        }
    }, [])

    // debounce query
    useEffect(() => {
        const handle = setTimeout(() => doSearch(query), 250)
        return () => clearTimeout(handle)
    }, [query, doSearch])

    // Clear state when closing
    useEffect(() => {
        if (!open) {
            setQuery('')
            setResults([])
        }
    }, [open])

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="center"
                className="sm:max-w-2xl mx-auto w-full p-0">
                <div className="border-b p-4">
                    <Input
                        autoFocus
                        placeholder="Ürün ara..."
                        value={query}
                        onChange={event => setQuery(event.target.value)}
                    />
                </div>
                <div className="max-h-[60vh] overflow-y-auto">
                    {loading ? (
                        <div className="p-6 text-sm">Aranıyor…</div>
                    ) : results.length === 0 ? (
                        <div className="p-6 text-sm">
                            {query.trim()
                                ? 'Sonuç bulunamadı'
                                : 'Aramak için yazmaya başlayın'}
                        </div>
                    ) : (
                        <ul className="divide-y">
                            {results.map(item => (
                                <li
                                    key={item.id}
                                    className="hover:bg-primary/10">
                                    <Link
                                        href={`/product/${item.slug}`}
                                        onClick={() => onOpenChange(false)}
                                        className="flex items-center gap-4 p-4">
                                        {item.image ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-14 h-14 rounded object-cover"
                                            />
                                        ) : (
                                            <div className="w-14 h-14 rounded bg-primary" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium truncate">
                                                {item.name}
                                            </div>
                                            <div className="text-sm text-primary truncate">
                                                {item.slug}
                                            </div>
                                        </div>
                                        <div className="text-sm font-semibold">
                                            {(item.price / 100).toLocaleString(
                                                'tr-TR',
                                                {
                                                    style: 'currency',
                                                    currency: 'TRY'
                                                }
                                            )}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}
