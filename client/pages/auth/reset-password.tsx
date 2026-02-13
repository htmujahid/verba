import { Link, useSearchParams } from 'react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/client/components/ui/card'
import { ResetPasswordForm } from '@/client/components/auth/reset-password-form'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  if (!token) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Invalid link</CardTitle>
          <CardDescription>
            This password reset link is invalid or has expired
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <Link to="/auth/forgot-password" className="text-sm text-muted-foreground hover:underline">
              Request a new reset link
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Reset password</CardTitle>
        <CardDescription>
          Enter your new password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm token={token} />

        <div className="mt-6 text-center">
          <Link to="/auth/sign-in" className="text-sm text-muted-foreground hover:underline">
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
