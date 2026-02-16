import { Link } from 'react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/client/components/ui/card'
import { TwoFactorForm } from '@/client/components/auth/two-factor-form'

export default function TwoFactorPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">TOTP Verification</CardTitle>
        <CardDescription>
          Enter your 6-digit TOTP code to authenticate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TwoFactorForm />

        <div className="mt-6 text-center">
          <Link to="/auth/two-factor/otp" className="text-sm text-muted-foreground hover:underline">
            Switch to Email Verification
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
