'use client'

import { useEffect, useState } from 'react'
import StatsCard from '@/components/dashboard/StatsCard'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card'
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    FileText,
    ShieldAlert,
    Archive,
    Tag,
} from 'lucide-react'
import { COMPLAINT_CATEGORIES } from '@/lib/constants/complaints'

type Stats = {
    total: number
    open: number
    inProgress: number
    resolved: number
    closed: number
    overdue: number
    byCategory: Record<string, number>
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/dashboard')
                if (!res.ok) {
                    if (res.status === 403) {
                        setError('Access denied. Admin role required.')
                        return
                    }
                    throw new Error('Failed to fetch dashboard statistics.')
                }
                const data = await res.json()
                if (data.success) {
                    setStats(data.stats)
                } else {
                    setError(data.message || 'Something went wrong.')
                }
            } catch (err) {
                console.error(err)
                setError('Unable to load dashboard statistics.')
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    if (loading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-800 border-t-neutral-200" />
                    <p className="text-neutral-400 text-sm animate-pulse">
                        Loading dashboard statistics...
                    </p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="mx-auto w-full max-w-md p-6">
                <Card className="border-red-900/50 bg-red-950/20 text-center">
                    <CardHeader>
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/20 text-red-400">
                            <AlertCircle size={24} />
                        </div>
                        <CardTitle className="text-red-400">
                            Error Loading Stats
                        </CardTitle>
                        <CardDescription className="text-red-300/70">
                            {error}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    const statusItems = [
        {
            title: 'Total Complaints',
            value: stats?.total ?? 0,
            description: 'All complaints raised by residents',
            icon: FileText,
            bg: 'blue',
        },
        {
            title: 'Open Complaints',
            value: stats?.open ?? 0,
            description: 'Complaints awaiting review',
            icon: AlertCircle,
            bg: 'yellow',
        },
        {
            title: 'In Progress',
            value: stats?.inProgress ?? 0,
            description: 'Complaints currently being resolved',
            icon: Clock,
            bg: 'amber',
        },
        {
            title: 'Resolved',
            value: stats?.resolved ?? 0,
            description: 'Completed complaints awaiting user closure',
            icon: CheckCircle2,
            bg: 'green',
        },
        {
            title: 'Closed',
            value: stats?.closed ?? 0,
            description: 'Archived and finalized complaints',
            icon: Archive,
            bg: 'gray',
        },
        {
            title: 'Overdue Complaints',
            value: stats?.overdue ?? 0,
            description: 'Open or in-progress complaints past SLA',
            icon: ShieldAlert,
            bg: 'red',
        },
    ] as const

    return (
        <main className="w-full max-w-6xl space-y-8 px-4 py-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <p className="text-sm text-neutral-400 md:text-base">
                    Quick statistics and status summary of all complaints in the
                    society
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-white">
                    Complaints by Status
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {statusItems.map((item, index) => (
                        <StatsCard
                            key={index}
                            title={item.title}
                            value={item.value}
                            description={item.description}
                            icon={item.icon}
                            bg={item.bg}
                        />
                    ))}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-lg font-semibold text-white">
                    Complaints by Category
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {COMPLAINT_CATEGORIES.map((category) => (
                        <StatsCard
                            key={category}
                            title={category.charAt(0) +
                                category.slice(1).toLowerCase()}
                            value={stats?.byCategory?.[category] ?? 0}
                            description={`${category.toLowerCase()} complaints`}
                            icon={Tag}
                            bg="blue"
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}
