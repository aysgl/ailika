'use client'

import {useCallback, useState} from 'react'
import {useAuth} from '@/context/AuthContext'
import {Card, CardContent} from '@/components/ui/card'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import Image from 'next/image'
import AccountLayout from '@/components/AccountLayout'
import {useDropzone} from 'react-dropzone'
import LoginPage from '@/app/login/page'

export default function AccountInfoPage() {
    const {user, isAuthenticated, updateUser} = useAuth()
    const [name, setName] = useState(user?.name || '')
    const [email, setEmail] = useState(user?.email || '')
    const [image, setImage] = useState(user?.image || '')
    const [phone, setPhone] = useState(user?.phone || '')
    const [birthDate, setBirthDate] = useState(user?.birthDate || '')

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => {
            setImage(String(reader.result || ''))
        }
        reader.readAsDataURL(file)
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        accept: {'image/*': []},
        multiple: false,
        onDrop
    })

    if (!isAuthenticated) {
        return <LoginPage />
    }

    const onSave = (e: React.FormEvent) => {
        e.preventDefault()
        updateUser({name, email, image, phone, birthDate})
    }

    return (
        <AccountLayout
            title="Kullanıcı Bilgilerim"
            breadcrumb={[
                {label: 'Anasayfa', href: '/'},
                {label: 'Hesabım', href: '/account'},
                {label: 'Kullanıcı Bilgilerim'}
            ]}>
            <Card>
                <CardContent>
                    <form onSubmit={onSave} className="grid gap-4">
                        <div className="grid items-center gap-2 sm:grid-cols-4">
                            <label className="text-sm sm:text-right">
                                Profil Görseli
                            </label>
                            <div className="sm:col-span-2">
                                <div
                                    {...getRootProps()}
                                    className={`border-2 border-dashed rounded-md p-4 flex items-center gap-4 cursor-pointer transition-colors ${
                                        isDragActive
                                            ? 'border-primary bg-primary/5'
                                            : 'border-muted-foreground/30 hover:border-primary'
                                    }`}>
                                    <input {...getInputProps()} />
                                    {image ? (
                                        <Image
                                            src={image}
                                            alt={name}
                                            width={48}
                                            height={48}
                                            className="rounded-full w-12 h-12 object-cover"
                                        />
                                    ) : (
                                        <div className="rounded-full w-12 h-12 bg-muted" />
                                    )}
                                    <div className="text-sm">
                                        <div className="font-medium">
                                            Görseli buraya bırakın ya da
                                            tıklayın
                                        </div>
                                        <div className="text-muted-foreground">
                                            PNG, JPG. Maks 5MB
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid items-center gap-2 sm:grid-cols-4">
                            <label
                                className="text-sm sm:text-right"
                                htmlFor="name">
                                Ad Soyad
                            </label>
                            <div className="sm:col-span-2">
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid items-center gap-2 sm:grid-cols-4">
                            <label
                                className="text-sm sm:text-right"
                                htmlFor="email">
                                E-posta
                            </label>
                            <div className="sm:col-span-2">
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid items-center gap-2 sm:grid-cols-4">
                            <label
                                className="text-sm sm:text-right"
                                htmlFor="phone">
                                Telefon
                            </label>
                            <div className="sm:col-span-2">
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="5XX XXX XX XX"
                                />
                            </div>
                        </div>
                        <div className="grid items-center gap-2 sm:grid-cols-4">
                            <label
                                className="text-sm sm:text-right"
                                htmlFor="birthDate">
                                Doğum Tarihi
                            </label>
                            <div className="sm:col-span-2">
                                <Input
                                    id="birthDate"
                                    type="date"
                                    value={birthDate}
                                    onChange={e => setBirthDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-4 text-end">
                            <div className="sm:col-span-2">
                                <Button type="submit">Kaydet</Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AccountLayout>
    )
}
