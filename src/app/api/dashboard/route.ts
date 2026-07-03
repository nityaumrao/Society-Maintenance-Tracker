import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getAllComplaints } from '@/lib/queries/complaints/select';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Check if user is admin or super admin
        const isAdmin =
            session.user.role === 'ADMIN' ||
            session.user.role === 'SUPER_ADMIN';

        if (!isAdmin) {
            return NextResponse.json(
                { message: 'Forbidden' },
                { status: 403 }
            );
        }

        const complaints = await getAllComplaints();

        let total = 0;
        let open = 0;
        let inProgress = 0;
        let resolved = 0;
        let closed = 0;
        // TODO: Integrate overdue logic when due-date or deadline column is added to complaints schema
        const overdue = 0;

        complaints.forEach((complaint) => {
            total++;
            if (complaint.status === 'OPEN') {
                open++;
            } else if (complaint.status === 'IN_PROGRESS') {
                inProgress++;
            } else if (complaint.status === 'RESOLVED') {
                resolved++;
            } else if (complaint.status === 'CLOSED') {
                closed++;
            }
        });

        return NextResponse.json(
            {
                success: true,
                stats: {
                    total,
                    open,
                    inProgress,
                    resolved,
                    closed,
                    overdue,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Fetch dashboard stats error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch dashboard statistics',
            },
            { status: 500 }
        );
    }
}
