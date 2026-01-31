import { Navigate, Outlet } from 'react-router'
import { Box, CircularProgress } from '@mui/material'

import { Logo } from '@/client/components/Logo'
import { authClient } from '@/client/lib/auth-client'
import pathsConfig from '@/shared/config/paths.config'

export function AuthLayout() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (session?.user) {
    return <Navigate to={pathsConfig.app.home} replace />
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        px: 3,
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Logo size="large" />
      </Box>

      <Box sx={{ width: '100%', maxWidth: 440 }}>
        <Outlet />
      </Box>
    </Box>
  )
}
