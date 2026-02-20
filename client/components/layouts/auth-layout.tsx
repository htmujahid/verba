import { Navigate, Outlet } from 'react-router'

import { Spinner } from '@/client/components/ui/spinner'
import { Logo } from '@/client/components/logo'
import { authClient } from '@/client/lib/auth-client'
import pathsConfig from '@/client/config/paths.config'

export function AuthLayout() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Spinner className="size-6" />
      </div>
    )
  }

  if (session?.user) {
    return <Navigate to={pathsConfig.app.home} replace />
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />
        <Outlet />
      </div>
    </div>
  )
}
