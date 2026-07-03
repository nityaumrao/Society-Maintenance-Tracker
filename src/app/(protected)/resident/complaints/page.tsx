'use client';

import { useEffect, useState } from 'react';

import ComplaintCard from '@/components/complaint/ComplaintCard';

type Complaint = {
    id: string;
    title: string;
    category: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    createdAt: string;
};

export default function ResidentComplaintsPage() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchComplaints() {
            try {
                const res = await fetch('/api/complaints');
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
        return (
            <div className="p-8">
                Loading complaints...
            </div>
        );
    }

    return (
        <main className="mx-auto max-w-6xl p-8">
            <h1 className="mb-8 text-3xl font-bold">
                My Complaints
            </h1>

            {complaints.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {complaints.map((complaint) => (
                        <ComplaintCard
                            key={complaint.id}
                            {...complaint}
                        />
                    ))}
                </div>
            )}
        </main>
    );
}