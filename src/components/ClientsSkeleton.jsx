import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ClientsSkeleton() {
    return (
        <div className="space-y-4 lg:space-y-6 p-4 lg:p-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="w-full">
                        <CardContent className="p-4 lg:p-6">
                            <Skeleton className="h-4 w-24 mb-1" />
                            <Skeleton className="h-8 w-16 mb-4" />
                            <Skeleton className="h-12 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filters and Table */}
            <Card className="w-full">
                <CardContent className="p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-3 w-full">
                            <Skeleton className="h-10 w-full lg:w-64" />
                            <div className="hidden lg:flex gap-3">
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-10 w-24" />
                                <Skeleton className="h-10 w-32" />
                            </div>
                        </div>
                        <Skeleton className="h-10 w-full lg:w-32" />
                    </div>
                    <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
