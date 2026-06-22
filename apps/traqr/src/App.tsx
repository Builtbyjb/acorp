import { useEffect } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { initNativeApp, useNativeBackButton } from "@shared/mobile";
import { router } from "./router";

function App() {
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

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
