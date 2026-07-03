'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import ComplaintCard from '@/components/complaint/ComplaintCard'
import { Button } from '@/components/ui/button'

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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchComplaints() {
            try {
                const res = await fetch('/api/complaints')
                const data = await res.json()

                if (!res.ok) {
                    setError(data.message || 'Failed to load complaints.')
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
        return <div className="p-8">Loading complaints...</div>
    }

    if (error) {
        return <div className="p-8 text-destructive">{error}</div>
    }

    return (
        <main className="mx-auto max-w-6xl p-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">My Complaints</h1>
                <Button asChild>
                    <Link href="/resident/new">Raise Complaint</Link>
                </Button>
            </div>

            {complaints.length === 0 ? (
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
