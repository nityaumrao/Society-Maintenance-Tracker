import { eq } from 'drizzle-orm'

import { db } from '@/lib/dbconfig/db'
import { complaintsTable } from '@/lib/dbconfig/schema'

type UpdateComplaintData = {
    id: string
    status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
    priority: 'LOW' | 'MEDIUM' | 'HIGH'
}

export async function updateComplaint({
    id,
    status,
    priority,
}: UpdateComplaintData) {
    return await db
        .update(complaintsTable)
        .set({
            status,
            priority,
            updatedAt: new Date(),
        })
        .where(eq(complaintsTable.id, id))
        .returning()
}
