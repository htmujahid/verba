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
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/client/components/ui/field'
import { authClient } from '@/client/lib/auth-client'
import { totpSchema, type TotpFormData } from './schemas'
import pathsConfig from '@/shared/config/paths.config'

export function TwoFactorForm() {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TotpFormData>({
    resolver: ajvResolver(totpSchema),
  })

  const onSubmit = (data: TotpFormData) => {
    startTransition(async () => {
      const { error } = await authClient.twoFactor.verifyTotp({
        code: data.code,
      })

      if (error) {
        toast.error(error.message || 'Invalid TOTP code')
        return
      }

      toast.success('Verification successful')
      navigate(pathsConfig.app.home)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="code">TOTP Code</FieldLabel>
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="Enter 6-digit code"
            {...register('code')}
            aria-invalid={!!errors.code}
            autoComplete="one-time-code"
          />
          <FieldError>{errors.code?.message}</FieldError>
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : 'Verify'}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
