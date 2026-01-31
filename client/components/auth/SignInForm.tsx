import { useState, useTransition } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { ajvResolver } from '@hookform/resolvers/ajv'
import { Box, Button, TextField, CircularProgress, Alert } from '@mui/material'

import { authClient } from '@/client/lib/auth-client'
import { signInSchema, type SignInFormData } from './schemas'
import pathsConfig from '@/shared/config/paths.config'

export default function SignInForm() {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: ajvResolver(signInSchema),
  })

  const onSubmit = (data: SignInFormData) => {
    setError('')

    startTransition(async () => {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      })

      if (error) {
        setError(error.message || 'Failed to sign in')
        return
      }

      navigate(pathsConfig.app.home)
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
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        margin="normal"
        autoComplete="current-password"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        size="large"
        disabled={isPending}
        sx={{ mt: 3 }}
      >
        {isPending ? <CircularProgress size={24} /> : 'Sign In'}
      </Button>
    </Box>
  )
}
