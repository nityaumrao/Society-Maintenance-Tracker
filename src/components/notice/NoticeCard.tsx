import { Calendar, Megaphone, Trash2 } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export type NoticeItem = {
    id: string
    title: string
    content: string
    isImportant: boolean
    createdAt: string
    authorName: string | null
    authorEmail: string | null
}

type NoticeCardProps = NoticeItem & {
    onDelete?: (id: string) => void
    deletingId?: string | null
}

export default function NoticeCard({
    id,
    title,
    content,
    isImportant,
    createdAt,
    authorName,
    authorEmail,
    onDelete,
    deletingId,
}: NoticeCardProps) {
    const author = authorName ?? authorEmail ?? 'Admin'

    return (
        <Card
            className={
                isImportant
                    ? 'border-amber-500/40 bg-amber-500/5'
                    : undefined
            }
        >
            <CardHeader>
                <div className="flex items-start justify-between gap-3">
                    <CardTitle className="text-lg">{title}</CardTitle>
                    {isImportant ? (
                        <Badge className="shrink-0 bg-amber-500 text-black hover:bg-amber-500/90">
                            Important
                        </Badge>
                    ) : null}
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="whitespace-pre-wrap text-sm leading-6 text-muted-foreground">
                    {content}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {new Date(createdAt).toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Megaphone className="size-3.5" />
                        {author}
                    </span>
                </div>
            </CardContent>

            {onDelete ? (
                <CardFooter className="justify-end">
                    <Button
                        variant="destructive"
                        size="sm"
                        disabled={deletingId === id}
                        onClick={() => onDelete(id)}
                    >
                        <Trash2 className="mr-1 size-4" />
                        {deletingId === id ? 'Deleting...' : 'Delete'}
                    </Button>
                </CardFooter>
            ) : null}
        </Card>
    )
}
