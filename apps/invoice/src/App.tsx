import { useEffect } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { initNativeApp, useNativeBackButton } from "@shared/mobile";
import { AuthProvider, useAuth } from "./hooks/auth";
import { router } from "./router";

function InnerApp() {
  const auth = useAuth();

  useEffect(() => {
    initNativeApp({ statusBarStyle: "dark", requestNotifications: false });
  }, []);

  useNativeBackButton(({ canGoBack }) => {
    if (canGoBack) {
      router.history.back();
      return true;
    }
    return false;
  });

  return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
  return (
    <AuthProvider router={router}>
      <InnerApp />
    </AuthProvider>
  );
}

export default App;
