"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Minus, Loader2, Package, Trash2 } from "lucide-react"
import { toast } from "react-hot-toast"
import type { PurchaseOrder } from "@/lib/models/inventory"

interface PurchaseOrderFormProps {
  onSubmit: (order: Omit<PurchaseOrder, "_id" | "createdAt" | "updatedAt">) => Promise<void>
  trigger?: React.ReactNode
  initialData?: Partial<PurchaseOrder>
}

interface OrderItem {
  name: string
  quantity: number
  unitPrice: number
  total: number
}

interface FormData {
  orderNumber: string
  supplier: string
  assignedTo: string
  status: PurchaseOrder["status"]
  items: OrderItem[]
  orderDate: string
  expectedDelivery: string
  notes: string
}

const PO_STATUSES = [
  { value: "Draft", label: "Draft" },
  { value: "Pending Approval", label: "Pending Approval" },
  { value: "Approved", label: "Approved" },
  { value: "Processing", label: "Processing" },
  { value: "In Transit", label: "In Transit" },
  { value: "Delivered", label: "Delivered" },
  { value: "Cancelled", label: "Cancelled" },
]

export function PurchaseOrderForm({ onSubmit, trigger, initialData }: PurchaseOrderFormProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [suppliers, setSuppliers] = useState<string[]>([])
  const [availableItems, setAvailableItems] = useState<string[]>([])
  
  const [formData, setFormData] = useState<FormData>({
    orderNumber: initialData?.orderNumber || "",
    supplier: initialData?.supplier || "",
    assignedTo: initialData?.assignedTo || "",
    status: initialData?.status || "Draft",
    items: initialData?.items || [{ name: "", quantity: 1, unitPrice: 0, total: 0 }],
    orderDate: initialData?.orderDate || new Date().toISOString().split('T')[0],
    expectedDelivery: initialData?.expectedDelivery || "",
    notes: initialData?.notes || "",
  })

  // Fetch suppliers and inventory items
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch suppliers
        const suppliersResponse = await fetch('/api/suppliers')
        if (suppliersResponse.ok) {
          const suppliersData = await suppliersResponse.json()
          setSuppliers(suppliersData.map((s: any) => s.name))
        }

        // Fetch inventory items
        const inventoryResponse = await fetch('/api/inventory')
        if (inventoryResponse.ok) {
          const inventoryData = await inventoryResponse.json()
          setAvailableItems(inventoryData.map((item: any) => item.name))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    
    fetchData()
  }, [])

  // Generate PO number automatically
  useEffect(() => {
    if (!initialData?.orderNumber && open) {
      const currentYear = new Date().getFullYear()
      const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0')
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
      const poNumber = `PO-${currentYear}-${currentMonth}-${randomNum}`
      setFormData(prev => ({ ...prev, orderNumber: poNumber }))
    }
  }, [open, initialData])

  const updateField = (field: keyof FormData) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    setFormData(prev => {
      const newItems = [...prev.items]
      newItems[index] = { ...newItems[index], [field]: value }
      
      // Recalculate total for this item
      if (field === 'quantity' || field === 'unitPrice') {
        newItems[index].total = newItems[index].quantity * newItems[index].unitPrice
      }
      
      return { ...prev, items: newItems }
    })
  }

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, unitPrice: 0, total: 0 }]
    }))
  }

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }))
    }
  }

  const calculateTotalAmount = () => {
    return formData.items.reduce((total, item) => total + item.total, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.orderNumber || !formData.supplier || !formData.assignedTo) {
      toast.error("Please fill in all required fields")
      return
    }

    if (formData.items.some(item => !item.name || item.quantity <= 0 || item.unitPrice <= 0)) {
      toast.error("Please ensure all items have valid name, quantity, and price")
      return
    }

    if (new Date(formData.expectedDelivery) <= new Date(formData.orderDate)) {
      toast.error("Expected delivery date must be after order date")
      return
    }

    setIsSubmitting(true)
    try {
      const totalAmount = calculateTotalAmount()
      
      await onSubmit({
        ...formData,
        totalAmount,
      })
      
      // Reset form
      setFormData({
        orderNumber: "",
        supplier: "",
        assignedTo: "",
        status: "Draft",
        items: [{ name: "", quantity: 1, unitPrice: 0, total: 0 }],
        orderDate: new Date().toISOString().split('T')[0],
        expectedDelivery: "",
        notes: "",
      })
      setOpen(false)
      toast.success("Purchase order created successfully!")
    } catch (error) {
      console.error("Error creating purchase order:", error)
      toast.error("Failed to create purchase order")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setFormData({
      orderNumber: "",
      supplier: "",
      assignedTo: "",
      status: "Draft",
      items: [{ name: "", quantity: 1, unitPrice: 0, total: 0 }],
      orderDate: new Date().toISOString().split('T')[0],
      expectedDelivery: "",
      notes: "",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Order
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData?._id ? "Edit Purchase Order" : "Create New Purchase Order"}
          </DialogTitle>
          <DialogDescription>
            Fill in the details to create a new purchase order for your supplier.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderNumber">PO Number *</Label>
                  <Input
                    id="orderNumber"
                    value={formData.orderNumber}
                    onChange={(e) => updateField("orderNumber")(e.target.value)}
                    placeholder="Auto-generated"
                    required
                    disabled
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supplier">Supplier *</Label>
                  <Select value={formData.supplier} onValueChange={updateField("supplier")}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assigned To *</Label>
                  <Input
                    id="assignedTo"
                    value={formData.assignedTo}
                    onChange={(e) => updateField("assignedTo")(e.target.value)}
                    placeholder="Enter assigned person"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={updateField("status")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PO_STATUSES.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderDate">Order Date *</Label>
                  <Input
                    id="orderDate"
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) => updateField("orderDate")(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expectedDelivery">Expected Delivery *</Label>
                  <Input
                    id="expectedDelivery"
                    type="date"
                    value={formData.expectedDelivery}
                    onChange={(e) => updateField("expectedDelivery")(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Order Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Item #{index + 1}</h4>
                    {formData.items.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label>Item Name *</Label>
                      <Select
                        value={item.name}
                        onValueChange={(value) => updateItem(index, "name", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select item" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableItems.map((itemName) => (
                            <SelectItem key={itemName} value={itemName}>
                              {itemName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                        placeholder="1"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Unit Price *</Label>
                      <Input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.unitPrice}
                        onChange={(e) => updateItem(index, "unitPrice", parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Total</Label>
                      <Input
                        value={`₹${item.total.toLocaleString()}`}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addItem}
                  className="flex items-center"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{calculateTotalAmount().toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => updateField("notes")(e.target.value)}
                  placeholder="Additional notes or special instructions..."
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {initialData?._id ? "Update Order" : "Create Order"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
