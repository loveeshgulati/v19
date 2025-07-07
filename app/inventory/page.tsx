"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Package, Search, Plus, AlertTriangle, Car, Trash2, Edit } from "lucide-react"
import { toast } from "react-hot-toast"
import { useAuth } from "@/contexts/AuthContext"


interface InventoryItem {
  _id?: string | any
  id?: string
  name: string
  category: string
  sku: string
  description: string
  quantity: number
  minStock: number
  maxStock: number
  unitPrice: string
  supplier: string
  location: string
  status: "in-stock" | "low-stock" | "out-of-stock"
  serialNumber?: string
  createdAt?: string
  updatedAt?: string
}

interface NewItemForm {
  name: string
  category: string
  sku: string
  description: string
  quantity: number
  minStock: number
  maxStock: number
  unitPrice: number
  supplier: string
  location: string
  serialNumber: string
}

export default function InventoryPage() {
  const { user } = useAuth()
  const [inventoryList, setInventoryList] = useState<InventoryItem[]>([])
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([])
  const [suppliers, setSuppliers] = useState<string[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingItems, setIsLoadingItems] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [formData, setFormData] = useState<NewItemForm>({
    name: '',
    category: '',
    sku: '',
    description: '',
    quantity: 0,
    minStock: 0,
    maxStock: 0,
    unitPrice: 0,
    supplier: user?.role === 'supplier' ? (user?.name || user?.email || '') : '',
    location: '',
    serialNumber: ''
  })
  
  const isSupplier = user?.role === 'supplier'
  const currentSupplier = user?.name || user?.email

  // Fetch inventory items function
  const fetchInventoryItems = async () => {
    setIsLoadingItems(true)
    try {
      // Add supplier filter if user is a supplier
      const url = isSupplier && currentSupplier 
        ? `/api/inventory?supplier=${encodeURIComponent(currentSupplier)}`
        : '/api/inventory'
      
      // Get auth token
      const token = localStorage.getItem('token')
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      }
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
      
      const response = await fetch(url, { headers })
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched inventory items from API:', data)
        setInventoryList(data || [])
      } else {
        console.error('API response not ok:', response.status)
        setInventoryList([])
      }
    } catch (error) {
      console.error('Error fetching inventory items:', error)
      setInventoryList([])
    } finally {
      setIsLoadingItems(false)
    }
  }

  // Fetch suppliers for dropdown
  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers')
      if (response.ok) {
        const data = await response.json()
        const supplierNames = data.map((supplier: any) => supplier.name)
        setSuppliers(supplierNames)
      } else {
        setSuppliers([])
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error)
      setSuppliers([])
    }
  }

  // Fetch data on component mount and when user changes
  useEffect(() => {
    if (user) {
      fetchInventoryItems()
      if (!isSupplier) {
        fetchSuppliers()
      }
    }
  }, [user, isSupplier, currentSupplier])

  // Update form data when user changes
  useEffect(() => {
    if (isSupplier && currentSupplier) {
      setFormData(prev => ({ ...prev, supplier: currentSupplier }))
    }
  }, [isSupplier, currentSupplier])

  // Filter items based on search term and category filter
  useEffect(() => {
    let filtered = inventoryList

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      if (categoryFilter === 'low-stock') {
        filtered = filtered.filter(item => item.status === 'low-stock')
      } else {
        filtered = filtered.filter(item => item.category.toLowerCase().includes(categoryFilter.toLowerCase()))
      }
    }

    setFilteredItems(filtered)
  }, [inventoryList, searchTerm, categoryFilter])

  // Calculate inventory stats
  const inventoryStats = {
    totalItems: inventoryList.length,
    inStock: inventoryList.filter(item => item.status === 'in-stock').length,
    lowStock: inventoryList.filter(item => item.status === 'low-stock').length,
    outOfStock: inventoryList.filter(item => item.status === 'out-of-stock').length
  }

  const handleInputChange = (field: keyof NewItemForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

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
  const determineStatus = (quantity: number, minStock: number): "in-stock" | "low-stock" | "out-of-stock" => {
    if (quantity === 0) return 'out-of-stock'
    if (quantity <= minStock) return 'low-stock'
    return 'in-stock'
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
          unitPrice: `₹${formData.unitPrice.toLocaleString()}`,
          status,
          lastUpdated: new Date().toLocaleDateString()
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to add inventory item')
      }

      const newItem = await response.json()
      console.log('New inventory item added:', newItem)
      
      // Refresh the entire inventory list from database
      await fetchInventoryItems()
      
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
        supplier: '',
        location: '',
        serialNumber: ''
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

  // Delete item function
  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/inventory/${itemId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete item')
      }

      // Refresh the inventory list
      await fetchInventoryItems()
      toast.success('Item deleted successfully!')
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete item')
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Car Accessories Inventory</h1>
            <p className="text-gray-600">Track and manage your car accessories stock</p>
          </div>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new car accessory to your inventory.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter item name"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Interior Accessories">Interior Accessories</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Lighting">Lighting</SelectItem>
                      <SelectItem value="Security">Security</SelectItem>
                      <SelectItem value="Exterior">Exterior</SelectItem>
                      <SelectItem value="Accessories">Accessories</SelectItem>
                      <SelectItem value="Performance Parts">Performance Parts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="sku">SKU (Auto-generated)</Label>
                  <Input
                    id="sku"
                    value={formData.sku}
                    onChange={(e) => handleInputChange('sku', e.target.value)}
                    placeholder="Auto-generated SKU"
                    disabled
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input
                    id="serialNumber"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                    placeholder="Enter serial number"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Brief description of the accessory"
                    className="min-h-[60px]"
                    required
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="minStock">Min Stock</Label>
                    <Input
                      id="minStock"
                      type="number"
                      value={formData.minStock}
                      onChange={(e) => handleInputChange('minStock', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="maxStock">Max Stock</Label>
                    <Input
                      id="maxStock"
                      type="number"
                      value={formData.maxStock}
                      onChange={(e) => handleInputChange('maxStock', parseInt(e.target.value) || 0)}
                      placeholder="0"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="unitPrice">Unit Price (₹)</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    value={formData.unitPrice}
                    onChange={(e) => handleInputChange('unitPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="supplier">Supplier</Label>
                  {isSupplier ? (
                    <Input
                      id="supplier"
                      value={formData.supplier}
                      disabled
                      placeholder="Current supplier"
                    />
                  ) : (
                    <Select value={formData.supplier} onValueChange={(value) => handleInputChange('supplier', value)}>
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
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="e.g., Warehouse A-1-B"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-3 border-t mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddModalOpen(false)}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Adding...' : 'Add Item'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search car accessories..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={categoryFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter('all')}
                >
                  All Items
                </Button>
                <Button 
                  variant={categoryFilter === 'interior' ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter('interior')}
                >
                  Interior
                </Button>
                <Button 
                  variant={categoryFilter === 'electronics' ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter('electronics')}
                >
                  Electronics
                </Button>
                <Button 
                  variant={categoryFilter === 'low-stock' ? 'default' : 'outline'}
                  onClick={() => setCategoryFilter('low-stock')}
                >
                  Low Stock
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Car className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inventoryStats.totalItems}</div>
              <p className="text-xs text-muted-foreground">Car accessories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Stock</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{inventoryStats.inStock}</div>
              <p className="text-xs text-muted-foreground">Available items</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{inventoryStats.lowStock}</div>
              <p className="text-xs text-muted-foreground">Need reordering</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{inventoryStats.outOfStock}</div>
              <p className="text-xs text-muted-foreground">Urgent reorder</p>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <Card>
          <CardHeader>
            <CardTitle>Car Accessories Inventory</CardTitle>
            <CardDescription>Manage your car accessories stock levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoadingItems ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading inventory items...</p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    {inventoryList.length === 0 
                      ? "No inventory items found. Add your first item to get started."
                      : "No items match your current filters."
                    }
                  </p>
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item._id || item.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <Car className="h-8 w-8 text-blue-600" />
                          {item.status === "low-stock" && (
                            <AlertTriangle className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                          )}
                          {item.status === "out-of-stock" && (
                            <AlertTriangle className="absolute -top-1 -right-1 h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">
                            {item.sku} • {item.category}
                          </p>
                          {item.serialNumber && (
                            <p className="text-xs text-gray-500">
                              Serial: {item.serialNumber}
                            </p>
                          )}
                          <p className="text-sm text-gray-500">{item.description}</p>
                          <p className="text-sm text-gray-500">
                            Supplier: {item.supplier} • Location: {item.location}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">{item.unitPrice}</p>
                          <p className="text-sm text-gray-600">Unit price</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">{item.quantity}</p>
                          <p className="text-sm text-gray-600">In stock</p>
                          <p className="text-xs text-gray-500">
                            Min: {item.minStock} • Max: {item.maxStock}
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge
                            variant={
                              item.status === "in-stock"
                                ? "default"
                                : item.status === "low-stock"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {item.status === "in-stock" && "In Stock"}
                            {item.status === "low-stock" && "Low Stock"}
                            {item.status === "out-of-stock" && "Out of Stock"}
                          </Badge>
                          {/* Delete button for database items */}
                          {item._id && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => deleteItem(item._id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
