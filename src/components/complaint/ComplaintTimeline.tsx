import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

type HistoryItem = {
    id: string
    oldStatus: string | null
    newStatus: string
    remarks: string | null
    createdAt: string
}

type Props = {
    history: HistoryItem[]
}

export default function ComplaintTimeline({ history }: Props) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Complaint Timeline</h2>

            {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                    No history recorded yet.
                </p>
            ) : (
                history.map((item) => {
                    const isCreation = item.oldStatus === null
                    const isStatusChange =
                        item.oldStatus !== null &&
                        item.oldStatus !== item.newStatus

                    return (
                        <Card key={item.id} className="p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    {isCreation ? (
                                        <>
                                            <Badge>Created</Badge>
                                            <Badge>{item.newStatus}</Badge>
                                        </>
                                    ) : isStatusChange ? (
                                        <>
                                            <Badge>{item.oldStatus}</Badge>
                                            <span className="text-muted-foreground">
                                                →
                                            </span>
                                            <Badge>{item.newStatus}</Badge>
                                        </>
                                    ) : (
                                        <Badge>{item.newStatus}</Badge>
                                    )}
                                </div>

                                <span className="text-sm text-muted-foreground">
                                    {new Date(item.createdAt).toLocaleString()}
                                </span>
                            </div>

                            {item.remarks ? (
                                <p className="mt-3 text-sm text-muted-foreground">
                                    {item.remarks}
                                </p>
                            ) : null}
                        </Card>
                    )
                })
            )}
        </div>
    )
}
