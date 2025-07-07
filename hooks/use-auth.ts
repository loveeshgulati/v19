"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  name: string
  email: string
  role: string
  company?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("authToken")
      const userData = localStorage.getItem("user")

      if (token && userData) {
        setUser(JSON.parse(userData))
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = (userData: User, token: string) => {
    localStorage.setItem("authToken", token)
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    // Don't clear localStorage here - let the logout page handle it
    router.push("/logout")
  }

  const isAuthenticated = !!user

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuth,
  }
}
