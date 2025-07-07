"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BaseForm, FormField, COMPANY_SIZES, CUSTOMER_STATUSES } from "./form-components"
import type { Customer } from "@/lib/models/types"

interface CustomerFormProps {
  onSubmit: (customer: Omit<Customer, "_id" | "createdAt" | "updatedAt">) => Promise<void>
  trigger?: React.ReactNode
  initialData?: Partial<Customer>
}

const INDUSTRIES = [
  { value: "Technology", label: "Technology" },
  { value: "Healthcare", label: "Healthcare" },
  { value: "Finance", label: "Finance" },
  { value: "Manufacturing", label: "Manufacturing" },
  { value: "Retail", label: "Retail" },
  { value: "Education", label: "Education" },
  { value: "Consulting", label: "Consulting" },
  { value: "Real Estate", label: "Real Estate" },
  { value: "Transportation", label: "Transportation" },
  { value: "Other", label: "Other" },
]

export function CustomerForm({ onSubmit, trigger, initialData }: CustomerFormProps) {
  const [formData, setFormData] = useState<Omit<Customer, "_id" | "createdAt" | "updatedAt">>({
    name: initialData?.name || "",
    contactPerson: initialData?.contactPerson || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    country: initialData?.country || "",
    industry: initialData?.industry || "",
    companySize: initialData?.companySize || "Small",
    status: initialData?.status || "Prospect",
    estimatedValue: initialData?.estimatedValue || 0,
    actualValue: initialData?.actualValue || 0,
    notes: initialData?.notes || "",
    assignedTo: initialData?.assignedTo || "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form
      setFormData({
        name: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        industry: "",
        companySize: "Small",
        status: "Prospect",
        estimatedValue: 0,
        actualValue: 0,
        notes: "",
        assignedTo: "",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      industry: "",
      companySize: "Small",
      status: "Prospect",
      estimatedValue: 0,
      actualValue: 0,
      notes: "",
      assignedTo: "",
    })
  }

  const updateField = (field: keyof typeof formData) => (value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <BaseForm
      title={initialData?._id ? "Edit Customer" : "Add New Customer"}
      description="Enter customer information to add them to your system."
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      submitLabel={initialData?._id ? "Update Customer" : "Add Customer"}
      trigger={trigger || (
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Company Name"
          name="name"
          value={formData.name}
          onChange={updateField("name")}
          required
          placeholder="Enter company name"
        />

        <FormField
          label="Contact Person"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={updateField("contactPerson")}
          required
          placeholder="Enter contact person name"
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
          label="Industry"
          name="industry"
          type="select"
          value={formData.industry}
          onChange={updateField("industry")}
          options={INDUSTRIES}
          required
        />

        <FormField
          label="Company Size"
          name="companySize"
          type="select"
          value={formData.companySize}
          onChange={updateField("companySize")}
          options={COMPANY_SIZES}
          required
        />

        <FormField
          label="Status"
          name="status"
          type="select"
          value={formData.status}
          onChange={updateField("status")}
          options={CUSTOMER_STATUSES}
          required
        />

        <FormField
          label="Assigned To"
          name="assignedTo"
          value={formData.assignedTo}
          onChange={updateField("assignedTo")}
          placeholder="Enter assigned sales rep"
        />

        <FormField
          label="Estimated Value"
          name="estimatedValue"
          type="number"
          value={formData.estimatedValue}
          onChange={updateField("estimatedValue")}
          placeholder="Enter estimated value"
          min={0}
        />

        <FormField
          label="Actual Value"
          name="actualValue"
          type="number"
          value={formData.actualValue}
          onChange={updateField("actualValue")}
          placeholder="Enter actual value"
          min={0}
        />

        <FormField
          label="City"
          name="city"
          value={formData.city}
          onChange={updateField("city")}
          placeholder="Enter city"
        />

        <FormField
          label="Country"
          name="country"
          value={formData.country}
          onChange={updateField("country")}
          placeholder="Enter country"
        />
      </div>

      <FormField
        label="Address"
        name="address"
        type="textarea"
        value={formData.address}
        onChange={updateField("address")}
        placeholder="Enter full address"
      />

      <FormField
        label="Notes"
        name="notes"
        type="textarea"
        value={formData.notes}
        onChange={updateField("notes")}
        placeholder="Enter any additional notes"
      />
    </BaseForm>
  )
}
