import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  MonitorSmartphoneIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
  Trash2Icon,
  RefreshCwIcon,
  LogOutIcon,
} from 'lucide-react'

import { Card, CardContent } from '@/client/components/ui/card'
import { Button } from '@/client/components/ui/button'
import { Badge } from '@/client/components/ui/badge'
import { Alert, AlertDescription, AlertAction } from '@/client/components/ui/alert'
import { Separator } from '@/client/components/ui/separator'
import { Spinner } from '@/client/components/ui/spinner'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/client/components/ui/tooltip'
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
  if (!userAgent) return <MonitorIcon className="size-5" />
  const ua = userAgent.toLowerCase()
  if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone')) {
    return <SmartphoneIcon className="size-5" />
  }
  if (ua.includes('tablet') || ua.includes('ipad')) {
    return <TabletIcon className="size-5" />
  }
  return <MonitorIcon className="size-5" />
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

export function SessionsCard() {
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
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MonitorSmartphoneIcon className="size-5 text-primary" />
            <h3 className="text-base font-medium">Active Sessions</h3>
          </div>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon" onClick={() => refetch()} disabled={isLoading}>
                  <RefreshCwIcon className="size-4" />
                </Button>
              }
            />
            <TooltipContent>Refresh</TooltipContent>
          </Tooltip>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Manage your active sessions across all devices. You can sign out of individual sessions or all sessions at once.
        </p>

        {success && (
          <Alert className="mb-4">
            <AlertDescription>{success}</AlertDescription>
            <AlertAction>
              <Button variant="ghost" size="icon-xs" onClick={() => setSuccess('')}>
                &times;
              </Button>
            </AlertAction>
          </Alert>
        )}
        {(error || mutationError) && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error?.message || mutationError?.message}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner className="size-6" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="py-4 text-sm text-muted-foreground">
            No active sessions found.
          </p>
        ) : (
          <>
            <div className="divide-y">
              {sessions.map((session) => {
                const isCurrentSession = session.token === currentToken

                return (
                  <div key={session.token} className="flex items-start gap-3 py-3">
                    <div className="mt-0.5 text-muted-foreground">
                      {getDeviceIcon(session.userAgent)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {parseUserAgent(session.userAgent)}
                        </span>
                        {isCurrentSession && (
                          <Badge variant="default" className="text-xs">Current</Badge>
                        )}
                      </div>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs text-muted-foreground">
                          IP: {session.ipAddress || 'Unknown'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Last active: {formatDate(session.updatedAt)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires: {formatDate(session.expiresAt)}
                        </p>
                      </div>
                    </div>
                    {!isCurrentSession && (
                      <Tooltip>
                        <TooltipTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={() => revokeSessionMutation.mutate(session.token)}
                              disabled={isRevoking}
                            >
                              <Trash2Icon className="size-4" />
                            </Button>
                          }
                        />
                        <TooltipContent>Revoke session</TooltipContent>
                      </Tooltip>
                    )}
                  </div>
                )
              })}
            </div>

            <Separator className="my-4" />

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => revokeOtherSessionsMutation.mutate()}
                disabled={isRevoking || sessions.length <= 1}
              >
                <LogOutIcon />
                Sign Out Other Devices
              </Button>
              <Button
                variant="destructive"
                onClick={() => revokeAllSessionsMutation.mutate()}
                disabled={isRevoking}
              >
                <LogOutIcon />
                Sign Out All Devices
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
