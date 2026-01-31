import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { ajvResolver } from '@hookform/resolvers/ajv'
import { Box, Button, TextField, CircularProgress, Alert } from '@mui/material'

import { authClient } from '@/client/lib/auth-client'
import { signUpSchema, type SignUpFormData } from './schemas'
import pathsConfig from '@/shared/config/paths.config'

interface SignUpFormProps {
  onSuccess: (email: string) => void
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: ajvResolver(signUpSchema),
  })

  const onSubmit = (data: SignUpFormData) => {
    setError('')

    startTransition(async () => {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: pathsConfig.app.home,
      })

      if (error) {
        setError(error.message || 'Failed to sign up')
        return
      }

      onSuccess(data.email)
    })
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
        margin="normal"
        autoComplete="name"
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        margin="normal"
        autoComplete="email"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message || 'At least 8 characters'}
        margin="normal"
        autoComplete="new-password"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isPending}
        sx={{ mt: 3 }}
      >
        {isPending ? <CircularProgress size={24} /> : 'Sign Up'}
      </Button>
    </Box>
  )
}
