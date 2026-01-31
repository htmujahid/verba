import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import DevicesIcon from '@mui/icons-material/Devices'
import ComputerIcon from '@mui/icons-material/Computer'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import TabletIcon from '@mui/icons-material/Tablet'
import DeleteIcon from '@mui/icons-material/Delete'
import RefreshIcon from '@mui/icons-material/Refresh'
import LogoutIcon from '@mui/icons-material/Logout'

import { authClient } from '@/client/lib/auth-client'

interface Session {
  token: string
  userId: string
  expiresAt: Date
  ipAddress?: string | null
  userAgent?: string | null
  createdAt: Date
  updatedAt: Date
}

function getDeviceIcon(userAgent: string | null | undefined) {
  if (!userAgent) return <ComputerIcon />
  const ua = userAgent.toLowerCase()
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return <PhoneAndroidIcon />
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return <TabletIcon />
  }
  return <ComputerIcon />
}

function parseUserAgent(userAgent: string | null | undefined): string {
  if (!userAgent) return 'Unknown Device'

  let browser = 'Unknown Browser'
  let os = 'Unknown OS'

  if (userAgent.includes('Firefox')) browser = 'Firefox'
  else if (userAgent.includes('Edg')) browser = 'Edge'
  else if (userAgent.includes('Chrome')) browser = 'Chrome'
  else if (userAgent.includes('Safari')) browser = 'Safari'

  if (userAgent.includes('Windows')) os = 'Windows'
  else if (userAgent.includes('Mac OS')) os = 'macOS'
  else if (userAgent.includes('Linux')) os = 'Linux'
  else if (userAgent.includes('Android')) os = 'Android'
  else if (userAgent.includes('iOS') || userAgent.includes('iPhone')) os = 'iOS'

  return `${browser} on ${os}`
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date))
}

export default function SessionsCard() {
  const queryClient = useQueryClient()
  const [success, setSuccess] = useState('')

  const { data: currentSession } = useQuery({
    queryKey: ['current-session'],
    queryFn: async () => {
      const { data } = await authClient.getSession()
      return data
    },
  })

  const {
    data: sessions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const { data, error } = await authClient.listSessions()
      if (error) throw new Error(error.message || 'Failed to load sessions')
      return (data || []) as Session[]
    },
  })

  const revokeSessionMutation = useMutation({
    mutationFn: async (token: string) => {
      const { error } = await authClient.revokeSession({ token })
      if (error) throw new Error(error.message || 'Failed to revoke session')
    },
    onSuccess: () => {
      setSuccess('Session revoked successfully')
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })

  const revokeOtherSessionsMutation = useMutation({
    mutationFn: async () => {
      const { error } = await authClient.revokeOtherSessions()
      if (error) throw new Error(error.message || 'Failed to revoke sessions')
    },
    onSuccess: () => {
      setSuccess('All other sessions revoked successfully')
      queryClient.invalidateQueries({ queryKey: ['sessions'] })
    },
  })

  const revokeAllSessionsMutation = useMutation({
    mutationFn: async () => {
      const { error } = await authClient.revokeSessions()
      if (error) throw new Error(error.message || 'Failed to revoke sessions')
    },
    onSuccess: () => {
      setSuccess('All sessions revoked. You will be signed out.')
    },
  })

  const isRevoking =
    revokeSessionMutation.isPending ||
    revokeOtherSessionsMutation.isPending ||
    revokeAllSessionsMutation.isPending

  const mutationError =
    revokeSessionMutation.error ||
    revokeOtherSessionsMutation.error ||
    revokeAllSessionsMutation.error

  const currentToken = currentSession?.session?.token

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DevicesIcon color="primary" />
            <Typography variant="h6">Active Sessions</Typography>
          </Box>
          <Tooltip title="Refresh">
            <IconButton onClick={() => refetch()} disabled={isLoading}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Manage your active sessions across all devices. You can sign out of individual sessions or all sessions at once.
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}
        {(error || mutationError) && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error?.message || mutationError?.message}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : sessions.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
            No active sessions found.
          </Typography>
        ) : (
          <>
            <List disablePadding>
              {sessions.map((session, index) => {
                const isCurrentSession = session.token === currentToken

                return (
                  <Box key={session.token}>
                    {index > 0 && <Divider />}
                    <ListItem
                      sx={{ px: 0, py: 2 }}
                      secondaryAction={
                        !isCurrentSession && (
                          <Tooltip title="Revoke session">
                            <IconButton
                              edge="end"
                              onClick={() => revokeSessionMutation.mutate(session.token)}
                              disabled={isRevoking}
                              color="error"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )
                      }
                    >
                      <ListItemIcon>
                        {getDeviceIcon(session.userAgent)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {parseUserAgent(session.userAgent)}
                            {isCurrentSession && (
                              <Chip label="Current" size="small" color="primary" />
                            )}
                          </Box>
                        }
                        secondary={
                          <Stack spacing={0.5} sx={{ mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              IP: {session.ipAddress || 'Unknown'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Last active: {formatDate(session.updatedAt)}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Expires: {formatDate(session.expiresAt)}
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                  </Box>
                )
              })}
            </List>

            <Divider sx={{ my: 2 }} />

            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button
                variant="outlined"
                color="warning"
                startIcon={<LogoutIcon />}
                onClick={() => revokeOtherSessionsMutation.mutate()}
                disabled={isRevoking || sessions.length <= 1}
              >
                Sign Out Other Devices
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<LogoutIcon />}
                onClick={() => revokeAllSessionsMutation.mutate()}
                disabled={isRevoking}
              >
                Sign Out All Devices
              </Button>
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  )
}
