import { Card, CardContent } from '@/client/components/ui/card'
import { Button } from '@/client/components/ui/button'
import { Input } from '@/client/components/ui/input'
import { Textarea } from '@/client/components/ui/textarea'
import { Label } from '@/client/components/ui/label'

export default function Contact() {
  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-6 text-center text-4xl font-bold">Contact</h1>
      <Card>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" type="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea id="contact-message" rows={4} />
          </div>
          <Button size="lg" className="w-full">
            Send Message
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
