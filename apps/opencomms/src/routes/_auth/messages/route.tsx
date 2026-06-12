import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { PlusIcon, SearchIcon } from '../../-icons.tsx'

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
    <>
      <header className="flex h-14 items-center justify-between border-b px-6 flex-shrink-0">
        <h1 className="text-sm font-semibold text-foreground">Messages</h1>
        <Button size="sm"><PlusIcon size={13} className="mr-1.5" />New conversation</Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Conversation list */}
        <aside className="flex w-72 flex-shrink-0 flex-col border-r">
          <div className="p-3 border-b">
            <div className="relative">
              <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search conversations…"
                className="w-full rounded-md border bg-muted/40 pl-8 pr-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <ScrollArea className="flex-1">
            {CONVERSATIONS.map((c) => (
              <Link
                key={c.id}
                to="/messages/$conversationId"
                params={{ conversationId: c.id }}
                className="flex items-start gap-3 border-b px-4 py-3 hover:bg-accent/40 transition-colors"
                activeProps={{ className: 'flex items-start gap-3 border-b px-4 py-3 bg-primary/5 border-l-2 border-l-primary' }}
              >
                <Avatar className="mt-0.5 size-9 flex-shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {initials(c.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className={cn('text-xs font-medium truncate', c.unread ? 'text-foreground' : 'text-muted-foreground')}>
                      {c.name}
                    </span>
                    <span className="flex-shrink-0 text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between gap-1">
                    <span className="text-[11px] text-muted-foreground truncate">{c.preview}</span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        'flex-shrink-0 text-[9px] px-1.5 h-4',
                        c.channel === 'wa' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400',
                      )}
                    >
                      {c.channel === 'wa' ? 'WA' : 'SMS'}
                    </Badge>
                  </div>
                </div>
                {c.unread && <span className="mt-2 size-1.5 flex-shrink-0 rounded-full bg-primary" />}
              </Link>
            ))}
          </ScrollArea>
        </aside>

        {/* Outlet: conversation detail or empty state */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </div>
    </>
  )
}
