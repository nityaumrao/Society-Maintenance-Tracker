import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getAllComplaintsWithResident } from '@/lib/queries/complaints/select';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        if (
            session.user.role !== 'ADMIN' &&
            session.user.role !== 'SUPER_ADMIN'
        ) {
            return NextResponse.json(
                { message: 'Forbidden' },
                { status: 403 }
            );
        }

        const complaints = await getAllComplaintsWithResident();

        return NextResponse.json({
            success: true,
            complaints,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch complaints',
            },
            { status: 500 }
        );
    }
}