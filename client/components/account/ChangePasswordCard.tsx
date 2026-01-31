import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'

import { authClient } from '@/client/lib/auth-client'

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export default function ChangePasswordCard() {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [revokeOtherSessions, setRevokeOtherSessions] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<PasswordFormData>()

  const newPassword = watch('newPassword')

  const onSubmit = (data: PasswordFormData) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const { error } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions,
      })

      if (error) {
        setError(error.message || 'Failed to change password')
        return
      }

      setSuccess('Password changed successfully')
      reset()
    })
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <LockIcon color="primary" />
          <Typography variant="h6">Change Password</Typography>
        </Box>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            {...register('currentPassword', { required: 'Current password is required' })}
            error={!!errors.currentPassword}
            helperText={errors.currentPassword?.message}
            margin="normal"
            autoComplete="current-password"
          />

          <TextField
            fullWidth
            type="password"
            label="New Password"
            {...register('newPassword', {
              required: 'New password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            })}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message || 'At least 8 characters'}
            margin="normal"
            autoComplete="new-password"
          />

          <TextField
            fullWidth
            type="password"
            label="Confirm New Password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === newPassword || 'Passwords do not match',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            margin="normal"
            autoComplete="new-password"
          />

          <FormControlLabel
            control={
              <Switch
                checked={revokeOtherSessions}
                onChange={(e) => setRevokeOtherSessions(e.target.checked)}
              />
            }
            label="Sign out of all other devices"
            sx={{ mt: 1 }}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isPending}
            sx={{ mt: 2 }}
          >
            {isPending ? <CircularProgress size={24} /> : 'Change Password'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
