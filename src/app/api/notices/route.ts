import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createNotice } from '@/lib/queries/notices/insert'
import { getAllNoticesWithAuthor } from '@/lib/queries/notices/select'
import { getAllResidentEmails } from '@/lib/queries/users/select'
import { sendImportantNoticeEmail } from '@/services/authServices/mail'

export async function GET() {
    try {
        const session = await auth()

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        const notices = await getAllNoticesWithAuthor()

        return NextResponse.json({
            success: true,
            notices,
        })
    } catch (error) {
        console.error('Fetch notices error:', error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to fetch notices',
            },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
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

        const body = await request.json()

        const title = typeof body.title === 'string' ? body.title.trim() : ''
        const content =
            typeof body.content === 'string' ? body.content.trim() : ''
        const isImportant = Boolean(body.isImportant)

        if (!title || !content) {
            return NextResponse.json(
                { message: 'Title and content are required' },
                { status: 400 }
            )
        }

        const notice = await createNotice({
            title,
            content,
            isImportant,
            createdBy: session.user.id,
        })

        if (isImportant) {
            const residents = await getAllResidentEmails()

            await Promise.all(
                residents.map((resident) =>
                    sendImportantNoticeEmail(
                        resident.email,
                        title,
                        content,
                        resident.name ?? undefined
                    )
                )
            )
        }

        return NextResponse.json(
            {
                success: true,
                notice,
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Create notice error:', error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to create notice',
            },
            { status: 500 }
        )
    }
}
