export function DocumentCardSkeleton() {
    return (
        <div className="animate-pulse border rounded-lg p-4 space-y-4 shadow-sm w-full max-w-sm">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
            <div className="space-y-2">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            </div>
            <div className="flex gap-2 mt-4">
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-full" />
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-full" />
            </div>
        </div>
    );
}
