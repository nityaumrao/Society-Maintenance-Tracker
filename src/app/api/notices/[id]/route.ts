import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { deleteNoticeById } from '@/lib/queries/notices/delete'
import { getNoticeById } from '@/lib/queries/notices/select'

export async function DELETE(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id } = await params
        const existing = await getNoticeById(id)

        if (!existing) {
            return NextResponse.json(
                { message: 'Notice not found' },
                { status: 404 }
            )
        }

        await deleteNoticeById(id)

        return NextResponse.json({
            success: true,
            message: 'Notice deleted successfully',
        })
    } catch (error) {
        console.error('Delete notice error:', error)

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to delete notice',
            },
            { status: 500 }
        )
    }
}
