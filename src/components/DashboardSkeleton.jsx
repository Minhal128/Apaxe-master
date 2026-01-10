import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardSkeleton() {
    return (
        <div className="space-y-4 md:space-y-6 p-4 md:p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 md:p-6">
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-8 w-20 mb-4" />
                            <Skeleton className="h-12 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                {[...Array(2)].map((_, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 md:p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                                <Skeleton className="h-8 w-8 rounded-full" />
                            </div>
                            <Skeleton className="h-48 md:h-64 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent trades */}
            <Card>
                <CardContent className="p-4 md:p-6">
                    <Skeleton className="h-6 w-32 mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
