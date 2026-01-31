import { Outlet } from 'react-router'
import { Box } from '@mui/material'

import Logo from '@/client/components/Logo'

export default function AuthLayout() {
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
