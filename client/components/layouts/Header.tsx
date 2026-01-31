import { useNavigate } from 'react-router'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'

import Logo from '@/client/components/Logo'
import { authClient } from '@/client/lib/auth-client'

export default function Header() {
  const navigate = useNavigate()
  const { data: session, isPending } = authClient.useSession()

  const handleSignOut = async () => {
    await authClient.signOut()
    navigate('/')
  }

  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Logo color="primary" />

          <Box sx={{ flexGrow: 1 }} />

          {!isPending && (
            session?.user ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button color="inherit" onClick={() => navigate('/dashboard')}>
                  Dashboard
                </Button>
                <Button variant="outlined" color="inherit" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button color="inherit" onClick={() => navigate('/auth/sign-in')}>
                  Sign In
                </Button>
                <Button variant="contained" onClick={() => navigate('/auth/sign-up')}>
                  Get Started
                </Button>
              </Box>
            )
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}
