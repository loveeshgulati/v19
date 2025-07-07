"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { BaseForm, FormField, INVENTORY_STATUSES } from "./form-components"
import type { InventoryItem } from "@/lib/models/inventory"

interface InventoryFormProps {
  onSubmit: (item: Omit<InventoryItem, "_id" | "createdAt" | "updatedAt">) => Promise<void>
  trigger?: React.ReactNode
  initialData?: Partial<InventoryItem>
}

const CATEGORIES = [
  { value: "Electronics", label: "Electronics" },
  { value: "Office Supplies", label: "Office Supplies" },
  { value: "Raw Materials", label: "Raw Materials" },
  { value: "Components", label: "Components" },
  { value: "Finished Goods", label: "Finished Goods" },
  { value: "Consumables", label: "Consumables" },
  { value: "Tools", label: "Tools" },
  { value: "Other", label: "Other" },
]

const LOCATIONS = [
  { value: "Warehouse A", label: "Warehouse A" },
  { value: "Warehouse B", label: "Warehouse B" },
  { value: "Storage Room 1", label: "Storage Room 1" },
  { value: "Storage Room 2", label: "Storage Room 2" },
  { value: "Office Storage", label: "Office Storage" },
  { value: "External Storage", label: "External Storage" },
]

export function InventoryForm({ onSubmit, trigger, initialData }: InventoryFormProps) {
  const [formData, setFormData] = useState<Omit<InventoryItem, "_id" | "createdAt" | "updatedAt">>({
    name: initialData?.name || "",
    category: initialData?.category || "",
    sku: initialData?.sku || "",
    description: initialData?.description || "",
    currentStock: initialData?.currentStock || 0,
    minStock: initialData?.minStock || 0,
    maxStock: initialData?.maxStock || 0,
    unitPrice: initialData?.unitPrice || 0,
    supplier: initialData?.supplier || "",
    location: initialData?.location || "",
    status: initialData?.status || "In Stock",
    lastUpdated: new Date().toISOString().split("T")[0],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit({
        ...formData,
        lastUpdated: new Date().toISOString().split("T")[0],
      })
      // Reset form
      setFormData({
        name: "",
        category: "",
        sku: "",
        description: "",
        currentStock: 0,
        minStock: 0,
        maxStock: 0,
        unitPrice: 0,
        supplier: "",
        location: "",
        status: "In Stock",
        lastUpdated: new Date().toISOString().split("T")[0],
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      name: "",
      category: "",
      sku: "",
      description: "",
      currentStock: 0,
      minStock: 0,
      maxStock: 0,
      unitPrice: 0,
      supplier: "",
      location: "",
      status: "In Stock",
      lastUpdated: new Date().toISOString().split("T")[0],
    })
  }

  const updateField = (field: keyof typeof formData) => (value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <BaseForm
      title={initialData?._id ? "Edit Inventory Item" : "Add New Inventory Item"}
      description="Enter item details to add to your inventory system."
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isSubmitting={isSubmitting}
      submitLabel={initialData?._id ? "Update Item" : "Add Item"}
      trigger={trigger || (
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Item Name"
          name="name"
          value={formData.name}
          onChange={updateField("name")}
          required
          placeholder="Enter item name"
        />

        <FormField
          label="SKU"
          name="sku"
          value={formData.sku}
          onChange={updateField("sku")}
          required
          placeholder="Enter SKU code"
        />

        <FormField
          label="Category"
          name="category"
          type="select"
          value={formData.category}
          onChange={updateField("category")}
          options={CATEGORIES}
          required
        />

        <FormField
          label="Location"
          name="location"
          type="select"
          value={formData.location}
          onChange={updateField("location")}
          options={LOCATIONS}
          required
        />

        <FormField
          label="Current Stock"
          name="currentStock"
          type="number"
          value={formData.currentStock}
          onChange={updateField("currentStock")}
          required
          min={0}
          placeholder="Enter current stock quantity"
        />

        <FormField
          label="Minimum Stock"
          name="minStock"
          type="number"
          value={formData.minStock}
          onChange={updateField("minStock")}
          required
          min={0}
          placeholder="Enter minimum stock level"
        />

        <FormField
          label="Maximum Stock"
          name="maxStock"
          type="number"
          value={formData.maxStock}
          onChange={updateField("maxStock")}
          required
          min={0}
          placeholder="Enter maximum stock level"
        />

        <FormField
          label="Unit Price"
          name="unitPrice"
          type="number"
          value={formData.unitPrice}
          onChange={updateField("unitPrice")}
          required
          min={0}
          placeholder="Enter unit price"
        />

        <FormField
          label="Supplier"
          name="supplier"
          value={formData.supplier}
          onChange={updateField("supplier")}
          required
          placeholder="Enter supplier name"
        />

        <FormField
          label="Status"
          name="status"
          type="select"
          value={formData.status}
          onChange={updateField("status")}
          options={INVENTORY_STATUSES}
          required
        />
      </div>

      <FormField
        label="Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={updateField("description")}
        placeholder="Enter item description"
      />
    </BaseForm>
  )
}
