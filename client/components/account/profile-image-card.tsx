import { useState, useRef } from 'react'
import { CameraIcon, BadgeCheckIcon } from 'lucide-react'

import { Card, CardContent } from '@/client/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/client/components/ui/avatar'
import { Badge } from '@/client/components/ui/badge'
import { Button } from '@/client/components/ui/button'
import { Alert, AlertDescription } from '@/client/components/ui/alert'
import { Spinner } from '@/client/components/ui/spinner'
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
      <CardContent className="py-8 text-center">
        <div className="relative mb-4 inline-block">
          <Avatar className="size-28">
            <AvatarImage src={user?.image || undefined} alt={user?.name || 'User'} />
            <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
              {user?.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="default"
            size="icon"
            className="absolute bottom-0 right-0 size-8 rounded-full"
            onClick={handleImageClick}
            disabled={isUploadingImage}
          >
            {isUploadingImage ? (
              <Spinner className="size-4" />
            ) : (
              <CameraIcon className="size-4" />
            )}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {imageError && (
          <Alert variant="destructive" className="mt-4 text-left">
            <AlertDescription>{imageError}</AlertDescription>
          </Alert>
        )}

        <h3 className="mt-4 text-base font-medium">{user?.name}</h3>
        <p className="text-sm text-muted-foreground">{user?.email}</p>

        <div className="mt-4 flex justify-center gap-2">
          {user?.emailVerified && (
            <Badge variant="outline" className="text-green-600 border-green-300">
              <BadgeCheckIcon />
              Verified
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
