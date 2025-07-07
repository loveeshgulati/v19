"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SupplierForm } from "@/components/forms/supplier-form"
import { Building2, Search, Plus, Phone, Mail, MapPin, Star, TrendingUp, X, UserX, AlertCircle, CheckCircle2 } from "lucide-react"
import { toast } from "react-hot-toast"
import { useAuth } from "@/contexts/AuthContext"
import type { Supplier as SupplierType } from "@/lib/models/inventory"


interface Supplier {
  _id?: string | any  // MongoDB ObjectId or string
  id?: string         // Hardcoded suppliers have string id
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  category: string
  rating?: number
  totalOrders?: number
  totalValue?: string
  onTimeDelivery?: number
  status: string
  joinedDate?: string
}


export default function SuppliersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [suppliersList, setSuppliersList] = useState<Supplier[]>([])
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([])
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  // Redirect suppliers to their dashboard
  useEffect(() => {
    if (user && user.role === 'supplier') {
      router.push('/supplier-dashboard')
      return
    }
  }, [user, router])

  // Don't render content for suppliers
  if (user && user.role === 'supplier') {
    return null
  }

  // Fetch suppliers function
  const fetchSuppliers = async () => {
    setIsLoadingSuppliers(true)
    try {
      const response = await fetch('/api/suppliers')
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched suppliers from API:', data)
        setSuppliersList(data || [])
      } else {
        console.error('API response not ok:', response.status)
        setSuppliersList([])
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error)
      setSuppliersList([])
    } finally {
      setIsLoadingSuppliers(false)
    }
  }

  // Fetch suppliers on component mount
  useEffect(() => {
    fetchSuppliers()
  }, [])

  // Filter suppliers based on search term and status filter
  useEffect(() => {
    let filtered = suppliersList

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(supplier =>
        supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(supplier => supplier.status === statusFilter)
    }

    setFilteredSuppliers(filtered)
  }, [suppliersList, searchTerm, statusFilter])

  // Calculate stats from actual supplier data
  const supplierStats = {
    totalSuppliers: suppliersList.length,
    totalValue: suppliersList.reduce((sum, supplier) => {
      let value = 0
      if (supplier.totalValue) {
        if (typeof supplier.totalValue === 'string') {
          value = parseFloat(supplier.totalValue.replace(/[₹L,]/g, '')) || 0
        } else if (typeof supplier.totalValue === 'number') {
          value = supplier.totalValue / 100000 // Convert to lakhs
        }
      }
      return sum + value
    }, 0),
    avgRating: suppliersList.length > 0 ? 
      suppliersList.reduce((sum, supplier) => sum + (supplier.rating || 0), 0) / suppliersList.length : 0,
    avgOnTimeDelivery: suppliersList.length > 0 ? 
      suppliersList.reduce((sum, supplier) => sum + (supplier.onTimeDelivery || 0), 0) / suppliersList.length : 0
  }

  // Function to toggle supplier status
  const toggleSupplierStatus = async (supplier: Supplier) => {
    const newStatus = supplier.status === 'active' ? 'under_review' : 'active'
    
    try {
      // Update in database if it's a MongoDB supplier (has _id)
      if (supplier._id) {
        const response = await fetch(`/api/suppliers/${supplier._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to update supplier status')
        }
      }
      
      // Update local state
      setSuppliersList(prev => 
        prev.map(s => 
          (s._id && s._id === supplier._id) || (s.id && s.id === supplier.id) 
            ? { ...s, status: newStatus }
            : s
        )
      )
      
      toast.success(`Supplier ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully. Login access ${newStatus === 'active' ? 'restored' : 'revoked'}.`)
    } catch (error) {
      console.error('Error updating supplier status:', error)
      toast.error('Failed to update supplier status')
    }
  }

  // Function to revoke supplier access
  const revokeSupplierAccess = async (supplier: Supplier) => {
    if (!confirm(`Are you sure you want to revoke access for ${supplier.name}? This will prevent them from logging in.`)) {
      return
    }

    try {
      if (supplier._id) {
        const response = await fetch(`/api/suppliers/${supplier._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: 'revoked' }),
        })
        
        if (!response.ok) {
          throw new Error('Failed to revoke supplier access')
        }
      }
      
      // Update local state
      setSuppliersList(prev => 
        prev.map(s => 
          (s._id && s._id === supplier._id) || (s.id && s.id === supplier.id) 
            ? { ...s, status: 'revoked' }
            : s
        )
      )
      
      toast.success(`Access revoked for ${supplier.name}. They can no longer log in.`)
    } catch (error) {
      console.error('Error revoking supplier access:', error)
      toast.error('Failed to revoke supplier access')
    }
  }

  const handleCreateSupplier = async (supplierData: any) => {
    try {
      const response = await fetch("/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplierData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create supplier");
      }

      toast.success("Supplier and login account created successfully!");
      await fetchSuppliers();
    } catch (error) {
      console.error("Error creating supplier:", error);
      toast.error(error.message || "Failed to create supplier");
      throw error;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supplier Management</h1>
            <p className="text-gray-600">Manage your supplier relationships and performance</p>
          </div>
          <SupplierForm onSubmit={handleCreateSupplier} />
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search suppliers..." 
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
                  All Suppliers
                </Button>
                <Button 
                  variant={statusFilter === 'active' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('active')}
                >
                  Active
                </Button>
                <Button 
                  variant={statusFilter === 'under_review' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('under_review')}
                >
                  Under Review
                </Button>
                <Button 
                  variant={statusFilter === 'revoked' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('revoked')}
                >
                  Revoked
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Supplier Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Suppliers</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{supplierStats.totalSuppliers}</div>
              <p className="text-xs text-muted-foreground">Active partnerships</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{supplierStats.totalValue.toFixed(1)}L</div>
              <p className="text-xs text-muted-foreground">Lifetime procurement</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{supplierStats.avgRating.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground">Supplier performance</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{supplierStats.avgOnTimeDelivery.toFixed(0)}%</div>
              <p className="text-xs text-muted-foreground">Average delivery rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Suppliers List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {isLoadingSuppliers ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Loading suppliers...</p>
            </div>
          ) : filteredSuppliers.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">
                {suppliersList.length === 0 
                  ? "No suppliers found. Add your first supplier to get started."
                  : "No suppliers match your current filters."
                }
              </p>
            </div>
          ) : (
            filteredSuppliers.map((supplier) => (
            <Card key={supplier._id || supplier.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription>{supplier.category}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      variant={supplier.status === "active" ? "default" : supplier.status === "revoked" ? "destructive" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      {supplier.status === "active" && <CheckCircle2 className="w-3 h-3" />}
                      {supplier.status === "under_review" && <AlertCircle className="w-3 h-3" />}
                      {supplier.status === "revoked" && <UserX className="w-3 h-3" />}
                      {supplier.status === "active" ? "Active" : supplier.status === "revoked" ? "Revoked" : "Under Review"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="mr-2 h-4 w-4" />
                    {supplier.contactPerson} • {supplier.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="mr-2 h-4 w-4" />
                    {supplier.email}
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>{supplier.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium">Rating</p>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{supplier.rating || 'N/A'}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Orders</p>
                    <p className="font-semibold">{supplier.totalOrders || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Total Value</p>
                    <p className="font-semibold text-green-600">
                      {supplier.totalValue || (typeof supplier.totalValue === 'number' ? `₹${(supplier.totalValue / 100000).toFixed(1)}L` : '₹0L')}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">On-Time Delivery</p>
                    <p className="font-semibold">{supplier.onTimeDelivery || 0}%</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Joined {supplier.joinedDate || 'Recently'}
                    </span>
                    <div className="flex gap-2">
                      {supplier.status === 'active' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleSupplierStatus(supplier)}
                          className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
                        >
                          <AlertCircle className="w-4 h-4 mr-1" />
                          Deactivate
                        </Button>
                      )}
                      {supplier.status === 'under_review' && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => toggleSupplierStatus(supplier)}
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Activate
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => revokeSupplierAccess(supplier)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <UserX className="w-4 h-4 mr-1" />
                            Revoke
                          </Button>
                        </>
                      )}
                      {supplier.status === 'revoked' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => toggleSupplierStatus(supplier)}
                          className="text-blue-600 border-blue-200 hover:bg-blue-50"
                        >
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          Restore Access
                        </Button>
                      )}
                    </div>
                  </div>
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
