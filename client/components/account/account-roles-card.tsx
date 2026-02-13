import { ShieldIcon, UserIcon } from 'lucide-react'

import { Card, CardContent } from '@/client/components/ui/card'
import { Badge } from '@/client/components/ui/badge'
import { Separator } from '@/client/components/ui/separator'

interface AccountRolesCardProps {
  role?: string | null
}

export function AccountRolesCard({ role }: AccountRolesCardProps) {
  return (
    <Card>
      <CardContent>
        <div className="mb-6 flex items-center gap-2">
          <ShieldIcon className="size-5 text-primary" />
          <h3 className="text-base font-medium">Account Roles</h3>
        </div>

        <p className="mb-4 text-sm text-muted-foreground">
          Your account has the following roles and permissions.
        </p>

        <Separator className="my-4" />

        <div className="flex flex-wrap gap-2">
          {role ? (
            <Badge variant={role === 'admin' ? 'default' : 'secondary'}>
              {role === 'admin' ? <ShieldIcon /> : <UserIcon />}
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Badge>
          ) : (
            <Badge variant="secondary">
              <UserIcon />
              User
            </Badge>
          )}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Contact an administrator if you need different permissions.
        </p>
      </CardContent>
    </Card>
  )
}
