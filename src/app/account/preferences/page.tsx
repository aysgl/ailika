'use client'

import AccountLayout from '@/components/AccountLayout'
import {Card, CardContent} from '@/components/ui/card'
import {Button} from '@/components/ui/button'
import {useAuth} from '@/context/AuthContext'
import {useState} from 'react'
import {Switch} from '@/components/ui/switch'
import {Bell, Mail, MessageSquare} from 'lucide-react'
import LoginPage from '@/app/login/page'

export default function PreferencesPage() {
    const {user, isAuthenticated, updateUser} = useAuth()
    const [emailPref, setEmailPref] = useState(user?.preferences?.email ?? true)
    const [smsPref, setSmsPref] = useState(user?.preferences?.sms ?? false)
    const [pushPref, setPushPref] = useState(user?.preferences?.push ?? false)

    const notificationSettings = [
        {
            id: 'email',
            title: 'E-posta Bildirimleri',
            description:
                'Önemli güncellemeler ve bildirimler için e-posta alın',
            icon: Mail,
            checked: emailPref,
            onChange: setEmailPref
        },
        {
            id: 'sms',
            title: 'SMS Bildirimleri',
            description: 'Acil durumlar ve önemli bildirimler için SMS alın',
            icon: MessageSquare,
            checked: smsPref,
            onChange: setSmsPref
        },
        {
            id: 'push',
            title: 'Push Bildirimleri',
            description: 'Tarayıcı üzerinden anlık bildirimler alın',
            icon: Bell,
            checked: pushPref,
            onChange: setPushPref
        }
    ]

    if (!isAuthenticated) {
        return <LoginPage />
    }

    const onSave = (e: React.FormEvent) => {
        e.preventDefault()
        updateUser({
            preferences: {email: emailPref, sms: smsPref, push: pushPref}
        })
    }

    return (
        <AccountLayout
            title="Duyuru Tercihlerim"
            breadcrumb={[
                {label: 'Anasayfa', href: '/'},
                {label: 'Hesabım', href: '/account'},
                {label: 'Duyuru Tercihlerim'}
            ]}>
            <Card className="bg-transparent shadow-none p-0 m-0">
                <CardContent className="p-0">
                    <form onSubmit={onSave} className="lg:space-y-6 space-y-2">
                        {notificationSettings.map(setting => {
                            const IconComponent = setting.icon
                            return (
                                <Card
                                    key={setting.id}
                                    className="transition-all duration-200 hover:shadow-none">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                                    <IconComponent className="h-5 w-5" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-card-foreground mb-1">
                                                        {setting.title}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {setting.description}
                                                    </p>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={setting.checked}
                                                onCheckedChange={
                                                    setting.onChange
                                                }
                                                className="mt-1"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                        <div className="pt-2 flex justify-end">
                            <Button type="submit">Kaydet</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </AccountLayout>
    )
}
