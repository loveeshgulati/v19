"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PurchaseOrderForm } from "@/components/forms/purchase-order-form"
import { ShoppingCart, Search, Plus, Calendar, User, Package } from "lucide-react"
import { toast } from "react-hot-toast"
import type { PurchaseOrder } from "@/lib/models/inventory"


const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "delivered":
    case "complete":
      return "default"
    case "in_transit":
    case "in process":
      return "secondary"
    case "processing":
      return "outline"
    case "pending_approval":
      return "destructive"
    case "draft":
      return "secondary"
    case "approved":
      return "default"
    default:
      return "outline"
  }
}

const getStatusText = (status: string) => {
  switch (status?.toLowerCase()) {
    case "delivered":
      return "Delivered"
    case "in_transit":
      return "In Transit"
    case "processing":
      return "Processing"
    case "pending_approval":
      return "Pending Approval"
    case "draft":
      return "Draft"
    case "approved":
      return "Approved"
    case "in process":
      return "In Process"
    case "complete":
      return "Complete"
    default:
      return status || "Unknown"
  }
}

export default function ProcurementPage() {
  const [purchaseOrdersList, setPurchaseOrdersList] = useState<any[]>([])
  const [filteredOrders, setFilteredOrders] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Fetch purchase orders from API
  const fetchPurchaseOrders = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/purchase-orders')
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched purchase orders from API:', data)
        setPurchaseOrdersList(data || [])
      } else {
        console.error('API response not ok:', response.status)
        setPurchaseOrdersList([])
      }
    } catch (error) {
      console.error('Error fetching purchase orders:', error)
      setPurchaseOrdersList([])
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchPurchaseOrders()
  }, [])

  // Filter orders based on search term and status filter
  useEffect(() => {
    let filtered = purchaseOrdersList

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => {
        const orderStatus = order.status || 'draft'
        return orderStatus.toLowerCase().replace('_', ' ') === statusFilter.toLowerCase()
      })
    }

    setFilteredOrders(filtered)
  }, [purchaseOrdersList, searchTerm, statusFilter])

  // Calculate stats
  const stats = {
    totalOrders: purchaseOrdersList.length,
    totalValue: purchaseOrdersList.reduce((sum, order) => {
      const amount = typeof order.totalAmount === 'string' 
        ? parseFloat(order.totalAmount.replace(/[₹,]/g, '')) 
        : order.totalAmount || 0
      return sum + amount
    }, 0),
    activeOrders: purchaseOrdersList.filter(order => 
      !['delivered', 'cancelled'].includes(order.status)
    ).length,
    avgOrderValue: purchaseOrdersList.length > 0 
      ? purchaseOrdersList.reduce((sum, order) => {
          const amount = typeof order.totalAmount === 'string' 
            ? parseFloat(order.totalAmount.replace(/[₹,]/g, '')) 
            : order.totalAmount || 0
          return sum + amount
        }, 0) / purchaseOrdersList.length
      : 0
  }

const handleViewDetails = (order: any) => {
    // View details modal/functionality
    alert(`Order Details:\n\nOrder Number: ${order.orderNumber}\nSupplier: ${order.supplier}\nStatus: ${order.status}\nTotal Amount: ${order.totalAmount}\nOrder Date: ${order.orderDate}\nDelivery Date: ${order.expectedDelivery}\nAssigned To: ${order.assignedTo}\n\nItems:\n${order.items.map((item: any) => `- ${item.name} (Qty: ${item.quantity}, Unit Price: ${item.unitPrice})`).join('\n')}`)
  }

  const handleEditOrder = async (order: any) => {
    try {
      const updatedStatus = prompt("Enter new status (Draft, In Process, Complete):", order.status)
      if (!updatedStatus) return

      const response = await fetch(`/api/purchase-orders/${order._id || order.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updatedStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      toast.success("Order updated successfully!")
      // Refresh the purchase orders list
      await fetchPurchaseOrders()
    } catch (error) {
      console.error("Error updating order:", error)
      toast.error("Failed to update order")
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/purchase-orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error("Failed to update order status")
      }

      toast.success("Status updated successfully!")
      await fetchPurchaseOrders()
    } catch (error) {
      console.error("Error updating status:", error)
      toast.error("Failed to update status")
    }
  }

  const handleCreatePurchaseOrder = async (orderData: Omit<PurchaseOrder, "_id" | "createdAt" | "updatedAt">) => {
    try {
      const response = await fetch("/api/purchase-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Failed to create purchase order")
      }

      const newOrder = await response.json()
      toast.success("Purchase order created successfully!")
      // Refresh the purchase orders list
      await fetchPurchaseOrders()
    } catch (error) {
      console.error("Error creating purchase order:", error)
      toast.error("Failed to create purchase order")
      throw error
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Procurement Management</h1>
            <p className="text-gray-600">Manage purchase orders and supplier relationships</p>
          </div>
          <PurchaseOrderForm onSubmit={handleCreatePurchaseOrder} />
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search purchase orders..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                >
                  All Orders
                </Button>
                <Button 
                  variant={statusFilter === 'draft' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('draft')}
                >
                  Draft
                </Button>
                <Button 
                  variant={statusFilter === 'in process' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('in process')}
                >
                  In Process
                </Button>
                <Button 
                  variant={statusFilter === 'complete' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('complete')}
                >
                  Complete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Procurement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{(stats.totalValue / 100000).toFixed(2)}L
              </div>
              <p className="text-xs text-muted-foreground">Total order value</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Calendar className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeOrders}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
              <ShoppingCart className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                ₹{(stats.avgOrderValue / 100000).toFixed(2)}L
              </div>
              <p className="text-xs text-muted-foreground">Per order average</p>
            </CardContent>
          </Card>
        </div>

        {/* Purchase Orders List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading purchase orders...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {purchaseOrdersList.length === 0 
                  ? "No purchase orders found. Create your first order to get started."
                  : "No orders match your current filters."
                }
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
            <Card key={order._id || order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{order.orderNumber || order.id}</CardTitle>
                    <CardDescription>{order.supplier}</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                    <Select 
                      value={order.status} 
                      onValueChange={(value) => handleStatusChange(order._id || order.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="In Process">In Process</SelectItem>
                        <SelectItem value="Complete">Complete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Order Date</p>
                      <p className="text-gray-600">{order.orderDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Package className="mr-2 h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Delivery Date</p>
                      <p className="text-gray-600">{order.expectedDelivery || order.deliveryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="mr-2 h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Assigned To</p>
                      <p className="text-gray-600">{order.assignedTo}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <ShoppingCart className="mr-2 h-4 w-4 text-gray-500" />
                    <div>
                      <p className="font-medium">Total Amount</p>
                      <p className="text-green-600 font-semibold">
                        {typeof order.totalAmount === 'string' 
                          ? order.totalAmount 
                          : `₹${order.totalAmount?.toLocaleString()}`
                        }
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Order Items:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-2 rounded">
                        <span>{item.name}</span>
                        <div className="flex gap-4 text-gray-600">
                          <span>Qty: {item.quantity}</span>
                          <span>Unit: {item.unitPrice}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
<Button variant="outline" size="sm" onClick={() => handleViewDetails(order)}>
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Track Order
                  </Button>
                  <Button size="sm" onClick={() => handleEditOrder(order)}>
                    Edit Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
          )}
        </div>
      </div>
    </Layout>
  )
}
