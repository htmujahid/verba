import { useState, useTransition } from 'react'
import { Trash2Icon, TriangleAlertIcon } from 'lucide-react'

import { Card, CardContent } from '@/client/components/ui/card'
import { Button } from '@/client/components/ui/button'
import { Input } from '@/client/components/ui/input'
import { Alert, AlertDescription } from '@/client/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/client/components/ui/dialog'
import { authClient } from '@/client/lib/auth-client'

const CONFIRMATION_TEXT = 'delete my account'

export function DeleteAccountCard() {
  const [isDeleting, startTransition] = useTransition()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [confirmText, setConfirmText] = useState('')

  const handleOpenDialog = () => {
    setDialogOpen(true)
    setConfirmText('')
    setError('')
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setConfirmText('')
    setError('')
  }

  const handleDeleteAccount = () => {
    if (confirmText !== CONFIRMATION_TEXT) {
      setError('Please type the confirmation text exactly')
      return
    }

    setError('')
    startTransition(async () => {
      const { error } = await authClient.deleteUser()

      if (error) {
        setError(error.message || 'Failed to delete account')
        return
      }

      setSuccess('A confirmation email has been sent. Please check your inbox to complete account deletion.')
      setDialogOpen(false)
    })
  }

  return (
    <>
      <Card className="border-destructive">
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Trash2Icon className="size-5 text-destructive" />
            <h3 className="text-base font-medium text-destructive">Delete Account</h3>
          </div>

          <p className="mb-6 text-sm text-muted-foreground">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>

          {success && (
            <Alert className="mb-4">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger
              render={
                <Button variant="destructive" onClick={handleOpenDialog}>
                  <Trash2Icon />
                  Delete My Account
                </Button>
              }
            />
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <TriangleAlertIcon className="size-5 text-destructive" />
                  Delete Account
                </DialogTitle>
                <DialogDescription>
                  This action is <strong>permanent and irreversible</strong>. All your data, including your profile,
                  settings, and any associated content will be permanently deleted.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  To confirm, please type <strong>{CONFIRMATION_TEXT}</strong> below:
                </p>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Input
                  placeholder={CONFIRMATION_TEXT}
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  autoComplete="off"
                  aria-invalid={!!error}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={handleCloseDialog} disabled={isDeleting}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || confirmText !== CONFIRMATION_TEXT}
                >
                  {isDeleting ? 'Deleting...' : 'Delete Account'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </>
  )
}
