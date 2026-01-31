import { Box, Button } from '@mui/material'
import { GitHub, Google } from '@mui/icons-material'

import { authClient } from '@/client/lib/auth-client'
import pathsConfig from '@/shared/config/paths.config'

export function SocialSignIn() {
  const handleSocialSignIn = async (provider: 'github' | 'google') => {
    await authClient.signIn.social({
      provider,
      callbackURL: pathsConfig.app.home,
    })
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GitHub />}
        onClick={() => handleSocialSignIn('github')}
      >
        Continue with GitHub
      </Button>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<Google />}
        onClick={() => handleSocialSignIn('google')}
      >
        Continue with Google
      </Button>
    </Box>
  )
}
