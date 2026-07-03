import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { sortComplaintsWithOverdueFirst } from '@/lib/constants/complaints'
import { parseComplaintFilters } from '@/lib/helpers/complaint-filters'
import { getAllComplaintsWithResident } from '@/lib/queries/complaints/select'

export async function GET(request: NextRequest) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        if (
            session.user.role !== 'ADMIN' &&
            session.user.role !== 'SUPER_ADMIN'
        ) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
        }

        const filters = parseComplaintFilters(request.nextUrl.searchParams)
        const complaints = sortComplaintsWithOverdueFirst(
            await getAllComplaintsWithResident(filters)
        )

        return NextResponse.json({
            success: true,
            complaints,
        })
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch complaints',
            },
            { status: 500 }
        )
    }
}
