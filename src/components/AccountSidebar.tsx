import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {Sidebar, SidebarContent, SidebarGroup} from '@/components/ui/sidebar'
import {
    ShoppingBag,
    Star,
    BadgePercent,
    User2,
    Lock,
    HelpCircle,
    CreditCard
} from 'lucide-react'

export default function AccountSidebar() {
    const pathname = usePathname()
    const groups = [
        {
            title: 'SİPARİŞLERİM',
            items: [
                {
                    label: 'Tüm Siparişlerim',
                    href: '/account/orders',
                    icon: <ShoppingBag className="size-4" />
                },
                {
                    label: 'Değerlendirmelerim',
                    href: '/account/reviews',
                    icon: <Star className="size-4" />
                }
            ]
        },
        {
            title: 'SANA ÖZEL',
            items: [
                {
                    label: 'İndirim Kuponlarım',
                    href: '/account/coupons',
                    icon: <BadgePercent className="size-4" />
                }
            ]
        },
        {
            title: 'HESABIM & YARDIM',
            items: [
                {
                    label: 'Kullanıcı Bilgilerim',
                    href: '/account/info',
                    icon: <User2 className="size-4" />
                },
                {
                    label: 'Adres Bilgilerim',
                    href: '/account/myaddress',
                    icon: <User2 className="size-4" />
                },
                {
                    label: 'Kayıtlı Kartlarım',
                    href: '/account/cards',
                    icon: <CreditCard className="size-4" />
                },
                {
                    label: 'Duyuru Tercihlerim',
                    href: '/account/preferences',
                    icon: <User2 className="size-4" />
                },
                {
                    label: 'Şifre Değiştir',
                    href: '/account/change-password',
                    icon: <Lock className="size-4" />
                },
                {
                    label: 'Yardım',
                    href: '/account/help',
                    icon: <HelpCircle className="size-4" />
                }
            ]
        }
    ]

    return (
        <Sidebar className="bg-white/40">
            <SidebarContent>
                {groups.map(group => (
                    <SidebarGroup key={group.title}>
                        <div className="px-1 pb-2 text-xs font-semibold text-muted-foreground">
                            {group.title}
                        </div>
                        <nav className="grid gap-2">
                            {group.items.map(item => {
                                const active =
                                    pathname === item.href ||
                                    pathname.startsWith(item.href + '/')
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={
                                            'flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ' +
                                            (active
                                                ? 'bg-primary text-primary-foreground'
                                                : 'hover:bg-white/60')
                                        }>
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </Link>
                                )
                            })}
                        </nav>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}
