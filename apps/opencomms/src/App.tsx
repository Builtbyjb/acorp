import { useEffect } from 'react'
import { RouterProvider } from '@tanstack/react-router'
import { initNativeApp, useNativeBackButton } from '@shared/mobile'
import { AuthProvider, useAuth } from '@/hooks/auth'
import { LayoutProvider } from '@/hooks/useLayout'
import { router } from './router'

function InnerApp() {
  const auth = useAuth()

  useEffect(() => {
    initNativeApp({ statusBarStyle: 'dark', requestNotifications: true })
  }, [])

  useNativeBackButton(({ canGoBack }) => {
    if (canGoBack) {
      router.history.back()
      return true
    }
    return false
  })

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
