import { db } from '@/lib/dbconfig/db'
import { noticesTable } from '@/lib/dbconfig/schema'

type CreateNoticeInput = {
    title: string
    content: string
    isImportant: boolean
    createdBy: string
}

export async function createNotice(data: CreateNoticeInput) {
    const [notice] = await db
        .insert(noticesTable)
        .values({
            title: data.title,
            content: data.content,
            isImportant: data.isImportant,
            createdBy: data.createdBy,
        })
        .returning()

    return notice
}
