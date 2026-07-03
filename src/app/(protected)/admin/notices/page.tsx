'use client'

import { useCallback, useEffect, useState } from 'react'

import NoticeCard, { type NoticeItem } from '@/components/notice/NoticeCard'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminNoticesPage() {
    const [notices, setNotices] = useState<NoticeItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [deletingId, setDeletingId] = useState<string | null>(null)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isImportant, setIsImportant] = useState(false)

    const fetchNotices = useCallback(async () => {
        const res = await fetch('/api/notices')
        const data = await res.json()

        if (!res.ok) {
            throw new Error(
                res.status === 403
                    ? 'Access denied. Admin role required.'
                    : data.message || 'Failed to load notices.'
            )
        }

        setNotices(data.notices || [])
    }, [])

    useEffect(() => {
        async function loadNotices() {
            try {
                await fetchNotices()
            } catch (err) {
                console.error(err)
                setError(
                    err instanceof Error
                        ? err.message
                        : 'Unable to load notices.'
                )
            } finally {
                setLoading(false)
            }
        }

        loadNotices()
    }, [fetchNotices])

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault()
        setSubmitting(true)

        try {
            const res = await fetch('/api/notices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, isImportant }),
            })
            const data = await res.json()

            if (!res.ok) {
                alert(data.message || 'Failed to create notice')
                return
            }

            setTitle('')
            setContent('')
            setIsImportant(false)
            await fetchNotices()
        } catch (err) {
            console.error(err)
            alert('Something went wrong.')
        } finally {
            setSubmitting(false)
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Delete this notice?')) {
            return
        }

        setDeletingId(id)

        try {
            const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' })
            const data = await res.json()

            if (!res.ok) {
                alert(data.message || 'Failed to delete notice')
                return
            }

            await fetchNotices()
        } catch (err) {
            console.error(err)
            alert('Something went wrong.')
        } finally {
            setDeletingId(null)
        }
    }

    if (loading) {
        return <p className="p-8">Loading notices...</p>
    }

    if (error) {
        return <p className="p-8 text-destructive">{error}</p>
    }

    return (
        <main className="mx-auto max-w-5xl space-y-8 p-8">
            <h1 className="text-3xl font-bold">Notice Management</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Create Notice</CardTitle>
                </CardHeader>
                <form onSubmit={handleCreate}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="notice-title">Title</Label>
                            <Input
                                id="notice-title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Notice title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notice-content">Content</Label>
                            <textarea
                                id="notice-content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Write the notice content..."
                                rows={5}
                                required
                                className="w-full rounded-md border bg-background p-3 text-sm"
                            />
                        </div>

                        <label className="flex items-center gap-2 text-sm">
                            <input
                                type="checkbox"
                                checked={isImportant}
                                onChange={(e) =>
                                    setIsImportant(e.target.checked)
                                }
                                className="size-4 rounded border"
                            />
                            Mark as Important
                        </label>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={submitting}>
                            {submitting ? 'Publishing...' : 'Publish Notice'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Published Notices</h2>

                {notices.length === 0 ? (
                    <p className="text-muted-foreground">
                        No notices published yet.
                    </p>
                ) : (
                    <div className="grid gap-6">
                        {notices.map((notice) => (
                            <NoticeCard
                                key={notice.id}
                                {...notice}
                                onDelete={handleDelete}
                                deletingId={deletingId}
                            />
                        ))}
                    </div>
                )}
            </section>
        </main>
    )
}
