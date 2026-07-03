'use client'

import { useEffect, useState } from 'react'

import AdminComplaintCard from '@/components/complaint/AdminComplaintCard'
import ComplaintFiltersBar from '@/components/complaint/ComplaintFiltersBar'
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
    residentName: string | null
    residentEmail: string
}

export default function AdminComplaintsPage() {
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
                    ? `/api/admin/complaints?${query.toString()}`
                    : '/api/admin/complaints'
                const res = await fetch(url)
                const data = await res.json()

                if (cancelled) {
                    return
                }

                if (!res.ok) {
                    setError(
                        res.status === 403
                            ? 'Access denied. Admin role required.'
                            : data.message || 'Failed to load complaints.'
                    )
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
        <main className="space-y-6 p-8">
            <h1 className="text-3xl font-bold">Complaint Management</h1>

            <ComplaintFiltersBar filters={filters} onChange={setFilters} />

            {loading ? (
                <p>Loading complaints...</p>
            ) : error ? (
                <p className="text-destructive">{error}</p>
            ) : complaints.length === 0 ? (
                <p className="text-muted-foreground">No complaints found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {complaints.map((complaint) => (
                        <AdminComplaintCard
                            key={complaint.id}
                            id={complaint.id}
                            title={complaint.title}
                            category={complaint.category}
                            status={complaint.status}
                            priority={complaint.priority}
                            createdAt={complaint.createdAt}
                            residentName={complaint.residentName}
                            residentEmail={complaint.residentEmail}
                        />
                    ))}
                </div>
            )}
        </main>
    )
}
