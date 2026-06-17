import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PlusIcon, CampaignsIcon, ContactsIcon, MessagesIcon, SmsIcon, WhatsAppIcon } from '../-icons.tsx'
import { useLayout } from '@/hooks/useLayout'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})

const STATS = [
  { label: 'Total Contacts',        value: '2,841', change: '+124 this month',    positive: true  },
  { label: 'Messages Sent Today',   value: '1,204', change: '+18% vs yesterday',  positive: true  },
  { label: 'Active Conversations',  value: '37',    change: '12 need reply',       positive: false },
  { label: 'Delivery Rate',         value: '98.4%', change: '+0.2% this week',    positive: true  },
]

const ACTIVITY = [
  { id: 1, text: 'Broadcast "June Newsletter" sent to 1,180 contacts', channel: 'SMS' as const,      time: '2h ago'    },
  { id: 2, text: 'Maria Gonzalez replied to your message',             channel: 'WhatsApp' as const, time: '3h ago'    },
  { id: 3, text: 'Broadcast "Flash Sale — 20% off" sent to 340 contacts', channel: 'WhatsApp' as const, time: '5h ago' },
  { id: 4, text: '38 new contacts imported from CSV',                  channel: null,                time: 'Yesterday' },
  { id: 5, text: 'David Park replied to your message',                 channel: 'SMS' as const,      time: 'Yesterday' },
]

const RECENT_CONVS = [
  { id: '1', name: 'Maria Gonzalez', preview: "Thanks! I'll be there at 6pm.", channel: 'wa',  time: '3h ago',    unread: true  },
  { id: '2', name: 'David Park',     preview: 'Can I reschedule for next week?', channel: 'sms', time: '5h ago',   unread: true  },
  { id: '3', name: 'Priya Nair',     preview: 'Got it, thank you so much!',      channel: 'wa',  time: 'Yesterday', unread: false },
  { id: '4', name: 'James Okafor',   preview: 'STOP',                            channel: 'sms', time: 'Yesterday', unread: false },
]

function initials(n: string) { return n.split(' ').map((w) => w[0]).join('') }

function ChannelPill({ channel }: { channel: 'SMS' | 'WhatsApp' }) {
  const isWA = channel === 'WhatsApp'
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
      style={{
        backgroundColor: isWA ? '#22c55e12' : '#4382df0e',
        color: isWA ? '#16a34a' : '#4382df',
      }}
    >
      {isWA ? <WhatsAppIcon size={9} /> : <SmsIcon size={9} />}
      {channel}
    </span>
  )
}

