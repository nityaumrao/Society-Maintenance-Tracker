import Link from 'next/link'
import { Calendar, Flag, Tag } from 'lucide-react'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { isComplaintOverdue } from '@/lib/constants/complaints'

import StatusBadge from './StatusBadge'
import PriorityBadge from './PriorityBadge'
import OverdueBadge from './OverdueBadge'

type ComplaintCardProps = {
    id: string
    title: string
    category: string
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    createdAt: string
}

export default function ComplaintCard({
    id,
    title,
    category,
    status,
    priority,
    createdAt,
}: ComplaintCardProps) {
    const overdue = isComplaintOverdue({ status, createdAt })

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between gap-2">
                    <CardTitle>{title}</CardTitle>

                    <div className="flex flex-wrap items-center gap-2">
                        {overdue ? <OverdueBadge /> : null}
                        <StatusBadge status={status} />
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag size={16} />
                    {category}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Flag size={16} />
                    <PriorityBadge priority={priority} />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={16} />
                    {new Date(createdAt).toLocaleDateString()}
                </div>
            </CardContent>

            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/resident/complaints/${id}`}>
                        View Details
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
