import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'
import StatusBadge from '@/components/complaint/StatusBadge'
import PriorityBadge from '@/components/complaint/PriorityBadge'
import OverdueBadge from '@/components/complaint/OverdueBadge'
import Link from 'next/link'
import { isComplaintOverdue } from '@/lib/constants/complaints'

type AdminComplaintCardProps = {
    id: string
    title: string
    category: string
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    createdAt: string
    residentName?: string | null
    residentEmail: string
}

export default function AdminComplaintCard({
    id,
    title,
    category,
    status,
    priority,
    createdAt,
    residentName,
    residentEmail,
}: AdminComplaintCardProps) {
    const overdue = isComplaintOverdue({ status, createdAt })

    return (
        <Card className="border transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
            <CardHeader className="flex flex-col space-y-1">
                <CardTitle
                    className="text-lg font-semibold line-clamp-1"
                    title={title}
                >
                    {title}
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                    <span>{residentName ?? residentEmail}</span>
                    <span className="mx-2">·</span>
                    <span>{category}</span>
                </div>
            </CardHeader>
            <CardContent className="flex items-center space-x-2 text-sm">
                {overdue ? <OverdueBadge /> : null}
                <StatusBadge status={status} />
                <PriorityBadge priority={priority} />
                <span className="ml-auto text-muted-foreground">
                    {new Date(createdAt).toLocaleDateString()}
                </span>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/complaints/${id}`}>
                        <Eye className="mr-1 h-4 w-4" /> View
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
