'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ShieldX, ArrowLeft, Users } from 'lucide-react'
import Link from 'next/link'

export default function SupplierSignupPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to login after 5 seconds
    const timeout = setTimeout(() => {
      router.push('/login')
    }, 10000)

    return () => clearTimeout(timeout)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center">
            <ShieldX className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">Access Restricted</CardTitle>
          <CardDescription>Supplier signup is not available for direct registration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-blue-200 bg-blue-50">
            <Users className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Supplier accounts are managed by system administrators.</strong>
              <br /><br />
              If you need supplier access:
              <br />
              • Contact your system manager
              <br />
              • Provide your company details
              <br />
              • Wait for account creation
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Link href="/supplier-login" className="block">
              <Button variant="outline" className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Already have an account? Login
              </Button>
            </Link>
            
            <Link href="/login" className="block">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Main Login
              </Button>
            </Link>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Redirecting to main login in 10 seconds...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
