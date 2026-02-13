import { ProfileImageCard } from '@/client/components/account/profile-image-card'
import { AccountDetailsForm } from '@/client/components/account/account-details-form'
import { AccountRolesCard } from '@/client/components/account/account-roles-card'
import { authClient } from '@/client/lib/auth-client'

export default function AccountProfile() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <div className="flex flex-col gap-6">
      <ProfileImageCard user={user} />
      <AccountDetailsForm user={user} />
      <AccountRolesCard role={user?.role} />
    </div>
  )
}
