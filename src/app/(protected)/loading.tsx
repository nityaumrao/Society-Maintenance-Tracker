export default function ProtectedLoading() {
    return (
        <div className="w-full space-y-6 py-4">
            <div className="loading-shimmer h-9 w-72 rounded-lg" />
            <div className="grid gap-4 md:grid-cols-2">
                <div className="loading-shimmer h-36 rounded-xl" />
                <div className="loading-shimmer h-36 rounded-xl" />
            </div>
            <div className="loading-shimmer h-72 rounded-xl" />
        </div>
    )
}
