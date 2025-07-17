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

        {/* Enhanced Support Section */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-gray-600 text-sm">Our support team is here to assist you with any login issues or questions.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Building2 className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">Manager Support</span>
              </div>
              <p className="text-sm text-blue-700">Issues with dashboard access, user management, or system administration</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">Supplier Support</span>
              </div>
              <p className="text-sm text-green-700">Help with supplier portal, inventory updates, or order management</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/support">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4" />
                Contact Support Team
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              onClick={() => window.open('mailto:loveesh1gulati@gmail.com', '_blank')}
            >
              <ArrowRight className="h-4 w-4" />
              Email Support
            </Button>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-center items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
