import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

function AuthenticatedLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#171717] text-white border-r border-white/10 flex-shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-7 h-7 bg-white flex items-center justify-center text-black text-xs font-black">
              A
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Corp</span>
          </div>
          <nav className="flex flex-col gap-1">
            {[
              { label: "Dashboard", to: "/" },
              { label: "Products", to: "/products" },
              { label: "Custom Dev", to: "/custom" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.to}
                className="px-3 py-2 text-sm font-medium transition-all hover:text-white"
                style={{ color: "rgba(255,255,255,0.50)" }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

/*
 * Routes that require a user to be authenticated
 */
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const isAuthenticated = true;
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
