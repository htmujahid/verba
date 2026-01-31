import { useState } from 'react'
import { Link as RouterLink, useSearchParams, useNavigate } from 'react-router'
import { Box, Button, Link, Paper, Typography, Alert } from '@mui/material'

import { ResetPasswordForm } from '@/client/components/auth/ResetPasswordForm'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const [success, setSuccess] = useState(false)

  if (!token) {
    return (
      <Paper elevation={2} sx={{ p: 5, width: '100%' }}>
        <Typography variant="h5" component="h1" fontWeight={600} textAlign="center" mb={3}>
          Invalid Link
        </Typography>
        <Alert severity="error">
          This password reset link is invalid or has expired.
        </Alert>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Link component={RouterLink} to="/auth/forgot-password">
            Request a new reset link
          </Link>
        </Box>
      </Paper>
    )
  }

  if (success) {
    return (
      <Paper elevation={2} sx={{ p: 5, width: '100%' }}>
        <Typography variant="h5" component="h1" fontWeight={600} textAlign="center" mb={3}>
          Password Reset
        </Typography>
        <Alert severity="success">
          Your password has been reset successfully.
        </Alert>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Button variant="contained" onClick={() => navigate('/auth/sign-in')}>
            Sign In
          </Button>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper elevation={2} sx={{ p: 5, width: '100%' }}>
      <Typography variant="h5" component="h1" fontWeight={600} textAlign="center" mb={2}>
        Reset Password
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
        Enter your new password.
      </Typography>

      <ResetPasswordForm token={token} onSuccess={() => setSuccess(true)} />

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Link component={RouterLink} to="/auth/sign-in" color="text.secondary">
          Back to Sign In
        </Link>
      </Box>
    </Paper>
  )
}
