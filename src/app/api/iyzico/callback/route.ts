import {NextResponse} from 'next/server'

export async function POST(req: Request) {
    try {
        // iyzico callback posts token + status; in real-world verify with iyzico.retrieve
        const body: FormData | URLSearchParams = await req
            .formData()
            .catch(async () => new URLSearchParams(await req.text()))
        const token = body.get('token')
        if (!token)
            return NextResponse.json({error: 'Missing token'}, {status: 400})
        const apiKey = process.env.IYZIPAY_API_KEY
        const secretKey = process.env.IYZIPAY_SECRET_KEY
        const baseUrl =
            process.env.IYZIPAY_BASE_URL || 'https://sandbox-api.iyzipay.com'
        if (!apiKey || !secretKey) {
            return NextResponse.json(
                {error: 'Iyzico keys missing'},
                {status: 500}
            )
        }

        type IyzipayCtor = new (args: {
            apiKey: string
            secretKey: string
            uri: string
        }) => unknown
        const Iyzipay = (await import('iyzipay'))
            .default as unknown as IyzipayCtor
        const iyzipayInstance = new Iyzipay({apiKey, secretKey, uri: baseUrl})
        const retrieve = (
            iyzipayInstance as unknown as {
                checkoutForm: {
                    retrieve: (
                        req: {locale: string; token: string},
                        cb: (err: unknown, res: unknown) => void
                    ) => void
                }
            }
        ).checkoutForm

        const result = await new Promise<unknown>((resolve, reject) => {
            retrieve.retrieve(
                {locale: 'tr', token: String(token)},
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res)
                }
            )
        })

        const r = result as {
            status?: string
            paymentStatus?: 'SUCCESS' | 'FAILURE'
            errorMessage?: string
        }
        const origin = new URL(req.url).origin
        if (r?.status !== 'success' || r?.paymentStatus !== 'SUCCESS') {
            return NextResponse.redirect(
                `${origin}/checkout?status=failed`,
                303
            )
        }
        return NextResponse.redirect(
            `${origin}/account/orders?status=paid`,
            303
        )
    } catch (e: unknown) {
        return NextResponse.json(
            {error: e instanceof Error ? e.message : 'Callback error'},
            {status: 500}
        )
    }
}
