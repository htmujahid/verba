import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VerifiedIcon from '@mui/icons-material/Verified'

import { authClient } from '@/client/lib/auth-client'

interface AccountDetailsFormProps {
  user?: {
    name?: string | null
    email?: string | null
  } | null
}

interface ProfileFormData {
  name: string
}

interface EmailFormData {
  email: string
}

export function AccountDetailsForm({ user }: AccountDetailsFormProps) {
  const [isUpdatingProfile, startProfileTransition] = useTransition()
  const [isUpdatingEmail, startEmailTransition] = useTransition()

  const [profileSuccess, setProfileSuccess] = useState('')
  const [profileError, setProfileError] = useState('')
  const [emailSuccess, setEmailSuccess] = useState('')
  const [emailError, setEmailError] = useState('')

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    values: {
      name: user?.name || '',
    },
  })

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>({
    values: {
      email: user?.email || '',
    },
  })

  const onProfileSubmit = (data: ProfileFormData) => {
    setProfileError('')
    setProfileSuccess('')

    startProfileTransition(async () => {
      const { error } = await authClient.updateUser({
        name: data.name,
      })

      if (error) {
        setProfileError(error.message || 'Failed to update profile')
        return
      }

      setProfileSuccess('Profile updated successfully')
    })
  }

  const onEmailSubmit = (data: EmailFormData) => {
    setEmailError('')
    setEmailSuccess('')

    if (data.email === user?.email) {
      setEmailError('New email must be different from current email')
      return
    }

    startEmailTransition(async () => {
      const { error } = await authClient.changeEmail({
        newEmail: data.email,
      })

      if (error) {
        setEmailError(error.message || 'Failed to update email')
        return
      }

      setEmailSuccess('Verification email sent to your new address')
    })
  }

  return (
    <Stack spacing={3}>
      {/* Profile Form */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <EditIcon color="primary" />
            <Typography variant="h6">Profile Information</Typography>
          </Box>

          {profileSuccess && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setProfileSuccess('')}>
              {profileSuccess}
            </Alert>
          )}
          {profileError && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setProfileError('')}>
              {profileError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleProfileSubmit(onProfileSubmit)}>
            <TextField
              fullWidth
              label="Display Name"
              {...registerProfile('name', { required: 'Name is required' })}
              error={!!profileErrors.name}
              helperText={profileErrors.name?.message}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isUpdatingProfile}
              sx={{ mt: 2 }}
            >
              {isUpdatingProfile ? <CircularProgress size={24} /> : 'Update Profile'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Email Form */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <VerifiedIcon color="primary" />
            <Typography variant="h6">Email Address</Typography>
          </Box>

          {emailSuccess && (
            <Alert severity="success" sx={{ mb: 2 }} onClose={() => setEmailSuccess('')}>
              {emailSuccess}
            </Alert>
          )}
          {emailError && (
            <Alert severity="error" sx={{ mb: 2 }} onClose={() => setEmailError('')}>
              {emailError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleEmailSubmit(onEmailSubmit)}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              {...registerEmail('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              error={!!emailErrors.email}
              helperText={emailErrors.email?.message || 'Changing email requires verification'}
              margin="normal"
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isUpdatingEmail}
              sx={{ mt: 2 }}
            >
              {isUpdatingEmail ? <CircularProgress size={24} /> : 'Update Email'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Stack>
  )
}
