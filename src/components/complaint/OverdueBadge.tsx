import { Badge } from '@/components/ui/badge'

export default function OverdueBadge() {
    return (
        <Badge
            variant="outline"
            className="border-red-500/30 bg-red-500/10 text-red-400"
        >
            Overdue
        </Badge>
    )
}
