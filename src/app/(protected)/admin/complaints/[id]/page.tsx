'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import StatusBadge from '@/components/complaint/StatusBadge'
import PriorityBadge from '@/components/complaint/PriorityBadge'
import ComplaintTimeline from '@/components/complaint/ComplaintTimeline'
import ComplaintImage from '@/components/complaint/ComplaintImage'
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type Complaint = {
    id: string
    title: string
    description: string
    category: string
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    createdAt: string
    imageUrl: string | null
}

type HistoryItem = {
    id: string
    oldStatus: string | null
    newStatus: string
    remarks: string | null
    createdAt: string
}

export default function AdminComplaintDetailsPage() {
    const params = useParams()

    const [complaint, setComplaint] = useState<Complaint | null>(null)
    const [history, setHistory] = useState<HistoryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [status, setStatus] = useState<
        'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
    >('OPEN')

    const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>(
        'MEDIUM'
    )

    const [remarks, setRemarks] = useState('')

    useEffect(() => {
        async function fetchComplaint() {
            try {
                const res = await fetch(`/api/complaints/${params.id}`)
                const data = await res.json()

                if (!res.ok) {
                    setError(
                        res.status === 403
                            ? 'Access denied. Admin role required.'
                            : data.message || 'Complaint not found.'
                    )
                    return
                }

                setComplaint(data.complaint)
                setHistory(data.history || [])

                setStatus(data.complaint.status)
                setPriority(data.complaint.priority)
            } catch (error) {
                console.error(error)
                setError('Unable to load complaint details.')
            } finally {
                setLoading(false)
            }
        }

        fetchComplaint()
    }, [params.id])

    async function handleSave() {
        try {
            const res = await fetch(`/api/complaints/${params.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status,
                    priority,
                    remarks,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.message || 'Failed to update complaint')
                return
            }

            alert('Complaint updated successfully!')

            const refreshRes = await fetch(`/api/complaints/${params.id}`)
            const refreshData = await refreshRes.json()

            if (refreshRes.ok) {
                setComplaint(refreshData.complaint)
                setHistory(refreshData.history || [])
                setStatus(refreshData.complaint.status)
                setPriority(refreshData.complaint.priority)
                setRemarks('')
            }
        } catch (error) {
            console.error(error)
            alert('Something went wrong.')
        }
    }

    if (loading) {
        return <p className="p-8">Loading...</p>
    }

    if (error || !complaint) {
        return (
            <div className="space-y-4 p-8">
                <p>{error || 'Complaint not found.'}</p>
                <Link
                    href="/admin/complaints"
                    className="text-primary hover:underline"
                >
                    ← Back to Complaints
                </Link>
            </div>
        )
    }

    return (
        <main className="mx-auto max-w-5xl space-y-8 p-8">
            {/* Complaint Information Card */}
            <Card className="border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">
                        {complaint.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        <strong className="text-foreground">
                            Description:
                        </strong>{' '}
                        {complaint.description}
                    </p>
                    <p className="text-muted-foreground">
                        <strong className="text-foreground">Category:</strong>{' '}
                        {complaint.category}
                    </p>
                    <div className="flex items-center gap-4">
                        <StatusBadge status={complaint.status} />
                        <PriorityBadge priority={complaint.priority} />
                    </div>
                    <p className="text-muted-foreground">
                        <strong className="text-foreground">Created:</strong>{' '}
                        {new Date(complaint.createdAt).toLocaleString()}
                    </p>
                    <ComplaintImage
                        imageUrl={complaint.imageUrl}
                        alt={`Photo for ${complaint.title}`}
                    />
                </CardContent>
                <CardFooter>
                    <Link
                        href="/admin/complaints"
                        className="text-primary hover:underline"
                    >
                        ← Back to Complaints
                    </Link>
                </CardFooter>
            </Card>

            {/* Update Complaint Card */}
            <Card className="border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        Update Complaint
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) =>
                                setStatus(e.target.value as typeof status)
                            }
                            className="w-full rounded border p-2 mt-1"
                        >
                            <option value="OPEN">OPEN</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="RESOLVED">RESOLVED</option>
                            <option value="CLOSED">CLOSED</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Priority
                        </label>
                        <select
                            value={priority}
                            onChange={(e) =>
                                setPriority(e.target.value as typeof priority)
                            }
                            className="w-full rounded border p-2 mt-1"
                        >
                            <option value="LOW">LOW</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HIGH">HIGH</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Remarks
                        </label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            rows={4}
                            className="w-full rounded border p-2 mt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={handleSave}>Save Changes</Button>
                </CardFooter>
            </Card>

            {/* Complaint Timeline Card */}
            <Card className="border rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">
                        History
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                    <ComplaintTimeline history={history} />
                </CardContent>
            </Card>
        </main>
    )
}
