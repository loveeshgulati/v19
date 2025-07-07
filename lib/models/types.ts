export interface Customer {
  _id?: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  industry: string
  companySize: "Startup" | "Small" | "Medium" | "Large" | "Enterprise"
  status: "Active" | "Inactive" | "Prospect" | "Lead"
  estimatedValue: number
  actualValue: number
  notes?: string
  lastContact?: string
  assignedTo?: string
  createdAt?: string
  updatedAt?: string
}

export interface Lead {
  _id?: string
  name: string
  email: string
  phone: string
  company: string
  position: string
  source: "Website" | "Social Media" | "Referral" | "Cold Call" | "Email" | "Event" | "Other"
  status: "New" | "Contacted" | "Qualified" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost"
  priority: "Low" | "Medium" | "High" | "Critical"
  estimatedValue: number
  notes?: string
  assignedTo: string
  nextFollowUp?: string
  createdAt?: string
  updatedAt?: string
}

export interface Campaign {
  _id?: string
  name: string
  type: "Email" | "Social Media" | "Print" | "Radio" | "TV" | "Online" | "Event" | "Direct Mail"
  status: "Draft" | "Active" | "Paused" | "Completed" | "Cancelled"
  budget: number
  spent: number
  startDate: string
  endDate: string
  targetAudience: string
  goals: string
  description?: string
  channels: string[]
  metrics: {
    impressions: number
    clicks: number
    conversions: number
    leads: number
    revenue: number
  }
  createdAt?: string
  updatedAt?: string
}

export interface Shipment {
  _id?: string
  trackingNumber: string
  carrier: string
  origin: string
  destination: string
  status: "Pending" | "Picked Up" | "In Transit" | "Out for Delivery" | "Delivered" | "Exception" | "Cancelled"
  priority: "Standard" | "Express" | "Overnight" | "Same Day"
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  estimatedDelivery: string
  actualDelivery?: string
  cost: number
  contents: string
  recipient: {
    name: string
    email: string
    phone: string
    address: string
  }
  updates: {
    timestamp: string
    status: string
    location: string
    notes?: string
  }[]
  createdAt?: string
  updatedAt?: string
}

export interface Deal {
  _id?: string
  title: string
  customer: string
  value: number
  stage: "Prospecting" | "Qualification" | "Needs Analysis" | "Proposal" | "Negotiation" | "Closed Won" | "Closed Lost"
  probability: number
  expectedCloseDate: string
  actualCloseDate?: string
  source: string
  assignedTo: string
  description?: string
  products: {
    name: string
    quantity: number
    unitPrice: number
    total: number
  }[]
  activities: {
    type: "Call" | "Email" | "Meeting" | "Task" | "Note"
    description: string
    timestamp: string
    assignedTo: string
  }[]
  notes?: string
  createdAt?: string
  updatedAt?: string
}

export interface Analytics {
  _id?: string
  type: "Sales" | "Marketing" | "Operations" | "Financial" | "Customer"
  metric: string
  value: number
  previousValue?: number
  change?: number
  changePercent?: number
  period: "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Yearly"
  date: string
  breakdown?: {
    label: string
    value: number
  }[]
  createdAt?: string
}

export interface User {
  _id?: string
  name: string
  email: string
  role: "Admin" | "Manager" | "Sales Rep" | "Analyst" | "Viewer"
  department: string
  phone?: string
  avatar?: string
  isActive: boolean
  lastLogin?: string
  permissions: string[]
  createdAt?: string
  updatedAt?: string
}

export interface Notification {
  _id?: string
  userId: string
  type: "Info" | "Warning" | "Error" | "Success"
  title: string
  message: string
  isRead: boolean
  actionUrl?: string
  createdAt?: string
}

export interface Task {
  _id?: string
  title: string
  description?: string
  assignedTo: string
  assignedBy: string
  priority: "Low" | "Medium" | "High" | "Critical"
  status: "Pending" | "In Progress" | "Completed" | "Cancelled"
  dueDate: string
  completedDate?: string
  tags: string[]
  relatedTo?: {
    type: "Customer" | "Lead" | "Deal" | "Campaign"
    id: string
  }
  createdAt?: string
  updatedAt?: string
}

export interface Report {
  _id?: string
  name: string
  type: "Sales" | "Marketing" | "Inventory" | "Financial" | "Custom"
  description?: string
  parameters: {
    dateRange: {
      start: string
      end: string
    }
    filters: Record<string, any>
  }
  data: any[]
  charts?: {
    type: "bar" | "line" | "pie" | "area" | "scatter"
    data: any[]
    config: any
  }[]
  createdBy: string
  isScheduled: boolean
  scheduleFrequency?: "Daily" | "Weekly" | "Monthly"
  nextRun?: string
  createdAt?: string
  updatedAt?: string
}

export interface APIResponse<T> {
  data: T
  success: boolean
  message?: string
  total?: number
  page?: number
  limit?: number
}

export interface FilterParams {
  search?: string
  status?: string
  category?: string
  assignedTo?: string
  dateRange?: {
    start: string
    end: string
  }
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}
