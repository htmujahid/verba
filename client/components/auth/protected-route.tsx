import { Navigate, Outlet, useLocation } from 'react-router'

import { Spinner } from '@/client/components/ui/spinner'
import { authClient } from '@/client/lib/auth-client'
import pathsConfig from '@/shared/config/paths.config'

export function ProtectedRoute() {
  const location = useLocation()
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner className="size-6" />
      </div>
    )
  }

  if (!session?.user) {
    return <Navigate to={pathsConfig.auth.signIn} state={{ from: location }} replace />
  }

  return <Outlet />
}
