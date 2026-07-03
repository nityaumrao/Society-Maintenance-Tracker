'use client';

import { useEffect, useState } from 'react';
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle, 
    CardAction, 
    CardDescription 
} from '@/components/ui/card';
import { 
    AlertCircle, 
    CheckCircle2, 
    Clock, 
    FileText, 
    ShieldAlert, 
    Archive 
} from 'lucide-react';

type Stats = {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
    overdue: number;
};

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/dashboard');
                if (!res.ok) {
                    if (res.status === 403) {
                        setError('Access denied. Admin role required.');
                        return;
                    }
                    throw new Error('Failed to fetch dashboard statistics.');
                }
                const data = await res.json();
                if (data.success) {
                    setStats(data.stats);
                } else {
                    setError(data.message || 'Something went wrong.');
                }
            } catch (err) {
                console.error(err);
                setError('Unable to load dashboard statistics.');
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-800 border-t-neutral-200" />
                    <p className="text-neutral-400 text-sm animate-pulse">Loading dashboard statistics...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto w-full max-w-md p-6">
                <Card className="border-red-900/50 bg-red-950/20 text-center">
                    <CardHeader>
                        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/20 text-red-400">
                            <AlertCircle size={24} />
                        </div>
                        <CardTitle className="text-red-400">Error Loading Stats</CardTitle>
                        <CardDescription className="text-red-300/70">{error}</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    const statItems = [
        {
            title: 'Total Complaints',
            value: stats?.total ?? 0,
            description: 'All complaints raised by residents',
            icon: FileText,
            color: 'text-blue-400',
            bg: 'bg-blue-500/10 border-blue-500/20',
        },
        {
            title: 'Open Complaints',
            value: stats?.open ?? 0,
            description: 'Complaints awaiting review',
            icon: AlertCircle,
            color: 'text-yellow-400',
            bg: 'bg-yellow-500/10 border-yellow-500/20',
        },
        {
            title: 'In Progress',
            value: stats?.inProgress ?? 0,
            description: 'Complaints currently being resolved',
            icon: Clock,
            color: 'text-amber-400',
            bg: 'bg-amber-500/10 border-amber-500/20',
        },
        {
            title: 'Resolved',
            value: stats?.resolved ?? 0,
            description: 'Completed complaints awaiting user closure',
            icon: CheckCircle2,
            color: 'text-green-400',
            bg: 'bg-green-500/10 border-green-500/20',
        },
        {
            title: 'Closed',
            value: stats?.closed ?? 0,
            description: 'Archived and finalized complaints',
            icon: Archive,
            color: 'text-neutral-400',
            bg: 'bg-neutral-500/10 border-neutral-500/20',
        },
        {
            title: 'Overdue Complaints',
            value: stats?.overdue ?? 0,
            description: 'Complaints past their response SLA',
            icon: ShieldAlert,
            color: 'text-red-400',
            bg: 'bg-red-500/10 border-red-500/20',
            // TODO: Connect to backend overdue calculation logic when due-dates are implemented
        },
    ];

    return (
        <main className="w-full max-w-6xl space-y-8 px-4 py-8">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <p className="text-sm text-neutral-400 md:text-base">
                    Quick statistics and status summary of all complaints in the society
                </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {statItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Card key={index} className={`border transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${item.bg}`}>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-neutral-300">
                                    {item.title}
                                </CardTitle>
                                <CardAction>
                                    <Icon className={`h-5 w-5 ${item.color}`} />
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                    {item.value}
                                </div>
                                <p className="mt-2 text-xs text-neutral-400">
                                    {item.description}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </main>
    );
}