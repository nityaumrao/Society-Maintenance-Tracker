import { COMPLAINT_CATEGORIES, COMPLAINT_STATUSES } from '@/lib/constants/complaints'
import type { ComplaintFilters } from '@/lib/helpers/complaint-filters'
import { Button } from '@/components/ui/button'

type ComplaintFiltersBarProps = {
    filters: ComplaintFilters
    onChange: (filters: ComplaintFilters) => void
}

export default function ComplaintFiltersBar({
    filters,
    onChange,
}: ComplaintFiltersBarProps) {
    const handleChange = (key: keyof ComplaintFilters, value: string) => {
        onChange({
            ...filters,
            [key]: value || undefined,
        })
    }

    const handleClear = () => {
        onChange({})
    }

    const hasFilters = Boolean(filters.category || filters.status || filters.date)

    return (
        <div className="flex flex-wrap items-end gap-4 rounded-lg border p-4">
            <div className="space-y-1">
                <label
                    htmlFor="filter-category"
                    className="text-sm font-medium text-muted-foreground"
                >
                    Category
                </label>
                <select
                    id="filter-category"
                    value={filters.category ?? ''}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full min-w-[160px] rounded-md border bg-background px-3 py-2 text-sm"
                >
                    <option value="">All Categories</option>
                    {COMPLAINT_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0) +
                                category.slice(1).toLowerCase().replace('_', ' ')}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="filter-status"
                    className="text-sm font-medium text-muted-foreground"
                >
                    Status
                </label>
                <select
                    id="filter-status"
                    value={filters.status ?? ''}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full min-w-[160px] rounded-md border bg-background px-3 py-2 text-sm"
                >
                    <option value="">All Statuses</option>
                    {COMPLAINT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                            {status.replace('_', ' ')}
                        </option>
                    ))}
                </select>
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="filter-date"
                    className="text-sm font-medium text-muted-foreground"
                >
                    Date
                </label>
                <input
                    id="filter-date"
                    type="date"
                    value={filters.date ?? ''}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full min-w-[160px] rounded-md border bg-background px-3 py-2 text-sm"
                />
            </div>

            {hasFilters ? (
                <Button type="button" variant="outline" onClick={handleClear}>
                    Clear Filters
                </Button>
            ) : null}
        </div>
    )
}
