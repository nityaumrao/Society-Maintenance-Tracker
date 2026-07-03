import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import {
    COMPLAINT_CATEGORIES,
    isComplaintOverdue,
} from '@/lib/constants/complaints'
import { getAllComplaints } from '@/lib/queries/complaints/select'

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const isAdmin =
            session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN'

        if (!isAdmin) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
        }

        const complaints = await getAllComplaints()

        let total = 0
        let open = 0
        let inProgress = 0
        let resolved = 0
        let closed = 0
        let overdue = 0

        const byCategory = Object.fromEntries(
            COMPLAINT_CATEGORIES.map((category) => [category, 0])
        ) as Record<(typeof COMPLAINT_CATEGORIES)[number], number>

        complaints.forEach((complaint) => {
            total++

            if (complaint.status === 'OPEN') {
                open++
            } else if (complaint.status === 'IN_PROGRESS') {
                inProgress++
            } else if (complaint.status === 'RESOLVED') {
                resolved++
            } else if (complaint.status === 'CLOSED') {
                closed++
            }

            if (isComplaintOverdue(complaint)) {
                overdue++
            }

            if (complaint.category in byCategory) {
                byCategory[complaint.category as keyof typeof byCategory]++
            } else {
                byCategory.OTHER++
            }
        })

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
                    byCategory,
                },
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Fetch dashboard stats error:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch dashboard statistics',
            },
            { status: 500 }
        )
    }
}
