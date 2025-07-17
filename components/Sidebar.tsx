"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building2, LayoutDashboard, Package, ShoppingCart, Users, Truck, Menu, X, HelpCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

const managerNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Procurement", href: "/procurement", icon: ShoppingCart },
  { name: "Suppliers", href: "/suppliers", icon: Users },
  { name: "Logistics", href: "/logistics", icon: Truck },
  { name: "Support", href: "/support", icon: HelpCircle },
]

const supplierNavigation = [
  { name: "Dashboard", href: "/supplier-dashboard", icon: LayoutDashboard },
  { name: "My Inventory", href: "/supplier-inventory", icon: Package },
  { name: "Purchase Orders", href: "/supplier-procurement", icon: ShoppingCart },
  { name: "Support", href: "/support", icon: HelpCircle },
]

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()
  
  // Get navigation based on user role
  const navigation = user?.role === 'supplier' ? supplierNavigation : managerNavigation

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md bg-white shadow-md">
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:inset-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <Building2 className="h-8 w-8 text-white" />
          <span className="ml-2 text-xl font-bold text-white">SplyBob</span>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }
                  `}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
