import { and, desc, eq, gte, lte, SQL } from 'drizzle-orm'

import { db } from '@/lib/dbconfig/db'
import {
    complaintsTable,
    complaintHistoryTable,
    usersTable,
} from '@/lib/dbconfig/schema'
import { getDateRangeFromFilter } from '@/lib/helpers/complaint-filters'
import type { ComplaintFilters } from '@/lib/helpers/complaint-filters'

function buildFilterConditions(filters?: ComplaintFilters): SQL | undefined {
    if (!filters) {
        return undefined
    }

    const conditions: SQL[] = []
    const { dateFrom, dateTo } = getDateRangeFromFilter(filters.date)

    if (filters.category) {
        conditions.push(eq(complaintsTable.category, filters.category))
    }

    if (filters.status) {
        conditions.push(eq(complaintsTable.status, filters.status))
    }

    if (dateFrom) {
        conditions.push(gte(complaintsTable.createdAt, dateFrom))
    }

    if (dateTo) {
        conditions.push(lte(complaintsTable.createdAt, dateTo))
    }

    return conditions.length > 0 ? and(...conditions) : undefined
}

export async function getComplaintsByResident(
    residentId: string,
    filters?: ComplaintFilters
) {
    const conditions = [eq(complaintsTable.residentId, residentId)]
    const filterConditions = buildFilterConditions(filters)

    if (filterConditions) {
        conditions.push(filterConditions)
    }

    return await db
        .select()
        .from(complaintsTable)
        .where(and(...conditions))
        .orderBy(desc(complaintsTable.createdAt))
}

export async function getComplaintById(id: string) {
    const complaint = await db
        .select()
        .from(complaintsTable)
        .where(eq(complaintsTable.id, id))

    return complaint[0]
}

export async function getComplaintHistory(id: string) {
    return await db
        .select()
        .from(complaintHistoryTable)
        .where(eq(complaintHistoryTable.complaintId, id))
        .orderBy(desc(complaintHistoryTable.createdAt))
}

export async function getAllComplaints(filters?: ComplaintFilters) {
    const filterConditions = buildFilterConditions(filters)

    const query = db.select().from(complaintsTable)

    if (filterConditions) {
        return await query
            .where(filterConditions)
            .orderBy(desc(complaintsTable.createdAt))
    }

    return await query.orderBy(desc(complaintsTable.createdAt))
}

export async function getAllComplaintsWithResident(filters?: ComplaintFilters) {
    const filterConditions = buildFilterConditions(filters)

    const query = db
        .select({
            id: complaintsTable.id,
            title: complaintsTable.title,
            description: complaintsTable.description,
            category: complaintsTable.category,
            priority: complaintsTable.priority,
            status: complaintsTable.status,
            createdAt: complaintsTable.createdAt,
            updatedAt: complaintsTable.updatedAt,
            residentId: complaintsTable.residentId,
            imageUrl: complaintsTable.imageUrl,
            residentName: usersTable.name,
            residentEmail: usersTable.email,
        })
        .from(complaintsTable)
        .leftJoin(usersTable, eq(complaintsTable.residentId, usersTable.id))

    if (filterConditions) {
        return await query
            .where(filterConditions)
            .orderBy(desc(complaintsTable.createdAt))
    }

    return await query.orderBy(desc(complaintsTable.createdAt))
}
