"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Loader2 } from "lucide-react"
import { toast } from "react-hot-toast"

interface FormFieldProps {
  label: string
  name: string
  type?: "text" | "email" | "tel" | "number" | "date" | "textarea" | "select"
  value: string | number
  onChange: (value: string | number) => void
  options?: { value: string; label: string }[]
  required?: boolean
  placeholder?: string
  min?: number
  max?: number
}

export function FormField({ label, name, type = "text", value, onChange, options, required, placeholder, min, max }: FormFieldProps) {
  if (type === "textarea") {
    return (
      <div className="space-y-2">
        <Label htmlFor={name}>{label} {required && <span className="text-red-500">*</span>}</Label>
        <Textarea
          id={name}
          name={name}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="min-h-[80px]"
        />
      </div>
    )
  }

  if (type === "select" && options) {
    return (
      <div className="space-y-2">
        <Label htmlFor={name}>{label} {required && <span className="text-red-500">*</span>}</Label>
        <Select value={value as string} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder || `Select ${label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label} {required && <span className="text-red-500">*</span>}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? Number(e.target.value) : e.target.value)}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
      />
    </div>
  )
}

interface BaseFormProps {
  title: string
  description?: string
  children: React.ReactNode
  onSubmit: () => Promise<void>
  onCancel: () => void
  submitLabel?: string
  isSubmitting?: boolean
  trigger?: React.ReactNode
}

export function BaseForm({ title, description, children, onSubmit, onCancel, submitLabel = "Save", isSubmitting = false, trigger }: BaseFormProps) {
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onSubmit()
      setOpen(false)
      toast.success(`${title} saved successfully!`)
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Failed to save. Please try again.")
    }
  }

  const handleCancel = () => {
    onCancel()
    setOpen(false)
  }

  const formContent = (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
      <DialogFooter className="gap-2">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </DialogFooter>
    </form>
  )

  if (trigger) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {formContent}
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        {formContent}
      </CardContent>
    </Card>
  )
}

// Common select options
export const COMPANY_SIZES = [
  { value: "Startup", label: "Startup" },
  { value: "Small", label: "Small (1-50 employees)" },
  { value: "Medium", label: "Medium (51-200 employees)" },
  { value: "Large", label: "Large (201-1000 employees)" },
  { value: "Enterprise", label: "Enterprise (1000+ employees)" },
]

export const CUSTOMER_STATUSES = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Prospect", label: "Prospect" },
  { value: "Lead", label: "Lead" },
]

export const LEAD_SOURCES = [
  { value: "Website", label: "Website" },
  { value: "Social Media", label: "Social Media" },
  { value: "Referral", label: "Referral" },
  { value: "Cold Call", label: "Cold Call" },
  { value: "Email", label: "Email" },
  { value: "Event", label: "Event" },
  { value: "Other", label: "Other" },
]

export const LEAD_STATUSES = [
  { value: "New", label: "New" },
  { value: "Contacted", label: "Contacted" },
  { value: "Qualified", label: "Qualified" },
  { value: "Proposal", label: "Proposal" },
  { value: "Negotiation", label: "Negotiation" },
  { value: "Closed Won", label: "Closed Won" },
  { value: "Closed Lost", label: "Closed Lost" },
]

export const PRIORITIES = [
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
  { value: "Critical", label: "Critical" },
]

export const CAMPAIGN_TYPES = [
  { value: "Email", label: "Email" },
  { value: "Social Media", label: "Social Media" },
  { value: "Print", label: "Print" },
  { value: "Radio", label: "Radio" },
  { value: "TV", label: "TV" },
  { value: "Online", label: "Online" },
  { value: "Event", label: "Event" },
  { value: "Direct Mail", label: "Direct Mail" },
]

export const CAMPAIGN_STATUSES = [
  { value: "Draft", label: "Draft" },
  { value: "Active", label: "Active" },
  { value: "Paused", label: "Paused" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
]

export const SHIPMENT_STATUSES = [
  { value: "Pending", label: "Pending" },
  { value: "Picked Up", label: "Picked Up" },
  { value: "In Transit", label: "In Transit" },
  { value: "Out for Delivery", label: "Out for Delivery" },
  { value: "Delivered", label: "Delivered" },
  { value: "Exception", label: "Exception" },
  { value: "Cancelled", label: "Cancelled" },
]

export const SHIPMENT_PRIORITIES = [
  { value: "Standard", label: "Standard" },
  { value: "Express", label: "Express" },
  { value: "Overnight", label: "Overnight" },
  { value: "Same Day", label: "Same Day" },
]

export const DEAL_STAGES = [
  { value: "Prospecting", label: "Prospecting" },
  { value: "Qualification", label: "Qualification" },
  { value: "Needs Analysis", label: "Needs Analysis" },
  { value: "Proposal", label: "Proposal" },
  { value: "Negotiation", label: "Negotiation" },
  { value: "Closed Won", label: "Closed Won" },
  { value: "Closed Lost", label: "Closed Lost" },
]

export const TASK_STATUSES = [
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
]

export const PO_STATUSES = [
  { value: "Draft", label: "Draft" },
  { value: "Pending Approval", label: "Pending Approval" },
  { value: "Approved", label: "Approved" },
  { value: "Processing", label: "Processing" },
  { value: "In Transit", label: "In Transit" },
  { value: "Delivered", label: "Delivered" },
  { value: "Cancelled", label: "Cancelled" },
]

export const SUPPLIER_STATUSES = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "Under Review", label: "Under Review" },
]

export const INVENTORY_STATUSES = [
  { value: "In Stock", label: "In Stock" },
  { value: "Low Stock", label: "Low Stock" },
  { value: "Out of Stock", label: "Out of Stock" },
]
