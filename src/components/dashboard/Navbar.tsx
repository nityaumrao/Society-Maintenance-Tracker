'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import {
    FileText,
    LayoutDashboard,
    LogOut,
    Megaphone,
    Menu,
    PlusCircle,
    Settings,
    Shield,
    X,
} from 'lucide-react'
import { UserButton } from '@/lib/helpers/log-out-button'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCurrentRole } from '@/lib/hooks/useCurrentUserRole'

const navItems = [
    { href: '/resident/complaints', label: 'My Complaints', icon: FileText },
    { href: '/resident/new', label: 'New Complaint', icon: PlusCircle },
    { href: '/resident/notice-board', label: 'Notice Board', icon: Megaphone },
    {
        href: '/admin/complaints',
        label: 'Manage Complaints',
        icon: Shield,
        adminOnly: true,
    },
    {
        href: '/admin/notices',
        label: 'Manage Notices',
        icon: Megaphone,
        adminOnly: true,
    },
    {
        href: '/admin/dashboard',
        label: 'Admin Dashboard',
        icon: LayoutDashboard,
        adminOnly: true,
    },
    { href: '/settings', label: 'Settings', icon: Settings },
]

const Navbar = () => {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)
    const role = useCurrentRole()
    const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN'

    const visibleNavItems = navItems.filter(
        (item) => !item.adminOnly || isAdmin
    )

    const isActive = (href: string) =>
        pathname === href || pathname.startsWith(`${href}/`)

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/70 backdrop-blur-xl">
            <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="size-2 rounded-full bg-primary shadow-[0_0_16px_theme(colors.blue.400)]" />
                        <span className="text-sm font-semibold tracking-wide text-foreground/95">
                            Society Suite
                        </span>
                    </div>

                    <div className="hidden items-center gap-1 md:flex">
                        {visibleNavItems.map((item) => {
                            const Icon = item.icon
                            const active = isActive(item.href)

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'group relative inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium transition-all duration-200',
                                        active
                                            ? 'bg-accent text-foreground'
                                            : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground'
                                    )}
                                >
                                    <Icon className="size-4" />
                                    <span>{item.label}</span>
                                    <span
                                        className={cn(
                                            'absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-primary transition-all duration-200',
                                            active
                                                ? 'opacity-100'
                                                : 'opacity-0 group-hover:opacity-60'
                                        )}
                                    />
                                </Link>
                            )
                        })}
                    </div>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    <UserButton />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => signOut()}
                        className="h-9 border-border/80 bg-transparent text-foreground/90 hover:bg-accent"
                    >
                        <LogOut className="size-4" />
                        Sign Out
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    size="icon-sm"
                    className="md:hidden"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Toggle navigation"
                >
                    {mobileOpen ? (
                        <X className="size-4" />
                    ) : (
                        <Menu className="size-4" />
                    )}
                </Button>
            </nav>

            <div
                className={cn(
                    'overflow-hidden border-t border-border/60 px-4 transition-all duration-200 md:hidden',
                    mobileOpen ? 'max-h-96 py-3' : 'max-h-0 py-0'
                )}
            >
                <div className="space-y-1">
                    {visibleNavItems.map((item) => {
                        const Icon = item.icon
                        const active = isActive(item.href)

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    'inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                    active
                                        ? 'bg-accent text-foreground'
                                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                                )}
                            >
                                <Icon className="size-4" />
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}

                    <div className="mt-2 flex items-center justify-between gap-2 rounded-md border border-border/70 bg-card/70 px-3 py-2">
                        <UserButton />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => signOut()}
                            className="h-8 border-border/80 bg-transparent"
                        >
                            <LogOut className="size-4" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
