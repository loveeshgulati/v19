"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export function LogoutPage() {
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setUserEmail(user.email)
    }

    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
  }, [])

  const handleSendResetLink = async () => {
    alert(`Password reset link sent to ${userEmail}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">🏢</span>
            <span className="text-2xl font-bold text-gray-900">SplyBob</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully logged out</h2>
            <p className="text-gray-600 mb-6">You have been safely logged out of your SplyBob account</p>

            <div className="space-y-3">
              <Link
                to="/login"
                className="w-full inline-flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in again →
              </Link>

              <Link
                to="/signup"
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create new account
              </Link>
            </div>

            {userEmail && (
              <div className="pt-4 border-t mt-6">
                <div className="text-center space-y-3">
                  <p className="text-sm text-gray-600">Need to reset your password?</p>

                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span>📧</span>
                      <span className="text-sm font-medium text-blue-800">Send Reset Link</span>
                    </div>
                    <p className="text-xs text-blue-700 mb-3">
                      We'll send a password reset link to: <strong>{userEmail}</strong>
                    </p>
                    <button
                      className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={handleSendResetLink}
                    >
                      Send reset link to email
                    </button>
                  </div>

                  <div className="text-xs text-gray-500">
                    Or{" "}
                    <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500">
                      use the forgot password form
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
