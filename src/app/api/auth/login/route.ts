import {NextResponse} from 'next/server'

export async function POST(req: Request) {
    try {
        const {email, password} = (await req.json()) as {
            email?: string
            password?: string
        }
        if (!email || !password) {
            return NextResponse.json(
                {error: 'Email and password are required'},
                {status: 400}
            )
        }

        // Demo credentials
        if (email === 'admin@admin.com' && password === 'admin') {
            return NextResponse.json({
                token: 'demo-token',
                user: {
                    name: 'Admin',
                    email,
                    image: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon'
                }
            })
        }

        // Accept any credentials in demo mode as a fallback
        return NextResponse.json({error: 'Invalid credentials'}, {status: 401})
    } catch {
        return NextResponse.json({error: 'Invalid request'}, {status: 400})
    }
}
