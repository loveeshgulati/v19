"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-4xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">SplyBob</h1>
          <p className="text-gray-600 text-lg">Choose your login portal</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Manager Login */}
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
                <Building2 className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-600">SplyBob Manager</CardTitle>
              <CardDescription className="text-gray-600">
                Full access to inventory, procurement, and analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  Complete dashboard access
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  Manage all suppliers and inventory
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  Create and track purchase orders
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowRight className="h-4 w-4 mr-2 text-blue-500" />
                  Advanced analytics and reporting
                </div>
              </div>
              <Link href="/manager-login" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Login as Manager
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Supplier Login */}
          <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-green-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-20 h-20 flex items-center justify-center">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">Supplier Portal</CardTitle>
              <CardDescription className="text-gray-600">
                Access your inventory, orders, and collaborate with SplyBob
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  View your inventory items
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  Track purchase orders
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  Update order status
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  Supplier dashboard
                </div>
              </div>
              <Link href="/supplier-login" className="w-full">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Login as Supplier
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Need help? Contact our support team</p>
        </div>
      </div>
    </div>
  )
}
