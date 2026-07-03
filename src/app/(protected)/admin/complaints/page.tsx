'use client'

import { useEffect, useState } from 'react'


import AdminComplaintCard from '@/components/complaint/AdminComplaintCard'

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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchComplaints() {
            try {
                const res = await fetch('/api/admin/complaints')
                const data = await res.json()

                if (!res.ok) {
                    setError(
                        res.status === 403
                            ? 'Access denied. Admin role required.'
                            : data.message || 'Failed to load complaints.'
                    )
                    return
                }

                setComplaints(data.complaints || [])
            } catch (error) {
                console.error(error)
                setError('Unable to load complaints.')
            } finally {
                setLoading(false)
            }
        }

        fetchComplaints()
    }, [])

    if (loading) {
        return <p className="p-8">Loading complaints...</p>
    }

    if (error) {
        return <p className="p-8 text-destructive">{error}</p>
    }

    return (
        <main className="space-y-6 p-8">
            <h1 className="text-3xl font-bold">Complaint Management</h1>

            {complaints.length === 0 ? (
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
