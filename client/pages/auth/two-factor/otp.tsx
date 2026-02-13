import { Link } from 'react-router'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/client/components/ui/card'
import { OtpForm } from '@/client/components/auth/otp-form'

export default function OtpPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Email Verification</CardTitle>
        <CardDescription>
          Verify your identity with a one-time password
        </CardDescription>
      </CardHeader>
      <CardContent>
        <OtpForm />

        <div className="mt-6 text-center">
          <Link to="/auth/two-factor" className="text-sm text-muted-foreground hover:underline">
            Switch to TOTP Verification
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
