"use client"

import { Suspense } from "react"
import { CustomerList } from "@/components/customer-list"
import { CustomerFilters } from "@/components/customer-filters"
import { CustomerForm } from "@/components/forms/customer-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-hot-toast"
import type { Customer } from "@/lib/models/types"

export default function CustomersPage() {
  const handleCreateCustomer = async (customerData: Omit<Customer, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      })

      if (!response.ok) {
        throw new Error("Failed to create customer")
      }

      const newCustomer = await response.json()
      toast.success("Customer created successfully!")
      // Trigger a page refresh to show the new customer
      window.location.reload()
    } catch (error) {
      console.error("Error creating customer:", error)
      toast.error("Failed to create customer")
      throw error
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <CustomerForm onSubmit={handleCreateCustomer} />
      </div>

      <CustomerFilters />

      <Suspense fallback={<CustomerListSkeleton />}>
        <CustomerList />
      </Suspense>
    </div>
  )
}

function CustomerListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
          <Skeleton className="h-8 w-[80px]" />
        </div>
      ))}
    </div>
  )
}
