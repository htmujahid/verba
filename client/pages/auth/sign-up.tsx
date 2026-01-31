import { useState } from 'react'
import { Link as RouterLink } from 'react-router'
import { Box, Divider, Link, Paper, Typography, Alert } from '@mui/material'

import SignUpForm from '@/client/components/auth/SignUpForm'
import SocialSignIn from '@/client/components/auth/SocialSignIn'

export default function SignUp() {
  const [successEmail, setSuccessEmail] = useState('')

  if (successEmail) {
    return (
      <Paper elevation={2} sx={{ p: 5, width: '100%' }}>
        <Typography variant="h5" component="h1" fontWeight={600} textAlign="center" mb={3}>
          Check Your Email
        </Typography>
        <Alert severity="success">
          We've sent a verification link to <strong>{successEmail}</strong>.
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
      <Typography variant="h5" component="h1" fontWeight={600} textAlign="center" mb={3}>
        Sign Up
      </Typography>

      <SignUpForm onSuccess={setSuccessEmail} />

      <Divider sx={{ my: 3 }}>or</Divider>

      <SocialSignIn />

      <Typography variant="body2" color="text.secondary" textAlign="center" mt={3}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/auth/sign-in">
          Sign in
        </Link>
      </Typography>
    </Paper>
  )
}
