import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createComplaint } from '@/lib/queries/complaints/insert';
import { getComplaintsByResident } from '@/lib/queries/complaints/select';



export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const complaints = await getComplaintsByResident(session.user.id);

        return NextResponse.json(
            {
                success: true,
                complaints,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Fetch complaints error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch complaints',
            },
            { status: 500 }
        );
    }
}


export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();

        const complaint = await createComplaint({
            title: body.title,
            description: body.description,
            category: body.category,
            priority: body.priority,
            residentId: session.user.id,
            imageUrl: body.imageUrl,
        });

        return NextResponse.json(
            {
                success: true,
                complaint,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to create complaint',
            },
            { status: 500 }
        );
    }
}