import {
    COMPLAINT_CATEGORIES,
    COMPLAINT_STATUSES,
    type ComplaintCategory,
    type ComplaintStatus,
} from '@/lib/constants/complaints'

export type ComplaintFilters = {
    category?: ComplaintCategory
    status?: ComplaintStatus
    date?: string
}

export function parseComplaintFilters(
    searchParams: URLSearchParams
): ComplaintFilters {
    const filters: ComplaintFilters = {}

    const category = searchParams.get('category')
    if (
        category &&
        COMPLAINT_CATEGORIES.includes(category as ComplaintCategory)
    ) {
        filters.category = category as ComplaintCategory
    }

    const status = searchParams.get('status')
    if (status && COMPLAINT_STATUSES.includes(status as ComplaintStatus)) {
        filters.status = status as ComplaintStatus
    }

    const date = searchParams.get('date')
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        filters.date = date
    }

    return filters
}

export function getDateRangeFromFilter(date?: string): {
    dateFrom?: Date
    dateTo?: Date
} {
    if (!date) {
        return {}
    }

    const dateFrom = new Date(`${date}T00:00:00`)
    const dateTo = new Date(`${date}T23:59:59.999`)

    return { dateFrom, dateTo }
}

export function buildComplaintFilterQuery(
    filters: ComplaintFilters
): URLSearchParams {
    const params = new URLSearchParams()

    if (filters.category) {
        params.set('category', filters.category)
    }

    if (filters.status) {
        params.set('status', filters.status)
    }

    if (filters.date) {
        params.set('date', filters.date)
    }

    return params
}
