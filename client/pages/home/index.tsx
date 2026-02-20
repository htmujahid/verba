import { Link } from 'react-router'
import { UserIcon, SettingsIcon, ClockIcon } from 'lucide-react'

import { Card, CardContent } from '@/client/components/ui/card'
import { Button } from '@/client/components/ui/button'
import { Avatar, AvatarFallback } from '@/client/components/ui/avatar'
import { authClient } from '@/client/lib/auth-client'
import pathsConfig from '@/client/config/paths.config'

export default function Dashboard() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-bold">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your account today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <Card>
            <CardContent className="text-center">
              <Avatar className="mx-auto mb-4 size-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {user?.name?.charAt(0).toUpperCase() || <UserIcon />}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-base font-medium">{user?.name}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link to={pathsConfig.app.account}>View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-8">
          <Card className="h-full">
            <CardContent>
              <h2 className="mb-4 text-base font-medium">Quick Actions</h2>
              <div className="flex flex-wrap gap-2">
                <Button asChild>
                  <Link to={pathsConfig.app.account}>
                    <SettingsIcon />
                    Account Settings
                  </Link>
                </Button>
                <Button variant="outline">
                  <ClockIcon />
                  Activity Log
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-12">
          <Card>
            <CardContent>
              <h2 className="mb-2 text-base font-medium">Recent Activity</h2>
              <p className="text-sm text-muted-foreground">
                No recent activity to display.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
