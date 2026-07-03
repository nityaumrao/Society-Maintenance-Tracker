import { Badge } from '@/components/ui/badge'

type PriorityBadgeProps = {
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
    const variants = {
        LOW: 'bg-green-500/10 text-green-400 border border-green-500/30',
        MEDIUM: 'bg-orange-500/10 text-orange-400 border border-orange-500/30',
        HIGH: 'bg-red-500/10 text-red-400 border border-red-500/30',
    }

    return (
        <Badge
            variant="outline"
            className={`border-transparent ${variants[priority]}`}
        >
            {priority}
        </Badge>
    )
}
