import { useTransition } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { signUpSchema, type SignUpFormData } from './schemas'
import pathsConfig from '@/client/config/paths.config'

export function PasswordSignUpForm() {
  const navigate = useNavigate()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  })

  const onSubmit = (data: SignUpFormData) => {
    startTransition(async () => {
      const { error } = await authClient.signUp.email({
        name: data.email.split('@')[0],
        email: data.email,
        password: data.password,
        callbackURL: pathsConfig.app.home,
      })

      if (error) {
        toast.error(error.message || 'Failed to sign up')
        return
      }

      toast.success('Check your email for a verification link')
      navigate(pathsConfig.auth.signIn)
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
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            {...register('password')}
            aria-invalid={!!errors.password}
            autoComplete="new-password"
          />
          <FieldError>{errors.password?.message}</FieldError>
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Spinner /> : 'Create Account'}
          </Button>
        </Field>

        <FieldSeparator>or</FieldSeparator>

        <Field>
          <OAuthProviders />
          <FieldDescription className="text-center">
            Already have an account?{' '}
            <Link to="/auth/sign-in">Sign in</Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
