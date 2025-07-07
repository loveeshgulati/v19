"use client"

import { Layout } from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, Users, Truck, TrendingUp, AlertTriangle, CheckCircle, Clock, UserCheck, UserX } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"




export default function DashboardPage() {
  const { user } = useAuth()
  const isManager = user?.role === 'manager'
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your SplyBob control center</p>
        </div>

        {/* Welcome Card */}
        <Card>
          <CardHeader>
            <CardTitle>Welcome to SplyBob</CardTitle>
            <CardDescription>Your supply chain management system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Package className="h-16 w-16 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome, {user?.name || user?.email}
              </h3>
              <p className="text-gray-600 mb-6">
                {isManager 
                  ? "Manage your inventory, suppliers, and procurement from here."
                  : "Manage your inventory and view your orders from here."
                }
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {isManager ? (
                  <>
                    <a href="/inventory" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      <Package className="h-4 w-4 mr-2" />
                      Manage Inventory
                    </a>
                    <a href="/suppliers" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Suppliers
                    </a>
                    <a href="/procurement" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Procurement
                    </a>
                  </>
                ) : (
                  <>
                    <a href="/supplier-inventory" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      <Package className="h-4 w-4 mr-2" />
                      My Inventory
                    </a>
                    <a href="/supplier-procurement" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Purchase Orders
                    </a>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Role</CardTitle>
              <UserCheck className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold capitalize">{user?.role}</div>
              <p className="text-xs text-gray-600">Your account type</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">System Status</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Online</div>
              <p className="text-xs text-gray-600">All systems operational</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Data Source</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">Database</div>
              <p className="text-xs text-gray-600">Real-time data</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Last Login</CardTitle>
              <Clock className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Now</div>
              <p className="text-xs text-gray-600">Current session</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
