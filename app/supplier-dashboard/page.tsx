"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from '@/contexts/AuthContext'
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Clock,
  AlertCircle,
  CheckCircle,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Search
} from 'lucide-react'
import { toast } from "react-hot-toast"

interface SupplierStats {
  totalProducts: number;
  lowStockItems: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  recentActivity: number;
}

interface InventoryItem {
  _id: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  price: number;
  supplier: string;
  status: string;
  sku?: string;
  description?: string;
  unitPrice?: string;
  location?: string;
}

interface NewItemForm {
  name: string;
  category: string;
  sku: string;
  description: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  supplier: string;
  location: string;
}

interface PurchaseOrder {
  _id: string;
  orderNumber: string;
  supplier: string;
  items: Array<{
    product: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  orderDate: string;
  deliveryDate: string;
}


export default function SupplierDashboard() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<SupplierStats>({
    totalProducts: 0,
    lowStockItems: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    recentActivity: 0
  })
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [recentOrders, setRecentOrders] = useState<PurchaseOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<NewItemForm>({
    name: '',
    category: '',
    sku: '',
    description: '',
    quantity: 0,
    minStock: 0,
    maxStock: 0,
    unitPrice: 0,
    supplier: user?.name || user?.email || '',
    location: ''
  })

  useEffect(() => {
    if (user?.role === 'supplier') {
      fetchSupplierData();
    }
  }, [user]);

