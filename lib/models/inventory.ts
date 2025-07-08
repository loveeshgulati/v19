export interface InventoryItem {
  _id?: string
  name: string
  category: string
  sku: string
  description: string
  currentStock: number
  minStock: number
  maxStock: number
  unitPrice: number
  supplier: string
  location: string
  status: "In Stock" | "Low Stock" | "Out of Stock"
  lastUpdated: string
  createdAt?: string
  updatedAt?: string
}

export interface Supplier {
  _id?: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  category: string
  rating: number
  onTimeDelivery: number
  totalOrders: number
  totalValue: number
  status: "Active" | "Inactive" | "Under Review"
  password?: string // For creating supplier user accounts
  createdAt?: string
  updatedAt?: string
}

export interface PurchaseOrder {
  _id?: string
  orderNumber: string
  supplier: string
  assignedTo: string
  status: "Draft" | "Pending Approval" | "Approved" | "Processing" | "In Transit" | "Delivered" | "Cancelled"
  items: {
    name: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  totalAmount: number
  orderDate: string
  expectedDelivery: string
  actualDelivery?: string
  notes?: string
  createdAt?: string
  updatedAt?: string
}
