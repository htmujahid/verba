import { useEffect, useState } from 'react'
import { NavLink } from 'react-router'
import { AppBar, Box, Button, Chip, Toolbar, Typography } from '@mui/material'

import { API_ROUTES, APP_CONFIG, type HealthStatus } from '../../shared'

export default function Header() {
  const [health, setHealth] = useState<HealthStatus | null>(null)

  useEffect(() => {
    fetch(API_ROUTES.health)
      .then(res => res.json())
      .then(setHealth)
  }, [])

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {APP_CONFIG.appName}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Button
            component={NavLink}
            to="/"
            color="inherit"
            sx={{
              '&.active': { borderBottom: '2px solid white' },
            }}
          >
            Home
          </Button>
          <Button
            component={NavLink}
            to="/about"
            color="inherit"
            sx={{
              '&.active': { borderBottom: '2px solid white' },
            }}
          >
            About
          </Button>
          <Button
            component={NavLink}
            to="/contact"
            color="inherit"
            sx={{
              '&.active': { borderBottom: '2px solid white' },
            }}
          >
            Contact
          </Button>
          <Chip
            label={health?.status ?? '...'}
            color={health?.status === 'ok' ? 'success' : 'default'}
            size="small"
            sx={{ ml: 2 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
