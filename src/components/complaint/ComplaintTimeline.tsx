import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type HistoryItem = {
    id: string;
    oldStatus: string | null;
    newStatus: string;
    remarks: string | null;
    createdAt: string;
};

type Props = {
    history: HistoryItem[];
};

export default function ComplaintTimeline({ history }: Props) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold">Complaint Timeline</h2>

            {history.map((item) => (
                <Card key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                        <Badge>{item.newStatus}</Badge>

                        <span className="text-sm text-muted-foreground">
                            {new Date(item.createdAt).toLocaleString()}
                        </span>
                    </div>

                    <p className="mt-3 text-sm text-muted-foreground">
                        {item.remarks || 'No remarks'}
                    </p>
                </Card>
            ))}
        </div>
    );
}