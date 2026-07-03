import { Badge } from '@/components/ui/badge';

type PriorityBadgeProps = {
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
};

export default function PriorityBadge({
    priority,
}: PriorityBadgeProps) {
    const variants = {
        LOW: 'bg-green-100 text-green-700',
        MEDIUM: 'bg-orange-100 text-orange-700',
        HIGH: 'bg-red-100 text-red-700',
    };

    return (
        <Badge variant="outline" className={`border-transparent ${variants[priority]}`}>
            {priority}
        </Badge>
    );
}