  const fetchSupplierData = async () => {
    try {
      setLoading(true);
      
      // Get auth token
      const token = localStorage.getItem('token')
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
      
      // Fetch inventory data filtered by supplier
      const supplierName = user?.name || user?.email;
      const inventoryResponse = await fetch(`/api/inventory?supplier=${encodeURIComponent(supplierName)}`, { headers });
      const inventoryData = await inventoryResponse.json();
      
      // Data is already filtered by backend
      const supplierInventory = inventoryData;
      
      // Fetch purchase orders filtered by supplier
      const ordersResponse = await fetch(`/api/purchase-orders?supplier=${encodeURIComponent(supplierName)}`, { headers });
      const ordersData = await ordersResponse.json();
      
      // Data is already filtered by backend
      const supplierOrders = ordersData;
      
      // Calculate stats
      const totalProducts = supplierInventory.length;
      const lowStockItems = supplierInventory.filter(item => item.quantity <= item.minStock).length;
      const pendingOrders = supplierOrders.filter(order => order.status === 'pending').length;
      const completedOrders = supplierOrders.filter(order => order.status === 'completed').length;
      const totalRevenue = supplierOrders
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + order.totalAmount, 0);
      const recentActivity = supplierOrders.filter(order => {
        const orderDate = new Date(order.orderDate);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return orderDate >= weekAgo;
      }).length;
      
      setStats({
        totalProducts,
        lowStockItems,
        pendingOrders,
        completedOrders,
        totalRevenue,
        recentActivity
      });
      
      setInventory(supplierInventory.slice(0, 5)); // Show top 5 items
      setRecentOrders(supplierOrders.slice(0, 5)); // Show recent 5 orders
      
    } catch (error) {
      console.error('Error fetching supplier data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatusColor = (quantity: number, minStock: number) => {
    if (quantity <= minStock) return 'text-red-600';
    if (quantity <= minStock * 1.5) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Generate SKU automatically
  const generateSKU = (name: string, category: string) => {
    const namePrefix = name.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 3)
    const categoryPrefix = category.split(' ').map(word => word.charAt(0)).join('').toUpperCase().slice(0, 3)
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${namePrefix}-${categoryPrefix}-${randomNum}`
  }

  // Auto-generate SKU when name or category changes
  useEffect(() => {
    if (formData.name && formData.category) {
      const sku = generateSKU(formData.name, formData.category)
      setFormData(prev => ({ ...prev, sku }))
    }
  }, [formData.name, formData.category])

  // Determine stock status based on quantity
  const determineStatus = (quantity: number, minStock: number): "In Stock" | "Low Stock" | "Out of Stock" => {
    if (quantity === 0) return 'Out of Stock'
    if (quantity <= minStock) return 'Low Stock'
    return 'In Stock'
  }

  const handleInputChange = (field: keyof NewItemForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const status = determineStatus(formData.quantity, formData.minStock)
      
      const response = await fetch('/api/inventory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          currentStock: formData.quantity,
          price: formData.unitPrice,
          status,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add inventory item')
      }

      const newItem = await response.json()
      
      // Refresh the supplier data
      await fetchSupplierData()
      
      // Reset form and close modal
      setFormData({
        name: '',
        category: '',
        sku: '',
        description: '',
        quantity: 0,
        minStock: 0,
        maxStock: 0,
        unitPrice: 0,
        supplier: user?.name || user?.email || '',
        location: ''
      })
      setIsAddModalOpen(false)
      toast.success('Inventory item added successfully!')
    } catch (error) {
      console.error('Error adding inventory item:', error)
      toast.error('Failed to add inventory item. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      sku: item.sku || '',
      description: item.description || '',
      quantity: item.quantity,
      minStock: item.minStock,
      maxStock: 100,
      unitPrice: item.price,
      supplier: item.supplier,
      location: item.location || ''
    })
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return
    
    setIsLoading(true)
    try {
      const status = determineStatus(formData.quantity, formData.minStock)
      
      const response = await fetch(`/api/inventory/${editingItem._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          currentStock: formData.quantity,
          price: formData.unitPrice,
          status,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to update inventory item')
      }

      // Refresh the supplier data
      await fetchSupplierData()
      
      setIsEditModalOpen(false)
      setEditingItem(null)
      toast.success('Inventory item updated successfully!')
    } catch (error) {
      console.error('Error updating inventory item:', error)
      toast.error('Failed to update inventory item. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return
    
    try {
      const response = await fetch(`/api/inventory/${itemId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete item')
      }

      // Refresh the supplier data
      await fetchSupplierData()
      toast.success('Item deleted successfully!')
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete item. Please try again.')
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/supplier-login')
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading supplier dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.name || user?.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Logout
          </Button>
        </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Active inventory items
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">
              Items needing restock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">
              Orders awaiting fulfillment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ${stats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              From completed orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inventory */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Recent Inventory
              </div>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Inventory Item</DialogTitle>
                    <DialogDescription>
                      Add a new product to your inventory
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Electronics">Electronics</SelectItem>
                            <SelectItem value="Interior Accessories">Interior Accessories</SelectItem>
                            <SelectItem value="Exterior">Exterior</SelectItem>
                            <SelectItem value="Lighting">Lighting</SelectItem>
                            <SelectItem value="Security">Security</SelectItem>
                            <SelectItem value="Accessories">Accessories</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                          id="sku"
                          value={formData.sku}
                          onChange={(e) => handleInputChange('sku', e.target.value)}
                          placeholder="Auto-generated"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unitPrice">Unit Price (₹)</Label>
                        <Input
                          id="unitPrice"
                          type="number"
                          value={formData.unitPrice}
                          onChange={(e) => handleInputChange('unitPrice', Number(e.target.value))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity">Current Stock</Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="minStock">Minimum Stock</Label>
                        <Input
                          id="minStock"
                          type="number"
                          value={formData.minStock}
                          onChange={(e) => handleInputChange('minStock', Number(e.target.value))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="Warehouse location"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Adding...' : 'Add Item'}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No inventory items found</p>
              ) : (
                inventory.map((item) => (
                  <div key={item._id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-xs text-gray-500">{item.sku}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className={`font-medium ${getStockStatusColor(item.quantity, item.minStock)}`}>
                          {item.quantity} units
                        </p>
                        <p className="text-sm text-gray-600">₹{item.price}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEdit(item)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDelete(item._id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full" onClick={() => router.push('/inventory')}>
                View All Inventory
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No orders found</p>
              ) : (
                recentOrders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">#{order.orderNumber}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.totalAmount.toLocaleString()}</p>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full">
                View All Orders
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="flex items-center gap-2" onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4" />
              Add Inventory
            </Button>
            <Button variant="outline" className="flex items-center gap-2" onClick={() => router.push('/inventory')}>
              <Package className="h-4 w-4" />
              Manage Inventory
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              View Orders
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Inventory Item</DialogTitle>
            <DialogDescription>
              Update the details of your inventory item
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Interior Accessories">Interior Accessories</SelectItem>
                    <SelectItem value="Exterior">Exterior</SelectItem>
                    <SelectItem value="Lighting">Lighting</SelectItem>
                    <SelectItem value="Security">Security</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-sku">SKU</Label>
                <Input
                  id="edit-sku"
                  value={formData.sku}
                  onChange={(e) => handleInputChange('sku', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-unitPrice">Unit Price (₹)</Label>
                <Input
                  id="edit-unitPrice"
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => handleInputChange('unitPrice', Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-quantity">Current Stock</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-minStock">Minimum Stock</Label>
                <Input
                  id="edit-minStock"
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => handleInputChange('minStock', Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Warehouse location"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Item'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      </div>
    </Layout>
  );
}
