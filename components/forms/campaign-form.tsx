"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BaseForm, FormField, CAMPAIGN_TYPES, CAMPAIGN_STATUSES } from "./form-components"
import type { Campaign } from "@/lib/models/types"

interface CampaignFormProps {
  onSubmit: (campaign: Omit<Campaign, "_id" | "createdAt" | "updatedAt">) => Promise<void>
  trigger?: React.ReactNode
  initialData?: Partial<Campaign>
}

const CHANNELS = [
  { value: "Facebook", label: "Facebook" },
  { value: "Instagram", label: "Instagram" },
  { value: "Twitter", label: "Twitter" },
  { value: "LinkedIn", label: "LinkedIn" },
  { value: "Google Ads", label: "Google Ads" },
  { value: "YouTube", label: "YouTube" },
  { value: "Email", label: "Email" },
  { value: "SMS", label: "SMS" },
  { value: "Print Media", label: "Print Media" },
  { value: "Radio", label: "Radio" },
  { value: "TV", label: "TV" },
  { value: "Outdoor", label: "Outdoor" },
]

export function CampaignForm({ onSubmit, trigger, initialData }: CampaignFormProps) {
  const [formData, setFormData] = useState<Omit<Campaign, "_id" | "createdAt" | "updatedAt">>({
    name: initialData?.name || "",
    type: initialData?.type || "Email",
    status: initialData?.status || "Draft",
    budget: initialData?.budget || 0,
    spent: initialData?.spent || 0,
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    targetAudience: initialData?.targetAudience || "",
    goals: initialData?.goals || "",
    description: initialData?.description || "",
    channels: initialData?.channels || [],
    metrics: initialData?.metrics || {
      impressions: 0,
      clicks: 0,
      conversions: 0,
      leads: 0,
      revenue: 0,
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form
      setFormData({
        name: "",
        type: "Email",
        status: "Draft",
        budget: 0,
        spent: 0,
        startDate: "",
        endDate: "",
        targetAudience: "",
        goals: "",
        description: "",
        channels: [],
        metrics: {
          impressions: 0,
          clicks: 0,
          conversions: 0,
          leads: 0,
          revenue: 0,
        },
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: "",
      type: "Email",
      status: "Draft",
      budget: 0,
      spent: 0,
      startDate: "",
      endDate: "",
      targetAudience: "",
      goals: "",
      description: "",
      channels: [],
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        leads: 0,
        revenue: 0,
      },
    })
  }

  const updateField = (field: keyof typeof formData) => (value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateMetrics = (field: keyof typeof formData.metrics) => (value: number) => {
    setFormData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        [field]: value,
      },
    }))
  }

  return (
    <BaseForm
      title={initialData?._id ? "Edit Campaign" : "Create New Campaign"}
      description="Create and manage marketing campaigns to reach your target audience."
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      submitLabel={initialData?._id ? "Update Campaign" : "Create Campaign"}
      trigger={trigger || (
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Campaign Name"
          name="name"
          value={formData.name}
          onChange={updateField("name")}
          required
          placeholder="Enter campaign name"
        />

        <FormField
          label="Campaign Type"
          name="type"
          type="select"
          value={formData.type}
          onChange={updateField("type")}
          options={CAMPAIGN_TYPES}
          required
        />

        <FormField
          label="Status"
          name="status"
          type="select"
          value={formData.status}
          onChange={updateField("status")}
          options={CAMPAIGN_STATUSES}
          required
        />

        <FormField
          label="Budget"
          name="budget"
          type="number"
          value={formData.budget}
          onChange={updateField("budget")}
          required
          min={0}
          placeholder="Enter total budget"
        />

        <FormField
          label="Amount Spent"
          name="spent"
          type="number"
          value={formData.spent}
          onChange={updateField("spent")}
          min={0}
          placeholder="Enter amount spent"
        />

        <FormField
          label="Target Audience"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={updateField("targetAudience")}
          required
          placeholder="Describe target audience"
        />

        <FormField
          label="Start Date"
          name="startDate"
          type="date"
          value={formData.startDate}
          onChange={updateField("startDate")}
          required
        />

        <FormField
          label="End Date"
          name="endDate"
          type="date"
          value={formData.endDate}
          onChange={updateField("endDate")}
          required
        />
      </div>

      <FormField
        label="Campaign Goals"
        name="goals"
        type="textarea"
        value={formData.goals}
        onChange={updateField("goals")}
        required
        placeholder="Describe campaign goals and objectives"
      />

      <FormField
        label="Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={updateField("description")}
        placeholder="Additional campaign details"
      />

      <div className="space-y-2">
        <label className="text-sm font-medium">Marketing Channels</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {CHANNELS.map((channel) => (
            <label key={channel.value} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.channels.includes(channel.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateField("channels")([...formData.channels, channel.value])
                  } else {
                    updateField("channels")(formData.channels.filter(c => c !== channel.value))
                  }
                }}
                className="rounded"
              />
              <span className="text-sm">{channel.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Campaign Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Impressions"
            name="impressions"
            type="number"
            value={formData.metrics.impressions}
            onChange={updateMetrics("impressions")}
            min={0}
            placeholder="0"
          />

          <FormField
            label="Clicks"
            name="clicks"
            type="number"
            value={formData.metrics.clicks}
            onChange={updateMetrics("clicks")}
            min={0}
            placeholder="0"
          />

          <FormField
            label="Conversions"
            name="conversions"
            type="number"
            value={formData.metrics.conversions}
            onChange={updateMetrics("conversions")}
            min={0}
            placeholder="0"
          />

          <FormField
            label="Leads Generated"
            name="leads"
            type="number"
            value={formData.metrics.leads}
            onChange={updateMetrics("leads")}
            min={0}
            placeholder="0"
          />

          <FormField
            label="Revenue"
            name="revenue"
            type="number"
            value={formData.metrics.revenue}
            onChange={updateMetrics("revenue")}
            min={0}
            placeholder="0"
          />
        </div>
      </div>
    </BaseForm>
  )
}
