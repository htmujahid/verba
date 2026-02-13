import { useState, useTransition } from 'react'

import { QrCode } from 'lucide-react'
import QRCode from 'react-qr-code'
import { toast } from 'sonner'

import { CopyButton } from '@/client/components/misc/copy-button'
import { Button } from '@/client/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/client/components/ui/dialog'
import { Input } from '@/client/components/ui/input'
import { Spinner } from '@/client/components/ui/spinner'
import { authClient } from '@/client/lib/auth-client'

export function TwoFactorScanQrCode() {
  const [isLoading, startTransition] = useTransition()
  const [twoFactorVerifyURI, setTwoFactorVerifyURI] = useState('')
  const [twoFaPassword, setTwoFaPassword] = useState('')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <QrCode size={16} />
          <span className="text-xs md:text-sm">Scan QR Code</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
          <DialogDescription>
            Scan the QR code with your TOTP app
          </DialogDescription>
        </DialogHeader>

        {twoFactorVerifyURI ? (
          <>
            <div className="flex items-center justify-center">
              <QRCode value={twoFactorVerifyURI} />
            </div>
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-muted-foreground">
                Copy URI to clipboard
              </p>
              <CopyButton textToCopy={twoFactorVerifyURI} />
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <Input
              type="password"
              value={twoFaPassword}
              onChange={(e) => setTwoFaPassword(e.target.value)}
              placeholder="Enter Password"
            />
            <Button
              onClick={() => {
                if (twoFaPassword.length < 8) {
                  toast.error('Password must be at least 8 characters')
                  return
                }
                startTransition(async () => {
                  await authClient.twoFactor.getTotpUri(
                    {
                      password: twoFaPassword,
                    },
                    {
                      onSuccess(context) {
                        setTwoFactorVerifyURI(context.data.totpURI)
                      },
                    },
                  )
                  setTwoFaPassword('')
                })
              }}
              disabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Show QR Code'}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
