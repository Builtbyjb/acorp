import { createFileRoute, Link } from '@tanstack/react-router'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { PlusIcon, CampaignsIcon, ContactsIcon, MessagesIcon } from '../-icons.tsx'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardPage,
})

const STATS = [
  { label: 'Total Contacts',        value: '2,841', change: '+124 this month',    trend: true  },
  { label: 'Messages Sent Today',   value: '1,204', change: '+18% vs yesterday',  trend: true  },
  { label: 'Active Conversations',  value: '37',    change: '12 need reply',       trend: false },
  { label: 'Delivery Rate',         value: '98.4%', change: '+0.2% this week',    trend: true  },
]

const ACTIVITY = [
  { id: 1, text: 'Broadcast "June Newsletter" sent to 1,180 contacts', channel: 'SMS',      time: '2h ago'    },
  { id: 2, text: 'Maria Gonzalez replied to your message',             channel: 'WhatsApp', time: '3h ago'    },
  { id: 3, text: 'Broadcast "Flash Sale — 20% off" sent to 340 contacts', channel: 'WhatsApp', time: '5h ago' },
  { id: 4, text: '38 new contacts imported from CSV',                  channel: null,       time: 'Yesterday' },
  { id: 5, text: 'David Park replied to your message',                 channel: 'SMS',      time: 'Yesterday' },
]

const RECENT_CONVS = [
  { id: '1', name: 'Maria Gonzalez', preview: "Thanks! I'll be there at 6pm.", channel: 'wa',  time: '3h ago',    unread: true  },
  { id: '2', name: 'David Park',     preview: 'Can I reschedule for next week?', channel: 'sms', time: '5h ago',   unread: true  },
  { id: '3', name: 'Priya Nair',     preview: 'Got it, thank you so much!',      channel: 'wa',  time: 'Yesterday', unread: false },
  { id: '4', name: 'James Okafor',   preview: 'STOP',                            channel: 'sms', time: 'Yesterday', unread: false },
]

function initials(n: string) { return n.split(' ').map((w) => w[0]).join('') }

function ChannelBadge({ channel }: { channel: 'SMS' | 'WhatsApp' }) {
  return channel === 'WhatsApp'
    ? <Badge variant="secondary" className="text-green-600 dark:text-green-400 text-[10px]">WhatsApp</Badge>
    : <Badge variant="secondary" className="text-blue-600 dark:text-blue-400 text-[10px]">SMS</Badge>
}

function DashboardPage() {
  return (
    <>
      <header className="flex h-14 items-center justify-between border-b px-6 flex-shrink-0">
        <h1 className="text-sm font-semibold text-foreground">Dashboard</h1>
        <Link to="/campaigns" className={buttonVariants({ size: 'sm' })}>
          <PlusIcon size={13} className="mr-1.5" />New broadcast
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((s) => (
            <Card key={s.label}>
              <CardHeader className="pb-1 pt-4 px-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.label}</p>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-3xl font-bold tracking-tight text-foreground">{s.value}</p>
                <p className={cn('mt-1 text-xs', s.trend ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground')}>
                  {s.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="divide-y px-0">
              {ACTIVITY.map((item) => (
                <div key={item.id} className="flex items-start gap-3 px-6 py-3">
                  <span className="mt-1.5 size-2 flex-shrink-0 rounded-full bg-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.text}</p>
                    <div className="mt-1 flex items-center gap-2">
                      {item.channel && <ChannelBadge channel={item.channel as 'SMS' | 'WhatsApp'} />}
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Recent Conversations */}
            <Card>
              <CardHeader className="flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold">Recent Conversations</CardTitle>
                <Link to="/messages" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'h-6 text-xs px-2')}>
                  View all
                </Link>
              </CardHeader>
              <CardContent className="divide-y px-0">
                {RECENT_CONVS.map((c) => (
                  <Link
                    key={c.id}
                    to="/messages/$conversationId"
                    params={{ conversationId: c.id }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-accent/50 transition-colors"
                  >
                    <Avatar className="size-8 flex-shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">{initials(c.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className={cn('text-xs font-medium truncate', c.unread ? 'text-foreground' : 'text-muted-foreground')}>
                        {c.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">{c.preview}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">{c.time}</span>
                  </Link>
                ))}
              </CardContent>
            </Card>

            {/* Quick actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { to: '/campaigns', Icon: CampaignsIcon, title: 'New Campaign',      sub: 'Broadcast to contacts'    },
                  { to: '/contacts',  Icon: ContactsIcon,  title: 'Import Contacts',   sub: 'Upload a CSV file'        },
                  { to: '/messages',  Icon: MessagesIcon,  title: 'New Conversation',  sub: 'Start a 1-on-1 message'   },
                ].map(({ to, Icon, title, sub }) => (
                  <Link
                    key={to}
                    to={to}
                    className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-accent transition-colors"
                  >
                    <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary flex-shrink-0">
                      <Icon size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{title}</p>
                      <p className="text-[11px] text-muted-foreground">{sub}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
