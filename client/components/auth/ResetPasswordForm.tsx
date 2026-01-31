import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { ajvResolver } from '@hookform/resolvers/ajv'
import { Box, Button, TextField, CircularProgress, Alert } from '@mui/material'

import { authClient } from '@/client/lib/auth-client'
import { resetPasswordSchema, type ResetPasswordFormData } from './schemas'

interface ResetPasswordFormProps {
  token: string
  onSuccess: () => void
}

export function ResetPasswordForm({ token, onSuccess }: ResetPasswordFormProps) {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: ajvResolver(resetPasswordSchema),
  })

  const onSubmit = (data: ResetPasswordFormData) => {
    setError('')

    startTransition(async () => {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token,
      })

      if (error) {
        setError(error.message || 'Failed to reset password')
        return
      }

      onSuccess()
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
        label="New Password"
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
        {isPending ? <CircularProgress size={24} /> : 'Reset Password'}
      </Button>
    </Box>
  )
}
