import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ReportsSkeleton() {
    return (
        <div className="space-y-4 lg:space-y-6 p-4 lg:p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="w-full">
                        <CardContent className="p-4 lg:p-6">
                            <Skeleton className="h-4 w-32 mb-1" />
                            <Skeleton className="h-8 w-24 mb-3 lg:mb-4" />
                            <Skeleton className="h-10 lg:h-12 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* P&L Overview Chart Skeleton */}
            <Card>
                <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 lg:mb-6">
                        <Skeleton className="h-6 w-32" />
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-32" />
                        </div>
                    </div>
                    <Skeleton className="h-48 lg:h-64 w-full" />
                </CardContent>
            </Card>

            {/* Tabs Skeleton */}
            <div className="flex gap-4 lg:gap-8 border-b mb-6 overflow-x-auto pb-2">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-32 flex-shrink-0" />
                ))}
            </div>

            {/* Report Content Skeleton */}
            <Card>
                <CardContent className="p-4 lg:p-6">
                    {/* Filters Skeleton */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4 lg:mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
                            <Skeleton className="h-10 w-full lg:w-64" />
                            <div className="flex gap-3">
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-full lg:w-32" />
                    </div>

                    {/* Table Skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" /> {/* Header */}
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
