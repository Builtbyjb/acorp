import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { SmsIcon, WhatsAppIcon } from '../-icons.tsx'
import { useLayout } from '@/hooks/useLayout'

export const Route = createFileRoute('/_auth/settings')({
  component: SettingsPage,
})

const TEAM = [
  { name: 'Jane Smith',    email: 'jane@acmecorp.com',   role: 'Admin',  joined: 'Jan 2024' },
  { name: 'Marcus Lee',    email: 'marcus@acmecorp.com', role: 'Member', joined: 'Mar 2024' },
  { name: 'Rachel Torres', email: 'rachel@acmecorp.com', role: 'Member', joined: 'May 2024' },
]

const TABS = ['Organisation', 'Channels', 'Team', 'Billing'] as const
type Tab = typeof TABS[number]

function initials(n: string) { return n.split(' ').map((w) => w[0]).join('') }

function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="bg-white rounded-3xl p-7"
      style={{ boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07' }}
    >
      {children}
    </div>
  )
}

function SectionDivider() {
  return <div className="my-6" style={{ height: 1, backgroundColor: '#7F8CAA14' }} />
}

function FieldGroup({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={htmlFor} className="text-xs font-bold" style={{ color: '#0f172a' }}>
        {label}
      </Label>
      {children}
    </div>
  )
}

function OrgTab() {
  return (
    <div className="space-y-5 max-w-lg">
      <SectionCard>
        <p className="text-xs font-bold tracking-[0.25em] uppercase mb-1" style={{ color: '#7F8CAA' }}>General</p>
        <h2 className="text-base font-bold mb-5" style={{ color: '#0f172a' }}>Organisation Details</h2>
        <div className="space-y-4">
          <FieldGroup label="Organisation name" htmlFor="org-name">
            <Input id="org-name" defaultValue="Acme Corp" className="h-9 rounded-xl bg-white" />
          </FieldGroup>
          <FieldGroup label="Website" htmlFor="org-website">
            <Input id="org-website" type="url" defaultValue="https://acmecorp.com" className="h-9 rounded-xl bg-white" />
          </FieldGroup>
          <FieldGroup label="Timezone" htmlFor="tz">
            <select
              id="tz"
              className="w-full h-9 rounded-xl border px-3 text-sm outline-none bg-white"
              style={{ borderColor: '#c8d5e0', color: '#0f172a' }}
            >
              <option>(UTC-05:00) Eastern Time</option>
              <option>(UTC-06:00) Central Time</option>
              <option>(UTC-07:00) Mountain Time</option>
              <option>(UTC-08:00) Pacific Time</option>
              <option>(UTC+00:00) UTC</option>
              <option>(UTC+01:00) London</option>
            </select>
          </FieldGroup>
          <button
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#4382df', boxShadow: '0 4px 20px #4382df35' }}
          >
            Save changes
          </button>
        </div>
      </SectionCard>

      <div
        className="rounded-3xl border-2 border-dashed p-6"
        style={{ borderColor: '#dc262630' }}
      >
        <p className="text-xs font-bold tracking-[0.22em] uppercase mb-3" style={{ color: '#dc2626' }}>Danger zone</p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold mb-0.5" style={{ color: '#0f172a' }}>Delete organisation</p>
            <p className="text-xs" style={{ color: '#7F8CAA' }}>Permanently delete this workspace. This cannot be undone.</p>
          </div>
          <button
            className="flex-shrink-0 inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full border-2 transition-all hover:bg-red-50 active:scale-95"
            style={{ color: '#dc2626', borderColor: '#dc262640' }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

function ChannelsTab() {
  return (
    <div className="space-y-4 max-w-lg">
      {/* SMS */}
      <SectionCard>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="flex size-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: '#4382df0e', color: '#4382df' }}
            >
              <SmsIcon size={16} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: '#0f172a' }}>SMS</p>
              <p className="text-xs" style={{ color: '#7F8CAA' }}>Twilio · United States</p>
            </div>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ backgroundColor: '#16a34a12', color: '#16a34a' }}
          >
            <span className="size-1.5 rounded-full" style={{ backgroundColor: '#16a34a' }} />
            Connected
          </span>
        </div>
        <p className="text-sm font-semibold mb-4" style={{ color: '#0f172a' }}>+1 (800) 555-0199</p>
        <div className="flex gap-2">
          <button
            className="inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
            style={{ color: '#7F8CAA', borderColor: '#7F8CAA45' }}
          >
            Configure
          </button>
          <button
            className="inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full transition-all hover:opacity-70 active:scale-95"
            style={{ color: '#dc2626' }}
          >
            Disconnect
          </button>
        </div>
      </SectionCard>

      {/* WhatsApp */}
      <SectionCard>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="flex size-9 items-center justify-center rounded-xl"
              style={{ backgroundColor: '#22c55e0e', color: '#16a34a' }}
            >
              <WhatsAppIcon size={16} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: '#0f172a' }}>WhatsApp Business</p>
              <p className="text-xs" style={{ color: '#7F8CAA' }}>Meta Business API</p>
            </div>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
            style={{ backgroundColor: '#7F8CAA12', color: '#7F8CAA' }}
          >
            <span className="size-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#7F8CAA' }} />
            Not connected
          </span>
        </div>
        <p className="text-xs leading-relaxed mb-4" style={{ color: '#7F8CAA' }}>
          Connect your WhatsApp Business account to send and receive WhatsApp messages.
        </p>
        <button
          className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#4382df', boxShadow: '0 4px 20px #4382df35' }}
        >
          Connect WhatsApp
        </button>
      </SectionCard>
    </div>
  )
}

