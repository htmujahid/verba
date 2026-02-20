import { useState, useTransition } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Mail } from 'lucide-react'

import { Button } from '@/client/components/ui/button'
import { Input } from '@/client/components/ui/input'
import { Spinner } from '@/client/components/ui/spinner'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/client/components/ui/field'
import { authClient } from '@/client/lib/auth-client'
import { otpSchema, type OtpFormData } from './schemas'
import pathsConfig from '@/client/config/paths.config'

export function OtpForm() {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()
  const [isOtpSent, setIsOtpSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  })

  const requestOtp = () => {
    startTransition(async () => {
      const { error } = await authClient.twoFactor.sendOtp()

      if (error) {
        toast.error(error.message || 'Failed to send OTP')
        return
      }

      toast.success('OTP sent to your email')
      setIsOtpSent(true)
    })
  }

  const onSubmit = (data: OtpFormData) => {
    startTransition(async () => {
      const { error } = await authClient.twoFactor.verifyOtp({
        code: data.code,
      })

      if (error) {
        toast.error(error.message || 'Invalid OTP')
        return
      }

      toast.success('OTP verified successfully')
      navigate(pathsConfig.app.home)
    })
  }

  if (!isOtpSent) {
    return (
      <Field>
        <Button onClick={requestOtp} className="w-full" disabled={isPending}>
          {isPending ? <Spinner /> : <><Mail className="mr-2 h-4 w-4" /> Send OTP to Email</>}
        </Button>
      </Field>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="code">One-Time Password</FieldLabel>
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
            {...register('code')}
            aria-invalid={!!errors.code}
            autoComplete="one-time-code"
          />
          <FieldError>{errors.code?.message}</FieldError>
          <FieldDescription>Check your email for the OTP</FieldDescription>
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : 'Verify OTP'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
