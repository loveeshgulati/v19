"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SupplierLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
const [error, setError] = useState("")
  const { supplierLogin } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { success, error: loginError } = await supplierLogin(email, password);

    if (!success) {
      setError(loginError || "Invalid supplier credentials")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
            <Users className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">Supplier Portal</CardTitle>
          <CardDescription>Sign in to access your supplier dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Supplier Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="supplier@company.com"
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {error && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{error}</div>}
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? "Signing in..." : "Sign In as Supplier"}
            </Button>
          </form>
          
          <div className="mt-6 space-y-3">
            <div className="text-center">
              <Link href="/forgot-password" className="text-green-600 hover:underline text-sm">
                Forgot your password?
              </Link>
            </div>
            
            <div className="pt-4 border-t">
              <Link href="/login" className="flex items-center justify-center text-gray-600 hover:text-gray-800 text-sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to login options
              </Link>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
            <p className="font-medium text-blue-800">Supplier Access:</p>
            <p className="text-blue-700">Accounts are created by system managers. Contact your manager if you need access.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
