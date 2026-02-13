import { Card, CardContent } from '@/client/components/ui/card'

export default function About() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-6 text-center text-4xl font-bold">About</h1>
      <Card>
        <CardContent className="space-y-4">
          <p>
            This is a React application built with Vite, shadcn/ui, and React Router.
          </p>
          <p>
            It demonstrates a modern frontend setup with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>React 18 with TypeScript</li>
            <li>Vite for fast development</li>
            <li>shadcn/ui components</li>
            <li>React Router for navigation</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
