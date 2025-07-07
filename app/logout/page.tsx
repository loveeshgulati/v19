"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, CheckCircle, Mail, ArrowRight } from "lucide-react"

export default function LogoutPage() {
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    // Get user email from localStorage before it's cleared
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setUserEmail(user.email)
    }

    // Clear authentication data
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
  }, [])

  const handleSendResetLink = async () => {
    // Simulate sending reset email
    alert(`Password reset link sent to ${userEmail}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">SplyBob</span>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle>Successfully logged out</CardTitle>
            <CardDescription>You have been safely logged out of your SplyBob account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/login">
                  Sign in again
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/signup">Create new account</Link>
              </Button>
            </div>

            {userEmail && (
              <div className="pt-4 border-t">
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-600">Need to reset your password?</p>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Send Reset Link</span>
                    </div>
                    <p className="text-xs text-blue-700 mb-3">
                      We'll send a password reset link to: <strong>{userEmail}</strong>
                    </p>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={handleSendResetLink}>
                      Send reset link to email
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500">
                    Or{" "}
                    <Link href="/forgot-password" className="text-blue-600 hover:text-blue-500">
                      use the forgot password form
                    </Link>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t text-center">
              <p className="text-xs text-gray-500">
                Having trouble? Contact our{" "}
                <Link href="/support" className="text-blue-600 hover:text-blue-500">
                  support team
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
