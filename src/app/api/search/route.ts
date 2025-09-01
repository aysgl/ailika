import {NextResponse} from 'next/server'
import {products} from '@/lib/products'

type SearchResult = {
    id: string
    name: string
    slug: string
    image?: string
    price: number
}

function localSearch(query: string, limit: number = 10): SearchResult[] {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const results = products
        .map(p => {
            const inText =
                (p.name || '').toLowerCase().includes(q) ||
                (p.description || '').toLowerCase().includes(q) ||
                (p.code || '').toLowerCase().includes(q)
            const inCats = p.categories?.some(c => c.toLowerCase().includes(q))
            const score = (inText ? 2 : 0) + (inCats ? 1 : 0)
            return {product: p, score}
        })
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({product}) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            image: product.image,
            price: product.price
        }))
    return results
}

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const q = searchParams.get('q') || ''
    const size = Number(searchParams.get('size') || 10)

    if (!q.trim()) {
        return NextResponse.json({query: q, results: []})
    }

    const esUrl = process.env.ELASTICSEARCH_URL
    const esIndex = process.env.ELASTICSEARCH_INDEX || 'products'
    const esUsername = process.env.ELASTICSEARCH_USERNAME
    const esPassword = process.env.ELASTICSEARCH_PASSWORD

    if (esUrl) {
        try {
            const url = `${esUrl.replace(/\/$/, '')}/${encodeURIComponent(
                esIndex
            )}/_search`
            const body = {
                size,
                query: {
                    multi_match: {
                        query: q,
                        fields: [
                            'name^3',
                            'description^2',
                            'categories^2',
                            'code'
                        ]
                    }
                }
            }
            const headers: Record<string, string> = {
                'Content-Type': 'application/json'
            }
            if (esUsername && esPassword) {
                const raw = `${esUsername}:${esPassword}`
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const b64 = (globalThis as any).btoa
                    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      (globalThis as any).btoa(raw)
                    : Buffer.from(raw).toString('base64')
                headers['Authorization'] = `Basic ${b64}`
            }
            const res = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(body)
                // In Edge, keepalive is not supported; this will run on Node runtime
            })
            if (res.ok) {
                const data: {
                    hits?: {
                        hits?: Array<{
                            _id: string
                            _source?: Record<string, unknown>
                        }>
                    }
                } = await res.json()
                const hits = data?.hits?.hits ?? []
                const results: SearchResult[] = hits.map(h => {
                    const src = h._source ?? {}
                    return {
                        id: String(src.id ?? h._id),
                        name: String(src.name ?? ''),
                        slug: String(src.slug ?? ''),
                        image: src.image as string | undefined,
                        price: Number(src.price ?? 0)
                    }
                })
                return NextResponse.json({query: q, results})
            }
            // fallthrough to local search on non-200
        } catch {
            // ignore and fallback
        }
    }

    const results = localSearch(q, size)
    return NextResponse.json({query: q, results})
}
