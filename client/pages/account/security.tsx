import { ChangePasswordCard } from '@/client/components/account/change-password-card'
import { TwoFactorContainer } from '@/client/components/account/two-factor-container'
import { SessionsCard } from '@/client/components/account/sessions-card'
import { authClient } from '@/client/lib/auth-client'

export default function AccountSecurity() {
  const { data: session } = authClient.useSession()

  return (
    <div className="flex flex-col gap-6">
      <ChangePasswordCard />
      {session && <TwoFactorContainer session={session} />}
      <SessionsCard />
    </div>
  )
}
