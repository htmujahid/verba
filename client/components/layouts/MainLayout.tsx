import { Outlet } from 'react-router'
import { Box } from '@mui/material'

import { Header } from './Header'
import { Footer } from './Footer'

export function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}
