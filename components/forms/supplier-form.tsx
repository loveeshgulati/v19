"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BaseForm, FormField, SUPPLIER_STATUSES } from "./form-components"
import type { Supplier } from "@/lib/models/inventory"

interface SupplierFormData extends Omit<Supplier, "_id" | "createdAt" | "updatedAt"> {
  password: string
}

interface SupplierFormProps {
  onSubmit: (supplier: SupplierFormData) => Promise<void>
  trigger?: React.ReactNode
  initialData?: Partial<Supplier>
}

const SUPPLIER_CATEGORIES = [
  { value: "Raw Materials", label: "Raw Materials" },
  { value: "Components", label: "Components" },
  { value: "Electronics", label: "Electronics" },
  { value: "Office Supplies", label: "Office Supplies" },
  { value: "Packaging", label: "Packaging" },
  { value: "Tools & Equipment", label: "Tools & Equipment" },
  { value: "Services", label: "Services" },
  { value: "Other", label: "Other" },
]

export function SupplierForm({ onSubmit, trigger, initialData }: SupplierFormProps) {
  const [formData, setFormData] = useState<SupplierFormData>({
    name: initialData?.name || "",
    contactPerson: initialData?.contactPerson || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    category: initialData?.category || "",
    rating: initialData?.rating || 5.0,
    onTimeDelivery: initialData?.onTimeDelivery || 100,
    totalOrders: initialData?.totalOrders || 0,
    totalValue: initialData?.totalValue || 0,
    status: initialData?.status || "active",
    password: "",
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
        category: "",
        rating: 5.0,
        onTimeDelivery: 100,
        totalOrders: 0,
        totalValue: 0,
        status: "active",
        password: "",
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
      category: "",
      rating: 5.0,
      onTimeDelivery: 100,
      totalOrders: 0,
      totalValue: 0,
      status: "active",
      password: "",
    })
  }

  const updateField = (field: keyof typeof formData) => (value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <BaseForm
      title={initialData?._id ? "Edit Supplier" : "Add New Supplier"}
      description="Enter supplier information to add them to your vendor network."
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      submitLabel={initialData?._id ? "Update Supplier" : "Add Supplier"}
      trigger={trigger || (
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
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
          placeholder="Enter supplier company name"
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
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={updateField("password")}
          required
          placeholder="Enter login password"
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
          label="Category"
          name="category"
          type="select"
          value={formData.category}
          onChange={updateField("category")}
          options={SUPPLIER_CATEGORIES}
          required
        />

        <FormField
          label="Status"
          name="status"
          type="select"
          value={formData.status}
          onChange={updateField("status")}
          options={SUPPLIER_STATUSES}
          required
        />

        <FormField
          label="Rating"
          name="rating"
          type="number"
          value={formData.rating}
          onChange={updateField("rating")}
          min={1}
          max={5}
          placeholder="Enter rating (1-5)"
        />

        <FormField
          label="On-Time Delivery %"
          name="onTimeDelivery"
          type="number"
          value={formData.onTimeDelivery}
          onChange={updateField("onTimeDelivery")}
          min={0}
          max={100}
          placeholder="Enter on-time delivery percentage"
        />

        <FormField
          label="Total Orders"
          name="totalOrders"
          type="number"
          value={formData.totalOrders}
          onChange={updateField("totalOrders")}
          min={0}
          placeholder="Enter total number of orders"
        />

        <FormField
          label="Total Value"
          name="totalValue"
          type="number"
          value={formData.totalValue}
          onChange={updateField("totalValue")}
          min={0}
          placeholder="Enter total order value"
        />
      </div>

      <FormField
        label="Address"
        name="address"
        type="textarea"
        value={formData.address}
        onChange={updateField("address")}
        required
        placeholder="Enter full address"
      />
    </BaseForm>
  )
}
