export const COMPLAINT_CATEGORIES = [
    'PLUMBING',
    'ELECTRICAL',
    'CLEANING',
    'SECURITY',
    'WATER',
    'OTHER',
] as const

export const COMPLAINT_STATUSES = [
    'OPEN',
    'IN_PROGRESS',
    'RESOLVED',
    'CLOSED',
] as const

export type ComplaintStatus = (typeof COMPLAINT_STATUSES)[number]
export type ComplaintCategory = (typeof COMPLAINT_CATEGORIES)[number]

const DEFAULT_OVERDUE_DAYS = 7

export function getComplaintOverdueDays(): number {
    const parsed = Number(process.env.COMPLAINT_OVERDUE_DAYS)
    return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_OVERDUE_DAYS
}

type OverdueComplaint = {
    status: string
    createdAt: Date | string | null
}

export function isComplaintOverdue(complaint: OverdueComplaint): boolean {
    if (complaint.status !== 'OPEN' && complaint.status !== 'IN_PROGRESS') {
        return false
    }

    if (!complaint.createdAt) {
        return false
    }

    const createdAt = new Date(complaint.createdAt)
    const thresholdMs = getComplaintOverdueDays() * 24 * 60 * 60 * 1000

    return Date.now() - createdAt.getTime() > thresholdMs
}

export function sortComplaintsWithOverdueFirst<
    T extends OverdueComplaint,
>(complaints: T[]): T[] {
    return [...complaints].sort((a, b) => {
        const aOverdue = isComplaintOverdue(a)
        const bOverdue = isComplaintOverdue(b)

        if (aOverdue !== bOverdue) {
            return aOverdue ? -1 : 1
        }

        return (
            new Date(b.createdAt ?? 0).getTime() -
            new Date(a.createdAt ?? 0).getTime()
        )
    })
}
