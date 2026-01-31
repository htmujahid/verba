import { Link as RouterLink } from 'react-router'
import { Box, Divider, Link, Paper, Typography } from '@mui/material'

import { SignInForm } from '@/client/components/auth/SignInForm'
import { SocialSignIn } from '@/client/components/auth/SocialSignIn'

export default function SignIn() {
  return (
    <Paper elevation={2} sx={{ p: 5, width: '100%' }}>
      <Typography variant="h5" component="h1" fontWeight={600} textAlign="center" mb={3}>
        Sign In
      </Typography>

      <SignInForm />

      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Link component={RouterLink} to="/auth/forgot-password" variant="body2" color="text.secondary">
          Forgot password?
        </Link>
      </Box>

      <Divider sx={{ my: 3 }}>or</Divider>

      <SocialSignIn />

      <Typography variant="body2" color="text.secondary" textAlign="center" mt={3}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/auth/sign-up">
          Sign up
        </Link>
      </Typography>
    </Paper>
  )
}
