import { eq, desc } from 'drizzle-orm';

import { db } from '@/lib/dbconfig/db';
import {
    complaintsTable,
    complaintHistoryTable,
} from '@/lib/dbconfig/schema';

export async function getComplaintsByResident(residentId: string) {
    return await db
        .select()
        .from(complaintsTable)
        .where(eq(complaintsTable.residentId, residentId))
        .orderBy(desc(complaintsTable.createdAt));
}

export async function getComplaintById(id: string) {
    const complaint = await db
        .select()
        .from(complaintsTable)
        .where(eq(complaintsTable.id, id));

    return complaint[0];
}

export async function getComplaintHistory(id: string) {
    return await db
        .select()
        .from(complaintHistoryTable)
        .where(eq(complaintHistoryTable.complaintId, id))
        .orderBy(desc(complaintHistoryTable.createdAt));
}

export async function getAllComplaints() {
    return await db
        .select()
        .from(complaintsTable)
        .orderBy(desc(complaintsTable.createdAt));
}