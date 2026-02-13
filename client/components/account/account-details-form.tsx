import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { PencilIcon, BadgeCheckIcon } from 'lucide-react'

import { Card, CardContent } from '@/client/components/ui/card'
import { Button } from '@/client/components/ui/button'
import { Input } from '@/client/components/ui/input'
import { Label } from '@/client/components/ui/label'
import { Alert, AlertDescription, AlertAction } from '@/client/components/ui/alert'
import { Spinner } from '@/client/components/ui/spinner'
import { authClient } from '@/client/lib/auth-client'

interface AccountDetailsFormProps {
  user?: {
    name?: string | null
    email?: string | null
  } | null
}

interface ProfileFormData {
  name: string
}

interface EmailFormData {
  email: string
}

export function AccountDetailsForm({ user }: AccountDetailsFormProps) {
  const [isUpdatingProfile, startProfileTransition] = useTransition()
  const [isUpdatingEmail, startEmailTransition] = useTransition()

  const [profileSuccess, setProfileSuccess] = useState('')
  const [profileError, setProfileError] = useState('')
  const [emailSuccess, setEmailSuccess] = useState('')
  const [emailError, setEmailError] = useState('')

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    values: {
      name: user?.name || '',
    },
  })

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>({
    values: {
      email: user?.email || '',
    },
  })

  const onProfileSubmit = (data: ProfileFormData) => {
    setProfileError('')
    setProfileSuccess('')

    startProfileTransition(async () => {
      const { error } = await authClient.updateUser({
        name: data.name,
      })

      if (error) {
        setProfileError(error.message || 'Failed to update profile')
        return
      }

      setProfileSuccess('Profile updated successfully')
    })
  }

  const onEmailSubmit = (data: EmailFormData) => {
    setEmailError('')
    setEmailSuccess('')

    if (data.email === user?.email) {
      setEmailError('New email must be different from current email')
      return
    }

    startEmailTransition(async () => {
      const { error } = await authClient.changeEmail({
        newEmail: data.email,
      })

      if (error) {
        setEmailError(error.message || 'Failed to update email')
        return
      }

      setEmailSuccess('Verification email sent to your new address')
    })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Profile Form */}
      <Card>
        <CardContent>
          <div className="mb-6 flex items-center gap-2">
            <PencilIcon className="size-5 text-primary" />
            <h3 className="text-base font-medium">Profile Information</h3>
          </div>

          {profileSuccess && (
            <Alert className="mb-4">
              <AlertDescription>{profileSuccess}</AlertDescription>
              <AlertAction>
                <Button variant="ghost" size="icon-xs" onClick={() => setProfileSuccess('')}>
                  &times;
                </Button>
              </AlertAction>
            </Alert>
          )}
          {profileError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{profileError}</AlertDescription>
              <AlertAction>
                <Button variant="ghost" size="icon-xs" onClick={() => setProfileError('')}>
                  &times;
                </Button>
              </AlertAction>
            </Alert>
          )}

          <form onSubmit={handleProfileSubmit(onProfileSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="profile-name">Display Name</Label>
              <Input
                id="profile-name"
                {...registerProfile('name', { required: 'Name is required' })}
                aria-invalid={!!profileErrors.name}
              />
              {profileErrors.name && (
                <p className="text-sm text-destructive">{profileErrors.name.message}</p>
              )}
            </div>

            <Button type="submit" className="mt-4" disabled={isUpdatingProfile}>
              {isUpdatingProfile ? <Spinner /> : 'Update Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Email Form */}
      <Card>
        <CardContent>
          <div className="mb-6 flex items-center gap-2">
            <BadgeCheckIcon className="size-5 text-primary" />
            <h3 className="text-base font-medium">Email Address</h3>
          </div>

          {emailSuccess && (
            <Alert className="mb-4">
              <AlertDescription>{emailSuccess}</AlertDescription>
              <AlertAction>
                <Button variant="ghost" size="icon-xs" onClick={() => setEmailSuccess('')}>
                  &times;
                </Button>
              </AlertAction>
            </Alert>
          )}
          {emailError && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{emailError}</AlertDescription>
              <AlertAction>
                <Button variant="ghost" size="icon-xs" onClick={() => setEmailError('')}>
                  &times;
                </Button>
              </AlertAction>
            </Alert>
          )}

          <form onSubmit={handleEmailSubmit(onEmailSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email-address">Email Address</Label>
              <Input
                id="email-address"
                type="email"
                {...registerEmail('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                aria-invalid={!!emailErrors.email}
              />
              {emailErrors.email ? (
                <p className="text-sm text-destructive">{emailErrors.email.message}</p>
              ) : (
                <p className="text-sm text-muted-foreground">Changing email requires verification</p>
              )}
            </div>

            <Button type="submit" className="mt-4" disabled={isUpdatingEmail}>
              {isUpdatingEmail ? <Spinner /> : 'Update Email'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