function TeamTab() {
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.22em] uppercase mb-0.5" style={{ color: '#7F8CAA' }}>Members</p>
          <h2 className="text-sm font-bold" style={{ color: '#0f172a' }}>Team</h2>
        </div>
        <button
          className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#4382df', boxShadow: '0 4px 20px #4382df35' }}
        >
          Invite member
        </button>
      </div>
      <div
        className="bg-white rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 1px 4px #0f172a0a, 0 0 0 1px #0f172a06' }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ borderBottomColor: '#7F8CAA14' }}>
              <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Name</TableHead>
              <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Email</TableHead>
              <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Role</TableHead>
              <TableHead className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#7F8CAA' }}>Joined</TableHead>
              <TableHead className="w-16" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {TEAM.map((m) => (
              <TableRow key={m.email} className="hover:bg-[#7F8CAA04] transition-colors" style={{ borderBottomColor: '#7F8CAA10' }}>
                <TableCell>
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-7">
                      <AvatarFallback
                        className="text-white text-[10px] font-bold"
                        style={{ backgroundColor: '#4382df' }}
                      >
                        {initials(m.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium" style={{ color: '#0f172a' }}>{m.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs" style={{ color: '#7F8CAA' }}>{m.email}</TableCell>
                <TableCell>
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                    style={
                      m.role === 'Admin'
                        ? { backgroundColor: '#4382df0e', color: '#4382df' }
                        : { backgroundColor: '#7F8CAA12', color: '#7F8CAA' }
                    }
                  >
                    {m.role}
                  </span>
                </TableCell>
                <TableCell className="text-xs" style={{ color: '#7F8CAA' }}>{m.joined}</TableCell>
                <TableCell>
                  <button
                    type="button"
                    className="text-xs font-semibold transition-opacity hover:opacity-70"
                    style={{ color: '#dc2626' }}
                  >
                    Remove
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function BillingTab() {
  const USAGE = [
    { label: 'SMS messages',       pct: 64, used: 3204,  total: 5000 },
    { label: 'WhatsApp messages',  pct: 28, used: 1388,  total: 5000 },
    { label: 'Contacts',           pct: 57, used: 2841,  total: 5000 },
  ]

  return (
    <div className="space-y-5 max-w-lg">
      <SectionCard>
        <p className="text-xs font-bold tracking-[0.25em] uppercase mb-1" style={{ color: '#7F8CAA' }}>Current plan</p>
        <div className="flex items-start justify-between mt-4">
          <div>
            <p className="text-2xl font-extrabold tracking-tight" style={{ color: '#0f172a', letterSpacing: '-0.03em' }}>
              Growth
            </p>
            <p className="text-3xl font-extrabold tracking-tight mt-1" style={{ color: '#0f172a', letterSpacing: '-0.03em' }}>
              $79
              <span className="text-sm font-normal ml-1" style={{ color: '#7F8CAA' }}>/ month</span>
            </p>
          </div>
          <button
            className="inline-flex items-center px-4 py-1.5 text-xs font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
            style={{ color: '#7F8CAA', borderColor: '#7F8CAA45' }}
          >
            Upgrade plan
          </button>
        </div>
        <SectionDivider />
        <ul className="space-y-2">
          {['Up to 5,000 contacts', 'Unlimited broadcasts', 'SMS & WhatsApp channels', '3 team members', '24/7 email support'].map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: '#7F8CAA' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#4382df" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <path d="M2 5l2.5 2.5L8 2.5" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </SectionCard>

      <SectionCard>
        <p className="text-xs font-bold tracking-[0.25em] uppercase mb-1" style={{ color: '#7F8CAA' }}>Usage</p>
        <h2 className="text-base font-bold mb-5" style={{ color: '#0f172a' }}>This month</h2>
        <div className="space-y-4">
          {USAGE.map((u) => (
            <div key={u.label} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span style={{ color: '#7F8CAA' }}>{u.label}</span>
                <span className="font-semibold" style={{ color: '#0f172a' }}>
                  {u.used.toLocaleString()} / {u.total.toLocaleString()}
                </span>
              </div>
              <div
                className="h-1.5 w-full rounded-full overflow-hidden"
                style={{ backgroundColor: '#e2eaf3' }}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${u.pct}%`,
                    backgroundColor: u.pct > 80 ? '#dc2626' : '#4382df',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

function SettingsPage() {
  const { setTitle } = useLayout()
  useEffect(() => {
    setTitle('Settings')
  }, [setTitle])

  const [tab, setTab] = useState<Tab>('Organisation')

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header
        className="flex h-14 items-center px-6 flex-shrink-0 bg-white"
        style={{ borderBottom: '1px solid #7F8CAA18' }}
      >
        <div>
          <p className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: '#7F8CAA' }}>Configuration</p>
          <h1 className="text-sm font-bold" style={{ color: '#0f172a' }}>Settings</h1>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {/* Tab line */}
        <div
          className="flex gap-0 mb-7"
          style={{ borderBottom: '2px solid #7F8CAA18' }}
        >
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 text-sm font-semibold transition-colors relative"
              style={{ color: tab === t ? '#0f172a' : '#7F8CAA' }}
            >
              {t}
              {tab === t && (
                <span
                  className="absolute bottom-[-2px] left-0 right-0 h-0.5 rounded-full"
                  style={{ backgroundColor: '#4382df' }}
                />
              )}
            </button>
          ))}
        </div>

        {tab === 'Organisation' && <OrgTab />}
        {tab === 'Channels' && <ChannelsTab />}
        {tab === 'Team' && <TeamTab />}
        {tab === 'Billing' && <BillingTab />}
      </div>
    </div>
  )
}
