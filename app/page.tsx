"use client"

import { Suspense } from "react"
import { DashboardMetrics } from "@/components/dashboard-metrics"
import { InventoryOverview } from "@/components/inventory-overview"
import { RecentOrders } from "@/components/recent-orders"
import { SupplierPerformance } from "@/components/supplier-performance"
import { LogisticsStatus } from "@/components/logistics-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertTriangle, Package, Truck, Users, TrendingUp } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return null
}

function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">SplyBob Dashboard</h2>
      </div>

      {/* Critical Alerts */}
      <div className="space-y-2">
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Low Stock Alert</AlertTitle>
          <AlertDescription className="text-red-700">
            15 items are below minimum stock levels. Immediate restocking required.
          </AlertDescription>
        </Alert>

        <Alert className="border-amber-200 bg-amber-50">
          <Truck className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-800">Delayed Shipments</AlertTitle>
          <AlertDescription className="text-amber-700">
            3 critical shipments are delayed. Estimated delay: 2-3 days.
          </AlertDescription>
        </Alert>
      </div>

      <Suspense fallback={<DashboardMetricsSkeleton />}>
        <DashboardMetrics />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>Current stock levels and trends</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<Skeleton className="h-[300px]" />}>
              <InventoryOverview />
            </Suspense>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Supplier Performance</CardTitle>
            <CardDescription>Top suppliers by reliability</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[300px]" />}>
              <SupplierPerformance />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest purchase orders and status</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[250px]" />}>
              <RecentOrders />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Logistics Status</CardTitle>
            <CardDescription>Shipment tracking and delivery status</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[250px]" />}>
              <LogisticsStatus />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <Package className="h-6 w-6 mb-2 text-blue-600" />
              <div className="font-medium">Create Purchase Order</div>
              <div className="text-sm text-gray-500">Generate new PO</div>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <Users className="h-6 w-6 mb-2 text-green-600" />
              <div className="font-medium">Add Supplier</div>
              <div className="text-sm text-gray-500">Register new supplier</div>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <Truck className="h-6 w-6 mb-2 text-purple-600" />
              <div className="font-medium">Track Shipment</div>
              <div className="text-sm text-gray-500">Monitor deliveries</div>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors">
              <TrendingUp className="h-6 w-6 mb-2 text-orange-600" />
              <div className="font-medium">Generate Reports</div>
              <div className="text-sm text-gray-500">Analytics & insights</div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DashboardMetricsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[60px] mb-2" />
            <Skeleton className="h-3 w-[120px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
