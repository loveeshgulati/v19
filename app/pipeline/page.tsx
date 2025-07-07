import { Suspense } from "react"
import { SalesPipeline } from "@/components/sales-pipeline"
import { PipelineStats } from "@/components/pipeline-stats"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function PipelinePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Sales Pipeline</h2>
          <p className="text-muted-foreground">Track and manage your sales opportunities</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <Suspense fallback={<PipelineStatsSkeleton />}>
        <PipelineStats />
      </Suspense>

      <Suspense fallback={<SalesPipelineSkeleton />}>
        <SalesPipeline />
      </Suspense>
    </div>
  )
}

function PipelineStatsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <Skeleton className="h-4 w-[100px] mb-2" />
          <Skeleton className="h-8 w-[60px]" />
        </div>
      ))}
    </div>
  )
}

function SalesPipelineSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-6 w-[120px]" />
          {Array.from({ length: 3 }).map((_, j) => (
            <Skeleton key={j} className="h-[120px] w-full" />
          ))}
        </div>
      ))}
    </div>
  )
}
