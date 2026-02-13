import { useTransition } from 'react'
import { Link, useNavigate } from 'react-router'
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
  FieldSeparator,
} from '@/client/components/ui/field'
import { authClient } from '@/client/lib/auth-client'
import { OAuthProviders } from './oauth-providers'
import { signInSchema, type SignInFormData } from './schemas'
import pathsConfig from '@/shared/config/paths.config'

export function PasswordSignInForm() {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: ajvResolver(signInSchema),
  })

  const onSubmit = (data: SignInFormData) => {
    startTransition(async () => {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      })

      if (error) {
        toast.error(error.message || 'Failed to sign in')
        return
      }

      navigate(pathsConfig.app.home)
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
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link to="/auth/forgot-password" className="text-sm text-muted-foreground hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            {...register('password')}
            aria-invalid={!!errors.password}
            autoComplete="current-password"
          />
          <FieldError>{errors.password?.message}</FieldError>
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : 'Sign In'}
          </Button>
        </Field>

        <FieldSeparator>or</FieldSeparator>

        <Field>
          <OAuthProviders />
          <FieldDescription className="text-center">
            Don't have an account?{' '}
            <Link to="/auth/sign-up">Sign up</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
