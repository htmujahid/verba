import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { ajvResolver } from '@hookform/resolvers/ajv'
import { Box, Button, TextField, CircularProgress, Alert } from '@mui/material'

import { authClient } from '@/client/lib/auth-client'
import { forgotPasswordSchema, type ForgotPasswordFormData } from './schemas'

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void
}

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: ajvResolver(forgotPasswordSchema),
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
    setError('')

    startTransition(async () => {
      const { error } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: '/auth/reset-password',
      })

      if (error) {
        setError(error.message || 'Failed to send reset email')
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
        label="Email"
        type="email"
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
        margin="normal"
        autoComplete="email"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isPending}
        sx={{ mt: 3 }}
      >
        {isPending ? <CircularProgress size={24} /> : 'Send Reset Link'}
      </Button>
    </Box>
  )
}
