import { Link } from 'react-router'

import { Button } from '@/client/components/ui/button'
import { Card, CardContent } from '@/client/components/ui/card'

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="mb-2 text-4xl font-bold">Welcome Home</h1>
      <p className="mb-8 text-muted-foreground">
        This is the home page of the application.
      </p>
      <div className="flex justify-center gap-4">
        <Button nativeButton={false} render={<Link to="/about" />}>
          Learn About Us
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link to="/contact" />}>
          Contact Us
        </Button>
      </div>
      <Card className="mx-auto mt-8 max-w-sm">
        <CardContent>
          <h2 className="mb-2 text-base font-medium">Getting Started</h2>
          <p className="text-sm text-muted-foreground">
            Explore the navigation above to learn more about this app.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
