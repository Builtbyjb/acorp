---
name: initial-setup
description: Add tanstack router, tailwindcss, shadcn. Use this skill when asked to initialize a project.
---

# Adding tanstack router
* Install tanstack router:
```sh
npm i @tanstack/react-router
```

* Install tanstack router for vite:
```sh
npm i -D @tanstack/router-plugin
```

* Add tanstack router configuration to vite.config.ts:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(),
    // ...
  ],
})
```

* create a router.tsx in the src folder and add this code snippet to the file
```ts
import { createRouter } from "@tanstack/react-router";

// https://tanstack.com/router/latest/docs/routing/file-based-routing

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const router = createRouter({
  routeTree,
  context: {
    // auth will be passed down from App component
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
```

* create a routes folder in src folder and create a __root.tsx file. Add this code snippet to the file
```ts
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<Context>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div>
          <Outlet />
          <TanStackRouterDevtools />
      </div>
    </>
  );
}
```

* create a _guest.tsx file in the routes folder. Add this code snippet to the file
```ts
import { createFileRoute, Outlet } from "@tanstack/react-router";

function GuestLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

/*
 * Routes that do not require a user to be authenticated
 */
export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});
```
* create a _authenticated.tsx file in the routes folder. Add this code snippet to the file
```ts
import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

function AuthenticatedLayout() {
  return (
    <div >
      <Outlet />
    </div>
  );
}

/*
 * Routes that require a user to be authenticated
 */
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context, location }) => {
    const isAuthenticated = context.auth ? await context.auth.authenticate() : false;
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: AuthenticatedLayout,
});
```

# Adding tailwind support

* Configure tailwind: Add this configuration to the "vite.config.ts" file

```ts
// Like so
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

* Add tailwind import to the "index.css" file
```css
/*like so */
@import "tailwindcss";
```

* Add a link tag to the "index.html" file
```html
<!--Like so-->
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="/src/index.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```
# Adding shadcn support

* Install shadcn
```sh
npx shadcn@latest init
```

* During setup ask for my input when answering the questions.

IMPORTANT: Always ask for clarification or more information when needed
