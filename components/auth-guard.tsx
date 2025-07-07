"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
}

const publicRoutes = ["/login", "/signup", "/forgot-password", "/reset-password", "/logout"]

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading) {
      const isPublicRoute = publicRoutes.includes(pathname)

      if (!isAuthenticated && !isPublicRoute) {
        router.push("/login")
      } else if (isAuthenticated && isPublicRoute) {
        router.push("/")
      }
    }
  }, [isAuthenticated, isLoading, pathname, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  const isPublicRoute = publicRoutes.includes(pathname)

  if (!isAuthenticated && !isPublicRoute) {
    return null // Will redirect to login
  }

  if (isAuthenticated && isPublicRoute) {
    return null // Will redirect to dashboard
  }

  return <>{children}</>
}
