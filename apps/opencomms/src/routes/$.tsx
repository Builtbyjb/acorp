import { createFileRoute, Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'

export const Route = createFileRoute('/$')({
  component: NotFoundPage,
})

function NotFoundPage() {
  const { _splat } = Route.useParams()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center space-y-4">
        <p className="text-8xl font-bold text-primary">404</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="text-muted-foreground">
          No route matches{' '}
          <code className="bg-muted text-sm px-1.5 py-0.5 rounded">
            /{_splat}
          </code>
        </p>
        <Link to="/" className={buttonVariants()}>Go home</Link>
      </div>
    </div>
  )
}
