import Link from 'next/link'
import {Button} from './ui/button'
import {Card, CardContent, CardHeader, CardTitle} from './ui/card'
import {Input} from './ui/input'
import {useState} from 'react'
import {useAuth} from '@/context/AuthContext'
import {useRouter} from 'next/navigation'

export default function LoginForm() {
    const [email, setEmail] = useState('admin@admin.com')
    const [password, setPassword] = useState('admin')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {login} = useAuth()
    const router = useRouter()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: JSON.stringify({email, password})
            })
            if (!res.ok) {
                const body = await res.json().catch(() => ({}))
                throw new Error(body?.error || 'Giriş başarısız')
            }
            const data = (await res.json()) as {
                token: string
                user: {name: string; email: string}
            }
            login(data.user)
            router.push('/')
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : typeof err === 'string'
                    ? err
                    : 'Giriş başarısız'
            setError(message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Giriş Yap</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4" onSubmit={onSubmit}>
                    {error && (
                        <div className="text-sm text-destructive">{error}</div>
                    )}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm">
                            E-posta
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm">
                            Şifre
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Giriş yapılıyor…' : 'Giriş Yap'}
                    </Button>

                    <p className="text-sm text-center text-foreground-600">
                        Hesabın yok mu?{' '}
                        <Link className="underline" href="/register">
                            Kayıt Ol
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    )
}
