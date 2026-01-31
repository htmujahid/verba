import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

import { Logo } from '@/client/components/Logo'
import { authClient } from '@/client/lib/auth-client'
import pathsConfig from '@/shared/config/paths.config'

export function Header() {
  const navigate = useNavigate()
  const { data: session, isPending } = authClient.useSession()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const user = session?.user

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNavigate = (path: string) => {
    handleMenuClose()
    navigate(path)
  }

  const handleSignOut = async () => {
    handleMenuClose()
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
            user ? (
              <>
                <IconButton
                  onClick={handleMenuOpen}
                  size="small"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar
                    src={user.image || undefined}
                    alt={user.name || 'User'}
                    sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}
                  >
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
                <Menu
                  id="account-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  slotProps={{
                    paper: {
                      sx: { width: 220, mt: 1 },
                    },
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle2" noWrap>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {user.email}
                    </Typography>
                  </Box>
                  <Divider />
                  <MenuItem onClick={() => handleNavigate(pathsConfig.app.home)}>
                    <ListItemIcon>
                      <HomeIcon fontSize="small" />
                    </ListItemIcon>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate(pathsConfig.app.account)}>
                    <ListItemIcon>
                      <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                    Account Settings
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button color="inherit" onClick={() => navigate(pathsConfig.auth.signIn)}>
                  Sign In
                </Button>
                <Button variant="contained" onClick={() => navigate(pathsConfig.auth.signUp)}>
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
