import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { sortComplaintsWithOverdueFirst } from '@/lib/constants/complaints'
import { parseComplaintFilters } from '@/lib/helpers/complaint-filters'
import { createComplaint } from '@/lib/queries/complaints/insert'
import { getComplaintsByResident } from '@/lib/queries/complaints/select'

export async function GET(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const filters = parseComplaintFilters(request.nextUrl.searchParams)
        const complaints = sortComplaintsWithOverdueFirst(
            await getComplaintsByResident(session.user.id, filters)
        )

        return NextResponse.json(
            {
                success: true,
                complaints,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Fetch complaints error:', error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch complaints',
            },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const body = await request.json()

        const title = typeof body.title === 'string' ? body.title.trim() : ''
        const description =
            typeof body.description === 'string' ? body.description.trim() : ''
        const category =
            typeof body.category === 'string' ? body.category.trim() : ''
        const priority = body.priority

        if (!title || !description || !category) {
            return NextResponse.json(
                { message: 'Title, description, and category are required' },
                { status: 400 }
            )
        }

        if (!['LOW', 'MEDIUM', 'HIGH'].includes(priority)) {
            return NextResponse.json(
                { message: 'Invalid priority value' },
                { status: 400 }
            )
        }

        const imageUrl =
            typeof body.imageUrl === 'string' && body.imageUrl.trim()
                ? body.imageUrl.trim()
                : null

        const complaint = await createComplaint({
            title,
            description,
            category,
            priority,
            residentId: session.user.id,
            imageUrl: imageUrl ?? undefined,
        })

        return NextResponse.json(
            {
                success: true,
                complaint,
            },
            { status: 201 }
        )
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to create complaint',
            },
            { status: 500 }
        )
    }
}
