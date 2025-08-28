import {NextResponse} from 'next/server'

export const revalidate = 60

export async function GET(request: Request) {
    try {
        const {searchParams} = new URL(request.url)
        const limit = Number(searchParams.get('limit') || '9')
        const mock = process.env.IG_MOCK === '1'
        if (mock) {
            const placeholders = [
                '/images/instagram/1.png',
                '/images/instagram/3.png',
                '/images/instagram/4.png',
                '/images/instagram/5.png',
                '/images/instagram/6.png',
                '/images/instagram/7.png',
                '/images/instagram/1.png',
                '/images/instagram/3.png',
                '/images/instagram/4.png',
                '/images/instagram/5.png',
                '/images/instagram/6.png',
                '/images/instagram/7.png'
            ]
                .slice(0, Math.max(1, Math.min(12, limit)))
                .map((url, i) => ({
                    id: `mock-${i}`,
                    url,
                    link: 'https://www.instagram.com/ailikaturkiye',
                    caption: 'Instagram mock'
                }))
            return NextResponse.json({items: placeholders})
        }
        const basicToken = process.env.INSTAGRAM_ACCESS_TOKEN
        const graphToken = process.env.IG_GRAPH_TOKEN
        const igUserId = process.env.IG_USER_ID
        if (!basicToken && !(graphToken && igUserId)) {
            return NextResponse.json(
                {
                    items: [],
                    error: 'Missing Instagram credentials. Set INSTAGRAM_ACCESS_TOKEN or IG_GRAPH_TOKEN and IG_USER_ID'
                },
                {status: 200}
            )
        }
        const useGraph = Boolean(graphToken && igUserId)
        const url = useGraph
            ? `https://graph.facebook.com/v19.0/${igUserId}/media?fields=id,media_type,media_url,permalink,caption&access_token=${graphToken}&limit=${limit}`
            : `https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,permalink,caption&access_token=${basicToken}&limit=${limit}`
        const res = await fetch(url, {next: {revalidate}})
        if (!res.ok) {
            return NextResponse.json(
                {items: [], error: 'Failed to fetch Instagram'},
                {status: 200}
            )
        }
        const data: {
            data?: Array<{
                id: string
                media_type: 'IMAGE' | 'CAROUSEL_ALBUM' | 'VIDEO'
                media_url?: string
                thumbnail_url?: string
                permalink: string
                caption?: string
            }>
        } = await res.json()
        // Only include images and carousel entries (skip VIDEO to avoid non-image URLs)
        const items = (data?.data || [])
            .filter(
                m =>
                    m.media_type === 'IMAGE' ||
                    m.media_type === 'CAROUSEL_ALBUM'
            )
            .map(m => ({
                id: m.id,
                url: m.media_url || m.thumbnail_url,
                link: m.permalink,
                caption: m.caption || ''
            }))
        return NextResponse.json({items})
    } catch {
        return NextResponse.json({items: []}, {status: 200})
    }
}
