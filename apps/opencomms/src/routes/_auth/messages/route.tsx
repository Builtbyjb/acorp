import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PlusIcon, SearchIcon, SmsIcon, WhatsAppIcon } from '../../-icons.tsx'

export const Route = createFileRoute('/_auth/messages')({
  component: MessagesLayout,
})

const CONVERSATIONS = [
  { id: '1', name: 'Maria Gonzalez', preview: "Thanks! I'll be there at 6pm.", channel: 'wa',  time: '3h ago',    unread: true  },
  { id: '2', name: 'David Park',     preview: 'Can I reschedule for next week?', channel: 'sms', time: '5h ago',   unread: true  },
  { id: '3', name: 'Priya Nair',     preview: 'Got it, thank you so much!',      channel: 'wa',  time: 'Yesterday', unread: false },
  { id: '4', name: 'James Okafor',   preview: 'STOP',                            channel: 'sms', time: 'Yesterday', unread: false },
  { id: '5', name: 'Aisha Mensah',   preview: 'Perfect, see you then.',          channel: 'wa',  time: 'Mon',       unread: false },
  { id: '6', name: 'Carlos Reyes',   preview: 'What time does it start?',        channel: 'sms', time: 'Mon',       unread: false },
  { id: '7', name: 'Yuki Tanaka',    preview: 'Confirmed!',                      channel: 'wa',  time: 'Sun',       unread: false },
  { id: '8', name: 'Sofia Andersen', preview: 'Can you send me the details?',    channel: 'sms', time: 'Sat',       unread: false },
]

function initials(n: string) { return n.split(' ').map((w) => w[0]).join('') }

function MessagesLayout() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <header
        className="flex h-14 items-center justify-between px-6 flex-shrink-0 bg-white"
        style={{ borderBottom: '1px solid #7F8CAA18' }}
      >
        <div>
          <p className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: '#7F8CAA' }}>Inbox</p>
          <h1 className="text-sm font-bold" style={{ color: '#0f172a' }}>Messages</h1>
        </div>
        <button
          className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white rounded-full transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#4382df', boxShadow: '0 2px 12px #4382df35' }}
        >
          <PlusIcon size={11} />New conversation
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversation list panel */}
        <aside
          className="flex w-72 flex-shrink-0 flex-col bg-white"
          style={{ borderRight: '1px solid #7F8CAA18' }}
        >
          {/* Search */}
          <div
            className="p-3"
            style={{ borderBottom: '1px solid #7F8CAA12' }}
          >
            <div className="relative">
              <SearchIcon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7F8CAA]" />
              <input
                type="search"
                placeholder="Search conversations…"
                className="w-full rounded-full border bg-[#ebf0f0] pl-8 pr-3 py-1.5 text-xs outline-none focus:ring-2 placeholder:text-xs"
                style={{ borderColor: '#c8d5e0', color: '#0f172a' }}
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {CONVERSATIONS.map((c) => {
              const isWA = c.channel === 'wa'
              const ChannelIcon = isWA ? WhatsAppIcon : SmsIcon
              return (
                <Link
                  key={c.id}
                  to="/messages/$conversationId"
                  params={{ conversationId: c.id }}
                  className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-[#7F8CAA06]"
                  style={{ borderBottom: '1px solid #7F8CAA08' }}
                  activeProps={{
                    className: 'flex items-start gap-3 px-4 py-3.5 transition-colors',
                    style: {
                      backgroundColor: '#4382df08',
                      borderBottom: '1px solid #7F8CAA08',
                      borderLeft: '2px solid #4382df',
                      paddingLeft: '14px',
                    },
                  }}
                >
                  <Avatar className="mt-0.5 size-9 flex-shrink-0">
                    <AvatarFallback
                      className="text-white text-xs font-bold"
                      style={{ backgroundColor: '#4382df' }}
                    >
                      {initials(c.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span
                        className="text-xs font-semibold truncate"
                        style={{ color: c.unread ? '#0f172a' : '#7F8CAA' }}
                      >
                        {c.name}
                      </span>
                      <span className="flex-shrink-0 text-[10px]" style={{ color: '#7F8CAA' }}>{c.time}</span>
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] truncate" style={{ color: '#7F8CAA' }}>{c.preview}</span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span
                          className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-semibold"
                          style={{
                            backgroundColor: isWA ? '#22c55e12' : '#4382df0e',
                            color: isWA ? '#16a34a' : '#4382df',
                          }}
                        >
                          <ChannelIcon size={8} />
                          {isWA ? 'WA' : 'SMS'}
                        </span>
                        {c.unread && (
                          <span className="size-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#4382df' }} />
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </ScrollArea>
        </aside>

        {/* Outlet: conversation detail or empty state */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
