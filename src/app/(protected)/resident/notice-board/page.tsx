'use client'

import { useEffect, useState } from 'react'

import NoticeCard, { type NoticeItem } from '@/components/notice/NoticeCard'

export default function NoticeBoardPage() {
    const [notices, setNotices] = useState<NoticeItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function fetchNotices() {
            try {
                const res = await fetch('/api/notices')
                const data = await res.json()

                if (!res.ok) {
                    setError(data.message || 'Failed to load notices.')
                    return
                }

                setNotices(data.notices || [])
            } catch (err) {
                console.error(err)
                setError('Unable to load notices.')
            } finally {
                setLoading(false)
            }
        }

        fetchNotices()
    }, [])

    if (loading) {
        return <p className="p-8">Loading notices...</p>
    }

    if (error) {
        return <p className="p-8 text-destructive">{error}</p>
    }

    return (
        <main className="mx-auto max-w-5xl space-y-8 p-8">
            <div>
                <h1 className="text-3xl font-bold">Notice Board</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                    Important notices are shown first.
                </p>
            </div>

            {notices.length === 0 ? (
                <p className="text-muted-foreground">
                    No notices have been posted yet.
                </p>
            ) : (
                <div className="grid gap-6">
                    {notices.map((notice) => (
                        <NoticeCard key={notice.id} {...notice} />
                    ))}
                </div>
            )}
        </main>
    )
}
