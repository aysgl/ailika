'use client'

import Link from 'next/link'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {useAuth} from '@/context/AuthContext'
import {useRouter} from 'next/navigation'

export default function RegisterPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const {login} = useAuth()
    const router = useRouter()

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Demo: doğrudan oturum aç
            await new Promise(r => setTimeout(r, 400))
            login({name, email})
            router.push('/')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="container mx-auto max-w-md px-2 py-12">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Kayıt Ol</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={onSubmit}>
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm">
                                Ad Soyad
                            </label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Adınız Soyadınız"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>

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

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}>
                            {loading ? 'Kayıt yapılıyor…' : 'Kayıt Ol'}
                        </Button>

                        <p className="text-sm text-center text-foreground-600">
                            Zaten hesabın var mı?{' '}
                            <Link className="underline" href="/login">
                                Giriş Yap
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}
