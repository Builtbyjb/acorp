import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlusIcon, CampaignsIcon, ContactsIcon, MessagesIcon, SmsIcon, WhatsAppIcon, ArrowRight } from '../-icons.tsx'
import { useLayout } from '@/hooks/useLayout'
import { TrendingUp, TrendingDown, MessageSquare, Send, Users, CheckCircle } from 'lucide-react'

const STATS = [
  { label: 'Total Contacts', value: '2,841', change: '+124 this month', positive: true, icon: Users },
  { label: 'Messages Sent Today', value: '1,204', change: '+18% vs yesterday', positive: true, icon: Send },
  { label: 'Active Conversations', value: '37', change: '12 need reply', positive: false, icon: MessageSquare },
  { label: 'Delivery Rate', value: '98.4%', change: '+0.2% this week', positive: true, icon: CheckCircle },
]

const ACTIVITY = [
  { id: 1, text: 'Broadcast "June Newsletter" sent to 1,180 contacts', channel: 'SMS' as const, time: '2h ago' },
  { id: 2, text: 'Maria Gonzalez replied to your message', channel: 'WhatsApp' as const, time: '3h ago' },
  { id: 3, text: 'Broadcast "Flash Sale — 20% off" sent to 340 contacts', channel: 'WhatsApp' as const, time: '5h ago' },
  { id: 4, text: '38 new contacts imported from CSV', channel: null, time: 'Yesterday' },
  { id: 5, text: 'David Park replied to your message', channel: 'SMS' as const, time: 'Yesterday' },
]

const RECENT_CONVS = [
  { id: '1', name: 'Maria Gonzalez', preview: "Thanks! I'll be there at 6pm.", channel: 'wa', time: '3h ago', unread: true },
  { id: '2', name: 'David Park', preview: 'Can I reschedule for next week?', channel: 'sms', time: '5h ago', unread: true },
  { id: '3', name: 'Priya Nair', preview: 'Got it, thank you so much!', channel: 'wa', time: 'Yesterday', unread: false },
  { id: '4', name: 'James Okafor', preview: 'STOP', channel: 'sms', time: 'Yesterday', unread: false },
]

function initials(n: string) { return n.split(' ').map((w) => w[0]).join('') }

function ChannelPill({ channel }: { channel: 'SMS' | 'WhatsApp' }) {
  const isWA = channel === 'WhatsApp'
  return (
    <Badge
      variant="secondary"
      className={`text-[10px] font-semibold gap-1 ${
        isWA ? 'bg-[#25D366]/10 text-[#16A34A] hover:bg-[#25D366]/20' : 'bg-primary/10 text-primary hover:bg-primary/20'
      }`}
    >
      {isWA ? <WhatsAppIcon size={9} /> : <SmsIcon size={9} />}
      {channel}
    </Badge>
  )
}

function DashboardPage() {
  const { setTitle } = useLayout()
  useEffect(() => {
    setTitle('Dashboard')
  }, [setTitle])

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Here is what is happening with your community today.</p>
        </div>
        <Link to="/campaigns">
          <Button>
            <PlusIcon size={14} className="mr-1" /> New broadcast
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => {
          const Icon = s.icon
          const Trend = s.positive ? TrendingUp : TrendingDown
          return (
            <Card key={s.label} className="hover:-translate-y-0.5 transition-transform">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Trend className={`h-4 w-4 ${s.positive ? 'text-emerald-500' : 'text-amber-500'}`} />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">{s.label}</p>
                <p className="text-2xl font-extrabold tracking-tight">{s.value}</p>
                <p className={`mt-1 text-xs font-medium ${s.positive ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {s.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest messages, broadcasts, and imports</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/60">
              {ACTIVITY.map((item) => (
                <div key={item.id} className="flex items-start gap-3 px-6 py-4 hover:bg-muted/30 transition-colors">
                  <span className="mt-1.5 size-2 flex-shrink-0 rounded-full bg-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.text}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      {item.channel && <ChannelPill channel={item.channel} />}
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Recent Conversations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-base">Recent Conversations</CardTitle>
                <CardDescription>Unread messages first</CardDescription>
              </div>
              <Link to="/messages">
                <Button variant="ghost" size="sm" className="text-primary">
                  View all <ArrowRight size={14} />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/60">
                {RECENT_CONVS.map((c) => (
                  <Link
                    key={c.id}
                    to="/messages/$conversationId"
                    params={{ conversationId: c.id }}
                    className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-muted/30"
                  >
                    <Avatar className="size-9 flex-shrink-0">
                      <AvatarFallback className="text-xs font-bold bg-primary text-primary-foreground">
                        {initials(c.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-semibold truncate ${c.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {c.name}
                      </p>
                      <p className="text-[11px] truncate text-muted-foreground">{c.preview}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <span className="text-[10px] text-muted-foreground">{c.time}</span>
                      {c.unread && <span className="size-1.5 rounded-full bg-primary" />}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
              <CardDescription>Get things done faster</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                { to: '/campaigns', Icon: CampaignsIcon, title: 'New Campaign', sub: 'Broadcast to contacts' },
                { to: '/contacts', Icon: ContactsIcon, title: 'Import Contacts', sub: 'Upload a CSV file' },
                { to: '/messages', Icon: MessagesIcon, title: 'New Conversation', sub: 'Start a 1-on-1 message' },
              ].map(({ to, Icon, title, sub }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted"
                >
                  <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{title}</p>
                    <p className="text-[11px] text-muted-foreground">{sub}</p>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: DashboardPage,
})
