import { db } from '@/lib/dbconfig/db'
import { complaintHistoryTable } from '@/lib/dbconfig/schema'

type CreateHistoryData = {
    complaintId: string
    oldStatus: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | null
    newStatus: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
    updatedBy: string
    remarks?: string
}

export async function createComplaintHistory({
    complaintId,
    oldStatus,
    newStatus,
    updatedBy,
    remarks,
}: CreateHistoryData) {
    return await db.insert(complaintHistoryTable).values({
        complaintId,
        oldStatus,
        newStatus,
        updatedBy,
        remarks,
    })
}
