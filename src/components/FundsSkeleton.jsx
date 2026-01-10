import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function FundsSkeleton() {
    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 sm:p-6">
                            <Skeleton className="h-4 w-32 mb-1" />
                            <Skeleton className="h-8 w-24 mb-4" />
                            <Skeleton className="h-12 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Card (Filters and Table) */}
            <Card>
                <CardContent className="p-4 sm:p-6">
                    {/* Filters Skeleton */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                        <div className="flex gap-2 sm:gap-3">
                            <Skeleton className="h-10 w-24 rounded-lg" />
                            <Skeleton className="h-10 w-24 rounded-lg" />
                            <Skeleton className="h-10 w-32 rounded-lg" />
                        </div>
                        <Skeleton className="h-10 flex-1 rounded-lg" />
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

            {/* Bottom Chart Card */}
            <Card className="w-full max-w-[480px] mx-auto">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col items-center">
                        <Skeleton className="h-48 w-48 sm:h-64 sm:w-64 rounded-full mb-4" />
                        <div className="flex gap-4 sm:gap-6 w-full justify-center">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Skeleton className="h-3 w-3 rounded-full" />
                                    <div className="space-y-1">
                                        <Skeleton className="h-3 w-16" />
                                        <Skeleton className="h-4 w-8" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
