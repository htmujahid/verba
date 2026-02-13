import { useTransition } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { ajvResolver } from '@hookform/resolvers/ajv'
import { toast } from 'sonner'

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
import { resetPasswordSchema, type ResetPasswordFormData } from './schemas'

interface ResetPasswordFormProps {
  token: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: ajvResolver(resetPasswordSchema),
  })

  const onSubmit = (data: ResetPasswordFormData) => {
    startTransition(async () => {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token,
      })

      if (error) {
        toast.error(error.message || 'Failed to reset password')
        return
      }

      toast.success('Your password has been reset successfully')
      navigate('/auth/sign-in')
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <Input
            id="password"
            type="password"
            {...register('password')}
            aria-invalid={!!errors.password}
            autoComplete="new-password"
          />
          <FieldError>{errors.password?.message}</FieldError>
          <FieldDescription>
            Must be at least 8 characters long.
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : 'Reset Password'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
