import { db } from '@/lib/dbconfig/db'
import { complaintsTable, complaintHistoryTable } from '@/lib/dbconfig/schema'

type CreateComplaintInput = {
    title: string
    description: string
    category: string
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
    residentId: string
    imageUrl?: string
}

export async function createComplaint(data: CreateComplaintInput) {
    const [complaint] = await db
        .insert(complaintsTable)
        .values({
            title: data.title,
            description: data.description,
            category: data.category,
            priority: data.priority,
            residentId: data.residentId,
            imageUrl: data.imageUrl,
            status: 'OPEN',
        })
        .returning()

    await db.insert(complaintHistoryTable).values({
        complaintId: complaint.id,
        oldStatus: null,
        newStatus: 'OPEN',
        updatedBy: data.residentId,
        remarks: 'Complaint created',
    })

    return complaint
}
