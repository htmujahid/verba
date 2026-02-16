import { useTransition } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Button } from '@/client/components/ui/button'
import { Input } from '@/client/components/ui/input'
import { Spinner } from '@/client/components/ui/spinner'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/client/components/ui/field'
import { authClient } from '@/client/lib/auth-client'
import { forgotPasswordSchema, type ForgotPasswordFormData } from './schemas'

export function ForgotPasswordForm() {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
    startTransition(async () => {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: '/auth/reset-password',
      })

      if (error) {
        toast.error(error.message || 'Failed to send reset email')
        return
      }

      toast.success('If an account exists with that email, we\'ve sent a password reset link')
      navigate('/auth/sign-in')
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register('email')}
            aria-invalid={!!errors.email}
            autoComplete="email"
          />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : 'Send Reset Link'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
