'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import ComplaintCard from '@/components/complaint/ComplaintCard'
import ComplaintFiltersBar from '@/components/complaint/ComplaintFiltersBar'
import { Button } from '@/components/ui/button'
import {
    buildComplaintFilterQuery,
    type ComplaintFilters,
} from '@/lib/helpers/complaint-filters'

type Complaint = {
    id: string
    title: string
    category: string
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    createdAt: string
}

export default function ResidentComplaintsPage() {
    const [complaints, setComplaints] = useState<Complaint[]>([])
    const [filters, setFilters] = useState<ComplaintFilters>({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let cancelled = false

        const loadComplaints = async () => {
            setLoading(true)
            setError('')

            try {
                const query = buildComplaintFilterQuery(filters)
                const url = query.toString()
                    ? `/api/complaints?${query.toString()}`
                    : '/api/complaints'
                const res = await fetch(url)
                const data = await res.json()

                if (cancelled) {
                    return
                }

                if (!res.ok) {
                    setError(data.message || 'Failed to load complaints.')
                    return
                }

                setComplaints(data.complaints || [])
            } catch (fetchError) {
                console.error(fetchError)
                if (!cancelled) {
                    setError('Unable to load complaints.')
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        void loadComplaints()

        return () => {
            cancelled = true
        }
    }, [filters])

    return (
        <main className="mx-auto max-w-6xl p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">My Complaints</h1>
                <Button asChild>
                    <Link href="/resident/new">Raise Complaint</Link>
                </Button>
            </div>

            <div className="mb-6">
                <ComplaintFiltersBar filters={filters} onChange={setFilters} />
            </div>

            {loading ? (
                <div>Loading complaints...</div>
            ) : error ? (
                <div className="text-destructive">{error}</div>
            ) : complaints.length === 0 ? (
                <div className="space-y-4">
                    <p>No complaints found.</p>
                    <Button asChild variant="outline">
                        <Link href="/resident/new">Create your first complaint</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {complaints.map((complaint) => (
                        <ComplaintCard key={complaint.id} {...complaint} />
                    ))}
                </div>
            )}
        </main>
    )
}
