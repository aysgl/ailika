import {NextResponse} from 'next/server'

type InitBody = {
    items: Array<{name: string; amount: number; quantity: number}>
    shipping: {
        fullName: string
        email: string
        phone: string
        address: string
        city: string
        country?: string
        postalCode?: string
    }
}

export async function POST(req: Request) {
    try {
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

        const body = (await req.json()) as InitBody
        if (!body?.items?.length) {
            return NextResponse.json({error: 'No items'}, {status: 400})
        }
        if (
            !body.shipping?.fullName ||
            !body.shipping?.email ||
            !body.shipping?.address ||
            !body.shipping?.city
        ) {
            return NextResponse.json(
                {error: 'Missing shipping fields'},
                {status: 400}
            )
        }

        const headers = req.headers
        const headerOrigin =
            headers.get('origin') || headers.get('referer') || ''
        const origin = headerOrigin || new URL(req.url).origin

        type IyzipayCtor = new (args: {
            apiKey: string
            secretKey: string
            uri: string
        }) => unknown
        const Iyzipay = (await import('iyzipay'))
            .default as unknown as IyzipayCtor
        const iyzipayInstance = new Iyzipay({apiKey, secretKey, uri: baseUrl})

        // amount comes in kuruş; convert to TL here
        const basketItems = body.items.map((i, idx) => {
            const priceTl = (i.amount * i.quantity) / 100
            return {
                id: `BI${idx + 1}`,
                name: i.name,
                category1: 'Genel',
                itemType: 'PHYSICAL',
                price: priceTl.toFixed(2)
            }
        })

        const totalPrice = basketItems
            .reduce((sum, item) => sum + parseFloat(item.price), 0)
            .toFixed(2)

        const formatIyzicoDate = (d: Date) => {
            const pad = (n: number) => String(n).padStart(2, '0')
            return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
                d.getDate()
            )} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(
                d.getSeconds()
            )}`
        }

        const clientIpHeader = headers.get('x-forwarded-for') || ''
        let clientIp = clientIpHeader.split(',')[0]?.trim() || '85.34.78.112'
        // iyzico bazı ortamlarda IPv6 (::1) yerine IPv4 bekleyebilir
        if (!clientIp || clientIp.includes(':')) {
            clientIp = '85.34.78.112'
        }

        const normalizeGsm = (raw: string | undefined) => {
            if (!raw) return '+905555555555'
            const digits = String(raw).replace(/\D/g, '')
            const m = digits.match(/5\d{9}/)
            const national = m ? m[0] : digits.replace(/^0+/, '').slice(-10)
            const finalNational = /^5\d{9}$/.test(national)
                ? national
                : '5555555555'
            return `+90${finalNational}`
        }

        const toAscii = (s: string | undefined) =>
            (s || '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^A-Za-z0-9 .,-]/g, '')
                .trim()

        const safeCity = toAscii(body.shipping.city) || 'Istanbul'
        const safeCountry = 'Turkey'
        const safeZip = body.shipping.postalCode || '34000'

        const [firstName, ...restName] = body.shipping.fullName.split(' ')
        const safeName = toAscii(firstName) || 'Musteri'
        const safeSurname = toAscii(restName.join(' ')) || 'Soyad'

        const request = {
            locale: 'tr',
            conversationId: `${Date.now()}`,
            price: totalPrice,
            paidPrice: totalPrice,
            currency: 'TRY',
            installment: '1',
            basketId: `BASKET_${Date.now()}`,
            paymentGroup: 'PRODUCT',
            callbackUrl: `${origin}/api/iyzico/callback`,
            buyer: {
                id: 'BY999',
                name: safeName,
                surname: safeSurname,
                gsmNumber: normalizeGsm(body.shipping.phone),
                email: body.shipping.email,
                identityNumber: '11111111110', // Iyzico sandbox önerilen test TCKN
                lastLoginDate: formatIyzicoDate(new Date()),
                registrationDate: formatIyzicoDate(new Date()),
                registrationAddress: toAscii(body.shipping.address),
                ip: clientIp,
                city: safeCity,
                country: safeCountry,
                zipCode: safeZip
            },
            shippingAddress: {
                contactName: toAscii(body.shipping.fullName),
                city: safeCity,
                country: safeCountry,
                address: toAscii(body.shipping.address),
                zipCode: safeZip
            },
            billingAddress: {
                contactName: toAscii(body.shipping.fullName),
                city: safeCity,
                country: safeCountry,
                address: toAscii(body.shipping.address),
                zipCode: safeZip
            },
            basketItems
        }

        const checkout = (
            iyzipayInstance as unknown as {
                checkoutFormInitialize: {
                    create: (
                        req: Record<string, unknown>,
                        cb: (err: unknown, res: unknown) => void
                    ) => void
                }
            }
        ).checkoutFormInitialize

        const result = await new Promise<unknown>((resolve, reject) => {
            checkout.create(
                request as unknown as Record<string, unknown>,
                (err, res) => {
                    if (err) reject(err)
                    else resolve(res)
                }
            )
        })

        const resultObj = result as {
            status?: string
            errorMessage?: string
            errorCode?: string
            token?: string
            checkoutFormContent?: string
        }

        if (resultObj?.status !== 'success') {
            return NextResponse.json(
                {
                    error: resultObj?.errorMessage || 'Init failed',
                    code: resultObj?.errorCode || null,
                    iyzicoResponse: resultObj,
                    debugRequest: request
                },
                {status: 400}
            )
        }

        return NextResponse.json({
            token: resultObj.token,
            content: resultObj.checkoutFormContent
        })
    } catch (e: unknown) {
        return NextResponse.json(
            {error: e instanceof Error ? e.message : 'Init error'},
            {status: 500}
        )
    }
}