function DashboardPage() {
  const { setTitle } = useLayout()
  useEffect(() => {
    setTitle('Dashboard')
  }, [setTitle])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header
        className="flex h-14 items-center justify-between px-6 flex-shrink-0 bg-white"
        style={{ borderBottom: '1px solid #7F8CAA18' }}
      >
        <div>
          <p className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: '#7F8CAA' }}>Overview</p>
          <h1 className="text-sm font-bold" style={{ color: '#0f172a' }}>Dashboard</h1>
        </div>
        <Link
          to="/campaigns"
          className="group inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white rounded-full transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#4382df', boxShadow: '0 2px 12px #4382df35' }}
        >
          <PlusIcon size={11} />New broadcast
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className="animate-fade-up bg-white rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07',
                animationDelay: `${0.05 + i * 0.07}s`,
              }}
            >
              <p
                className="text-xs font-bold tracking-[0.18em] uppercase mb-2"
                style={{ color: '#7F8CAA' }}
              >
                {s.label}
              </p>
              <p
                className="text-3xl font-extrabold tracking-tight"
                style={{ color: '#0f172a', letterSpacing: '-0.03em' }}
              >
                {s.value}
              </p>
              <p
                className="mt-1 text-xs font-medium"
                style={{ color: s.positive ? '#16a34a' : '#7F8CAA' }}
              >
                {s.change}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Recent Activity */}
          <div
            className="animate-fade-up lg:col-span-2 bg-white rounded-3xl overflow-hidden"
            style={{
              boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07',
              animationDelay: '0.28s',
            }}
          >
            <div className="px-6 pt-6 pb-4">
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-1" style={{ color: '#7F8CAA' }}>Activity</p>
              <h2 className="text-base font-bold" style={{ color: '#0f172a' }}>Recent Activity</h2>
            </div>
            <div>
              {ACTIVITY.map((item, i) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 px-6 py-3.5"
                  style={{ borderTop: i > 0 ? '1px solid #7F8CAA10' : 'none' }}
                >
                  <span
                    className="mt-1.5 size-2 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: '#4382df' }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color: '#0f172a' }}>{item.text}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      {item.channel && <ChannelPill channel={item.channel} />}
                      <span className="text-xs" style={{ color: '#7F8CAA' }}>{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            {/* Recent Conversations */}
            <div
              className="animate-fade-up bg-white rounded-3xl overflow-hidden"
              style={{
                boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07',
                animationDelay: '0.32s',
              }}
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-3">
                <div>
                  <p className="text-xs font-bold tracking-[0.22em] uppercase mb-0.5" style={{ color: '#7F8CAA' }}>Inbox</p>
                  <h2 className="text-sm font-bold" style={{ color: '#0f172a' }}>Recent Conversations</h2>
                </div>
                <Link
                  to="/messages"
                  className="text-xs font-semibold transition-opacity hover:opacity-70"
                  style={{ color: '#4382df' }}
                >
                  View all
                </Link>
              </div>
              {RECENT_CONVS.map((c, i) => (
                <Link
                  key={c.id}
                  to="/messages/$conversationId"
                  params={{ conversationId: c.id }}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[#7F8CAA08]"
                  style={{ borderTop: i > 0 ? '1px solid #7F8CAA10' : 'none' }}
                >
                  <Avatar className="size-8 flex-shrink-0">
                    <AvatarFallback
                      className="text-white text-[10px] font-bold"
                      style={{ backgroundColor: '#4382df' }}
                    >
                      {initials(c.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p
                      className="text-xs font-semibold truncate"
                      style={{ color: c.unread ? '#0f172a' : '#7F8CAA' }}
                    >
                      {c.name}
                    </p>
                    <p className="text-[11px] truncate" style={{ color: '#7F8CAA' }}>{c.preview}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[10px]" style={{ color: '#7F8CAA' }}>{c.time}</span>
                    {c.unread && (
                      <span className="size-1.5 rounded-full" style={{ backgroundColor: '#4382df' }} />
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Quick Actions */}
            <div
              className="animate-fade-up bg-white rounded-3xl p-5"
              style={{
                boxShadow: '0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07',
                animationDelay: '0.38s',
              }}
            >
              <p className="text-xs font-bold tracking-[0.22em] uppercase mb-1" style={{ color: '#7F8CAA' }}>Actions</p>
              <h2 className="text-sm font-bold mb-4" style={{ color: '#0f172a' }}>Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { to: '/campaigns', Icon: CampaignsIcon, title: 'New Campaign',      sub: 'Broadcast to contacts'    },
                  { to: '/contacts',  Icon: ContactsIcon,  title: 'Import Contacts',   sub: 'Upload a CSV file'        },
                  { to: '/messages',  Icon: MessagesIcon,  title: 'New Conversation',  sub: 'Start a 1-on-1 message'   },
                ].map(({ to, Icon, title, sub }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-[#7F8CAA08]"
                  >
                    <div
                      className="flex size-8 items-center justify-center rounded-xl flex-shrink-0"
                      style={{ backgroundColor: '#4382df0e', color: '#4382df' }}
                    >
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: '#0f172a' }}>{title}</p>
                      <p className="text-[11px]" style={{ color: '#7F8CAA' }}>{sub}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
