import { Suspense } from "react"
import { SupplyChainAnalytics } from "@/components/supply-chain-analytics"
import { CostAnalysis } from "@/components/cost-analysis"
import { DemandForecasting } from "@/components/demand-forecasting"
import { PerformanceMetrics } from "@/components/performance-metrics"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Supply Chain Analytics</h2>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
      </div>

      <Suspense fallback={<PerformanceMetricsSkeleton />}>
        <PerformanceMetrics />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[300px]" />}>
              <CostAnalysis />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Demand Forecasting</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[300px]" />}>
              <DemandForecasting />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <Suspense fallback={<SupplyChainAnalyticsSkeleton />}>
        <SupplyChainAnalytics />
      </Suspense>
    </div>
  )
}

function PerformanceMetricsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="pb-2">
            <Skeleton className="h-4 w-[120px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[80px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SupplyChainAnalyticsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-5 w-[150px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
