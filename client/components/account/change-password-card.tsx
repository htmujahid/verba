import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { LockIcon } from 'lucide-react'

import { Card, CardContent } from '@/client/components/ui/card'
import { Button } from '@/client/components/ui/button'
import { Input } from '@/client/components/ui/input'
import { Label } from '@/client/components/ui/label'
import { Switch } from '@/client/components/ui/switch'
import { Alert, AlertDescription, AlertAction } from '@/client/components/ui/alert'
import { Spinner } from '@/client/components/ui/spinner'
import { authClient } from '@/client/lib/auth-client'

interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export function ChangePasswordCard() {
  const [isPending, startTransition] = useTransition()
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [revokeOtherSessions, setRevokeOtherSessions] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<PasswordFormData>()

  const newPassword = watch('newPassword')

  const onSubmit = (data: PasswordFormData) => {
    setError('')
    setSuccess('')

    startTransition(async () => {
      const { error } = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        revokeOtherSessions,
      })

      if (error) {
        setError(error.message || 'Failed to change password')
        return
      }

      setSuccess('Password changed successfully')
      reset()
    })
  }

  return (
    <Card>
      <CardContent>
        <div className="mb-6 flex items-center gap-2">
          <LockIcon className="size-5 text-primary" />
          <h3 className="text-base font-medium">Change Password</h3>
        </div>

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
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
            <AlertAction>
              <Button variant="ghost" size="icon-xs" onClick={() => setError('')}>
                &times;
              </Button>
            </AlertAction>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              {...register('currentPassword', { required: 'Current password is required' })}
              aria-invalid={!!errors.currentPassword}
              autoComplete="current-password"
            />
            {errors.currentPassword && (
              <p className="text-sm text-destructive">{errors.currentPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
              })}
              aria-invalid={!!errors.newPassword}
              autoComplete="new-password"
            />
            {errors.newPassword ? (
              <p className="text-sm text-destructive">{errors.newPassword.message}</p>
            ) : (
              <p className="text-sm text-muted-foreground">At least 8 characters</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === newPassword || 'Passwords do not match',
              })}
              aria-invalid={!!errors.confirmPassword}
              autoComplete="new-password"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Switch
              checked={revokeOtherSessions}
              onCheckedChange={setRevokeOtherSessions}
              id="revokeOtherSessions"
            />
            <Label htmlFor="revokeOtherSessions">Sign out of all other devices</Label>
          </div>

          <Button type="submit" className="mt-4" disabled={isPending}>
            {isPending ? <Spinner /> : 'Change Password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
