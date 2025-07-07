"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BaseForm, FormField, LEAD_SOURCES, LEAD_STATUSES, PRIORITIES } from "./form-components"
import type { Lead } from "@/lib/models/types"

interface LeadFormProps {
  onSubmit: (lead: Omit<Lead, "_id" | "createdAt" | "updatedAt">) => Promise<void>
  trigger?: React.ReactNode
  initialData?: Partial<Lead>
}

export function LeadForm({ onSubmit, trigger, initialData }: LeadFormProps) {
  const [formData, setFormData] = useState<Omit<Lead, "_id" | "createdAt" | "updatedAt">>({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    company: initialData?.company || "",
    position: initialData?.position || "",
    source: initialData?.source || "Website",
    status: initialData?.status || "New",
    priority: initialData?.priority || "Medium",
    estimatedValue: initialData?.estimatedValue || 0,
    notes: initialData?.notes || "",
    assignedTo: initialData?.assignedTo || "",
    nextFollowUp: initialData?.nextFollowUp || "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        position: "",
        source: "Website",
        status: "New",
        priority: "Medium",
        estimatedValue: 0,
        notes: "",
        assignedTo: "",
        nextFollowUp: "",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      source: "Website",
      status: "New",
      priority: "Medium",
      estimatedValue: 0,
      notes: "",
      assignedTo: "",
      nextFollowUp: "",
    })
  }

  const updateField = (field: keyof typeof formData) => (value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <BaseForm
      title={initialData?._id ? "Edit Lead" : "Add New Lead"}
      description="Enter lead information to add them to your pipeline."
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      submitLabel={initialData?._id ? "Update Lead" : "Add Lead"}
      trigger={trigger || (
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={updateField("name")}
          required
          placeholder="Enter lead's full name"
        />

        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={updateField("email")}
          required
          placeholder="Enter email address"
        />

        <FormField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={updateField("phone")}
          required
          placeholder="Enter phone number"
        />

        <FormField
          label="Company"
          name="company"
          value={formData.company}
          onChange={updateField("company")}
          required
          placeholder="Enter company name"
        />

        <FormField
          label="Position"
          name="position"
          value={formData.position}
          onChange={updateField("position")}
          placeholder="Enter job title/position"
        />

        <FormField
          label="Source"
          name="source"
          type="select"
          value={formData.source}
          onChange={updateField("source")}
          options={LEAD_SOURCES}
          required
        />

        <FormField
          label="Status"
          name="status"
          type="select"
          value={formData.status}
          onChange={updateField("status")}
          options={LEAD_STATUSES}
          required
        />

        <FormField
          label="Priority"
          name="priority"
          type="select"
          value={formData.priority}
          onChange={updateField("priority")}
          options={PRIORITIES}
          required
        />

        <FormField
          label="Estimated Value"
          name="estimatedValue"
          type="number"
          value={formData.estimatedValue}
          onChange={updateField("estimatedValue")}
          placeholder="Enter estimated deal value"
          min={0}
        />

        <FormField
          label="Assigned To"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={updateField("assignedTo")}
          required
          placeholder="Enter assigned sales rep"
        />

        <FormField
          label="Next Follow-up"
          name="nextFollowUp"
          type="date"
          value={formData.nextFollowUp}
          onChange={updateField("nextFollowUp")}
          placeholder="Select next follow-up date"
        />
      </div>

      <FormField
        label="Notes"
        name="notes"
        type="textarea"
        value={formData.notes}
        onChange={updateField("notes")}
        placeholder="Enter any additional notes about the lead"
      />
    </BaseForm>
  )
}
