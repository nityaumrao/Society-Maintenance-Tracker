'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

import ComplaintTimeline from '@/components/complaint/ComplaintTimeline'
import PriorityBadge from '@/components/complaint/PriorityBadge'
import StatusBadge from '@/components/complaint/StatusBadge'

type Complaint = {
    id: string
    title: string
    description: string
    category: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
}

type HistoryItem = {
    id: string
    oldStatus: string | null
    newStatus: string
    remarks: string | null
    createdAt: string
}

export default function ComplaintDetailsPage() {
    const params = useParams()

    const [complaint, setComplaint] = useState<Complaint | null>(null)
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchComplaint() {
            try {
                const res = await fetch(`/api/complaints/${params.id}`)
                const data = await res.json()

                if (!res.ok) {
                    setError(
                        res.status === 403
                            ? 'You are not authorized to view this complaint.'
                            : data.message || 'Complaint not found.'
                    )
                    return
                }

                setComplaint(data.complaint)
                setHistory(data.history || [])
            } catch (error) {
                console.error(error)
                setError('Unable to load complaint details.')
            } finally {
                setLoading(false)
            }
        }

        fetchComplaint()
    }, [params.id])

    if (loading) {
        return <div className="p-8">Loading...</div>
    }

    if (error || !complaint) {
        return (
            <div className="space-y-4 p-8">
                <p>{error || 'Complaint not found.'}</p>
                <Link
                    href="/resident/complaints"
                    className="text-primary hover:underline"
                >
                    ← Back to My Complaints
                </Link>
            </div>
        )
    }

    return (
        <main className="mx-auto max-w-5xl space-y-8 p-8">
            <Link
                href="/resident/complaints"
                className="text-sm text-primary hover:underline"
            >
                ← Back to My Complaints
            </Link>
            <section className="rounded-xl border p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">{complaint.title}</h1>

                    <StatusBadge status={complaint.status} />
                </div>

                <div className="mt-5 flex gap-3">
                    <PriorityBadge priority={complaint.priority} />

                    <span>{complaint.category}</span>
                </div>

                <p className="mt-6 leading-7">{complaint.description}</p>
            </section>

            <ComplaintTimeline history={history} />
        </main>
    )
}
