import { Badge } from '@/components/ui/badge'

type StatusBadgeProps = {
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
}

export default function StatusBadge({ status }: StatusBadgeProps) {
    const variants = {
        OPEN: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
        IN_PROGRESS:
            'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
        RESOLVED: 'bg-green-500/10 text-green-400 border border-green-500/30',
        CLOSED: 'bg-gray-500/10 text-gray-400 border border-gray-500/30',
    }

    return (
        <Badge
            variant="outline"
            className={`border-transparent ${variants[status]}`}
        >
            {status.replace('_', ' ')}
        </Badge>
    )
}
