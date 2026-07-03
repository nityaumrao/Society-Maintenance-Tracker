import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import {
    getComplaintById,
    getComplaintHistory,
} from '@/lib/queries/complaints/select'
import { updateComplaint } from '@/lib/queries/complaints/update'
import { createComplaintHistory } from '@/lib/queries/complaints/history'
import { findUserById } from '@/lib/queries/users/select'
import { sendComplaintStatusUpdatedEmail } from '@/services/authServices/mail'

const complaintStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const
const complaintPriorities = ['LOW', 'MEDIUM', 'HIGH'] as const

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { id } = await params
        const complaint = await getComplaintById(id)

        if (!complaint) {
            return NextResponse.json(
                { message: 'Complaint not found' },
                { status: 404 }
            )
        }

        // Check if the current user is authorized to view this complaint
        // It must belong to the resident or the user must be an ADMIN/SUPER_ADMIN
        const isAdmin =
            session.user.role === 'ADMIN' || session.user.role === 'SUPER_ADMIN'

        if (complaint.residentId !== session.user.id && !isAdmin) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 403 }
            )
        }

        const history = await getComplaintHistory(id)

        return NextResponse.json(
            {
                success: true,
                complaint,
                history,
            },
            { status: 200 }
        )
    } catch (error) {
        console.error('Fetch complaint details error:', error)
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch complaint details',
            },
            { status: 500 }
        )
    }
}
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params

        const body = await request.json()
        const nextStatus = body.status
        const nextPriority = body.priority

        if (
            !complaintStatuses.includes(nextStatus) ||
            !complaintPriorities.includes(nextPriority)
        ) {
            return NextResponse.json(
                { message: 'Invalid complaint update payload' },
                { status: 400 }
            )
        }

        const complaint = await getComplaintById(id)

        if (!complaint) {
            return NextResponse.json(
                { message: 'Complaint not found' },
                { status: 404 }
            )
        }

        await updateComplaint({
            id,
            status: nextStatus,
            priority: nextPriority,
        })

        const trimmedRemarks =
            typeof body.remarks === 'string' ? body.remarks.trim() : ''
        const hasPriorityChanged = complaint.priority !== nextPriority
        const hasStatusChanged = complaint.status !== nextStatus

        const auditNotes: string[] = []

        if (hasPriorityChanged) {
            auditNotes.push(
                `Priority changed from ${complaint.priority} to ${nextPriority}`
            )
        }

        if (trimmedRemarks) {
            auditNotes.push(trimmedRemarks)
        }

        if (hasStatusChanged || hasPriorityChanged || trimmedRemarks) {
            await createComplaintHistory({
                complaintId: id,
                oldStatus: complaint.status,
                newStatus: nextStatus,
                updatedBy: session.user.id,
                remarks: auditNotes.join(' • ') || undefined,
            })
        }

        if (hasStatusChanged) {
            const resident = await findUserById(complaint.residentId)

            if (resident?.email) {
                await sendComplaintStatusUpdatedEmail(
                    resident.email,
                    complaint.title,
                    complaint.status,
                    nextStatus,
                    id,
                    resident.name ?? undefined
                )
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Complaint updated successfully',
        })
    } catch (error) {
        console.error(error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update complaint',
            },
            { status: 500 }
        )
    }
}
