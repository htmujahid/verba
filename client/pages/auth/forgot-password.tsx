import { Link } from 'react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/client/components/ui/card'
import { ForgotPasswordForm } from '@/client/components/auth/forgot-password-form'

export default function ForgotPassword() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Forgot password</CardTitle>
        <CardDescription>
          Enter your email and we'll send you a reset link
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ForgotPasswordForm />

        <div className="mt-6 text-center">
          <Link to="/auth/sign-in" className="text-sm text-muted-foreground hover:underline">
            Back to Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
