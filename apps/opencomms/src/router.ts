import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export const router = createRouter({ routeTree })

// Register the router type globally for full type safety across the app.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
