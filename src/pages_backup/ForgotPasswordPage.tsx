"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const validEmails = ["admin@splyBob.com", "user@splyBob.com", "manager@splyBob.com"]

      if (!validEmails.includes(email)) {
        setError("No account found with this email address")
        setIsLoading(false)
        return
      }

      setIsEmailSent(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">Didn't receive the email? Check your spam folder or try again.</p>

                <div className="space-y-2">
                  <button
                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={() => {
                      setIsEmailSent(false)
                      setEmail("")
                    }}
                  >
                    Try different email
                  </button>

                  <button
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Resending..." : "Resend email"}
                  </button>
                </div>

                <div className="pt-4 border-t">
                  <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500">
                    ← Back to sign in
                  </Link>
                </div>
              </div>

              {/* Mock email preview for demo */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span>📧</span>
                  <span className="text-sm font-medium text-blue-800">Demo Email Preview</span>
                </div>
                <div className="text-xs text-blue-700 space-y-1">
                  <p>
                    <strong>To:</strong> {email}
                  </p>
                  <p>
                    <strong>Subject:</strong> Reset your SplyBob password
                  </p>
                  <p>
                    <strong>Reset Link:</strong>
                    <Link to="/reset-password?token=demo-token" className="text-blue-600 hover:underline ml-1">
                      Click here to reset password
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-2xl">🏢</span>
            <span className="text-2xl font-bold text-gray-900">SplyBob</span>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">{error}</div>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email address"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? "Sending reset link..." : "Send reset link"}
            </button>

            <div className="text-center">
              <Link to="/login" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500">
                ← Back to sign in
              </Link>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Demo Emails</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Try these emails:</strong>
                <br />
                admin@splyBob.com
                <br />
                user@splyBob.com
                <br />
                manager@splyBob.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
