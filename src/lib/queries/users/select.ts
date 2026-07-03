import { eq } from 'drizzle-orm'
import { db } from '@/lib/dbconfig/db'
import { SelectUser, UserRole, usersTable } from '@/lib/dbconfig/schema'

export async function findUserByEmail(
    email: SelectUser['email']
): Promise<SelectUser | null> {
    if (email == null) {
        return null
    }

    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1)

    return user ?? null
}

export async function findUserById(
    id: SelectUser['id']
): Promise<SelectUser | null> {
    if (id == null) {
        return null
    }

    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .limit(1)

    return user ?? null
}

export async function getAllResidentEmails(): Promise<
    { email: string; name: string | null }[]
> {
    return await db
        .select({
            email: usersTable.email,
            name: usersTable.name,
        })
        .from(usersTable)
        .where(eq(usersTable.role, UserRole.USER))
}
