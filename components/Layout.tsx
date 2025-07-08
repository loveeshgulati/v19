"use client"

import type React from "react"

import { Sidebar } from "./Sidebar"
import { Header } from "./header"
import { AuthGuard } from "./AuthGuard"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <AuthGuard>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  )
}
