import { Navigate, Outlet, useLocation } from 'react-router'
import { Box, CircularProgress } from '@mui/material'

import { authClient } from '@/client/lib/auth-client'
import pathsConfig from '@/shared/config/paths.config'

export default function ProtectedRoute() {
  const location = useLocation()
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  if (!session?.user) {
    return <Navigate to={pathsConfig.auth.signIn} state={{ from: location }} replace />
  }

  return <Outlet />
}
