"use client"

import { Suspense } from "react"
import { CampaignList } from "@/components/campaign-list"
import { CampaignStats } from "@/components/campaign-stats"
import { CampaignForm } from "@/components/forms/campaign-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "react-hot-toast"
import type { Campaign } from "@/lib/models/types"

export default function CampaignsPage() {
  const handleCreateCampaign = async (campaignData: Omit<Campaign, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      })

      if (!response.ok) {
        throw new Error("Failed to create campaign")
      }

      const newCampaign = await response.json()
      toast.success("Campaign created successfully!")
      // Trigger a page refresh to show the new campaign
      window.location.reload()
    } catch (error) {
      console.error("Error creating campaign:", error)
      toast.error("Failed to create campaign")
      throw error
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h2>
          <p className="text-muted-foreground">Create and manage your marketing campaigns</p>
        </div>
        <CampaignForm onSubmit={handleCreateCampaign} />
      </div>

      <Suspense fallback={<CampaignStatsSkeleton />}>
        <CampaignStats />
      </Suspense>

      <Suspense fallback={<CampaignListSkeleton />}>
        <CampaignList />
      </Suspense>
    </div>
  )
}

function CampaignStatsSkeleton() {
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

function CampaignListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Skeleton className="h-5 w-[200px]" />
            <Skeleton className="h-6 w-[80px]" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <div className="flex space-x-4">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
