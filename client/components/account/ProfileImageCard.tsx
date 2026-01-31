import { useState, useRef } from 'react'
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import VerifiedIcon from '@mui/icons-material/Verified'

import { authClient } from '@/client/lib/auth-client'

interface ProfileImageCardProps {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    emailVerified?: boolean
  } | null
}

export function ProfileImageCard({ user }: ProfileImageCardProps) {
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [imageError, setImageError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setImageError('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageError('Image must be less than 5MB')
      return
    }

    setImageError('')
    setIsUploadingImage(true)

    try {
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64 = reader.result as string

        const { error } = await authClient.updateUser({
          image: base64,
        })

        if (error) {
          setImageError(error.message || 'Failed to update image')
        }

        setIsUploadingImage(false)
      }
      reader.readAsDataURL(file)
    } catch {
      setImageError('Failed to upload image')
      setIsUploadingImage(false)
    }
  }

  return (
    <Card>
      <CardContent sx={{ textAlign: 'center', py: 4 }}>
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <IconButton
                size="small"
                onClick={handleImageClick}
                disabled={isUploadingImage}
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'primary.dark' },
                  width: 32,
                  height: 32,
                }}
              >
                {isUploadingImage ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <PhotoCameraIcon fontSize="small" />
                )}
              </IconButton>
            }
          >
            <Avatar
              src={user?.image || undefined}
              alt={user?.name || 'User'}
              sx={{ width: 120, height: 120, bgcolor: 'primary.main', fontSize: 48 }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </Avatar>
          </Badge>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </Box>

        {imageError && (
          <Alert severity="error" sx={{ mt: 2, textAlign: 'left' }}>
            {imageError}
          </Alert>
        )}

        <Typography variant="h6" sx={{ mt: 2 }}>
          {user?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user?.email}
        </Typography>

        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 2 }}>
          {user?.emailVerified && (
            <Chip
              icon={<VerifiedIcon />}
              label="Verified"
              size="small"
              color="success"
              variant="outlined"
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  )
}
