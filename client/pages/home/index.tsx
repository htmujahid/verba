import { Box, Typography, Card, CardContent, Grid, Avatar, Button, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import HistoryIcon from '@mui/icons-material/History'

import { authClient } from '@/client/lib/auth-client'
import pathsConfig from '@/shared/config/paths.config'

export default function Dashboard() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Welcome back, {user?.name || 'User'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your account today.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
                {user?.name?.charAt(0).toUpperCase() || <PersonIcon />}
              </Avatar>
              <Typography variant="h6">{user?.name}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
              <Button
                component={RouterLink}
                to={pathsConfig.app.account}
                variant="outlined"
                size="small"
                sx={{ mt: 2 }}
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Quick Actions</Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Button
                  component={RouterLink}
                  to={pathsConfig.app.account}
                  variant="contained"
                  startIcon={<SettingsIcon />}
                >
                  Account Settings
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<HistoryIcon />}
                >
                  Activity Log
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Activity</Typography>
              <Typography variant="body2" color="text.secondary">
                No recent activity to display.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}
