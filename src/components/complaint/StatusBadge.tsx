import { Badge } from '@/components/ui/badge';

type StatusBadgeProps = {
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
};

export default function StatusBadge({
    status,
}: StatusBadgeProps) {
    const variants = {
        OPEN: 'bg-blue-100 text-blue-700',
        IN_PROGRESS: 'bg-yellow-100 text-yellow-700',
        RESOLVED: 'bg-green-100 text-green-700',
        CLOSED: 'bg-gray-100 text-gray-700',
    };

    return (
        <Badge variant="outline" className={`border-transparent ${variants[status]}`}>
            {status.replace('_', ' ')}
        </Badge>
    );
}
