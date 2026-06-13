import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DashboardIcon, MessagesIcon, ContactsIcon, CampaignsIcon, SettingsIcon,
} from '../-icons.tsx'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
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
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: '#ebf0f0' }}>
      {/* ── Sidebar ── */}
      <aside
        className="flex w-56 flex-shrink-0 flex-col bg-white"
        style={{ borderRight: '1px solid #7F8CAA22' }}
      >
        {/* Wordmark */}
        <div
          className="flex h-14 items-center px-4"
          style={{ borderBottom: '1px solid #7F8CAA18' }}
        >
          <Link to="/dashboard" className="group flex items-center gap-2">
            <div
              className="flex h-6 w-6 items-center justify-center rounded-full text-white text-[10px] font-black transition-transform group-hover:scale-95"
              style={{ backgroundColor: '#4382df' }}
            >
              O
            </div>
            <span className="font-bold text-base tracking-tight" style={{ color: '#0f172a' }}>
              OpenComms
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-0.5 p-2 pt-3">
          <p
            className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: '#7F8CAA' }}
          >
            Workspace
          </p>

          {NAV.map(({ to, label, Icon, exact }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              className="relative flex items-center gap-2.5 rounded-full px-3 py-2 text-sm font-medium transition-colors"
              style={{ color: '#7F8CAA' }}
              activeProps={{
                className: 'relative flex items-center gap-2.5 rounded-full px-3 py-2 text-sm font-medium',
                style: { color: '#0f172a', backgroundColor: '#7F8CAA18' },
              }}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}

          <div className="mt-auto">
            <div
              className="my-2 mx-3"
              style={{ height: 1, backgroundColor: '#7F8CAA14' }}
            />
            <p
              className="mb-1.5 px-3 text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: '#7F8CAA' }}
            >
              Account
            </p>
            <Link
              to="/settings"
              className="flex items-center gap-2.5 rounded-full px-3 py-2 text-sm font-medium transition-colors"
              style={{ color: '#7F8CAA' }}
              activeProps={{
                className: 'flex items-center gap-2.5 rounded-full px-3 py-2 text-sm font-medium',
                style: { color: '#0f172a', backgroundColor: '#7F8CAA18' },
              }}
            >
              <SettingsIcon size={16} />
              Settings
            </Link>
          </div>
        </nav>

        {/* User chip */}
        <div
          className="p-3"
          style={{ borderTop: '1px solid #7F8CAA14' }}
        >
          <div
            className="flex items-center gap-2.5 rounded-full px-2.5 py-2 cursor-pointer transition-colors hover:bg-[#7F8CAA0e]"
          >
            <Avatar className="size-7 flex-shrink-0">
              <AvatarFallback
                className="text-white text-[10px] font-bold"
                style={{ backgroundColor: '#4382df' }}
              >
                JS
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold" style={{ color: '#0f172a' }}>Jane Smith</p>
              <p className="text-[10px]" style={{ color: '#7F8CAA' }}>Admin</p>
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
