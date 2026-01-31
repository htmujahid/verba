import { useState } from 'react'
import { Link as RouterLink } from 'react-router'
import { Box, Link, Paper, Typography, Alert } from '@mui/material'

import { ForgotPasswordForm } from '@/client/components/auth/ForgotPasswordForm'

export default function ForgotPassword() {
  const [successEmail, setSuccessEmail] = useState('')

  if (successEmail) {
    return (
      <Paper elevation={2} sx={{ p: 5, width: '100%' }}>
        <Typography variant="h5" component="h1" fontWeight={600} textAlign="center" mb={3}>
          Check Your Email
        </Typography>
        <Alert severity="success">
          If an account exists with <strong>{successEmail}</strong>, we've sent a password reset link.
        </Alert>
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Link component={RouterLink} to="/auth/sign-in">
            Back to Sign In
          </Link>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper elevation={2} sx={{ p: 5, width: '100%' }}>
      <Typography variant="h5" component="h1" fontWeight={600} textAlign="center" mb={2}>
        Forgot Password
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
        Enter your email and we'll send you a reset link.
      </Typography>

      <ForgotPasswordForm onSuccess={setSuccessEmail} />

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Link component={RouterLink} to="/auth/sign-in" color="text.secondary">
          Back to Sign In
        </Link>
      </Box>
    </Paper>
  )
}
