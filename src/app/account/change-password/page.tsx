'use client'

import AccountLayout from '@/components/AccountLayout'
import {Card, CardContent} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {useState} from 'react'
import {useAuth} from '@/context/AuthContext'
import LoginPage from '@/app/login/page'

export default function ChangePasswordPage() {
    const {isAuthenticated} = useAuth()
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    if (!isAuthenticated) {
        return <LoginPage />
    }

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // TODO: Integrate with backend when ready
        if (newPassword !== confirmPassword) return
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }

    return (
        <AccountLayout
            title="Şifre Değiştir"
            breadcrumb={[
                {label: 'Anasayfa', href: '/'},
                {label: 'Hesabım', href: '/account'},
                {label: 'Şifre Değiştir'}
            ]}>
            <Card>
                <CardContent>
                    <form
                        onSubmit={onSubmit}
                        className="grid gap-4 max-w-2xl mx-auto">
                        <div className="grid items-center gap-2 sm:grid-cols-4">
                            <label
                                className="text-sm sm:text-right"
                                htmlFor="currentPassword">
                                Mevcut Şifre
                            </label>
                            <Input
                                className="sm:col-span-2"
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={e =>
                                    setCurrentPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="grid items-center gap-2 sm:grid-cols-4">
                            <label
                                className="text-sm sm:text-right"
                                htmlFor="newPassword">
                                Yeni Şifre
                            </label>
                            <Input
                                className="sm:col-span-2"
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid items-center gap-2 sm:grid-cols-4">
                            <label
                                className="text-sm sm:text-right"
                                htmlFor="confirmPassword">
                                Yeni Şifre (Tekrar)
                            </label>
                            <Input
                                className="sm:col-span-2"
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={e =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="grid sm:grid-cols-4">
                            <div className="sm:col-start-2 sm:col-span-2 flex justify-end">
                                <Button type="submit">Güncelle</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AccountLayout>
    )
}
