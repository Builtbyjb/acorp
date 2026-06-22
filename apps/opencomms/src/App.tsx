import { RouterProvider } from '@tanstack/react-router'
import { AuthProvider, useAuth } from '@/hooks/auth'
import { LayoutProvider } from '@/hooks/useLayout'
import { router } from './router'

function InnerApp() {
  const auth = useAuth()

  return <RouterProvider router={router} context={{ auth }} />
}

function App() {
  return (
    <AuthProvider router={router}>
      <LayoutProvider>
        <InnerApp />
      </LayoutProvider>
    </AuthProvider>
  )
}

export default App
