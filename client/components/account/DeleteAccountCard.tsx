import { useState, useTransition } from 'react'
import { useNavigate } from 'react-router'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import WarningIcon from '@mui/icons-material/Warning'

import { authClient } from '@/client/lib/auth-client'

const CONFIRMATION_TEXT = 'delete my account'

export function DeleteAccountCard() {
  const navigate = useNavigate()
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
      <Card sx={{ border: 1, borderColor: 'error.main' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <DeleteForeverIcon color="error" />
            <Typography variant="h6" color="error">
              Delete Account
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteForeverIcon />}
            onClick={handleOpenDialog}
          >
            Delete My Account
          </Button>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon color="error" />
          Delete Account
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            This action is <strong>permanent and irreversible</strong>. All your data, including your profile,
            settings, and any associated content will be permanently deleted.
          </DialogContentText>

          <DialogContentText sx={{ mb: 2 }}>
            To confirm, please type <strong>{CONFIRMATION_TEXT}</strong> below:
          </DialogContentText>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            placeholder={CONFIRMATION_TEXT}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            autoComplete="off"
            error={!!error}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
            disabled={isDeleting || confirmText !== CONFIRMATION_TEXT}
          >
            {isDeleting ? 'Deleting...' : 'Delete Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
