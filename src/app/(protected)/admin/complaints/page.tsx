'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import StatusBadge from '@/components/complaint/StatusBadge';
import PriorityBadge from '@/components/complaint/PriorityBadge';

type Complaint = {
    id: string;
    title: string;
    category: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    createdAt: string;
    residentName: string | null;
    residentEmail: string;
};

export default function AdminComplaintsPage() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchComplaints() {
            try {
                const res = await fetch('/api/admin/complaints');
                const data = await res.json();

                setComplaints(data.complaints || []);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchComplaints();
    }, []);

    if (loading) {
        return <p className="p-8">Loading complaints...</p>;
    }

    return (
        <main className="space-y-6 p-8">
            <h1 className="text-3xl font-bold">
                Complaint Management
            </h1>

            <div className="overflow-x-auto rounded-xl border">
                <table className="w-full">
                    <thead className="border-b bg-muted">
                        <tr>
                            <th className="p-4 text-left">Title</th>
                            <th className="p-4 text-left">Resident</th>
                            <th className="p-4 text-left">Category</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Priority</th>
                            <th className="p-4 text-left">Created</th>
                            <th className="p-4 text-left">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {complaints.map((complaint) => (
                            <tr
                                key={complaint.id}
                                className="border-b"
                            >
                                <td className="p-4">
                                    {complaint.title}
                                </td>

                                <td className="p-4">
                                    {complaint.residentName ?? complaint.residentEmail}
                                </td>

                                <td className="p-4">
                                    {complaint.category}
                                </td>

                                <td className="p-4">
                                    <StatusBadge
                                        status={complaint.status}
                                    />
                                </td>

                                <td className="p-4">
                                    <PriorityBadge
                                        priority={complaint.priority}
                                    />
                                </td>

                                <td className="p-4">
                                    {new Date(
                                        complaint.createdAt
                                    ).toLocaleDateString()}
                                </td>

                                <td className="p-4">
                                    <Link
                                        href={`/admin/complaints/${complaint.id}`}
                                        className="text-blue-600 hover:underline"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}