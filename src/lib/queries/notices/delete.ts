import { eq } from 'drizzle-orm'

import { db } from '@/lib/dbconfig/db'
import { noticesTable } from '@/lib/dbconfig/schema'

export async function deleteNoticeById(id: string) {
    const [notice] = await db
        .delete(noticesTable)
        .where(eq(noticesTable.id, id))
        .returning()

    return notice
}
