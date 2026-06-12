import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import {
  DashboardIcon, MessagesIcon, ContactsIcon, CampaignsIcon, SettingsIcon,
} from '../-icons.tsx'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    // Replace with real session check when auth is wired up.
    const isAuthenticated = localStorage.getItem('oc_session') !== null
    if (!isAuthenticated) throw redirect({ to: '/login' })
  },
  component: AuthLayout,
})

const NAV = [
  { to: '/dashboard', label: 'Dashboard', Icon: DashboardIcon, exact: true },
  { to: '/messages',  label: 'Messages',  Icon: MessagesIcon,  exact: false },
  { to: '/contacts',  label: 'Contacts',  Icon: ContactsIcon,  exact: false },
  { to: '/campaigns', label: 'Campaigns', Icon: CampaignsIcon, exact: false },
] as const

function AuthLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Sidebar ── */}
      <aside className="flex w-56 flex-shrink-0 flex-col border-r bg-background">
        {/* Logo */}
        <div className="flex h-14 items-center px-4 border-b">
          <Link to="/dashboard" className="text-base font-bold tracking-tight text-primary">
            OpenComms
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 p-2 pt-3">
          <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>
          {NAV.map(({ to, label, Icon, exact }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground',
                'transition-colors hover:bg-accent hover:text-accent-foreground',
              )}
              activeProps={{ className: 'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary' }}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}

          <div className="mt-auto">
            <Separator className="my-2" />
            <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Account
            </p>
            <Link
              to="/settings"
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground',
                'transition-colors hover:bg-accent hover:text-accent-foreground',
              )}
              activeProps={{ className: 'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary' }}
            >
              <SettingsIcon size={16} />
              Settings
            </Link>
          </div>
        </nav>

        {/* User */}
        <div className="border-t p-3">
          <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5 hover:bg-accent cursor-pointer transition-colors">
            <Avatar className="size-7">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">JS</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-foreground">Jane Smith</p>
              <p className="text-[10px] text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <Outlet />
      </div>
    </div>
  )
}
