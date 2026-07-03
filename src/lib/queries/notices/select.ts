import { desc, eq } from 'drizzle-orm'

import { db } from '@/lib/dbconfig/db'
import { noticesTable, usersTable } from '@/lib/dbconfig/schema'

export async function getAllNoticesWithAuthor() {
    return await db
        .select({
            id: noticesTable.id,
            title: noticesTable.title,
            content: noticesTable.content,
            isImportant: noticesTable.isImportant,
            createdAt: noticesTable.createdAt,
            createdBy: noticesTable.createdBy,
            authorName: usersTable.name,
            authorEmail: usersTable.email,
        })
        .from(noticesTable)
        .leftJoin(usersTable, eq(noticesTable.createdBy, usersTable.id))
        .orderBy(
            desc(noticesTable.isImportant),
            desc(noticesTable.createdAt)
        )
}

export async function getNoticeById(id: string) {
    const notice = await db
        .select()
        .from(noticesTable)
        .where(eq(noticesTable.id, id))

    return notice[0]
}
