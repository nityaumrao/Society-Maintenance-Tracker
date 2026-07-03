import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getComplaintById, getComplaintHistory } from '@/lib/queries/complaints/select';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { id } = await params;
        const complaint = await getComplaintById(id);

        if (!complaint) {
            return NextResponse.json(
                { message: 'Complaint not found' },
                { status: 404 }
            );
        }

        // Check if the current user is authorized to view this complaint
        // It must belong to the resident or the user must be an ADMIN/SUPER_ADMIN
        const isAdmin =
            session.user.role === 'ADMIN' ||
            session.user.role === 'SUPER_ADMIN';

        if (complaint.residentId !== session.user.id && !isAdmin) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 403 }
            );
        }

        const history = await getComplaintHistory(id);

        return NextResponse.json(
            {
                success: true,
                complaint,
                history,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Fetch complaint details error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch complaint details',
            },
            { status: 500 }
        );
    }
}
