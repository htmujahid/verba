import { Outlet, useLocation, useNavigate } from 'react-router'
import { UserIcon, ShieldIcon, TriangleAlertIcon } from 'lucide-react'

import { Spinner } from '@/client/components/ui/spinner'
import { Tabs, TabsList, TabsTrigger } from '@/client/components/ui/tabs'
import { authClient } from '@/client/lib/auth-client'

export default function AccountLayout() {
  const { data: session, isPending } = authClient.useSession()
  const location = useLocation()
  const navigate = useNavigate()

  const segment = location.pathname.split('/').pop()
  const activeTab = segment === 'security' || segment === 'danger' ? segment : 'profile'

  if (isPending) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="size-6" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-2xl font-bold">Account Settings</h1>
      <p className="mb-6 text-muted-foreground">
        Manage your account information, security, and preferences.
      </p>

      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          if (value === 'profile') navigate('/home/account')
          else navigate(`/home/account/${value}`)
        }}
      >
        <TabsList>
          <TabsTrigger value="profile">
            <UserIcon />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <ShieldIcon />
            Security
          </TabsTrigger>
          <TabsTrigger value="danger" className="data-active:text-destructive">
            <TriangleAlertIcon />
            Danger Zone
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="pt-6">
        <Outlet />
      </div>
    </div>
  )
}
